"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * 冒頭 300vh のスクロール。
 * 夜の町 →「幾重にも仕組まれた偶然。」→「それを人は運命と呼ぶ。」
 * → 写真が乱歩の路地へ切り替わる。
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // コールバック形式のuseTransformを挟むことでネイティブScrollTimeline最適化を避ける
  // （sticky配下では計測が狂う）。useSpringと違い遅延を持たず、スクロール位置に1:1で追従する。
  const progress = useTransform(scrollYProgress, (v) => v);

  const townScale = useTransform(progress, [0, 1], [1.08, 1.26]);
  const townOpacity = useTransform(progress, [0.58, 0.92], [1, 0]);

  // 2枚目の路地写真は、ぼやけて大きく → 焦点が合って等倍に収まる、という
  // 「像を結んでいく」動きで現れる。字幕2行目の消滅と地続きの、一つの演出。
  const alleyOpacity = useTransform(progress, [0.6, 0.92], [0, 1]);
  const alleyScale = useTransform(progress, [0.6, 0.92], [1.16, 1]);
  const alleyBlurValue = useTransform(progress, [0.6, 0.86], [10, 0]);
  const alleyBlur = useTransform(alleyBlurValue, (v) => `blur(${v}px)`);

  const line1Opacity = useTransform(progress, [0, 0.24, 0.34], [1, 1, 0]);
  const line1Y = useTransform(progress, [0, 0.34], [0, -40]);
  const line2Opacity = useTransform(progress, [0.36, 0.46, 0.56, 0.66], [0, 1, 1, 0]);
  const line2Y = useTransform(progress, [0.36, 0.66], [30, -30]);

  const hintOpacity = useTransform(progress, [0, 0.05], [1, 0]);

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="序章">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 夜の名張 */}
        <motion.div className="absolute inset-0" style={{ scale: townScale, opacity: townOpacity }}>
          <Image
            src="/images/dainisho/hero-hanabi.jpg"
            alt="夜の名張の町並み。花火がひとつ、屋根の上に開いている。"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-sumi/70 via-sumi/30 to-sumi/80" />
        </motion.div>

        {/* 乱歩の路地 */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: alleyOpacity, scale: alleyScale, filter: alleyBlur }}
        >
          <Image
            src="/images/dainisho/fate.jpg"
            alt="名張の路地に立つ江戸川乱歩。昭和二十七年。"
            fill
            className="object-cover object-center grayscale"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-sumi/60 via-transparent to-sumi" />
        </motion.div>

        {/* 言葉 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            className="serif-display absolute px-6 text-center text-2xl leading-relaxed tracking-[0.3em] text-washi md:text-4xl"
            style={{ opacity: line1Opacity, y: line1Y }}
          >
            幾重にも仕組まれた偶然。
          </motion.h2>
          <motion.h2
            className="serif-display absolute px-6 text-center text-2xl leading-relaxed tracking-[0.3em] text-washi md:text-4xl"
            style={{ opacity: line2Opacity, y: line2Y }}
          >
            それを人は<span className="text-copper">運命</span>と呼ぶ。
          </motion.h2>
        </div>

        {/* スクロールの誘い */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: hintOpacity }}
        >
          <span className="latin block text-xs tracking-[0.5em] text-kinari/60">SCROLL</span>
          <motion.span
            className="mx-auto mt-3 block h-10 w-px bg-kinari/40"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
