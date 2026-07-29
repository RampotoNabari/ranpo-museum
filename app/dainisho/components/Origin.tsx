"use client";

import Image from "next/image";
import { FadeIn, RevealLines } from "./motion";

/** 「ここが出発点でした。」— 第一章の短い紹介 */
export default function Origin() {
  return (
    <section className="relative bg-sumi" aria-label="第一章">
      {/* ここが出発点でした */}
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-16 px-6 py-40 md:flex-row md:gap-24">
        <FadeIn className="order-2 md:order-1">
          <h2 className="serif-display tategaki mx-auto h-96 text-2xl text-washi md:h-[30rem] md:text-3xl">
            ここが、出発点でした。
          </h2>
        </FadeIn>
        <FadeIn delay={0.3} className="order-1 w-full max-w-xl md:order-2">
          <figure>
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/dainisho/origin-old.jpg"
                alt="かつての桝田医院の前に立つ人々。ここが乱歩の生誕地。"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40rem"
              />
            </div>
            <figcaption className="mt-4 text-xs tracking-widest text-kinari/50">
              名張町新町・旧桝田医院　——　明治二十七年、ここで乱歩は生まれた
            </figcaption>
          </figure>
        </FadeIn>
      </div>

      {/* 第一章のあらすじ */}
      <div className="mx-auto max-w-3xl px-6 pb-32">
        <FadeIn>
          <span className="latin block text-center text-xs tracking-[0.5em] text-copper">
            CHAPTER I
          </span>
          <h3 className="serif-display mt-6 text-center text-xl tracking-[0.3em] text-washi md:text-2xl">
            第一章　生誕地、よみがえる
          </h3>
        </FadeIn>
        <RevealLines
          className="mt-20 space-y-12 text-center"
          lineClassName="text-base leading-loose text-kinari/85 md:text-lg"
          stagger={0.4}
          lines={[
            "二〇二四年、冬。乱歩の生誕地が、売りに出されました。",
            "行政は、動けませんでした。",
            "ひとりの住人が、私費で買い取りました。",
            "そして全国から、物語の仲間が集まりました。",
          ]}
        />
        <FadeIn delay={0.2} className="mt-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <figure className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/dainisho/ceremony.jpg"
                alt="昭和三十年十一月三日、生誕地碑の除幕式。庭に集う人々。"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 32rem"
              />
              <figcaption className="absolute bottom-0 left-0 bg-sumi/70 px-3 py-1 text-[11px] tracking-widest text-kinari/80">
                昭和三十年十一月三日　碑の除幕式
              </figcaption>
            </figure>
            <figure className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/dainisho/ceremony-2025.jpg"
                alt="令和七年十一月三日、碑建立七十周年式典。同じ碑の前に、ふたたび人々が集う。"
                fill
                className="object-cover object-left"
                sizes="(max-width: 768px) 100vw, 32rem"
              />
              <figcaption className="absolute bottom-0 left-0 bg-sumi/70 px-3 py-1 text-[11px] tracking-widest text-kinari/80">
                令和七年十一月三日　同じ日に、ミュージアム開館
              </figcaption>
            </figure>
          </div>
          <p className="mt-8 text-center text-sm leading-loose text-kinari/60">
            碑が建った日から、ちょうど七十年後の同じ日。<br />
            これも、仕組まれた偶然のひとつです。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
