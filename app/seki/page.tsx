"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const pages = [
  { image: "/images/seki/seki-01.png", note: "" },
  { image: "/images/seki/seki-02.png", note: "" },
  { image: "/images/seki/seki-03.png", note: "" },
  { image: "/images/seki/seki04.png",  note: "" },
  { image: "/images/seki/seki-05.png", note: "" },
  { image: "/images/seki/seki-06.png", note: "" },
];

export default function SekiPage() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(pages.length - 1, c + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const page = pages[current];

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center">

      {/* タイトル */}
      <div className="pt-24 pb-8 text-center">
        <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
        <p className="text-xs tracking-[0.3em] text-white/15 mt-2">
          {current + 1} / {pages.length}
        </p>
      </div>

      {/* 日記画像 */}
      <div className="w-full max-w-xl px-6 flex-1 flex flex-col items-center">
        <div className="relative w-full">
          <Image
            src={page.image}
            alt={`せきの日記 ${current + 1}ページ`}
            width={800}
            height={1200}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* 解説（あれば表示） */}
        {page.note && (
          <div className="mt-10 border-t border-white/10 pt-8 w-full">
            <p className="text-xs tracking-[0.3em] text-white/30 mb-4">解説</p>
            <p className="text-sm leading-[2.4] text-white/50">{page.note}</p>
          </div>
        )}
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center justify-center gap-12 py-16">
        <button
          onClick={prev}
          disabled={current === 0}
          className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
        >
          ← 前
        </button>

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
          次 →
        </button>
      </div>
    </div>
  );
}
