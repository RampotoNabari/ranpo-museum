"use client";

import { useEffect } from "react";

/**
 * Hero の自動再生シークエンスを見届けたあと、映画のエンドロールのように
 * 一定の速さでゆっくりと最下部までスクロールし続ける。
 * 1フレームごとにごく僅かずつ動かすので、途中で止まって見える瞬間がない。
 * 読み手がホイール・タッチ・ナビゲーションキーで操作した時点で自動送りは止まり、
 * 以降は操作を邪魔しない。prefers-reduced-motion 指定時は何もしない。
 */
// Hero.tsx の映画的シークエンスは、題字の退場からキャプション・SCROLL誘いが
// 出そろうまでで約18秒（INTRO_DELAY 4.6 + 11.4 + フェード 1.6）。
const START_DELAY = 21000;
// スクロール速度（px / 秒）。エンドロール相当のゆっくりした速さ。
const SPEED = 60;

export default function CreditScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroller = document.scrollingElement || document.documentElement;
    let cancelled = false;
    let rafId = 0;
    let startTimer = 0;
    let last = 0;
    let pos = 0;

    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
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

    const frame = (now: number) => {
      if (cancelled) return;
      // タブ復帰などで間隔が開いても一気に飛ばないよう上限をかける。
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      pos += SPEED * dt;
      const max = scroller.scrollHeight - window.innerHeight;
      if (pos >= max) {
        scroller.scrollTop = max;
        stop();
        return;
      }
      scroller.scrollTop = pos;
      rafId = requestAnimationFrame(frame);
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    startTimer = window.setTimeout(() => {
      if (cancelled) return;
      pos = scroller.scrollTop;
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }, START_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
