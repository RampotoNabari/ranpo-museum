"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/** 転——「次は、町を残したい。」 */
export default function Turn() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // コールバック形式のuseTransformでScrollTimeline最適化を避ける
  // （sticky配下の計測ずれ対策）。useSpringと違い遅延を持たない。
  const progress = useTransform(scrollYProgress, (v) => v);
  const y = useTransform(progress, [0, 1], ["-8%", "8%"]);
  const textOpacity = useTransform(progress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[160vh]" aria-label="次は町を残したい">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-[-10%_0]" style={{ y }}>
          <Image
            src="/images/dainisho/town-now.jpg"
            alt="現在の名張の町並み。空へ電線が交差する静かな通り。"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-sumi/60" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <h2 className="serif-display px-6 text-center text-2xl leading-loose tracking-[0.3em] text-washi md:text-4xl">
            次は、<span className="text-copper">町</span>を残したい。
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
