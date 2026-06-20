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
        <section className="mb-16">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">昭和二十七年（一九五二年）九月</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            五十七年ぶりの帰還
          </h2>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6 mb-12">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              乱歩が名張へ帰ってきたのは、生まれてから五十七年後のことだった。
              すでに日本ミステリー文学の父として名を馳せた乱歩が、
              初めて生誕地の土を踏んだ。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              名張の人々は乱歩を温かく迎えた。
              町を歩き、旧い家並みを眺め、桝田医院の跡地に立った。
              辻家も訪問し、辻せきと対面した。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-alley.jpg" alt="路地に立つ乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-roof.jpg" alt="屋根を見上げる乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image src="/images/rampo-clinic.jpg" alt="桝田医院前の乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image src="/images/rampo-river.jpg" alt="名張川のほとりの乱歩" fill className="object-cover" />
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] text-center mb-24">昭和二十七年九月、五十七年ぶりの名張</p>
        </section>

        {/* 碑の建立 */}
        <section className="mb-16">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">昭和三十年（一九五五年）十一月三日</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            生誕地碑、除幕
          </h2>
          <div className="relative w-full aspect-[4/3] mb-10 overflow-hidden">
            <Image src="/images/monument.png" alt="江戸川乱歩生誕地碑" fill className="object-contain" />
          </div>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6 mb-12">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              乱歩の名張訪問のことを知った町の人々が動いた。
              発起人は書店主・岡村繁次郎を筆頭に、自転車販売店、造り酒屋、旅館の主人、
              桝田医院の院長、地元新聞の編集長など。
              名張市で生業を営む人々が、自発的に碑の建立を計画した。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              碑石は名張川の川上から運んだ御影石の自然石。
              表面には「江戸川乱歩生誕地」と縦に彫られ、
              上部には乱歩自身が揮毫した「幻影城」の文字。
              裏面には乱歩が選んだ句が刻まれた。
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] overflow-hidden mb-2">
            <Image src="/images/ceremony-wide.jpg" alt="除幕式の全景" fill className="object-cover" />
          </div>
          <p className="text-xs text-[var(--muted)] text-center mb-4">除幕式全景。日本探偵作家クラブ、東京作家クラブから花輪が届いた</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/ceremony-group.jpeg" alt="除幕式の集合写真" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-laughing.jpg" alt="除幕式で笑う乱歩" fill className="object-cover" />
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] text-center mb-4">碑の前で。右は宴席で大笑いする乱歩</p>
          <div className="relative w-full aspect-[3/4] overflow-hidden mb-12">
            <Image src="/images/rampo-meal.jpg" alt="宴席の乱歩" fill className="object-cover" />
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
        </section>

        {/* 講演 */}
        <section className="mb-16">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">昭和三十年十一月四日</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            名張の子どもたちへ
          </h2>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6 mb-12">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              翌日、乱歩は地元の中学校、警察署、高等学校で探偵小説の講演を行った。
              大講堂一杯の生徒が熱心に聞いた。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-lecture.jpeg" alt="講演する乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-kids.jpeg" alt="子どもたちへの講演" fill className="object-cover" />
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] text-center mb-24">名張の学校での講演めぐり</p>
        </section>

        {/* 香落渓 */}
        <section className="mb-16">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">昭和三十年十一月五日</p>
          <h2 className="text-xl font-light tracking-wider text-[var(--foreground)] mb-10">
            香落渓、そして帰路へ
          </h2>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6 mb-12">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              最終日、乱歩夫妻は香落渓を訪れた。
              16ミリカメラを手に、名張の山と渓谷を記録した。
              これが乱歩の名張最後の記憶となった。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-kaouchi-1.jpeg" alt="香落渓の乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-kaouchi-2.jpeg" alt="香落渓の乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-filming.jpg" alt="16ミリカメラで撮影する乱歩" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image src="/images/rampo-kaouchi-color.jpeg" alt="香落渓にて" fill className="object-cover" />
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] text-center mb-8">香落渓にて。このあと乱歩夫妻は帰路についた</p>
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
          乱歩と名張
        </p>
      </footer>
    </main>
  );
}
