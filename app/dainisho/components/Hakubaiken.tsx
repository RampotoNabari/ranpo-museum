"use client";

import Image from "next/image";
import { FadeIn, RevealLines } from "./motion";

/** 白梅軒——小説の中の喫茶店が、現実の町に灯る。 */
export default function Hakubaiken() {
  return (
    <section className="relative bg-fukamidori/20 py-40" aria-label="白梅軒">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <span className="latin block text-center text-xs tracking-[0.5em] text-copper">
            CHAPTER II
          </span>
          <h2 className="serif-display mt-6 text-center text-2xl tracking-[0.35em] text-washi md:text-3xl">
            第二章　白梅軒
          </h2>
        </FadeIn>

        <RevealLines
          className="mt-20 space-y-12 text-center"
          lineClassName="text-base leading-loose text-kinari/85 md:text-lg"
          stagger={0.5}
          lines={[
            "『Ｄ坂の殺人事件』。明智小五郎が初めて登場する物語は、",
            "一軒の喫茶店から始まります。その名は——白梅軒。",
            "紙の上にしかなかったその店を、名張の空き家にひらきます。",
          ]}
        />

        <FadeIn delay={0.3} className="mt-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <figure className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/dainisho/hakubaiken-ie.jpg"
                alt="白梅軒の予定地。格子戸と虫籠窓の残る古い家が、静かに主を待っている。"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 36rem"
              />
            </figure>
            <figure className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/dainisho/hakubaiken-mado.jpg"
                alt="ミュージアムの窓から見た白梅軒の予定地。通りをはさんで、真正面。"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 36rem"
              />
            </figure>
          </div>
          <p className="mt-6 text-right text-[11px] tracking-[0.3em] text-kinari/40">
            ——この家が、白梅軒になります。ミュージアムの窓の、真正面。
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16">
          <p className="text-center text-sm leading-loose text-kinari/70">
            珈琲を一杯たのむと、あなたは物語の登場人物になります。<br />
            窓の外の路地を、明智小五郎が歩いていくかもしれません。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
