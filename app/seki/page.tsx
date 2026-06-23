"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";

// 表紙 + 本文64枚
const pages: { photo: string; text?: string }[] = [
  { photo: "/images/seki/seki-diary01.png" }, // 表紙
  ...Array.from({ length: 64 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      photo: `/images/seki/seki-${n}.jpg`,
      text: `/images/seki/seki-${n}L.png`,
    };
  }),
];

export default function SekiPage() {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [textRevealed, setTextRevealed] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const swipeRef = useRef<HTMLDivElement>(null);

  // ページが変わったらスキャンのみ表示→2秒後に活字を展開
  useEffect(() => {
    if (!diaryOpen) return;
    setTextRevealed(false);
    if (revealTimer.current) clearTimeout(revealTimer.current);
    // 表紙（0ページ目）は分割不要なのですぐ全表示
    if (pageIdx === 0) { setTextRevealed(true); return; }
    revealTimer.current = setTimeout(() => setTextRevealed(true), 2000);
    return () => { if (revealTimer.current) clearTimeout(revealTimer.current); };
  }, [pageIdx, diaryOpen]);

  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = Math.abs(touchStartX.current - e.touches[0].clientX);
      if (diff > 10) e.preventDefault(); // 横スワイプ中はページスクロールを止める
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) >= 40) {
        if (diff > 0) setPageIdx(p => Math.min(pages.length - 1, p + 1));
        else setPageIdx(p => Math.max(0, p - 1));
      }
      touchStartX.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [diaryOpen]);

  // 全画面：1ページずつ表示
  if (diaryOpen) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center select-none py-8">

        {/* 画像エリア：ボタン固定＋黒枠 */}
        <div ref={swipeRef} style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

          {/* 左ボタン：固定位置 */}
          <button
            onClick={() => setPageIdx(p => Math.max(0, p - 1))}
            disabled={pageIdx === 0}
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            className="text-2xl text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
          >◀</button>

          {/* 黒枠：横長ページ基準（1.37:1）の固定枠、縦長は両脇に黒が入る */}
          <div style={{
            position: "relative",
            width: "min(680px, calc(100vw - 120px))",
            aspectRatio: "1.37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pages[pageIdx].photo}
              alt={`${pageIdx}ページ`}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                boxShadow: "0 4px 24px rgba(0,0,0,0.8)",
              }}
            />
            {/* 活字オーバーレイ：2層で赤文字を実現 */}
            {pages[pageIdx].text && (
// eslint-disable-next-line @next/next/no-img-element
              <img src={pages[pageIdx].text} alt="活字" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", opacity: textRevealed ? 0.65 : 0, transition: "opacity 1.5s ease-in", pointerEvents: "none" }} />
            )}
          </div>

          {/* 右ボタン：固定位置 */}
          <button
            onClick={() => setPageIdx(p => Math.min(pages.length - 1, p + 1))}
            disabled={pageIdx === pages.length - 1}
            style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            className="text-2xl text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
          >▶</button>
        </div>

        {/* ページ情報（下） */}
        <div className="mt-6 text-center">
          <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
          <div className="flex gap-1.5 flex-wrap justify-center mt-3 max-w-[160px] mx-auto">
            {pages.map((_, i) => (
              <span key={i} className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === pageIdx ? "bg-white/60" : "bg-white/15"}`} />
            ))}
          </div>
          <p className="text-xs text-white/20 tracking-wider mt-2">{pageIdx + 1} / {pages.length} ページ</p>
        </div>

        <button onClick={() => { setDiaryOpen(false); setPageIdx(0); }}
          className="mt-6 text-xs tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors duration-300">← 表紙へ</button>
      </div>
    );
  }


  const fi = (delay: number): React.CSSProperties => ({
    opacity: 0,
    animation: "fadeIn 1.2s ease-out forwards",
    animationDelay: `${delay}s`,
  });

  // オープニング：詩文＋「日記を読む」ボタン
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-12 px-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose" style={fi(0)}>八十八の手習の</p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose" style={fi(0.5)}>日記のさまを</p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose" style={fi(1.0)}>誰か読むべき</p>
        </div>

        <p className="text-3xl md:text-4xl tracking-[0.4em] text-white/85" style={fi(1.5)}>辻せき</p>

        <div className="flex flex-col items-center gap-3 text-[#c0392b] tracking-[0.25em]">
          <p className="text-base md:text-lg" style={fi(2.0)}>慶応三年十二月二十一日</p>
          <p className="text-2xl leading-none" style={fi(2.5)}>|</p>
          <p className="text-base md:text-lg" style={fi(3.0)}>昭和三十二年八月二十四日</p>
        </div>

        <div className="text-white/50 text-base md:text-lg tracking-[0.4em]">
          <p style={fi(3.5)}>慶応三年（1867年）</p>
          <p className="mt-2" style={fi(4.0)}>三重県名張　横山家に生まれる</p>
        </div>

        <button
          onClick={() => setDiaryOpen(true)}
          className="mt-4 text-xs tracking-[0.35em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300 whitespace-nowrap"
          style={fi(4.5)}
        >
          日記を読む
        </button>
      </div>
    </main>
  );
}
