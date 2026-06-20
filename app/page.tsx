"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const chapters = [
  {
    href: "/nabari",
    year: "昭和二十七年",
    title: "ふるさと発見",
    note: "乱歩、名張へ帰る",
    available: true,
  },
  {
    href: "/seki",
    year: "明治〜昭和三十年",
    title: "せきの日記",
    note: "日記が語るせきの生涯",
    available: false,
  },
  {
    href: "/unveiling",
    year: "昭和三十年　十一月三日",
    title: "生誕碑除幕式",
    note: "あの日、名張に乱歩が来た",
    available: false,
  },
  {
    href: "/yokoyama",
    year: "明治二十七年以前",
    title: "横山文圭・よしえ",
    note: "この地の歴史を紐解く",
    available: false,
  },
  {
    href: "/museum",
    year: "現在、そして未来へ",
    title: "生誕地ミュージアム",
    note: "孝信、土地を取得する",
    available: false,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = heroRef.current;
      if (!target) return;
      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + start;
      const duration = 12000;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
        window.scrollTo(0, start + (end - start) * ease);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 8500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* せきの言葉 */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center bg-black overflow-hidden">
        <div className="flex flex-col items-center gap-2">
          <p className="rise-1 text-xl md:text-2xl font-light leading-loose tracking-widest text-white/50">
            八十八の手習の
          </p>
          <p className="rise-2 text-xl md:text-2xl font-light leading-loose tracking-widest text-white/50">
            日記のさまを
          </p>
          <p className="rise-3 text-xl md:text-2xl font-light leading-loose tracking-widest text-white/50 mb-8">
            誰か読むべき
          </p>
          <p className="rise-4 text-3xl md:text-4xl tracking-[0.4em] text-white/85 mb-8">
            辻せき
          </p>
          <div className="flex flex-col items-center text-[#c0392b] text-base tracking-[0.25em]">
            <p className="rise-5">慶応三年十二月二十一日</p>
            <p className="rise-6 text-2xl leading-none my-2">|</p>
            <p className="rise-7">昭和三十二年八月二十四日</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] rise-7">
          scroll
        </div>
      </section>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/street.jpeg"
            alt="名張の街道"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="fade-in text-4xl md:text-6xl font-light leading-loose tracking-wider text-white mb-28">
            あなたは未来へ、
            <br />
            何を手渡しますか。
          </h1>

          <p className="fade-in-delay-1 text-sm leading-loose text-white/50 max-w-xs mb-20">
            江戸川乱歩が生まれたこの場所で、
            <br />
            辻せきの日記が語る百三十年の記憶。
          </p>

          <div className="fade-in-delay-2">
            <Link
              href="/stories"
              className="border border-white/60 text-white/80 px-10 py-4 text-xs tracking-[0.25em] hover:bg-white hover:text-black transition-colors duration-500"
            >
              物語を見る
            </Link>
          </div>
        </div>

        <div className="fade-in-delay-3 absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em]">
          scroll
        </div>
      </section>

      {/* 物語への入口 */}
      <section id="stories" className="py-32 px-8 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.5em] text-[var(--muted)] mb-6 text-center">
            乱歩と名張
          </p>
          <p className="text-xs tracking-[0.3em] text-[var(--muted)]/60 mb-20 text-center">
            どこからでも、物語に入ることができます
          </p>

          <div className="space-y-0">
            {chapters.map((chapter, i) => (
              chapter.available ? (
                <Link
                  key={i}
                  href={chapter.href}
                  className="group flex items-baseline gap-8 py-10 border-b border-[#e8e0d0] first:border-t hover:opacity-70 transition-opacity duration-300"
                >
                  <span className="text-xs text-[var(--muted)] w-40 shrink-0 tracking-wider">
                    {chapter.year}
                  </span>
                  <span className="text-xl tracking-widest font-light">
                    {chapter.title}
                  </span>
                  <span className="text-sm text-[var(--muted)] hidden md:block ml-auto">
                    {chapter.note}　→
                  </span>
                </Link>
              ) : (
                <div
                  key={i}
                  className="flex items-baseline gap-8 py-10 border-b border-[#e8e0d0] first:border-t opacity-35"
                >
                  <span className="text-xs text-[var(--muted)] w-40 shrink-0 tracking-wider">
                    {chapter.year}
                  </span>
                  <span className="text-xl tracking-widest font-light">
                    {chapter.title}
                  </span>
                  <span className="text-xs text-[var(--muted)] hidden md:block ml-auto tracking-wider">
                    準備中
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 乱歩の言葉 */}
      <section className="py-40 px-8 bg-[#1a1a1a] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-white/30 mb-20">
            江戸川乱歩　生誕碑除幕式にて
          </p>
          <blockquote className="text-base md:text-xl font-light leading-[3] tracking-wider text-white/80 mb-20">
            「町の人々が、自発的に
            <br />
            六十年もごぶさたしていた私に対して、
            <br />
            こういう好意を見せて下さったのは、
            <br />
            実にありがたいことだと思っている。」
          </blockquote>
          <p className="text-xs text-white/25 tracking-widest mb-6">
            昭和三十年　十一月三日
          </p>
          <p className="text-sm text-white/40 leading-loose">
            その日、辻せきは足が悪く式には行けなかった。
            <br />
            式が終わると、大勢が辻家へ会いに来た。
          </p>
        </div>
      </section>


      {/* フッター */}
      <footer className="py-12 px-8 border-t border-[#d4c9b0]">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[var(--muted)] tracking-widest">
            乱歩と名張
          </p>
          <div className="flex gap-8 text-xs text-[var(--muted)] tracking-wider">
            <Link href="/nabari" className="hover:text-[var(--foreground)] transition-colors">ふるさと発見</Link>
            <a href="https://www.ranpomuseum.com" className="hover:text-[var(--foreground)] transition-colors">ミュージアム</a>
          </div>
          <p className="text-xs text-[var(--muted)]">
            三重県名張市
          </p>
        </div>
      </footer>
    </main>
  );
}
