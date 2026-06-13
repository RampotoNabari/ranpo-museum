import Image from "next/image";

export default function RampoPage() {
  return (
    <main className="min-h-screen">
      {/* ヘッダー */}
      <div className="py-20 px-8 text-center border-b border-[#d4c9b0]">
        <a href="/" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← 戻る
        </a>
        <h1 className="mt-8 text-2xl font-light tracking-widest text-[var(--foreground)]">
          江戸川乱歩と名張
        </h1>
        <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
          生後六ヶ月で離れた土地へ、<br />
          五十七年後に帰ってきた男の物語。
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-20">

        {/* 誕生 */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">明治二十七年（一八九四年）</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            この土地で、最初の息を吸った
          </h2>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              名張市新町の桝田医院。その裏庭に、一軒の借家があった。
              乱歩の父・平井繁男は、郡書記として名張に赴任し、そこに家族と暮らしていた。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              明治二十七年、その借家で一人の男の子が生まれた。
              後に「江戸川乱歩」となる、平井太郎である。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              しかし乱歩は、生後わずか六ヶ月で名張を離れた。
              父の転勤に伴い、家族は津市へ移ったのだ。
              乱歩に、名張の記憶はない。
            </p>
          </div>
        </section>

        {/* 乱歩自身の言葉 */}
        <section className="py-16 px-8 bg-[#1a1a1a] text-center mb-24 -mx-8">
          <p className="text-xs tracking-[0.4em] text-white/30 mb-10">
            江戸川乱歩「ふるさと発見記」より
          </p>
          <blockquote className="text-base font-light leading-[2.8] tracking-wider text-white/80">
            「一度も名張町を訪ねたことがなかった。<br className="hidden md:block" />
            生れた土地を見舞わなかったが、<br className="hidden md:block" />
            自分でもふぎなほどに。」
          </blockquote>
        </section>

        {/* 五十七年後 */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">昭和二十七年（一九五二年）九月</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            五十七年ぶりの帰還
          </h2>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              乱歩が名張へ帰ってきたのは、生まれてから五十七年後のことだった。
              すでに日本ミステリー文学の父として名を馳せた乱歩が、
              初めて生誕地の土を踏んだ。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              名張の人々は乱歩を温かく迎えた。
              町を歩き、旧い家並みを眺め、桝田医院の跡地に立った。
              乱歩はそこで初めて、自分が生まれた場所を「発見」した。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              この訪問の記録を、乱歩は「ふるさと発見記」として後に記している。
              辻家も訪問し、辻せきと対面した。
            </p>
          </div>
        </section>

        {/* 碑の建立 */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">昭和三十年（一九五五年）十一月三日</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            生誕地碑、除幕
          </h2>
          <div className="relative w-full aspect-[4/3] mb-10">
            <Image
              src="/images/monument.png"
              alt="江戸川乱歩生誕地碑"
              fill
              className="object-contain"
            />
          </div>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              乱歩の名張訪問のことを知った町の人々が動いた。
              発起人は書店主・岡村繁次郎を筆頭に、自転車販売店、造り酒屋、旅館の主人、
              桝田医院の院長、地元新聞の編集長など。
              名張市で生業を営む人々が、自発的に碑の建立を計画した。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              乱歩は最初、「医院の邸内に碑を建てるなんてご迷惑な話」と辞退した。
              しかし医院の主も発起人であり、少しも迷惑ではないということで、結局承諾した。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              碑石は名張川の川上から運んだ御影石の自然石。
              表面には「江戸川乱歩生誕地」と縦に彫られ、
              上部には乱歩自身が揮毫した「幻影城」の文字。
              裏面には乱歩が選んだ句が刻まれた。
            </p>
          </div>
        </section>

        {/* 碑の言葉 */}
        <section className="py-16 px-8 border border-[#d4c9b0] text-center mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">碑の裏面に刻まれた言葉</p>
          <blockquote className="text-xl font-light leading-loose tracking-widest text-[var(--foreground)]">
            「うつし世はゆめ、<br />
            よるの夢こそまこと」
          </blockquote>
          <p className="text-xs text-[var(--muted)] mt-6">― 江戸川乱歩</p>
        </section>

        {/* 除幕式 */}
        <section className="mb-24">
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              昭和三十年十一月三日、除幕式が行われた。
              除幕の綱は市長のお嬢さんによって引かれ、
              桝田医師のお嬢さんが乱歩に花束を贈った。
              祝電は九十余通。三重県知事、川崎厚生大臣、
              探偵作家クラブの仲間たちから届いた。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              翌日、乱歩は地元の中学校、警察署、高等学校で探偵小説の講演を行った。
              大講堂一杯の生徒が熱心に聞いた。
            </p>
          </div>
        </section>

        {/* 乱歩の言葉 */}
        <section className="py-16 px-8 bg-[#1a1a1a] text-center mb-24 -mx-8">
          <p className="text-xs tracking-[0.4em] text-white/30 mb-10">
            江戸川乱歩「生誕碑除幕式」『宝石』昭和三十一年一月号
          </p>
          <blockquote className="text-base font-light leading-[2.8] tracking-wider text-white/80 mb-10">
            「町の人々が、自発的に<br className="hidden md:block" />
            六十年もごぶさたしていた私に対して、<br className="hidden md:block" />
            こういう好意を見せて下さったのは、<br className="hidden md:block" />
            実にありがたいことだと思っている。」
          </blockquote>
          <p className="text-xs text-white/40 leading-loose">
            市の企画でも、個人の金持の企画でもなく、<br />
            町の人々が、自発的に。
          </p>
        </section>

        {/* 現在へ */}
        <section className="mb-16">
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            七十年後の今も
          </h2>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              乱歩がその言葉を書いてから七十年。
              2025年、434名がクラウドファンディングに応じ、
              目標の二倍を超える支援が集まった。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              「市の企画でも、個人の金持の企画でもなく、
              町の人々が、自発的に」——
              乱歩が驚いた出来事は、形を変えながら、今も繰り返されている。
            </p>
          </div>
        </section>

      </div>

      {/* CTA */}
      <div className="border-t border-[#d4c9b0] py-24 px-8 text-center">
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
          この場所に受け継がれた記憶を、<br />
          あなた自身が体験できる。
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
          <a href="/story" className="border border-[var(--accent)] text-[var(--accent)] px-10 py-4 text-xs tracking-[0.25em] hover:bg-[var(--accent)] hover:text-white transition-colors duration-300">
            五代の物語を読む
          </a>
          <a href="/reserve" className="bg-[var(--accent)] text-white px-10 py-4 text-xs tracking-[0.25em] hover:opacity-80 transition-opacity duration-300">
            来館を予約する
          </a>
        </div>
      </div>

      <footer className="py-8 px-8 border-t border-[#d4c9b0] text-center">
        <p className="text-xs text-[var(--muted)] tracking-widest">
          江戸川乱歩生誕地ミュージアム ― 名張
        </p>
      </footer>
    </main>
  );
}
