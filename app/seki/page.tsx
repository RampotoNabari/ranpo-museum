"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";

// 表紙 + 本文64枚
const pages: { photo: string; text?: string }[] = [
  { photo: "/images/seki/seki-diary01.png", text: "/images/seki/seki-00L.png" }, // 表紙
  ...Array.from({ length: 64 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const hasText = i + 1 <= 5; // 活字PNGが存在するページ数（増えたら更新）
    return {
      photo: `/images/seki/seki-${n}.jpg`,
      ...(hasText ? { text: `/images/seki/seki-${n}L.png` } : {}),
    };
  }),
];

export default function SekiPage() {
  const initPage = typeof window !== "undefined" ? Number(new URLSearchParams(window.location.search).get("page") ?? 0) : 0;
  const [diaryOpen, setDiaryOpen] = useState(initPage > 0);
  const [pageIdx, setPageIdx] = useState(initPage > 0 ? initPage : 0);
  const [textRevealed, setTextRevealed] = useState(initPage > 0);
  const [photoRatio, setPhotoRatio] = useState<number | null>(null);
  const frameRatio = 1.37;
  const pageAdj: Record<number, [number, number, number]> = {
    1: [1.12, 21, 14],
    2: [1.34, 15, 7],
    3: [1.37, -20, 31],
    4: [1.16, -5, 4],
    5: [1.1, 26, 6],
  };
  const ls = (key: string, def: number) => typeof window !== "undefined" ? Number(localStorage.getItem(key) || def) : def;
  const getAdj = (idx: number) => pageAdj[idx] ?? pageAdj[1] ?? [1.12, 21, 14];
  const [adjScale, setAdjScale] = useState(() => { const d = getAdj(1); return ls("adj_scale_1", d[0]); });
  const [adjX, setAdjX] = useState(() => { const d = getAdj(1); return ls("adj_x_1", d[1]); });
  const [adjY, setAdjY] = useState(() => { const d = getAdj(1); return ls("adj_y_1", d[2]); });
  const [adj0Scale, setAdj0Scale] = useState(() => ls("adj0_scale", 1.22));
  const [adj0X, setAdj0X] = useState(() => ls("adj0_x", -14));
  const [adj0Y, setAdj0Y] = useState(() => ls("adj0_y", 20));
  const [adjOpacity, setAdjOpacity] = useState(0.60);
  const [showAdj, setShowAdj] = useState(false);

  const setAdj = (set: (v: number) => void, key?: string) => (v: number) => {
    if (key && typeof window !== "undefined") localStorage.setItem(key, String(v));
    set(v);
  };
  useEffect(() => {
    setPhotoRatio(null);
    if (pageIdx === 0) return;
    const d = getAdj(pageIdx);
    setAdjScale(ls(`adj_scale_${pageIdx}`, d[0]));
    setAdjX(ls(`adj_x_${pageIdx}`, d[1]));
    setAdjY(ls(`adj_y_${pageIdx}`, d[2]));
  }, [pageIdx]);

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
            clipPath: "inset(0)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={pageIdx}
              src={pages[pageIdx].photo}
              alt={`${pageIdx}ページ`}
              onLoad={(e) => { const i = e.currentTarget; setPhotoRatio(i.naturalWidth / i.naturalHeight); }}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", boxShadow: "0 4px 24px rgba(0,0,0,0.8)", opacity: photoRatio !== null || pageIdx === 0 ? 1 : 0, transition: "opacity 0.4s ease-in" }}
            />
            {pages[pageIdx].text && (photoRatio !== null || pageIdx === 0) && (pageIdx === 0 ? (
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "23.36%", right: "23.36%", overflow: "hidden", opacity: textRevealed ? 0.70 : 0, transition: "opacity 1.5s ease-in", pointerEvents: "none" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pages[pageIdx].text} alt="活字" style={{ width: "100%", height: "100%", objectFit: "contain", transform: `scale(${adj0Scale}) translateX(${adj0X}px) translateY(${adj0Y}px)`, transformOrigin: "center center" }} />
              </div>
            ) : (() => {
              const pr = photoRatio ?? frameRatio;
              const tb = pr > frameRatio ? `${((1 - frameRatio / pr) / 2 * 100).toFixed(3)}%` : "0";
              const lr = pr < frameRatio ? `${((1 - pr / frameRatio) / 2 * 100).toFixed(3)}%` : "0";
              return (
                <div style={{ position: "absolute", top: tb, bottom: tb, left: lr, right: lr, overflow: "hidden", background: "white", opacity: textRevealed ? adjOpacity : 0, transition: "opacity 1.5s ease-in", pointerEvents: "none" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pages[pageIdx].text} alt="活字" style={{ width: "100%", height: "100%", objectFit: "fill", transform: `scale(${adjScale}) translateX(${adjX}px) translateY(${adjY}px)`, transformOrigin: "center center", mixBlendMode: "normal" }} />
                </div>
              );
            })())}
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
          <p className="text-sm text-white/50 tracking-widest mt-3">{pageIdx + 1} <span className="text-white/20">／</span> {pages.length}</p>
        </div>

        <button onClick={() => { setDiaryOpen(false); setPageIdx(0); }}
          className="mt-6 text-xs tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors duration-300">← 表紙へ</button>

        <button onClick={() => setShowAdj(v => !v)} style={{ position: "fixed", bottom: 16, right: 16, zIndex: 100, background: "rgba(255,255,255,0.15)", color: "white", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>調整</button>
        {showAdj && (
          <div style={{ position: "fixed", bottom: 50, right: 16, zIndex: 100, background: "rgba(0,0,0,0.85)", color: "white", padding: 16, borderRadius: 8, fontSize: 12, minWidth: 260, display: "flex", flexDirection: "column", gap: 10 }}>
            {pageIdx === 0 ? (<>
              {[
                { label: "拡大率", value: adj0Scale, onChange: (v: number) => { setAdj0Scale(v); if (typeof window !== "undefined") localStorage.setItem("adj0_scale", String(v)); }, min: 0.50, max: 1.50, step: 0.01, fix: 2 },
                { label: "左右(px)", value: adj0X, onChange: (v: number) => { setAdj0X(v); if (typeof window !== "undefined") localStorage.setItem("adj0_x", String(v)); }, min: -200, max: 200, step: 1, fix: 0 },
                { label: "上下(px)", value: adj0Y, onChange: (v: number) => { setAdj0Y(v); if (typeof window !== "undefined") localStorage.setItem("adj0_y", String(v)); }, min: -200, max: 200, step: 1, fix: 0 },
              ].map(({ label, value, onChange, min, max, step, fix }) => (
                <label key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span>{label}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1 }} />
                    <input type="number" min={min} max={max} step={step} value={Number(value.toFixed(fix))} onChange={e => onChange(Number(e.target.value))} style={{ width: 60, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "white", borderRadius: 4, padding: "2px 4px", fontSize: 12 }} />
                  </div>
                </label>
              ))}
            </>) : (<>
              {[
                { label: "拡大率", value: adjScale, onChange: (v: number) => { setAdjScale(v); if (typeof window !== "undefined") localStorage.setItem(`adj_scale_${pageIdx}`, String(v)); }, min: 0.80, max: 1.50, step: 0.01, fix: 2 },
                { label: "左右(px)", value: adjX, onChange: (v: number) => { setAdjX(v); if (typeof window !== "undefined") localStorage.setItem(`adj_x_${pageIdx}`, String(v)); }, min: -200, max: 200, step: 1, fix: 0 },
                { label: "上下(px)", value: adjY, onChange: (v: number) => { setAdjY(v); if (typeof window !== "undefined") localStorage.setItem(`adj_y_${pageIdx}`, String(v)); }, min: -200, max: 200, step: 1, fix: 0 },
                { label: "透明度", value: adjOpacity, onChange: (v: number) => { setAdjOpacity(v); if (typeof window !== "undefined") localStorage.setItem("adj_opacity", String(v)); }, min: 0.1, max: 1.0, step: 0.05, fix: 2 },
              ].map(({ label, value, onChange, min, max, step, fix }) => (
                <label key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span>{label}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1 }} />
                    <input type="number" min={min} max={max} step={step} value={Number(value.toFixed(fix))} onChange={e => onChange(Number(e.target.value))} style={{ width: 60, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "white", borderRadius: 4, padding: "2px 4px", fontSize: 12 }} />
                  </div>
                </label>
              ))}
            </>)}
            <div style={{ color: "#aaa", fontSize: 11 }}>{pageIdx === 0 ? `scale(${adj0Scale.toFixed(2)}) X(${adj0X}px) Y(${adj0Y}px)` : `scale(${adjScale.toFixed(2)}) X(${adjX}px) Y(${adjY}px) opacity(${adjOpacity.toFixed(2)})`}</div>
            <button onClick={(e) => {
              if (typeof window === "undefined") return;
              const entries: string[] = [];
              for (let i = 1; i <= 64; i++) {
                const s = localStorage.getItem(`adj_scale_${i}`);
                const x = localStorage.getItem(`adj_x_${i}`);
                const y = localStorage.getItem(`adj_y_${i}`);
                if (s || x || y) {
                  const sv = s ? Number(s) : getAdj(i)[0];
                  const xv = x ? Number(x) : getAdj(i)[1];
                  const yv = y ? Number(y) : getAdj(i)[2];
                  entries.push(`    ${i}: [${sv}, ${xv}, ${yv}],`);
                }
              }
              const text = `{\n${entries.join("\n")}\n}`;
              alert(text);
            }} style={{ marginTop: 4, background: "rgba(255,255,255,0.2)", color: "white", border: "none", borderRadius: 4, padding: "4px 8px", fontSize: 11, cursor: "pointer" }}>
              📋 全ページの値をコピー
            </button>
          </div>
        )}
      </div>
    );
  }

  const fi = (delay: number): React.CSSProperties => ({
    opacity: 0,
    animation: "fadeIn 0.72s ease-out forwards",
    animationDelay: `${delay * 0.6}s`,
  });

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-7 px-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose" style={fi(0)}>八十八の手習の</p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose" style={fi(0.5)}>日記のさまを</p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose" style={fi(1.0)}>誰か読むべき</p>
        </div>

        <p className="text-3xl md:text-4xl tracking-[0.4em] text-white/85" style={fi(1.5)}>辻せき</p>

        <div className="flex flex-col items-center gap-2 text-[#c0392b] tracking-[0.25em]">
          <p className="text-base md:text-lg" style={fi(2.0)}>慶応三年十二月二十一日</p>
          <p className="text-2xl leading-none" style={fi(2.5)}>|</p>
          <p className="text-base md:text-lg" style={fi(3.0)}>昭和三十二年八月二十四日</p>
        </div>

        <div className="text-white/50 text-base md:text-lg tracking-[0.4em]">
          <p style={fi(3.5)}>慶応三年（1867年）</p>
          <p className="mt-1" style={fi(4.0)}>三重県名張　横山家に生まれる</p>
        </div>

        <button
          onClick={() => setDiaryOpen(true)}
          className="mt-2 text-xs tracking-[0.35em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300 whitespace-nowrap"
          style={fi(4.5)}
        >
          日記を読む
        </button>
      </div>
    </main>
  );
}
