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

/** 一文字ずつ、静かに現れる見出し。 */
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
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          className={lineClassName}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 1.8, delay: i * stagger, ease: EASE }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

export { EASE };
