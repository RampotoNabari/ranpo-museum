"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

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
  // useSpringを通すことでネイティブScrollTimeline最適化を避ける
  // （sticky配下では計測が狂う）。滑らかな追従も兼ねる。
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  const townScale = useTransform(progress, [0, 1], [1.08, 1.22]);
  const townOpacity = useTransform(progress, [0.55, 0.8], [1, 0]);
  const alleyOpacity = useTransform(progress, [0.6, 0.85], [0, 1]);

  const line1Opacity = useTransform(progress, [0, 0.24, 0.34], [1, 1, 0]);
  const line1Y = useTransform(progress, [0, 0.34], [0, -40]);
  const line2Opacity = useTransform(progress, [0.36, 0.46, 0.6, 0.7], [0, 1, 1, 0]);
  const line2Y = useTransform(progress, [0.36, 0.7], [30, -30]);

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
        <motion.div className="absolute inset-0" style={{ opacity: alleyOpacity }}>
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
