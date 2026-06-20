import Image from "next/image";
import Link from "next/link";

const chapters = [
  {
    number: "一",
    year: "昭和二十七年　九月二十六・二十七日",
    title: "ふるさと発見",
    subtitle: "乱歩、名張へ帰る",
    description: "五十八年ぶりに、乱歩は生まれた町へ戻った。\nせきは、その日を待ち続けていた。",
    href: "/nabari",
    image: "/images/street.jpeg",
    available: true,
  },
  {
    number: "二",
    year: "明治二十七年〜昭和三十二年",
    title: "せきの日記",
    subtitle: "日記が語るせきの生涯",
    description: "「八十八の手習の。日記のさまを、誰か読むべき」\n昭和三十年、八十八歳のせきが書き綴った記憶。",
    href: "/seki",
    image: "/images/seki-diary.jpeg",
    available: false,
  },
  {
    number: "三",
    year: "昭和三十年　十一月三日",
    title: "生誕碑除幕式",
    subtitle: "あの日、名張に乱歩が来た",
    description: "足が悪いせきは式に行けなかった。\n式が終わると、大勢が辻家へ会いに来た。",
    href: "/unveiling",
    image: "/images/ceremony-wide.jpg",
    available: false,
  },
  {
    number: "四",
    year: "明治二十七年以前",
    title: "横山文圭・よしえ",
    subtitle: "この地の歴史を紐解く",
    description: "よしえは乱歩を取り上げた。\nその娘せきが、すべての物語をつないでいく。",
    href: "/yokoyama",
    image: "/images/nabari-shrine-day.jpeg",
    available: false,
  },
  {
    number: "五",
    year: "現在、そして未来へ",
    title: "生誕地ミュージアム",
    subtitle: "孝信、土地を取得する",
    description: "百三十年を経て、生誕地の土地は再び辻家へ戻った。\n記憶の連鎖は、今も続いている。",
    href: "/museum",
    image: "/images/ranpo-monument.jpg",
    available: false,
  },
];

export default function StoriesPage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {chapters.map((chapter, i) => (
        <section
          key={i}
          className="relative h-screen snap-start flex flex-col items-center justify-center px-8 text-center overflow-hidden"
        >
          {/* 背景 */}
          <div className="absolute inset-0 z-0">
            <Image
              src={chapter.image}
              alt={chapter.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 flex flex-col items-center max-w-lg">
            <p className="text-xs tracking-[0.6em] text-white/30 mb-6">
              第{chapter.number}章
            </p>
            <p className="text-xs tracking-[0.4em] text-white/40 mb-10">
              {chapter.year}
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white mb-6">
              {chapter.title}
            </h2>
            <p className="text-sm tracking-widest text-white/50 mb-12">
              {chapter.subtitle}
            </p>
            <p className="text-sm leading-[2.4] text-white/40 mb-16 whitespace-pre-line">
              {chapter.description}
            </p>

            {chapter.available ? (
              <Link
                href={chapter.href}
                className="border border-white/50 text-white/80 px-10 py-4 text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-colors duration-500"
              >
                この物語を見る
              </Link>
            ) : (
              <p className="text-xs tracking-[0.4em] text-white/20">
                準備中
              </p>
            )}
          </div>

          {/* ページ番号 */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {chapters.map((_, j) => (
                <span
                  key={j}
                  className={`block w-1 h-1 rounded-full ${i === j ? "bg-white/60" : "bg-white/15"}`}
                />
              ))}
            </div>
            {i < chapters.length - 1 && (
              <p className="text-white/20 text-xs tracking-[0.3em]">scroll</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
