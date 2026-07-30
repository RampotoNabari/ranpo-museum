"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** ゆっくり立ち上がるフェードイン。物語の基本の呼吸。 */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  duration = 1.6,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-15% 0px -15% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 一行ずつ、上から順に静かに現れる見出し。
 * 各行が個別に画面入りを判定すると、スクロール速度によって
 * 出現順が乱れる（速く読める行が先に出る等）。親コンテナ1つの
 * 表示判定を基準に、Framer MotionのstaggerChildrenで配る。
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.9,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <p key={i} className={lineClassName}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.8, ease: EASE } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      variants={container}
    >
      {lines.map((line, i) => (
        <motion.p key={i} className={lineClassName} variants={item}>
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}

export { EASE };
