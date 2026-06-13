import Image from "next/image";
import Link from "next/link";

const generations = [
  { year: "明治27年", name: "横山よしへ", note: "乱歩を取り上げた人" },
  { year: "昭和27年", name: "辻　せき", note: "乱歩の里帰りに立ち会った" },
  { year: "昭和30年", name: "辻　安茂", note: "生誕地碑を建てた" },
  { year: "平成——", name: "辻　敬治", note: "信頼を次代へ渡した" },
  { year: "現在", name: "辻　孝信", note: "解体の危機から再生した" },
];

export default function Home() {
  return (
    <main>
      {/* Hero — 全画面・問い */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/street.jpeg"
            alt="名張の街道"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/62" />
        </div>

        {/* テキスト */}
        <div className="relative z-10 flex flex-col items-center">
          <p className="fade-in text-sm tracking-[0.3em] text-white/80 mb-20">
            明治二十七年　名張　― 百三十年の記憶
          </p>

          <h1 className="fade-in-delay-1 text-4xl md:text-6xl font-light leading-loose tracking-wider text-white mb-28">
            あなたは、
            <br />
            何を未来へ
            <br />
            手渡しますか。
          </h1>

          <p className="fade-in-delay-2 text-sm leading-loose text-white/60 max-w-xs mb-20">
            江戸川乱歩が生まれたこの場所で、
            <br />
            五つの世代が記憶を守り続けてきた。
          </p>

          <div className="fade-in-delay-3 flex flex-col sm:flex-row gap-5">
            <Link
              href="/story"
              className="border border-white/60 text-white/80 px-10 py-4 text-xs tracking-[0.25em] hover:bg-white hover:text-black transition-colors duration-500"
            >
              物語を知る
            </Link>
            <Link
              href="/reserve"
              className="bg-[var(--accent)] text-white px-10 py-4 text-xs tracking-[0.25em] hover:opacity-80 transition-opacity duration-300"
            >
              来館を予約する
            </Link>
          </div>
        </div>

        {/* スクロール案内 */}
        <div className="fade-in-delay-3 absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em]">
          scroll
        </div>
      </section>

      {/* この場所について */}
      <section className="py-32 px-8 bg-[var(--background)]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-14">
            この場所について
          </p>
          <p className="text-lg font-light leading-loose tracking-wide text-[var(--foreground)] mb-10">
            ここは、江戸川乱歩が生まれた場所です。
          </p>
          <p className="text-sm leading-[2.4] text-[var(--muted)] mb-10">
            明治二十七年（一八九四年）、名張の旧桝田医院で
            一人の子どもが産声を上げました。
            その子が後に、日本ミステリー文学の父となる
            江戸川乱歩です。
          </p>
          <p className="text-base leading-loose tracking-wide text-[var(--foreground)]">
            しかし、この場所の物語は
            <br />
            そこで終わりませんでした。
          </p>
        </div>
      </section>

      {/* 五代の継承 */}
      <section className="py-32 px-8 border-t border-[#d4c9b0]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-16 text-center">
            五代の継承
          </p>

          <p className="text-sm leading-[2.4] text-[var(--muted)] text-center mb-20 max-w-lg mx-auto">
            百三十年間、この場所を次の世代へ手渡してきた人々がいます。
            歴史に名を残す偉人ではありません。
            ごく普通の人が、ごく普通ではない決断を積み重ねた記録です。
          </p>

          <div className="space-y-10">
            {generations.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline gap-8 border-b border-[#e8e0d0] pb-10 last:border-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-xs text-[var(--muted)] w-24 shrink-0 tracking-wider">
                  {item.year}
                </span>
                <span className="text-lg tracking-widest font-light">
                  {item.name}
                </span>
                <span className="text-sm text-[var(--muted)] hidden md:block">
                  — {item.note}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-20 border-t border-[#d4c9b0] text-center">
            <p className="text-sm leading-[2.4] text-[var(--muted)] mb-6">
              そして2025年、クラウドファンディングに
              <br />
              <span className="text-[var(--foreground)] text-base">434名</span>
              が応答しました。
            </p>
            <p className="text-xs text-[var(--muted)] tracking-wider">
              目標500万円に対して、12,935,000円が集まりました。
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/story"
              className="text-xs tracking-[0.3em] text-[var(--accent)] border-b border-[var(--accent)] pb-1 hover:opacity-60 transition-opacity"
            >
              五代の物語を読む →
            </Link>
          </div>
        </div>
      </section>

      {/* 乱歩の言葉 */}
      <section className="py-32 px-8 bg-[#1a1a1a] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-white/30 mb-16">
            江戸川乱歩「生誕碑除幕式」より
          </p>
          <blockquote className="text-base md:text-lg font-light leading-[2.8] tracking-wider text-white/80 mb-16">
            「町の人々が、自発的に
            <br className="hidden md:block" />
            六十年もごぶさたしていた私に対して、
            <br className="hidden md:block" />
            こういう好意を見せて下さったのは、
            <br className="hidden md:block" />
            実にありがたいことだと思っている。」
          </blockquote>
          <p className="text-xs text-white/30 tracking-widest mb-4">
            昭和三十一年（一九五六年）
          </p>
          <p className="text-sm text-white/50 leading-loose">
            七十年後の今も、同じことが繰り返されている。
          </p>
        </div>
      </section>

      {/* 推薦の声 */}
      <section className="py-32 px-8 bg-[var(--background)] border-t border-[#d4c9b0]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-20 text-center">
            この場所に、言葉が届いています
          </p>
          <div className="space-y-16">
            {[
              {
                quote:
                  "名張の、江戸川乱歩生誕のあの地に「乱歩の世界観を体験できるミュージアム」を！何という素敵なプロジェクトでしょう。断固、応援いたします。",
                name: "綾辻行人",
                title: "推理小説家",
              },
              {
                quote:
                  "探偵小説の父・江戸川乱歩の生誕地に乱歩作品の世界観を反映したミュージアムができたら、全国のミステリファンのふるさとになるでしょう。名張の夢をまことに。",
                name: "有栖川有栖",
                title: "推理小説家",
              },
              {
                quote:
                  "祖父が七十年ほど前に再発見した自分の生家が、その時にお目にかかった方のご子孫によって買い戻され、保存に向けて動き出したとお聞きして、驚くとともに感動しています。私も応援しています。",
                name: "平井憲太郎",
                title: "江戸川乱歩 令孫",
              },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-[#d4c9b0] pl-8">
                <p className="text-sm leading-[2.4] text-[var(--foreground)] mb-6">
                  「{item.quote}」
                </p>
                <p className="text-xs text-[var(--muted)] tracking-widest">
                  {item.name}　{item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 予約CTA */}
      <section className="py-32 px-8 text-center border-t border-[#d4c9b0]">
        <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">
          予約の瞬間から、展示は始まっている
        </p>
        <p className="text-sm leading-[2.4] text-[var(--muted)] max-w-sm mx-auto mb-16">
          完全予約制。少人数。約九十分。
          <br />
          この場所に宿る記憶の連鎖に、
          <br />
          あなた自身が加わる時間です。
        </p>
        <Link
          href="/reserve"
          className="inline-block bg-[var(--accent)] text-white px-14 py-5 text-xs tracking-[0.3em] hover:opacity-80 transition-opacity duration-300"
        >
          来館を予約する
        </Link>
      </section>

      {/* フッター */}
      <footer className="py-12 px-8 border-t border-[#d4c9b0]">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[var(--muted)] tracking-widest">
            江戸川乱歩生誕地ミュージアム
          </p>
          <div className="flex gap-8 text-xs text-[var(--muted)] tracking-wider">
            <Link href="/story" className="hover:text-[var(--foreground)] transition-colors">物語</Link>
            <Link href="/reserve" className="hover:text-[var(--foreground)] transition-colors">予約</Link>
            <a href="https://www.ranpomuseum.com" className="hover:text-[var(--foreground)] transition-colors">現行サイト</a>
          </div>
          <p className="text-xs text-[var(--muted)]">
            三重県名張市
          </p>
        </div>
      </footer>
    </main>
  );
}
