"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * 冒頭は自動再生する映画的シークエンス（スクロール不要）。
 * 夜の町 →「幾重にも仕組まれた偶然。」→「それを人は運命と呼ぶ。」
 * → 乱歩の路地が、像を結ぶように現れる。
 */
// Opening（題字）が表示・退場し終わるまでの時間（Opening.tsx: 3.4s表示 + 1.4sフェード）。
// Heroのタイマーは題字の裏で同時に進むため、これだけ後ろにずらして開始する。
const INTRO_DELAY = 4.6;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-screen overflow-hidden" aria-label="序章">
      {/* 夜の名張 */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08, opacity: 1 }}
        animate={reduce ? { opacity: 0 } : { scale: 1.26, opacity: 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                scale: { duration: 11, ease: "linear" },
                opacity: { duration: 2.4, delay: INTRO_DELAY + 7.8, ease: "easeInOut" },
              }
        }
      >
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

      {/* 乱歩の路地——ぼやけて大きく現れ、像を結んでいく */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, scale: 1.16, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={
          reduce ? { duration: 0 } : { duration: 3.4, delay: INTRO_DELAY + 7.6, ease: "easeOut" }
        }
      >
        <Image
          src="/images/dainisho/fate.jpg"
          alt="生誕地跡に立つ江戸川乱歩。昭和二十七年、名張にて。"
          fill
          className="object-cover object-center grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-sumi/60 via-transparent to-sumi" />
      </motion.div>

      {/* 写真のキャプション——像が結び終わる頃に、静かに添える */}
      <motion.p
        className="absolute bottom-32 left-6 text-sm tracking-[0.25em] text-kinari/90 md:left-10 md:text-base"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduce ? { duration: 0 } : { duration: 1.8, delay: INTRO_DELAY + 10.6, ease: "easeInOut" }
        }
      >
        生誕地跡に立つ乱歩　——　昭和二十七年
      </motion.p>

      {/* 言葉 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h2
          className="serif-display absolute px-6 text-center text-2xl leading-relaxed tracking-[0.3em] text-washi md:text-4xl"
          initial={reduce ? false : { opacity: 0, y: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 1, 0], y: [0, 0, 0, -40] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 3.6, times: [0, 0.2, 0.75, 1], delay: INTRO_DELAY + 0.6, ease: "easeInOut" }
          }
        >
          幾重にも仕組まれた偶然。
        </motion.h2>
        <motion.h2
          className="serif-display absolute px-6 text-center text-2xl leading-relaxed tracking-[0.3em] text-washi md:text-4xl"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={reduce ? { opacity: 0 } : { opacity: [0, 1, 1, 0], y: [30, 0, 0, -30] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 3.6, times: [0, 0.2, 0.75, 1], delay: INTRO_DELAY + 4.4, ease: "easeInOut" }
          }
        >
          人はそれを<span className="text-copper">運命</span>と呼ぶ。
        </motion.h2>
      </div>

      {/* スクロールの誘い（自動再生が一段落したところで現れる） */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.6, delay: INTRO_DELAY + 11.4 }}
      >
        <span className="latin block text-xs tracking-[0.5em] text-kinari/60">SCROLL</span>
        <motion.span
          className="mx-auto mt-3 block h-10 w-px bg-kinari/40"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
