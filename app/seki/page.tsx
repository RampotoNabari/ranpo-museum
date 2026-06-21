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
    const t = setTimeout(() => setRisen(true), 8000);
    return () => clearTimeout(t);
  }, [opened]);

  const isMobile = winW < 640;
  const imgW = isMobile ? Math.floor(winW * 0.62) : 280;
  const imgH = Math.round(imgW * 1.38);
  const pdfW = Math.min(winW - 60, 560);
  const pdfH = Math.round(pdfW * 1.41);

  if (!opened) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start select-none overflow-hidden">

        {/* 詩文（テロップ：下から順に上昇） */}
        <div className="flex flex-col items-center text-center pt-24 gap-0">
          <p className="seki-rise-1 text-lg md:text-xl font-light tracking-widest text-white/50 leading-loose">八十八の手習の</p>
          <p className="seki-rise-2 text-lg md:text-xl font-light tracking-widest text-white/50 leading-loose">日記のさまを</p>
          <p className="seki-rise-3 text-lg md:text-xl font-light tracking-widest text-white/50 leading-loose mb-6">誰か読むべき</p>
          <p className="seki-rise-4 text-2xl md:text-3xl tracking-[0.4em] text-white/85 mb-6">辻せき</p>
          <div className="flex flex-col items-center text-[#c0392b] tracking-[0.25em] text-sm">
            <p className="seki-rise-5">慶応三年十二月二十一日</p>
            <p className="seki-rise-6 text-xl leading-none my-2">|</p>
            <p className="seki-rise-7">昭和三十二年八月二十四日</p>
          </div>
        </div>

        {/* 表紙写真（詩文の後に下から競り上がる） */}
        <div
          style={{
            transform: risen ? "translateY(0)" : "translateY(100vh)",
            transition: "transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            marginTop: 32,
          }}
        >
          <div style={{ width: imgW, height: imgH }}>
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
          @keyframes sekiTelopUp {
            from { opacity: 0.6; transform: translateY(60vh); }
            to   { opacity: 1;   transform: translateY(0); }
          }
          .seki-rise-1 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; }
          .seki-rise-2 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 0.9s forwards; }
          .seki-rise-3 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 1.6s forwards; }
          .seki-rise-4 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 2.4s forwards; }
          .seki-rise-5 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 3.2s forwards; }
          .seki-rise-6 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 4.0s forwards; }
          .seki-rise-7 { opacity: 0; animation: sekiTelopUp 3.0s cubic-bezier(0.16,1,0.3,1) 4.8s forwards; }
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
