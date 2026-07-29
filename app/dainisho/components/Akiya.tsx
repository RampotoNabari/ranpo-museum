"use client";

import Image from "next/image";
import { FadeIn, RevealLines } from "./motion";

/** 空き家——静かに主を失っていく家々。 */
export default function Akiya() {
  return (
    <section className="bg-sumi py-40" aria-label="空き家">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-5">
          <FadeIn className="md:col-span-3">
            <figure className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/dainisho/akiya.jpg"
                alt="窓を閉ざしたままの空き家。名張の町なか。"
                fill
                className="object-cover saturate-50"
                sizes="(max-width: 768px) 100vw, 48rem"
              />
              <div className="absolute inset-0 bg-linear-to-t from-sumi/50 to-transparent" />
            </figure>
          </FadeIn>
          <div className="md:col-span-2">
            <RevealLines
              className="space-y-10"
              lineClassName="text-base leading-loose text-kinari/85 md:text-lg"
              stagger={0.5}
              lines={[
                "町を歩くと、灯りの消えた家に出会います。",
                "一軒、また一軒。",
                "家が閉じるたび、物語がひとつ、読めなくなっていきます。",
              ]}
            />
          </div>
        </div>

        <FadeIn delay={0.2} className="mt-24">
          <figure className="relative mx-auto aspect-video max-w-4xl overflow-hidden">
            <Image
              src="/images/dainisho/machiya.jpg"
              alt="格子と虫籠窓の残る町家。江戸の面影をとどめる建物。"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 56rem"
            />
          </figure>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-loose text-kinari/60">
            町は、一日でできたのではありません。<br />
            一軒一軒、人が暮らし、物語が堆積して、町になりました。<br />
            だから、町を残すことも——一軒一軒です。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
