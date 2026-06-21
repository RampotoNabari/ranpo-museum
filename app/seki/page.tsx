"use client";
import { useState, useEffect } from "react";

const diaryPages = [
  "/images/seki/seki-01.png",
  "/images/seki/seki-02.png",
  "/images/seki/seki-03.png",
  "/images/seki/seki-04.png",
  "/images/seki/seki-05.png",
  "/images/seki/seki-06.png",
  "/images/seki/seki-07.png",
  "/images/seki/seki-08.png",
  "/images/seki/seki-09.png",
  "/images/seki/seki-10.png",
];

const poem = [
  "八十八の手習の",
  "",
  "日記のさまを",
  "",
  "誰か読むべき",
  "",
  "辻せき",
  "",
  "慶応三年十二月二十一日",
  "|",
  "昭和三十二年八月二十四日",
];

export default function SekiPage() {
  const [opened, setOpened] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [risen, setRisen] = useState(false);
  const [winW, setWinW] = useState(800);
  const [winH, setWinH] = useState(700);

  useEffect(() => {
    const update = () => {
      setWinW(window.innerWidth);
      setWinH(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 詩文が表示されてから写真が競り上がる
  useEffect(() => {
    if (opened) return;
    const t = setTimeout(() => setRisen(true), 900);
    return () => clearTimeout(t);
  }, [opened]);

  const isMobile = winW < 640;
  const imgW = isMobile ? Math.floor(winW * 0.62) : 280;
  const imgH = Math.round(imgW * 1.38);
  const pdfW = Math.min(winW - 60, 560);
  const pdfH = Math.round(pdfW * 1.41);

  if (!opened) {
    return (
      <div
        className="min-h-screen bg-[#0a0a0a] flex flex-col items-center select-none"
        style={{ overflow: "hidden" }}
      >
        {/* 詩文エリア（上部） */}
        <div
          className="flex items-start justify-center gap-6 px-6"
          style={{ paddingTop: 80, minHeight: 160 }}
        >
          {/* 縦書き詩文（幅固定でスクロール可） */}
          <div
            style={{
              writingMode: "vertical-rl",
              height: isMobile ? 160 : 200,
              width: isMobile ? 56 : 70,
              overflowX: "auto",
              overflowY: "hidden",
            }}
            className="scrollbar-hide"
          >
            {poem.map((line, i) =>
              line === "|" ? (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: 1,
                    height: "2em",
                    background: "rgba(255,255,255,0.2)",
                    margin: "0 0.4em",
                    verticalAlign: "middle",
                  }}
                />
              ) : line === "" ? (
                <span key={i} style={{ display: "inline-block", width: "0.8em" }} />
              ) : (
                <span
                  key={i}
                  style={{
                    display: "block",
                    fontSize: isMobile ? 12 : 13,
                    letterSpacing: "0.4em",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 2.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {line}
                </span>
              )
            )}
          </div>
        </div>

        {/* 表紙写真（下から競り上がる） */}
        <div
          style={{
            transform: risen ? "translateY(0)" : "translateY(100vh)",
            transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            marginTop: 24,
          }}
        >
          <div style={{ width: imgW, height: imgH, flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/seki/seki-diary01.png"
              alt="せきの日記 表紙"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <button
            onClick={() => setOpened(true)}
            className="text-xs tracking-[0.5em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300"
          >
            開　く
          </button>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    );
  }

  // 日記ページ表示（画像切り替え後にPNGが揃ったら動作）
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start select-none">
      <div className="pt-16 pb-4 flex items-start gap-4 px-4">
        <div style={{ writingMode: "vertical-rl", paddingTop: 8, flexShrink: 0 }}>
          <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
          <p className="text-xs text-white/15 tracking-wider mt-3">
            {pageIdx + 1} / {diaryPages.length}
          </p>
        </div>

        <div style={{ width: pdfW, height: pdfH, background: "#fff", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={diaryPages[pageIdx]}
            alt={`せきの日記 ${pageIdx + 1}ページ`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-10 mt-5">
        <button
          onClick={() => setPageIdx((p) => Math.min(p + 1, diaryPages.length - 1))}
          disabled={pageIdx === diaryPages.length - 1}
          className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
        >
          ← 次
        </button>
        <div className="flex gap-2">
          {diaryPages.map((_, i) => (
            <span
              key={i}
              className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                i === pageIdx ? "bg-white/60" : "bg-white/15"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setPageIdx((p) => Math.max(p - 1, 0))}
          disabled={pageIdx === 0}
          className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
        >
          前 →
        </button>
      </div>

      <button
        onClick={() => { setOpened(false); setPageIdx(0); setRisen(false); setTimeout(() => setRisen(true), 900); }}
        className="mt-8 text-xs tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors duration-300"
      >
        ← 表紙へ
      </button>
    </div>
  );
}
