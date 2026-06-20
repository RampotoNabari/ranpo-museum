"use client";
import Image from "next/image";
import { useState } from "react";

const pages = [
  {
    image: "/images/seki/seki-01.png",
    text: "八十八の手習の\n日記のさまを\n誰か読むべき",
    note: "",
  },
  { image: "/images/seki/seki-02.png", text: "", note: "" },
  { image: "/images/seki/seki-03.png", text: "", note: "" },
  { image: "/images/seki/seki04.png",  text: "", note: "" },
  { image: "/images/seki/seki-05.png", text: "", note: "" },
  { image: "/images/seki/seki-06.png", text: "", note: "" },
];

export default function SekiPage() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(pages.length - 1, c + 1));

  const page = pages[current];

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* ヘッダー */}
      <div className="pt-24 pb-6 text-center">
        <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
        <p className="text-xs tracking-[0.3em] text-white/15 mt-2">
          {current + 1} / {pages.length}
        </p>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16 pb-12">

        {/* 日記画像 */}
        <div className="w-full md:w-1/2 max-w-lg">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={page.image}
              alt={`日記 ${current + 1}ページ`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* テキスト・解説 */}
        <div className="w-full md:w-1/2 max-w-md flex flex-col justify-center px-4">
          {page.text ? (
            <p className="text-base md:text-lg font-light leading-[2.8] tracking-widest text-white/70 whitespace-pre-line mb-10">
              {page.text}
            </p>
          ) : (
            <p className="text-xs tracking-[0.3em] text-white/15 mb-10">
              翻刻テキスト準備中
            </p>
          )}
          {page.note && (
            <div className="border-l border-white/15 pl-6">
              <p className="text-xs tracking-[0.3em] text-white/30 mb-3">解説</p>
              <p className="text-sm leading-[2.4] text-white/50">{page.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center justify-center gap-16 pb-16">
        <button
          onClick={prev}
          disabled={current === 0}
          className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
        >
          ← 前のページ
        </button>

        {/* ドット */}
        <div className="flex gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i === current ? "bg-white/60" : "bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === pages.length - 1}
          className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
        >
          次のページ →
        </button>
      </div>
    </div>
  );
}
