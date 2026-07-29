"use client";

import Image from "next/image";
import { FadeIn, RevealLines } from "./motion";

/** 未来——百年構想。 */
export default function Future() {
  return (
    <section className="bg-sumi py-40" aria-label="未来">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <FadeIn>
            <figure className="relative aspect-3/4 max-h-[70vh] overflow-hidden">
              <Image
                src="/images/dainisho/festival.jpg"
                alt="夜の祭り。宇流冨志禰神社の境内で獅子が舞う。"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 36rem"
              />
              <div className="absolute inset-0 bg-linear-to-t from-sumi/60 to-transparent" />
            </figure>
          </FadeIn>
          <div>
            <RevealLines
              className="space-y-10"
              lineClassName="text-base leading-loose text-kinari/85 md:text-lg"
              stagger={0.5}
              lines={[
                "この構想は、百年かけて続きます。",
                "私たちが読み終えることは、たぶんありません。",
                "けれど乱歩を取り上げた横山よしへも、日記を残した辻せきも、",
                "自分が第一章だとは知らずに、書き継いでいました。",
              ]}
            />
            <FadeIn delay={0.4} className="mt-14">
              <p className="serif-display text-lg tracking-[0.25em] text-washi md:text-xl">
                物語は、読む人がいる限り終わらない。
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
