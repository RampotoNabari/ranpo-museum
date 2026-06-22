"use client";
import { useState } from "react";

// 1ページずつの配列（表紙→seki-01〜10）
const pages = [
  "/images/seki/seki-diary01.png",
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
  const [pageIdx, setPageIdx] = useState(0);

  // 全画面：1ページずつ表示
  if (diaryOpen) {
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

        <div className="text-white/50 text-base md:text-lg tracking-[0.4em]">
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
