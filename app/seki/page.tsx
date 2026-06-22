"use client";
import { useState, useEffect } from "react";

// 右開き：right = 奇数ページ（先に読む）, left = 偶数ページ
const spreads = [
  { right: "/images/seki/seki-01.jpg", left: "/images/seki/seki-02.jpg" },
  { right: "/images/seki/seki-03.jpg", left: "/images/seki/seki-04.jpg" },
  { right: "/images/seki/seki-05.jpg", left: "/images/seki/seki-06.jpg" },
  { right: "/images/seki/seki-07.jpg", left: "/images/seki/seki-08.jpg" },
  { right: "/images/seki/seki-09.jpg", left: "/images/seki/seki-10.jpg" },
];

// スマホ用：1ページずつの配列（右開き順）
const pages = [
  "/images/seki/seki-01.jpg",
  "/images/seki/seki-02.jpg",
  "/images/seki/seki-03.jpg",
  "/images/seki/seki-04.jpg",
  "/images/seki/seki-05.jpg",
  "/images/seki/seki-06.jpg",
  "/images/seki/seki-07.jpg",
  "/images/seki/seki-08.jpg",
  "/images/seki/seki-09.jpg",
  "/images/seki/seki-10.jpg",
];

export default function SekiPage() {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<1 | -1>(1);
  const [pending, setPending] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const turn = (d: 1 | -1) => {
    const next = spreadIdx + d;
    if (next < 0 || next >= spreads.length || flipping) return;
    setFlipDir(d);
    setPending(next);
    setFlipping(true);
    setTimeout(() => {
      setSpreadIdx(next);
      setFlipping(false);
    }, 750);
  };

  // スマホ：1ページずつ表示
  if (diaryOpen && isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center select-none px-4 py-8">
        <div className="pb-4 text-center">
          <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
          <p className="text-xs text-white/15 tracking-wider mt-1">{pageIdx + 1} / {pages.length} ページ</p>
        </div>

        <div className="w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pages[pageIdx]} alt={`${pageIdx + 1}ページ`} className="w-full h-auto block" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.8)" }} />
        </div>

        <div className="flex items-center gap-8 mt-8">
          <button onClick={() => setPageIdx(p => Math.max(0, p - 1))} disabled={pageIdx === 0}
            className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300">前 →</button>
          <div className="flex gap-1.5 flex-wrap justify-center max-w-[120px]">
            {pages.map((_, i) => (
              <span key={i} className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === pageIdx ? "bg-white/60" : "bg-white/15"}`} />
            ))}
          </div>
          <button onClick={() => setPageIdx(p => Math.min(pages.length - 1, p + 1))} disabled={pageIdx === pages.length - 1}
            className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300">← 次</button>
        </div>
        <button onClick={() => { setDiaryOpen(false); setPageIdx(0); }}
          className="mt-8 text-xs tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors duration-300">← 表紙へ</button>
      </div>
    );
  }

  // PC：見開き3Dめくり
  if (diaryOpen) {
    const availH = typeof window !== "undefined" ? window.innerHeight - 180 : 600;
    const availW = typeof window !== "undefined" ? Math.floor((window.innerWidth - 32) / 2) : 400;
    const pageW = Math.min(availW, availH);
    const pageH = pageW;
    const cur = spreads[spreadIdx];
    const nxt = spreads[pending] ?? cur;
    const isLast = spreadIdx === spreads.length - 1;

    return (
      <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center select-none overflow-hidden">
        <div className="pb-3">
          <p className="text-xs tracking-[0.5em] text-white/30 text-center">せきの日記</p>
          <p className="text-xs text-white/15 tracking-wider mt-1 text-center">
            {spreadIdx * 2 + 1} · {spreadIdx * 2 + 2} ページ
          </p>
        </div>

        <div style={{ perspective: 1400 }}>
          <div style={{ position: "relative", display: "flex", width: pageW * 2 }}>

            <div style={{ position: "relative", zIndex: 1, boxShadow: "inset -4px 0 8px rgba(0,0,0,0.15)", flexShrink: 0, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flipping && flipDir === 1 ? nxt.left : cur.left} alt="左ページ"
                style={{ width: pageW, height: "auto", display: "block" }} />
            </div>

            <div style={{
              position: "absolute", left: pageW, top: 0, bottom: 0, width: 8, zIndex: 20,
              background: "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 60%, transparent)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 1, boxShadow: "inset 4px 0 8px rgba(0,0,0,0.1)", flexShrink: 0, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flipping && flipDir === -1 ? nxt.right : cur.right} alt="右ページ"
                style={{ width: pageW, height: "auto", display: "block" }} />
            </div>

            {flipping && flipDir === 1 && (
              <div style={{
                position: "absolute", top: 0, left: 0, width: pageW, height: pageH,
                transformStyle: "preserve-3d", transformOrigin: "right center",
                animation: "flipForwardJP 0.75s cubic-bezier(0.4,0,0.2,1) forwards",
                zIndex: 30,
              }}>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cur.left} alt="めくり表" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(-180deg)" }}>
                  <div style={{ transform: "scaleX(-1)", width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={nxt.right} alt="めくり裏" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                </div>
              </div>
            )}

            {flipping && flipDir === -1 && (
              <div style={{
                position: "absolute", top: 0, left: pageW, width: pageW, height: pageH,
                transformStyle: "preserve-3d", transformOrigin: "left center",
                animation: "flipBackJP 0.75s cubic-bezier(0.4,0,0.2,1) forwards",
                zIndex: 30,
              }}>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cur.right} alt="戻り表" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div style={{ transform: "scaleX(-1)", width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={nxt.left} alt="戻り裏" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-10 mt-10">
          <button onClick={() => turn(1)} disabled={isLast || flipping}
            className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300">← 次</button>
          <div className="flex gap-2">
            {spreads.map((_, i) => (
              <span key={i} className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === spreadIdx ? "bg-white/60" : "bg-white/15"}`} />
            ))}
          </div>
          <button onClick={() => turn(-1)} disabled={spreadIdx === 0 || flipping}
            className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300">前 →</button>
        </div>
        <button onClick={() => { setDiaryOpen(false); setSpreadIdx(0); }}
          className="mt-8 text-xs tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors duration-300">← 表紙へ</button>

        <style>{`
          @keyframes flipForwardJP {
            from { transform: rotateY(0deg); }
            to   { transform: rotateY(180deg); }
          }
          @keyframes flipBackJP {
            from { transform: rotateY(0deg); }
            to   { transform: rotateY(-180deg); }
          }
        `}</style>
      </div>
    );
  }

  // オープニング：詩文＋「日記を読む」ボタン
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-12 px-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose">八十八の手習の</p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose">日記のさまを</p>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/50 leading-loose">誰か読むべき</p>
        </div>

        <p className="text-3xl md:text-4xl tracking-[0.4em] text-white/85">辻せき</p>

        <div className="flex flex-col items-center gap-3 text-[#c0392b] tracking-[0.25em]">
          <p className="text-base md:text-lg">慶応三年十二月二十一日</p>
          <p className="text-2xl leading-none">|</p>
          <p className="text-base md:text-lg">昭和三十二年八月二十四日</p>
        </div>

        <div className="text-white/25 text-sm tracking-[0.4em]">
          <p>慶応三年（1867年）</p>
          <p className="mt-2">三重県名張　横山家に生まれる</p>
        </div>

        <button
          onClick={() => setDiaryOpen(true)}
          className="mt-4 text-xs tracking-[0.5em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300 whitespace-nowrap"
        >
          日記を読む
        </button>
      </div>
    </main>
  );
}
