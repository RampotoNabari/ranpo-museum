"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { FadeIn } from "./motion";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 2.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="latin text-6xl font-light tracking-wider text-washi md:text-7xl">
      {reduce ? to : value}
      <span className="serif-display ml-1 text-xl text-copper md:text-2xl">{suffix}</span>
    </span>
  );
}

/** 全国から名張へ、細い糸が集まる地図。 */
function JapanMap() {
  const dots: [number, number][] = [
    // 北海道
    [286, 58], [306, 52], [322, 66], [300, 78], [284, 84], [316, 88],
    // 東北
    [284, 118], [278, 140], [272, 160], [266, 180], [260, 200],
    // 関東
    [254, 214], [265, 221], [257, 232],
    // 中部
    [240, 224], [228, 234], [214, 240], [229, 250],
    // 関西
    [201, 254], [189, 264],
    // 中国
    [168, 258], [152, 263], [136, 268], [121, 273],
    // 四国
    [159, 289], [143, 294], [172, 294],
    // 九州
    [105, 288], [94, 304], [104, 318], [89, 320], [99, 334],
    // 沖縄
    [54, 398], [45, 412],
  ];
  const nabari: [number, number] = [197, 270];
  const threads: [number, number][] = [
    [300, 78], [272, 160], [257, 232], [228, 234],
    [136, 268], [143, 294], [94, 304], [54, 398],
  ];

  return (
    <svg
      viewBox="0 0 400 460"
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="全国各地から名張へ支援が集まったことを示す地図"
    >
      {threads.map(([x, y], i) => (
        <motion.path
          key={`t${i}`}
          d={`M ${x} ${y} Q ${(x + nabari[0]) / 2} ${Math.min(y, nabari[1]) - 30} ${nabari[0]} ${nabari[1]}`}
          fill="none"
          stroke="var(--copper)"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 2.4, delay: 0.4 + i * 0.25, ease: "easeInOut" }}
        />
      ))}
      {dots.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="2.4"
          fill="var(--kinari)"
          fillOpacity="0.55"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, delay: i * 0.05 }}
        />
      ))}
      {/* 名張 */}
      <circle cx={nabari[0]} cy={nabari[1]} r="4" fill="var(--aka)" />
      <circle cx={nabari[0]} cy={nabari[1]} r="4" fill="none" stroke="var(--aka)" className="ripple" />
      <text
        x={nabari[0] + 12}
        y={nabari[1] + 24}
        fill="var(--kinari)"
        fillOpacity="0.8"
        fontSize="13"
        letterSpacing="4"
      >
        名張
      </text>
    </svg>
  );
}

/** 第一章がのこした数字。 */
export default function Numbers() {
  const stats = [
    { to: 430, suffix: "人", label: "全国から集まった支援者" },
    { to: 500, suffix: "人", label: "開館から迎えた来館者" },
    { to: 80, suffix: "%", label: "名張の外から訪れた人" },
  ];

  return (
    <section className="bg-sumi py-40" aria-label="第一章の数字">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.4em] text-kinari/60">
            物語は、数字になりました。
          </p>
        </FadeIn>
        <div className="mt-24 grid grid-cols-1 gap-20 text-center md:grid-cols-3">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.25}>
              <Counter to={s.to} suffix={s.suffix} />
              <p className="mt-6 text-xs tracking-[0.3em] text-kinari/60">{s.label}</p>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3} className="mt-32">
          <JapanMap />
          <p className="mt-10 text-center text-sm leading-loose text-kinari/60">
            旅人は、偶然この町に着いたと思っています。<br />
            けれど糸は、ずっと前から張られていました。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
