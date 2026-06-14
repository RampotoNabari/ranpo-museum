"use client";
import Image from "next/image";
import { useEffect } from "react";

const CREDITS_DURATION = 40000; // 40秒（1.5倍速）

export default function NabariPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("next-section")?.scrollIntoView({ behavior: "smooth" });
    }, CREDITS_DURATION);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const seifuteiText = document.getElementById("seifutei-credits");
            if (seifuteiText) {
              seifuteiText.style.animation = "scrollUp 40s linear forwards";
            }
            setTimeout(() => {
              const finale = document.getElementById("seifutei-finale");
              if (finale) {
                finale.style.transition = "opacity 1.5s ease-in";
                finale.style.opacity = "1";
              }
            }, 35000);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    const seifuteiSection = document.getElementById("next-section");
    if (seifuteiSection) observer.observe(seifuteiSection);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen">

      {/* 冒頭 — 動画＋映画クレジット演出 */}
      <div className="relative h-screen overflow-hidden">
        {/* 動画背景（最初から再生） */}
        <video
          src="/videos/nabari-shrine.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />

        {/* 自動スクロールするクレジットテキスト */}
        <div className="scroll-credits absolute left-0 right-0 px-8 text-white text-center">
          <div className="max-w-md mx-auto space-y-20 py-8">
            {/* タイトル */}
            <div className="space-y-6">
              <p className="text-base tracking-[0.5em]" style={{ color: '#c04444' }}>昭和二十七年（一九五二年）九月</p>
              <h1 className="text-5xl font-light tracking-[0.3em] text-white/90 leading-[2]">
                名張という町
              </h1>
            </div>

            {/* 導入 */}
            <div className="space-y-8">
              <p className="text-xl leading-[2.8] tracking-wider text-white/60">
                江戸川乱歩は、生まれてから一度も名張へ帰ったことがなかった。
              </p>
              <p className="text-2xl tracking-widest text-white/80">
                それが、五十七年間。
              </p>
            </div>

            {/* 神社 */}
            <div className="space-y-3">
              <p className="text-base tracking-[0.4em]" style={{ color: '#c04444' }}>九月二十六日</p>
              <p className="text-3xl font-light tracking-widest text-white/90">宇流冨志禰神社</p>
            </div>

            <p className="text-2xl leading-[2.8]">
              きっかけは、選挙応援だった。
            </p>
            <div className="space-y-8 text-lg text-white/70">
              <p className="leading-[2.8]">乱歩が世話になった川崎克代議士の息子、川崎秀二が初出馬することになった。</p>
              <p className="leading-[2.8]">「名張にも行く」と聞いて——それならと。</p>
              <p className="leading-[2.8]">五十七年間、一度も踏まなかった土地へ、乱歩はそうやって、ほとんど偶然のように帰ってきた。</p>
              <p className="leading-[2.8]">宇流冨志禰神社の境内は、人で埋め尽くされていた。</p>
              <p className="leading-[2.8]">地元の人々は「お春日さん」と呼ぶ、この町の氏神。</p>
              <p className="leading-[2.8]">その社の前に、江戸川乱歩は立った。</p>
            </div>
          </div>
        </div>
      </div>

      {/* 清風亭の夜 */}
      <div id="next-section" className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/seifutei-lantern.jpeg"
            alt="清風亭の行燈"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative h-screen overflow-hidden">
          <p id="seifutei-finale" className="absolute inset-0 flex items-center justify-center text-lg font-light tracking-widest text-white/90 text-center px-8" style={{ opacity: 0, display: 'flex' }}>ここから乱歩と名張の物語は再び動き始める</p>
          <div id="seifutei-credits" style={{ transform: "translateY(100vh)" }} className="absolute left-0 right-0 px-8 text-white text-center">
            <div className="max-w-lg mx-auto space-y-16 py-8">
              <p className="text-sm tracking-[0.5em]" style={{ color: '#c04444' }}>九月二十六日　夜　清風亭</p>
              <p className="text-base leading-[3] tracking-wider text-white/60">
                名張川に面した旅館の欄干にもたれかかり、<br />
                川の瀬音を聞きながら、乱歩はぼんやりと夜空を見上げていた。
              </p>
              <p className="text-lg leading-[3] tracking-wider text-white/40">そこに、客があった。</p>
              <blockquote className="text-2xl font-light tracking-widest text-white/90 leading-[2.4]">
                「先生の生まれた家を、<br />
                私が知っているのです」
              </blockquote>
              <p className="text-sm tracking-wider" style={{ color: '#c04444' }}>
                本町の書店主　岡村繁次郎
              </p>
              <div className="text-base leading-[3] text-white/50 text-left space-y-8">
                <p>乱歩の顔に、一瞬、ただごとでない色がはしった。</p>
                <p>昭和十二年、旅の途中に名張駅で降りて、生家を求めてさまよったことがある。そのときは見つけられなかった。幻のように脳裡につきまとっていた生家が、翌朝ついに姿を現そうとしていた。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 桝田医院 */}
      <div className="max-w-xl mx-auto px-8 py-24">
        <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">九月二十七日　朝</p>
        <h2 className="text-xl font-light tracking-widest text-[var(--foreground)] mb-12">
          借家は、もうなかった。
        </h2>
        <div className="relative w-full aspect-[4/3] overflow-hidden mb-10">
          <Image
            src="/images/rampo-alley.jpg"
            alt="借家の跡地に立つ乱歩"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-xs text-[var(--muted)] text-center mb-12">昭和二十七年　借家の跡地に立つ乱歩</p>
        <p className="text-sm leading-[2.8] text-[var(--muted)]">
          岡村繁次郎と富森高太郎に案内されて、乱歩は桝田医院を訪ねた。自分が生まれた借家は、もうそこにはなかった。しかし横山文圭が建てた離れの二階に通され、いつ果てるともなく話がはずんだ。
        </p>
        <div className="mt-16 pt-16 border-t border-[#d4c9b0]">
          <p className="text-xs text-[var(--muted)] text-center mb-8">現在の生誕地碑公園</p>
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src="/images/nabari-monument-park.jpeg"
              alt="現在の生誕地碑公園"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 名張川 */}
      <div className="relative">
        <div className="relative w-full h-[80vh] overflow-hidden">
          <Image
            src="/images/rampo-river.jpg"
            alt="名張川の川原にて"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="bg-[#1a1a1a] py-24 px-8">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-xl font-light tracking-widest text-white/90 mb-12">
              石は、動いていなかった。
            </p>
            <p className="text-sm leading-[3] text-white/50">
              桝田医院から川原へ出ると、母がそこにいた時のまま、川までの石組みが残っていた。洗濯場だった。五十七年という時間が、この場所では止まっていた。
            </p>
            <p className="text-sm leading-[3] text-white/50 mt-6">
              乱歩はそこにしゃがんで、当時のことを思った。写真を撮ってもらった。
            </p>
          </div>
        </div>
      </div>

      {/* 辻酒店・辻せき */}
      <div className="max-w-xl mx-auto px-8 py-24">
        <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">九月二十七日　午後　辻酒店</p>
        <p className="text-sm leading-[2.8] text-[var(--muted)] mb-12">
          「横山家にいた頃のことを知っているお婆さんが近くにいるんですがね」——富森の言葉に、乱歩の胸はなつかしさにはちきれそうだった。
        </p>
        <blockquote className="text-2xl font-light tracking-widest text-[var(--foreground)] leading-[2] py-12 border-y border-[#d4c9b0] text-center">
          「まあ、あの子がこんな<br />
          大きい子におなりなさって」
        </blockquote>
        <p className="text-sm leading-[2.8] text-[var(--muted)] mt-12">
          新町の辻酒店。辻せきは中風で半身不随となり、裏座敷に床を敷いて療養していた。八十四歳。還暦近い天下の乱歩が、まるで子供扱いだった。
        </p>
        <p className="text-sm leading-[2.8] text-[var(--muted)] mt-6">
          思い出話はこんこんとしてつきなかった。しかし上野市での演説の時間が迫っていた。せきのもとを辞して、乱歩は名張を後にした。
        </p>
      </div>

      {/* 伊和新聞 */}
      <div className="bg-[#1a1a1a] py-24 px-8 text-center">
        <p className="text-xs tracking-[0.4em] mb-12" style={{ color: '#c04444' }}>
          昭和二十七年九月二十九日　伊和新聞
        </p>
        <blockquote className="text-base font-light leading-[3] tracking-wider text-white/70 max-w-md mx-auto">
          「ようやく探しあてた生まれ故郷の空、山、水に見入る乱歩氏のまなざしには感懐一しおせつせつなるものがみうけられた。」
        </blockquote>
      </div>

      {/* 三年後 */}
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-8 text-center border-b border-[#d4c9b0]">
        <p className="text-xs tracking-[0.5em] text-[var(--muted)] mb-8">昭和三十年（一九五五年）十一月</p>
        <h2 className="text-2xl font-light tracking-[0.3em] text-[var(--foreground)] leading-[2]">
          名張の人々は、<br />碑を建てた。
        </h2>
        <p className="mt-10 text-sm text-[var(--muted)] leading-[2.4] max-w-sm">
          誰かに頼まれたわけでも、<br />
          市の企画でもなかった。
        </p>
      </div>

      {/* 除幕式 */}
      <div className="relative">
        <div className="relative w-full h-[80vh] overflow-hidden">
          <Image
            src="/images/ceremony-wide.jpg"
            alt="除幕式の全景"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <p className="text-xs tracking-[0.5em] mb-8" style={{ color: '#c04444' }}>昭和三十年十一月三日</p>
            <p className="text-2xl font-light tracking-[0.3em] text-white leading-[2]">
              名張の人々が、<br />碑を建てた。
            </p>
            <p className="mt-10 text-sm text-white/50 leading-[2.4] max-w-xs">
              誰かに頼まれたわけでも、<br />市の企画でもなかった。
            </p>
          </div>
        </div>
      </div>

      {/* 祝電 */}
      <div className="bg-[#1a1a1a] py-24 px-8 text-center">
        <p className="text-xs tracking-[0.4em] mb-12" style={{ color: '#c04444' }}>角田喜久雄　祝電より</p>
        <blockquote className="text-lg font-light tracking-widest text-white/80 leading-[2.4]">
          「故郷に錦を飾る人は多し、<br />
          されど石を飾る人は稀なり、<br />
          人徳のゆえん」
        </blockquote>
        <p className="mt-12 text-sm text-white/40 leading-[2.8] max-w-sm mx-auto">
          祝電は九十何通にのぼった。碑石は名張川の川上から運んだ御影石の自然石。除幕の綱は、市長のお嬢さんによって引かれた。
        </p>
      </div>

      {/* 碑の前に立つ乱歩 */}
      <div className="relative">
        <div className="relative w-full h-[90vh] overflow-hidden">
          <Image
            src="/images/ranpo-monument.jpg"
            alt="生誕地碑の前に立つ乱歩"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="bg-[var(--background)] py-16 px-8 text-center">
          <p className="text-xs text-[var(--muted)] tracking-wider">昭和三十年十一月　碑の前に立つ乱歩</p>
        </div>
      </div>

      {/* 昼食 */}
      <div className="relative">
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image
            src="/images/rampo-meal.jpg"
            alt="昼食うなどん"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="bg-[#1a1a1a] py-20 px-8 text-center">
          <p className="text-xs tracking-[0.4em] mb-8" style={{ color: '#c04444' }}>十一月三日　午後</p>
          <p className="text-sm leading-[3] text-white/60 max-w-sm mx-auto">
            式が終わると、桝田医院二階の広間でうなどんの昼食が振る舞われた。その夜、料亭で名張芸妓が踊り、市長が踊り、伊勢音頭の合唱になった。乱歩は家内に三味線を弾かせた。
          </p>
        </div>
      </div>

      {/* 講演 */}
      <div className="relative">
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image
            src="/images/rampo-lecture.jpeg"
            alt="講演する乱歩"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-12 left-0 right-0 text-center">
            <p className="text-xs tracking-[0.4em] mb-4" style={{ color: '#c04444' }}>十一月四日</p>
            <p className="text-lg font-light tracking-widest text-white">名張の子どもたちへ</p>
          </div>
        </div>
        <div className="max-w-xl mx-auto px-8 py-16">
          <p className="text-sm leading-[2.8] text-[var(--muted)]">
            中学校、警察署、高等学校。大講堂一杯の子どもたちが、探偵小説の話を謹聴した。講演はテープに録音され、地元紙の連載読みものになった。
          </p>
        </div>
      </div>

      {/* 香落渓 */}
      <div className="relative">
        <div className="relative w-full h-[80vh] overflow-hidden">
          <Image
            src="/images/rampo-kaouchi-color.jpeg"
            alt="香落渓"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="bg-[#1a1a1a] py-24 px-8 text-center">
          <p className="text-xs tracking-[0.4em] mb-10" style={{ color: '#c04444' }}>十一月五日　香落渓</p>
          <p className="text-base font-light tracking-widest text-white/80 mb-10">
            これが、最後の名張だった。
          </p>
          <p className="text-sm leading-[3] text-white/50 max-w-sm mx-auto">
            延々二里の渓流沿いを、紅葉が覆っていた。乱歩は16ミリカメラでその風景を記録した。シャッターを押すたびに、何かを封じ込めようとするように。
          </p>
        </div>
      </div>

      {/* 乱歩の言葉 */}
      <div className="bg-[#1a1a1a] py-40 px-8 text-center">
        <p className="text-xs tracking-[0.4em] mb-20" style={{ color: '#c04444' }}>
          江戸川乱歩「生誕碑除幕式」『宝石』昭和三十一年一月号
        </p>
        <blockquote className="text-base font-light leading-[3.5] tracking-wider text-white/80 max-w-lg mx-auto">
          「市の企画とか、個人の金持の企画とかいうのではなく、<br className="hidden md:block" />
          町の人々が、自発的に<br className="hidden md:block" />
          六十年もごぶさたしていた私に対して、<br className="hidden md:block" />
          こういう好意を見せて下さったのは、<br className="hidden md:block" />
          実にありがたいことだと思っている。」
        </blockquote>
      </div>

      {/* CTA */}
      <div className="py-32 px-8 text-center">
        <p className="text-sm text-[var(--muted)] leading-[2.8] mb-4">
          乱歩が最初の息を吸った場所が、今もここにある。
        </p>
        <p className="text-xs text-[var(--muted)] mb-20">
          彼の足跡の終着点が、あなたの出発点になる。
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
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
