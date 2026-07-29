import Link from "next/link";
import CinematicHero from "./components/CinematicHero";

const chapters = [
  {
    href: "/nabari",
    year: "昭和二十七年",
    title: "ふるさと発見",
    note: "乱歩、名張へ帰る",
    image: "/images/street.jpeg",
    available: true,
  },
  {
    href: "/seki",
    year: "明治〜昭和三十年",
    title: "せきの日記",
    note: "日記が語るせきの生涯",
    image: "/images/seki-diary.jpeg",
    available: true,
  },
  {
    href: "/unveiling",
    year: "昭和三十年　十一月三日",
    title: "生誕碑除幕式",
    note: "あの日、名張に乱歩が来た",
    image: "/images/ceremony-wide.jpg",
    available: false,
  },
  {
    href: "/yokoyama",
    year: "明治二十七年以前",
    title: "横山文圭・よしへ",
    note: "この地の歴史を紐解く",
    image: "/images/nabari-shrine-day.jpeg",
    available: false,
  },
  {
    href: "/museum",
    year: "現在、そして未来へ",
    title: "生誕地ミュージアム",
    note: "孝信、土地を取得する",
    image: "/images/ranpo-monument.jpg",
    available: false,
  },
];

export default function Home() {

  return (
    <main>
      <CinematicHero />


      {/* 物語への入口 */}
      <section id="stories" className="bg-[#0a0a0a] py-8 px-8 md:px-20">
        <p className="text-xs tracking-[0.5em] text-white/20 text-center mb-16">
          どこからでも、物語に入ることができます
        </p>
        <div className="max-w-4xl mx-auto">
          {chapters.map((chapter, i) => (
            <Link
              key={i}
              href={chapter.href}
              className="group flex items-center gap-8 md:gap-16 py-10 border-t border-white/8 last:border-b hover:bg-white/3 transition-all duration-500 px-4 -mx-4"
            >
              <span className="text-4xl md:text-5xl font-light text-white/10 group-hover:text-white/30 transition-colors duration-500 w-12 shrink-0 text-center">
                {["一","二","三","四","五"][i]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors duration-500 mb-3">
                  {chapter.year}
                </p>
                <h3 className="text-2xl md:text-3xl font-light tracking-[0.15em] text-white/50 group-hover:text-white transition-colors duration-500">
                  {chapter.title}
                </h3>
              </div>
              <p className="text-xs tracking-wider text-white/20 group-hover:text-white/50 transition-colors duration-500 hidden md:block text-right shrink-0 max-w-[140px]">
                {chapter.note}
              </p>
              <span className="text-white/10 group-hover:text-white/60 transition-colors duration-500 shrink-0 text-lg">
                →
              </span>
            </Link>
          ))}
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
