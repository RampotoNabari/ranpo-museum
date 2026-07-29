"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FadeIn } from "./motion";

const EVENTS = [
  { year: "明治二十七年", ad: "1894", text: "乱歩、名張に生まれる。" },
  { year: "昭和二十七年", ad: "1952", text: "五十八年ぶりの帰郷。町は太鼓の音の中にあった。" },
  { year: "昭和三十年", ad: "1955", text: "生誕地碑、除幕。文化の日、祭りの日。" },
  { year: "令和七年", ad: "2025", text: "生家が解体の危機を越え、ミュージアムとして開館。" },
  { year: "令和八年", ad: "2026", text: "第二章。空き家に、白梅軒の灯りがともる。" },
  { year: "生誕二百年", ad: "2094", text: "町全体が、ひとつの物語になっている。" },
];

/** 堆積した時間を、一本の銅の線でたどる。 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  return (
    <section ref={ref} className="bg-sumi py-40" aria-label="時間軸">
      <FadeIn>
        <p className="text-center text-sm tracking-[0.4em] text-kinari/60">
          百三十年の堆積の上に、いまがあります。
        </p>
      </FadeIn>
      <div className="relative mx-auto mt-24 max-w-3xl px-6">
        {/* 銅の線 */}
        <motion.div
          className="absolute left-6 top-0 h-full w-px bg-copper/70 md:left-1/2"
          style={{ scaleY: lineScale, transformOrigin: "top" }}
        />
        <div className="space-y-24">
          {EVENTS.map((e, i) => (
            <FadeIn key={e.ad} delay={0.1}>
              <div
                className={`relative flex flex-col gap-2 pl-16 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pl-0 md:pr-16 md:text-right"
                    : "md:ml-auto"
                }`}
              >
                <span
                  className={`absolute left-6 top-2 h-2 w-2 -translate-x-1/2 rounded-full ${
                    i % 2 === 0
                      ? "md:left-auto md:right-0 md:translate-x-1/2"
                      : "md:left-0 md:-translate-x-1/2"
                  } ${e.ad === "2026" ? "bg-aka" : "bg-copper"}`}
                />
                <span className="latin text-xs tracking-[0.4em] text-copper">{e.ad}</span>
                <h3 className="serif-display text-lg tracking-[0.2em] text-washi">{e.year}</h3>
                <p className="text-sm leading-loose text-kinari/70">{e.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
