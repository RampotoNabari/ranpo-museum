"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FadeIn } from "./motion";

// TODO: クラウドファンディング公開時に実URLへ差し替え
const SUPPORT_URL = "https://www.ranpomuseum.com";

/** 結——「あなたも、この物語の続きを歩きませんか。」 */
export default function Ending() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // spring経由でScrollTimeline最適化を避ける
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const bgOpacity = useTransform(progress, [0, 0.6], [0, 0.35]);

  return (
    <section ref={ref} className="relative bg-sumi" aria-label="結び">
      {/* 遠くに灯る町 */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: bgOpacity }}>
        <Image
          src="/images/dainisho/lamp.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-sumi/70" />
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-48 text-center">
        <FadeIn duration={2.2}>
          <h2 className="serif-display text-xl leading-[2.6] tracking-[0.25em] text-washi md:text-3xl md:leading-[2.4]">
            あなたも、この物語の
            <br />
            続きを歩きませんか。
          </h2>
        </FadeIn>

        <FadeIn delay={0.8} className="mt-20">
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block border border-copper/70 px-14 py-5 text-sm tracking-[0.4em] text-kinari transition-colors duration-700 hover:border-aka hover:text-washi focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            物語の続きを支える
            <span className="mt-1 block text-[10px] tracking-[0.3em] text-copper transition-colors duration-700 group-hover:text-aka">
              SUPPORT THE STORY
            </span>
          </a>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-40">
          <p className="serif-display text-base tracking-[0.35em] text-kinari/80 md:text-lg">
            『乱歩と名張　第二章』
          </p>
          <motion.p
            className="serif-display mt-10 text-sm tracking-[0.6em] text-kinari/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 1.6, ease: "easeOut" }}
          >
            つづく
          </motion.p>
        </FadeIn>
      </div>

      <footer className="relative border-t border-kinari/10 py-10 text-center">
        <p className="latin text-[10px] tracking-[0.4em] text-kinari/40">
          RANPO &amp; NABARI — A HUNDRED-YEAR STORY
        </p>
        <p className="mt-2 text-[10px] tracking-[0.3em] text-kinari/40">
          江戸川乱歩生誕地ミュージアム
        </p>
      </footer>
    </section>
  );
}
