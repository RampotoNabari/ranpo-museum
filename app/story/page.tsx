const generations = [
  {
    number: "一",
    year: "明治27年（1894年）",
    name: "横山よしへ",
    role: "乱歩を取り上げた人",
    story: `乱歩の父・平井繁男は、名張で横山文圭の借家に住んでいた。横山よしへは、その家主の妻だった。\n\n明治二十七年、母・きくのお産で近所は大騒ぎになった。予定していた産婆が他のお産で間に合わなかった。よしへが、産婆の代わりに乱歩を取り上げた。\n\n乱歩は生後半年余りで、父の転勤とともに名張を離れた。乱歩に、名張の記憶はない。\n\nそれでも、この土地は乱歩が最初に息を吸った場所だ。よしへだけが、その瞬間を知っていた。\n\nよしへには、娘がいた。名を、せきという。`,
  },
  {
    number: "二",
    year: "昭和27年（1952年）",
    name: "辻　せき",
    role: "乱歩と対面した人",
    story: `せきは、横山よしへの娘である。\n\n明治二十七年、乱歩が生まれる半年ほど前、せきはすでに次女・ちかを産んでいた。乱歩の母・きくとせきは、同じ時期に赤ちゃんを持つ母同士として、親しく行き来していた。せきは、きくが乱歩に乳を与える姿を、間近で見ていた。\n\nその赤ちゃんが名張を去って、六十年が流れた。\n\nせきは辻愛之助の妻となり、新町173番地に移り住んだ。夫とともに辻酒店を営み、米焼酎を造った。その家は、乱歩が生まれた横山家の借家から、わずか五十メートルの場所だった。\n\n慶応三年（1867年）十二月二十一日生まれのせきは、昭和二十七年の秋、八十四歳になっていた。中風で半身不随となり、酒屋の離れ座敷に床を敷いて療養していた。上半身は達者で、頭もしっかりしていた。動かない足の代わりに、せきは手を動かし続けた。厚紙を芯に、布と綿で肉付けして立体に仕上げる。一体一体、小さな人形を作った。それが、せきの日々だった。\n\nその部屋に、突然、男が訪ねてきた。\n\n江戸川乱歩だった。\n\n「五十九になりました」と乱歩は言った。数え年で五十九。母に抱かれてこの町を去ったのが、数え年で二歳のことだから——そう乱歩は思っていた。だが実際には、年が明けて数えが増えただけで、名張を離れたのは生後わずか六ヶ月のことだった。\n\nせきは床の上から、その男を見上げた。六十年前、きくの腕の中で泣いていた赤ちゃんが、今、目の前に立っている。

「まあ、大きくなって！」

それがせきの第一声だったと、今も辻家に伝わっている。\n\nせきはその夜、日記に書いた。\n\n「本名　平井太郎君　江戸川らん歩さん　御母さんの乳ぶさにすがる姿　目に浮ぶ　面会するや　暫く余りある今は　五十九才　さすが　有名の人物と見受けた」\n\nまた別の記録にはこう書かれている。\n\n「突然不思議の来客を受けました　六十年程以前の横山借家に居られた平井様の御子息　今はラン歩と聞き居る　有名の書説家でした　暫く御咄し致しました　年老いてのよろこびです」\n\n「よろこびです」——床の上の八十五歳の老女が、選んだ言葉だった。`,
  },
  {
    number: "三",
    year: "昭和30年（1955年）",
    name: "辻　安茂",
    role: "碑を建てた人",
    story: `昭和30年11月3日、除幕。\n\n辻安茂は、乱歩生誕地に碑を建てることを発起した。「この場所を、形として残さなければならない」という確信のもとに。\n\n翌昭和31年、除幕式に参加した乱歩はこう語った。\n\n「町の人々が、自発的に六十年もごぶさたしていた私に対して、こういう好意を見せて下さったのは、実にありがたいことだと思っている。」\n\n碑は言葉ではなく、石だ。嵐が来ても、時代が変わっても、その場所に立ち続ける。安茂が選んだのは、そういう形の継承だった。`,
  },
  {
    number: "四",
    year: "平成——",
    name: "辻　敬治",
    role: "信頼を渡した人",
    story: `乱歩の息子、平井隆太郎先生のもとを訪ねた。\n\n辻敬治は、先代から受け継いだものの重さを知っていた。だからこそ、それを次へ渡す前に、源流へ戻った。隆太郎先生と交わした言葉は記録されていないが、その訪問が「信頼の受け渡し」だったことは確かだ。\n\n継承とは、ただ物を引き継ぐことではない。関係を、引き継ぐことだ。`,
  },
  {
    number: "五",
    year: "現在",
    name: "辻　孝信",
    role: "解体危機から再生した人",
    story: `土地と建物が売りに出された。このまま何もしなければ、130年の記憶は消える。\n\n辻は買い取ることを決めた。\n\n簡単な決断ではなかった。それでも「ここで終わらせるわけにはいかない」という思いが、すべてに勝った。\n\n解体の危機を乗り越え、ミュージアムとして再生したこの場所に、今あなたは立っている。`,
  },
];

export default function StoryPage() {
  return (
    <main className="min-h-screen">
      {/* ヘッダー */}
      <div className="py-20 px-8 text-center border-b border-[#d4c9b0]">
        <a href="/" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← 戻る
        </a>
        <h1 className="mt-8 text-2xl font-light tracking-widest text-[var(--foreground)]">
          五代の継承
        </h1>
        <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
          明治27年から現在まで。<br />
          130年間、この記憶を守り続けた人々の物語。
        </p>
      </div>

      {/* 五代の物語 */}
      <div className="max-w-2xl mx-auto px-8 py-20 space-y-32">
        {generations.map((gen, i) => (
          <article key={i}>
            <div className="flex items-baseline gap-6 mb-8">
              <span className="text-4xl font-light text-[#d4c9b0]">{gen.number}</span>
              <div>
                <p className="text-xs tracking-[0.2em] text-[var(--muted)]">{gen.year}</p>
                <h2 className="text-xl tracking-wider text-[var(--foreground)] mt-1">{gen.name}</h2>
                <p className="text-sm text-[var(--muted)] mt-1">{gen.role}</p>
              </div>
            </div>
            <div className="pl-14 border-l border-[#d4c9b0]">
              {gen.story.split("\n\n").map((para, j) => (
                <p key={j} className="text-base leading-[2.2] text-[var(--foreground)] mb-6 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
            {i < generations.length - 1 && (
              <div className="mt-16 flex justify-center">
                <div className="w-px h-12 bg-[#d4c9b0]" />
              </div>
            )}
          </article>
        ))}
      </div>

      {/* 締めくくり */}
      <div className="border-t border-[#d4c9b0] py-24 px-8 text-center">
        <p className="text-base text-[var(--muted)] leading-relaxed mb-16">
          記憶は、特別な誰かによって守られるのではない。<br />
          このサイトを訪れたあなたも、その連鎖の中にいる。
        </p>
        <a
          href="/reserve"
          className="inline-block bg-[var(--accent)] text-[var(--background)] px-12 py-4 text-sm tracking-[0.2em] hover:opacity-80 transition-opacity duration-300"
        >
          来館を予約する
        </a>
      </div>

      <footer className="py-8 px-8 border-t border-[#d4c9b0] text-center">
        <p className="text-xs text-[var(--muted)] tracking-widest">
          江戸川乱歩生誕地ミュージアム ― 名張
        </p>
      </footer>
    </main>
  );
}
