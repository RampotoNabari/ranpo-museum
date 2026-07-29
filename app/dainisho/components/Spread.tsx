"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** 「乱歩の世界は、町へ広がる。」路地の奥へ引き込まれる。 */
export default function Spread() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // spring経由でScrollTimeline最適化を避ける（sticky配下の計測ずれ対策）
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const scale = useTransform(progress, [0, 1], [1, 1.25]);
  const textOpacity = useTransform(progress, [0.3, 0.45, 0.65, 0.8], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[180vh]" aria-label="乱歩の世界は町へ広がる">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src="/images/dainisho/alley2.jpg"
            alt="板塀にはさまれた名張の細い路地。奥に光が差す。"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-sumi/55" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <h2 className="serif-display tategaki h-[60vh] text-2xl tracking-[0.35em] text-washi md:text-3xl">
            乱歩の世界は、町へ広がる。
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
