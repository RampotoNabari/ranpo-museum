"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const phrases = [
  {
    text: "幾重にも仕組まれた偶然、",
    cls: "text-2xl md:text-3xl text-white/60 tracking-widest font-light",
    img: "/images/intro/IMG_3874.jpeg",   // カメラを構える乱歩
    imgOpacity: 0.18,
  },
  {
    text: "人はそれを運命と呼ぶ。",
    cls: "text-2xl md:text-3xl text-white/60 tracking-widest font-light",
    img: "/images/intro/IMG_3876.jpeg",   // 名張の街を歩く乱歩
    imgOpacity: 0.18,
  },
  {
    text: "あなたは未来へ",
    cls: "text-3xl md:text-4xl text-white/80 tracking-widest font-light",
    img: "/images/intro/IMG_3882.jpeg",   // 除幕式全景
    imgOpacity: 0.20,
  },
  {
    text: "何を手渡しますか？",
    cls: "text-3xl md:text-4xl text-white/80 tracking-widest font-light",
    img: "/images/intro/IMG_3885.jpeg",   // 花束を受ける乱歩
    imgOpacity: 0.22,
    imgPosition: "object-top",
  },
  {
    text: "江戸川乱歩を巡る",
    cls: "text-xl md:text-2xl text-white/40 tracking-[0.55em] font-light",
    img: "/images/intro/IMG_3879.jpeg",   // 乱歩と仲間
    imgOpacity: 0.15,
    imgPosition: "object-top",
  },
  {
    text: "運命のバトン",
    cls: "text-5xl md:text-7xl text-white/90 tracking-[0.35em] font-light",
    img: "/images/intro/IMG_3887.jpeg",   // 人々の宴・笑顔
    imgOpacity: 0.25,
    imgPosition: "[object-position:40%_top] md:[object-position:50%_top]",
  },
];

const FADE_IN_MS   = 1400;
const HOLD_MS      = 2400;
const FADE_OUT_MS  = 1100;
const LAST_HOLD_MS = 4200;

export default function CinematicHero() {
  const [idx, setIdx]                   = useState(0);
  const [animClass, setAnimClass]       = useState("phrase-appear");
  const [imgVisible, setImgVisible]     = useState(false);
  const [overlayDone, setOverlayDone]   = useState(false);
  const [overlayGone, setOverlayGone]   = useState(false);
  const [heroIn, setHeroIn]             = useState(false);

  const handleComplete = useCallback(() => {
    setOverlayDone(true);
    setTimeout(() => setOverlayGone(true), 1800);
    setTimeout(() => setHeroIn(true), 900);
  }, []);

  useEffect(() => {
    if (overlayDone) return;
    const isLast = idx === phrases.length - 1;
    const hold   = isLast ? LAST_HOLD_MS : HOLD_MS;

    // 画像：テキストが現れ始めてから少し遅れてフェードイン
    const imgTimer = setTimeout(() => setImgVisible(true), 400);

    // テキストフェードアウト開始
    const t1 = setTimeout(() => {
      setAnimClass("phrase-disappear");
      setImgVisible(false);
    }, FADE_IN_MS + hold);

    // 次のフレーズへ
    const t2 = setTimeout(() => {
      if (isLast) {
        handleComplete();
      } else {
        setIdx(i => i + 1);
        setAnimClass("phrase-appear");
      }
    }, FADE_IN_MS + hold + FADE_OUT_MS);

    return () => { clearTimeout(imgTimer); clearTimeout(t1); clearTimeout(t2); };
  }, [idx, overlayDone, handleComplete]);

  const p = phrases[idx];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 背景：花火 */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/street.jpeg" alt="名張の花火" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* ヒーローコンテンツ：イントロ後にフェードイン */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ opacity: heroIn ? 1 : 0, transition: "opacity 2.5s ease-in" }}
      >
        <Link
          href="#stories"
          className="border border-white/60 text-white/80 px-14 py-5 text-sm tracking-[0.4em] hover:bg-white hover:text-black transition-colors duration-500"
        >
          物語を見る
        </Link>
      </div>

      {/* シネマティックイントロオーバーレイ */}
      {!overlayGone && (
        <div
          className="absolute inset-0 z-20 bg-black flex items-center justify-center"
          style={{
            opacity:       overlayDone ? 0 : 1,
            transition:    overlayDone ? "opacity 1.8s ease-out" : "none",
            pointerEvents: overlayDone ? "none" : "auto",
          }}
        >
          {/* 背景写真（薄く） */}
          <div
            className="absolute inset-0"
            style={{
              opacity:    imgVisible ? p.imgOpacity : 0,
              transition: imgVisible
                ? "opacity 2.0s ease-out"
                : "opacity 1.0s ease-in",
            }}
          >
            <Image
              key={p.img}
              src={p.img}
              alt=""
              fill
              className={`object-cover ${p.imgPosition ?? "object-center"}`}
              sizes="100vw"
            />
          </div>

          {/* テキスト */}
          <p
            key={idx}
            className={`${animClass} relative z-10 text-center px-8 leading-loose ${p.cls}`}
          >
            {p.text}
          </p>
        </div>
      )}
    </section>
  );
}
