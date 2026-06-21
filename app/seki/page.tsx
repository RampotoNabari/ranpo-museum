"use client";
import { useState, useEffect } from "react";

const pdfPages = [
  "/images/seki/seki-01.pdf",
  "/images/seki/seki-02.pdf",
  "/images/seki/seki-03.pdf",
  "/images/seki/seki-04.pdf",
  "/images/seki/seki-05.pdf",
  "/images/seki/seki-06.pdf",
  "/images/seki/seki-07.pdf",
  "/images/seki/seki-08.pdf",
  "/images/seki/seki-09.pdf",
  "/images/seki/seki-10.pdf",
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
  const [W, setW] = useState(340);

  useEffect(() => {
    const update = () => {
      setW(Math.min(420, Math.floor(window.innerWidth * 0.85)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const H = Math.round(W * 1.41);

  if (!opened) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start select-none">
        <div className="pt-16 pb-6 flex items-start gap-6 px-4">
          {/* 表紙画像 */}
          <div style={{ width: W * 0.55, height: H * 0.75, flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/seki/seki-diary01.png"
              alt="せきの日記"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* 縦書きテキスト（横スクロール） */}
          <div
            style={{
              writingMode: "vertical-rl",
              height: H * 0.75,
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
              flexDirection: "row",
              paddingBottom: 8,
            }}
            className="scrollbar-hide"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {poem.map((line, i) =>
                line === "|" ? (
                  <div
                    key={i}
                    style={{
                      width: "1px",
                      height: "3em",
                      background: "rgba(255,255,255,0.2)",
                      margin: "4px auto",
                      alignSelf: "center",
                    }}
                  />
                ) : line === "" ? (
                  <div key={i} style={{ height: "1.5em" }} />
                ) : (
                  <p
                    key={i}
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.35em",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {line}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setOpened(true)}
          className="text-xs tracking-[0.5em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300"
        >
          開　く
        </button>
      </div>
    );
  }

  // 日記ページ表示
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start select-none">
      <div className="pt-16 pb-4 flex items-start gap-4 px-4">
        {/* タイトル縦書き */}
        <div
          className="flex flex-col items-center"
          style={{ writingMode: "vertical-rl", paddingTop: 8 }}
        >
          <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
          <p className="text-xs text-white/15 tracking-wider mt-3">
            {pageIdx + 1} / {pdfPages.length}
          </p>
        </div>

        {/* PDF表示 */}
        <div style={{ width: W, height: H, background: "#1a1a1a" }}>
          <embed
            key={pdfPages[pageIdx]}
            src={pdfPages[pageIdx]}
            type="application/pdf"
            width={W}
            height={H}
            style={{ display: "block" }}
          />
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center gap-10 mt-5">
        <button
          onClick={() => setPageIdx((p) => Math.min(p + 1, pdfPages.length - 1))}
          disabled={pageIdx === pdfPages.length - 1}
          className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
        >
          ← 次
        </button>
        <div className="flex gap-2">
          {pdfPages.map((_, i) => (
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
        onClick={() => { setOpened(false); setPageIdx(0); }}
        className="mt-8 text-xs tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors duration-300"
      >
        ← 表紙へ
      </button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
