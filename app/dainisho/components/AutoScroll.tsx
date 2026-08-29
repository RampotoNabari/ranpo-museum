"use client";

import { useEffect } from "react";

/**
 * ページを開いて5秒後から、5秒ごとに1画面分ずつ自動で下へスクロールしていく。
 * 最下部に達したら停止。読み手が自分でスクロール・タッチ・キー操作をした時点で
 * 以降は自動送りを止め、操作を邪魔しない。
 * prefers-reduced-motion 指定時は自動送りを行わない。
 */
const START_DELAY = 5000;
const STEP_INTERVAL = 5000;

export default function AutoScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
      timers.length = 0;
    };

    const atBottom = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 4;

    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      clearTimers();
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

    const step = () => {
      if (cancelled) return;
      if (atBottom()) {
        stop();
        return;
      }
      // 1画面ぶんより少しだけ控えめに送り、境目の内容を取りこぼさない。
      window.scrollBy({
        top: Math.round(window.innerHeight * 0.9),
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    timers.push(
      window.setTimeout(() => {
        step();
        timers.push(window.setInterval(step, STEP_INTERVAL));
      }, START_DELAY),
    );

    return () => {
      cancelled = true;
      clearTimers();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
