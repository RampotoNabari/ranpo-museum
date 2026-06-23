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
  const [adjScale, setAdjScale] = useState(1.10);
  const [adjX, setAdjX] = useState(21);
  const [adjY, setAdjY] = useState(14);
  const [adjOpacity, setAdjOpacity] = useState(1.0);
  const [showAdj, setShowAdj] = useState(false);

  const setAdj = (set: (v: number) => void) => (v: number) => set(v);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const swipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diaryOpen) return;
    setTextRevealed(false);
    if (revealTimer.current) clearTimeout(revealTimer.current);
    if (pageIdx === 0) { setTextRevealed(true); return; }
    revealTimer.current = setTimeout(() => setTextRevealed(true), 2000);
    return () => { if (revealTimer.current) clearTimeout(revealTimer.current); };
  }, [pageIdx, diaryOpen]);

  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      if (Math.abs(touchStartX.current - e.touches[0].clientX) > 10) e.preventDefault();
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

  if (diaryOpen) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center select-none py-8">

        <div ref={swipeRef} style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button
            onClick={() => setPageIdx(p => Math.max(0, p - 1))}
            disabled={pageIdx === 0}
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            className="text-2xl text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
          >◀</button>

          <div style={{
            position: "relative",
            width: "min(680px, calc(100vw - 120px))",
            aspectRatio: "1.37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pages[pageIdx].photo}
              alt={`${pageIdx}ページ`}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", boxShadow: "0 4px 24px rgba(0,0,0,0.8)" }}
            />
            {pages[pageIdx].text && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pages[pageIdx].text} alt="活字" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", transform: `scale(${adjScale}) translateX(${adjX}px) translateY(${adjY}px)`, transformOrigin: "center center", opacity: textRevealed ? adjOpacity : 0, transition: "opacity 1.5s ease-in", pointerEvents: "none", mixBlendMode: "multiply" }} />
            )}
          </div>

          <button
            onClick={() => setPageIdx(p => Math.min(pages.length - 1, p + 1))}
            disabled={pageIdx === pages.length - 1}
            style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            className="text-2xl text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
          >▶</button>
        </div>

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

        <button onClick={() => setShowAdj(v => !v)} style={{ position: "fixed", bottom: 16, right: 16, zIndex: 100, background: "rgba(255,255,255,0.15)", color: "white", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>調整</button>
        {showAdj && (
          <div style={{ position: "fixed", bottom: 50, right: 16, zIndex: 100, background: "rgba(0,0,0,0.85)", color: "white", padding: 16, borderRadius: 8, fontSize: 12, minWidth: 260, display: "flex", flexDirection: "column", gap: 10 }}>
            {([
              { label: "拡大率", value: adjScale, set: setAdj(setAdjScale), min: 0.80, max: 1.50, step: 0.01, fix: 2 },
              { label: "左右(px)", value: adjX, set: setAdj(setAdjX), min: -200, max: 200, step: 1, fix: 0 },
              { label: "上下(px)", value: adjY, set: setAdj(setAdjY), min: -200, max: 200, step: 1, fix: 0 },
              { label: "透明度", value: adjOpacity, set: setAdj(setAdjOpacity), min: 0.1, max: 1.0, step: 0.05, fix: 2 },
            ] as { label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; fix: number }[]).map(({ label, value, set, min, max, step, fix }) => (
              <label key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span>{label}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ flex: 1 }} />
                  <input type="number" min={min} max={max} step={step} value={Number(value.toFixed(fix))} onChange={e => set(Number(e.target.value))} style={{ width: 60, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "white", borderRadius: 4, padding: "2px 4px", fontSize: 12 }} />
                </div>
              </label>
            ))}
            <div style={{ color: "#aaa", fontSize: 11 }}>scale({adjScale.toFixed(2)}) X({adjX}px) Y({adjY}px) opacity({adjOpacity.toFixed(2)})</div>
          </div>
        )}
      </div>
    );
  }

  const fi = (delay: number): React.CSSProperties => ({
    opacity: 0,
    animation: "fadeIn 1.2s ease-out forwards",
    animationDelay: `${delay}s`,
  });

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
