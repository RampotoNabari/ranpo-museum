"use client";
import { useState, useEffect } from "react";

// 右開き（縦書き）: right = 奇数ページ（先に読む）, left = 偶数ページ
const spreads = [
  { cover: true,  right: "/images/seki/seki-01.png?v=2", left: null, note: "" },
  { right: "/images/seki/seki-02.png?v=2",  left: "/images/seki/seki-03.png?v=2",
    note: "この日記は孫の使い古しのノートに墨で書き綴ったものです。孫たちとの微笑ましいやり取りです。せきおばあさんを知るひ孫たちは、遊びに行くといつもお菓子をくれた、といっていました。" },
  { right: "/images/seki/seki04.png?v=2",   left: "/images/seki/seki-05.png?v=2", note: "" },
  { right: "/images/seki/seki-06.png?v=2",  left: null, note: "" },
];

function PageImg({ src, alt, w, h }: { src: string | null; alt: string; w: number; h: number }) {
  if (!src) return <div style={{ width: w, height: h, background: "#f5f0e8" }} />;
  return (
    <div style={{ width: w, height: h, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
    </div>
  );
}

export default function SekiPage() {
  const [idx, setIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [pending, setPending] = useState(0);
  const [W, setW] = useState(380);

  useEffect(() => {
    const update = () => {
      // 見開き = W * 2、画面幅の95%に収める、最大380px
      setW(Math.min(380, Math.floor(window.innerWidth * 0.95 / 2)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const H = Math.round(W * 1.44);

  const turn = (d: 1 | -1) => {
    const next = idx + d;
    if (next < 0 || next >= spreads.length || flipping) return;
    setDir(d);
    setPending(next);
    setFlipping(true);
    setTimeout(() => { setIdx(next); setFlipping(false); }, 750);
  };

  const cur = spreads[idx];
  const nxt = spreads[pending] ?? cur;
  const isCover = idx === 0;
  const isLast = idx === spreads.length - 1;
  const pg = { w: W, h: H };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start select-none">
      <div className="pt-14 pb-3 text-center">
        <p className="text-xs tracking-[0.5em] text-white/30">せきの日記</p>
        {!isCover && (
          <p className="text-xs text-white/15 mt-2 tracking-wider">
            {idx * 2 - 1} · {idx * 2} ページ
          </p>
        )}
      </div>

      {/* Book stage */}
      <div style={{ perspective: 1400 }}>

        {/* 表紙 */}
        {isCover && (
          <div style={{ position: "relative", width: W, height: H }}>
            <PageImg src={cur.right} alt="表紙" {...pg} />
            <div style={{ position: "absolute", inset: 0, boxShadow: "6px 6px 24px rgba(0,0,0,0.8), -2px 0 8px rgba(0,0,0,0.4)", borderRadius: 2 }} />
          </div>
        )}

        {/* 見開き */}
        {!isCover && (
          <div style={{ position: "relative", display: "flex", width: W * 2, height: H }}>

            {/* 左ページ（偶数） */}
            <div style={{ position: "relative", zIndex: 1, boxShadow: "inset -4px 0 8px rgba(0,0,0,0.15)" }}>
              <PageImg src={flipping && dir === 1 ? nxt.left : cur.left} alt="左ページ" {...pg} />
            </div>

            {/* 綴じ目 */}
            <div style={{
              position: "absolute", left: W, top: 0, bottom: 0, width: 6, zIndex: 20,
              background: "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 60%, transparent)",
              pointerEvents: "none"
            }} />

            {/* 右ページ（奇数） */}
            <div style={{ position: "relative", zIndex: 1, boxShadow: "inset 4px 0 8px rgba(0,0,0,0.1)" }}>
              <PageImg src={flipping && dir === -1 ? nxt.right : cur.right} alt="右ページ" {...pg} />
            </div>

            {/* 前進めくり：左→右（日本語右開き） */}
            {flipping && dir === 1 && (
              <div style={{
                position: "absolute", top: 0, left: 0, width: W, height: H,
                transformStyle: "preserve-3d", transformOrigin: "right center",
                animation: "flipForwardJP 0.75s cubic-bezier(0.4,0,0.2,1) forwards",
                zIndex: 30,
              }}>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
                  <PageImg src={cur.left} alt="めくり表" {...pg} />
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(-180deg)" }}>
                  <div style={{ transform: "scaleX(-1)", width: "100%", height: "100%" }}>
                    <PageImg src={nxt.right} alt="めくり裏" {...pg} />
                  </div>
                </div>
              </div>
            )}

            {/* 後退めくり：右→左 */}
            {flipping && dir === -1 && (
              <div style={{
                position: "absolute", top: 0, left: W, width: W, height: H,
                transformStyle: "preserve-3d", transformOrigin: "left center",
                animation: "flipBackJP 0.75s cubic-bezier(0.4,0,0.2,1) forwards",
                zIndex: 30,
              }}>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
                  <PageImg src={cur.right} alt="戻り表" {...pg} />
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div style={{ transform: "scaleX(-1)", width: "100%", height: "100%" }}>
                    <PageImg src={nxt.left} alt="戻り裏" {...pg} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 解説（固定高さで本が動かないように） */}
      <div className="max-w-xl mt-5 px-6 text-center" style={{ minHeight: 80 }}>
        {!isCover && cur.note && (
          <p className="text-xs leading-[2.2] tracking-wider text-white/40">{cur.note}</p>
        )}
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center gap-10 mt-5">
        {isCover ? (
          <button
            onClick={() => turn(1)}
            className="text-xs tracking-[0.5em] text-white/50 border border-white/20 px-10 py-3 hover:text-white hover:border-white/50 transition-colors duration-300"
          >
            開　く
          </button>
        ) : (
          <>
            <button
              onClick={() => turn(1)}
              disabled={isLast || flipping}
              className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
            >
              ← 次
            </button>
            <div className="flex gap-2">
              {spreads.slice(1).map((_, i) => (
                <span key={i} className={`block w-1.5 h-1.5 rounded-full transition-colors ${idx === i + 1 ? "bg-white/60" : "bg-white/15"}`} />
              ))}
            </div>
            <button
              onClick={() => turn(-1)}
              disabled={flipping || idx === 1}
              className="text-xs tracking-[0.4em] text-white/40 hover:text-white/80 disabled:opacity-15 disabled:cursor-not-allowed transition-colors duration-300"
            >
              前 →
            </button>
          </>
        )}
      </div>

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
