"use client";

import { useEffect } from "react";

/**
 * Hero の自動再生シークエンス（路地に立つ乱歩生誕地まで＝第1場面）を見届けたあと、
 * セクションの区切りに位置を合わせて 120px/秒 で送り、着いたら5秒静止する。
 * これを最下部まで繰り返す。止まる位置は毎回その場でレイアウトを測り直して
 * 決めるので、画像読み込みなどで多少ずれても場面の頭に合う。
 * 読み手がホイール・タッチ・ナビゲーションキーで操作した時点で自動送りは止まる。
 * prefers-reduced-motion 指定時は何もしない。
 */
// 第1場面（Hero）を見届ける時間。題字の退場からキャプション・SCROLL誘いが
// 出そろうまでで約18秒（INTRO_DELAY 4.6 + 11.4 + フェード 1.6）＋余韻。
const START_DELAY = 21000;
// スクロール中の速度（px / 秒）。従来のエンドロール速度 60 の2倍。
const SPEED = 120;
// 各場面での静止時間（ミリ秒）。
const PAUSE = 5000;
// 高さが画面の 1.4 倍を超えるセクションは、上寄せに加えて下寄せでも一度止める。
const TALL_RATIO = 1.4;

export default function CreditScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroller = document.scrollingElement || document.documentElement;
    const rootStyle = document.documentElement.style;
    const prevScrollBehavior = rootStyle.scrollBehavior;
    let behaviorOverridden = false;

    let cancelled = false;
    let rafId = 0;
    let timerId = 0;
    let target = 0;
    let startPos = 0;
    let startTime = 0;
    let lastFrame = 0;

    // html{scroll-behavior:smooth} が毎フレームの scrollTop 代入を追加補間して
    // 加速させてしまうので、自動送りの間だけ auto に固定する。
    const overrideBehavior = () => {
      rootStyle.scrollBehavior = "auto";
      behaviorOverridden = true;
    };
    const restoreBehavior = () => {
      if (behaviorOverridden) rootStyle.scrollBehavior = prevScrollBehavior;
      behaviorOverridden = false;
    };

    const maxScroll = () => scroller.scrollHeight - window.innerHeight;

    // いまのレイアウトから「止まる位置」の一覧を作る。
    // 各セクションの先頭（上寄せ）＋ 背の高いセクションは末尾（下寄せ）も。
    const stopOffsets = (): number[] => {
      const vh = window.innerHeight;
      const max = maxScroll();
      const raw: number[] = [];
      document.querySelectorAll<HTMLElement>("main > section").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scroller.scrollTop;
        raw.push(top);
        if (rect.height > vh * TALL_RATIO) raw.push(top + rect.height - vh);
      });
      raw.push(max);
      const sorted = raw
        .map((v) => Math.max(0, Math.min(v, max)))
        .sort((a, b) => a - b);
      // 近すぎる候補（60px 以内）はまとめる。
      const out: number[] = [];
      for (const v of sorted) {
        if (!out.length || v - out[out.length - 1] > 60) out.push(v);
      }
      return out;
    };

    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      restoreBehavior();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", onKeyDown);
    };

    // ナビゲーション用のキーを押したら「自分で読み進めたい」とみなす。
    const onKeyDown = (e: KeyboardEvent) => {
      const navKeys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " ",
      ];
      if (navKeys.includes(e.key)) stop();
    };

    const glide = (now: number) => {
      if (cancelled) return;
      const gap = now - lastFrame;
      lastFrame = now;
      // タブ復帰などで長い空白があったら、飛ばさず現在地から測り直す。
      if (gap > 400) {
        startTime = now;
        startPos = scroller.scrollTop;
      }
      // 位置は「開始からの経過時間 × 速度」。フレーム落ちしても自己補正できる。
      const want = startPos + (SPEED * (now - startTime)) / 1000;
      if (want >= target) {
        scroller.scrollTop = target;
        if (target >= maxScroll()) {
          stop();
          return;
        }
        // この場面で5秒静止してから、次の区切りへ。
        timerId = window.setTimeout(nextStep, PAUSE);
        return;
      }
      scroller.scrollTop = want;
      rafId = requestAnimationFrame(glide);
    };

    const nextStep = () => {
      if (cancelled) return;
      const cur = scroller.scrollTop;
      const next = stopOffsets().find((s) => s > cur + 8);
      if (next == null) {
        stop();
        return;
      }
      overrideBehavior();
      target = next;
      startPos = cur;
      startTime = performance.now();
      lastFrame = startTime;
      rafId = requestAnimationFrame(glide);
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // 第1場面（Hero）を見届けてから、最初の区切りへ送り出す。
    timerId = window.setTimeout(nextStep, START_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      restoreBehavior();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
