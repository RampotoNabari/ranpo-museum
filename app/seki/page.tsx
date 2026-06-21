"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// 右開き：right = 奇数ページ（先に読む）, left = 偶数ページ
const spreads = [
  { right: "/images/seki/seki-01.jpg", left: "/images/seki/seki-02.jpg" },
  { right: "/images/seki/seki-03.jpg", left: "/images/seki/seki-04.jpg" },
  { right: "/images/seki/seki-05.jpg", left: "/images/seki/seki-06.jpg" },
  { right: "/images/seki/seki-07.jpg", left: "/images/seki/seki-08.jpg" },
  { right: "/images/seki/seki-09.jpg", left: "/images/seki/seki-10.jpg" },
];

export default function SekiPage() {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<1 | -1>(1);
  const [pending, setPending] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);
  const coverBgRef = useRef<HTMLDivElement>(null);
  const coverPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = snapRef.current;
    if (!container) return;

    const BG_DURATION = 12000;

    const transitionToSection2 = () => {
      const section2 = document.getElementById("seki-section-2");
      if (!section2) return;
      container.style.scrollSnapType = "none";
      const startTop = container.scrollTop;
      const endTop = section2.offsetTop;
      const startTime = performance.now();
      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / BG_DURATION, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        container.scrollTop = startTop + (endTop - startTop) * ease;
        if (t < 1) requestAnimationFrame(animateScroll);
        else container.style.scrollSnapType = "y mandatory";
      };
      requestAnimationFrame(animateScroll);
    };

    // 詩文クレジットが流れ終わった後（25秒）に2枚目へ
    const timer = setTimeout(transitionToSection2, 25000);

    // 2枚目に入ったら表紙写真を競り上げる
    const observerOpts = { root: container, threshold: 0.2 };
    const s2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        clearTimeout(timer);
        if (coverBgRef.current) {
          coverBgRef.current.style.transition = `transform ${BG_DURATION}ms ease-out`;
          coverBgRef.current.style.transform = "scale(1.0) translateY(0px)";
        }
        setTimeout(() => {
          if (coverPhotoRef.current) {
            coverPhotoRef.current.style.transition = "transform 2.0s cubic-bezier(0.16, 1, 0.3, 1)";
            coverPhotoRef.current.style.transform = "translateX(-50%) translateY(0)";
          }
        }, 800);
        s2Observer.disconnect();
      });
    }, observerOpts);
    const s2el = document.getElementById("seki-section-2");
    if (s2el) s2Observer.observe(s2el);

    return () => {
      clearTimeout(timer);
      s2Observer.disconnect();
    };
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

  if (diaryOpen) {
    const pageW = typeof window !== "undefined" ? Math.min(Math.floor((window.innerWidth - 48) / 2), 480) : 360;
    const cur = spreads[spreadIdx];
    const nxt = spreads[pending] ?? cur;
    const isLast = spreadIdx === spreads.length - 1;

    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start select-none">
        <div className="pt-16 pb-4">
          <p className="text-xs tracking-[0.5em] text-white/30 text-center">せきの日記</p>
          <p className="text-xs text-white/15 tracking-wider mt-2 text-center">
            {spreadIdx * 2 + 1} · {spreadIdx * 2 + 2} ページ
          </p>
        </div>

        {/* 本のステージ */}
        <div style={{ perspective: 1400 }}>
          <div style={{ position: "relative", display: "flex", width: pageW * 2 }}>

            {/* 左ページ */}
            <div style={{ position: "relative", zIndex: 1, boxShadow: "inset -4px 0 8px rgba(0,0,0,0.15)", flexShrink: 0, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flipping && flipDir === 1 ? nxt.left : cur.left} alt="左ページ"
                style={{ width: pageW, height: "auto", display: "block" }} />
            </div>

            {/* 綴じ目 */}
            <div style={{
              position: "absolute", left: pageW, top: 0, bottom: 0, width: 8, zIndex: 20,
              background: "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 60%, transparent)",
              pointerEvents: "none",
            }} />

            {/* 右ページ */}
            <div style={{ position: "relative", zIndex: 1, boxShadow: "inset 4px 0 8px rgba(0,0,0,0.1)", flexShrink: 0, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flipping && flipDir === -1 ? nxt.right : cur.right} alt="右ページ"
                style={{ width: pageW, height: "auto", display: "block" }} />
            </div>

            {/* 前進めくり：左ページが右へ（日本語右開き） */}
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

            {/* 後退めくり：右ページが左へ */}
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

  return (
    <main className="min-h-screen">
      <div
        ref={snapRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >

        {/* ── 1枚目：詩文クレジット ── */}
        <div id="seki-section-1" className="relative h-screen w-full snap-start overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <div className="scroll-credits absolute left-0 right-0 px-8 text-white text-center">
            <div className="max-w-md mx-auto py-8 flex flex-col items-center gap-16">
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
              <div className="h-16" />
              <div className="text-white/25 text-sm tracking-[0.4em]">
                <p>慶応三年（1867年）</p>
                <p className="mt-2">三重県名張　横山家に生まれる</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2枚目：表紙写真が競り上がる ── */}
        <div id="seki-section-2" className="relative h-screen w-full snap-start overflow-hidden bg-black">
          <div
            ref={coverBgRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.0) translateY(100px)", willChange: "transform" }}
          >
            <div className="absolute inset-0 bg-[#0a0a0a]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

          {/* 表紙写真：下から競り上がって止まる */}
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-hidden">
            <div
              ref={coverPhotoRef}
              className="absolute top-4 left-1/2 flex flex-col items-center gap-6"
              style={{ transform: "translateX(-50%) translateY(100vh)", width: "min(280px, 70vw)" }}
            >
              <div className="relative w-full" style={{ aspectRatio: "0.72 / 1", background: "#f5f0e8", boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)" }}>
                <Image
                  src="/images/seki/seki-diary01.png"
                  alt="せきの日記 表紙"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setDiaryOpen(true)}
                className="text-xs tracking-[0.5em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300 whitespace-nowrap"
              >
                開　く
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
