"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CREDITS_DURATION = 40000;

export default function NabariPage() {
  const snapRef = useRef<HTMLDivElement>(null);
  const seifuteiBgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoBlocked, setVideoBlocked] = useState(false);

  // 動画の自動再生（canplayを待ってから実行）
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const attemptPlay = () => {
      video.play().catch(() => {
        // autoplayがブロックされたら再生ボタンを表示
        setVideoBlocked(true);
      });
    };

    // すでに再生可能な状態なら即実行、そうでなければcanplayを待つ
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", attemptPlay);
    };
  }, []);

  useEffect(() => {
    const container = snapRef.current;
    if (!container) return;

    // ─── 1枚目→2枚目：スナップ解除→JS同期スクロール＋背景上昇（40秒後） ───
    const TRANSITION_DURATION = 1200; // 1.2秒（背景上昇とスクロールを完全同期）

    const timer = setTimeout(() => {
      const s2 = document.getElementById("section-2");
      if (!s2 || !seifuteiBgRef.current) return;

      // ① スナップを一時解除（この間はJS制御で滑らかに動く）
      container.style.scrollSnapType = "none";

      // ② 背景を同じ2秒で上昇
      seifuteiBgRef.current.style.transition = `transform ${TRANSITION_DURATION}ms ease-out`;
      seifuteiBgRef.current.style.transform = "scale(1.12) translateY(0px)";

      // ③ JSカスタムスクロール（easeInOut 2秒）
      const startTop = container.scrollTop;
      const endTop = s2.offsetTop;
      const startTime = performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / TRANSITION_DURATION, 1);
        // easeInOutCubic
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        container.scrollTop = startTop + (endTop - startTop) * ease;
        if (t < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // ④ スクロール完了後にスナップを再有効化
          container.style.scrollSnapType = "y mandatory";
        }
      };
      requestAnimationFrame(animateScroll);
    }, CREDITS_DURATION);

    const observerOpts = { root: container, threshold: 0.1 };

    // ─── 2枚目：クレジット + フィナーレ + 3枚目へ自動移動 ───
    const s2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const credits = document.getElementById("seifutei-credits");
        if (credits) credits.style.animation = "scrollUp 40s linear forwards";
        setTimeout(() => {
          const finale = document.getElementById("seifutei-finale");
          if (finale) finale.style.opacity = "1";
          const l1 = document.getElementById("seifutei-finale-1");
          if (l1) { l1.style.transition = "opacity 2.5s ease-in"; l1.style.opacity = "1"; }
          setTimeout(() => {
            const l2 = document.getElementById("seifutei-finale-2");
            if (l2) { l2.style.transition = "opacity 2.5s ease-in"; l2.style.opacity = "1"; }
          }, 2000);
          setTimeout(() => {
            const s3 = document.getElementById("section-3");
            if (s3) container.scrollTo({ top: s3.offsetTop, behavior: "smooth" });
          }, 6000);
        }, 37000);
        s2Observer.disconnect();
      });
    }, observerOpts);
    const s2el = document.getElementById("section-2");
    if (s2el) s2Observer.observe(s2el);

    // ─── 3枚目：0.8秒ごとにフェードイン + 4枚目へ自動移動 ───
    const s3Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll<HTMLElement>(".dawn-fade").forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = "opacity 2.5s ease-out, transform 3s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 800);
        });
        // 8行 × 0.8s + 2.5s フェード + 5s 余韻 = 14.9s
        setTimeout(() => {
          const s4 = document.getElementById("section-4");
          if (s4) container.scrollTo({ top: s4.offsetTop, behavior: "smooth" });
        }, 14900);
        s3Observer.disconnect();
      });
    }, observerOpts);
    const s3el = document.getElementById("section-3");
    if (s3el) s3Observer.observe(s3el);

    // ─── 4枚目：0.8秒ごとにフェードイン ───
    const s4Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll<HTMLElement>(".hiawai-fade").forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = "opacity 2.5s ease-out, transform 3s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 800);
        });
        s4Observer.disconnect();
      });
    }, observerOpts);
    const s4el = document.getElementById("section-4");
    if (s4el) s4Observer.observe(s4el);

    return () => {
      clearTimeout(timer);
      s2Observer.disconnect();
      s3Observer.disconnect();
      s4Observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen">

      {/* ===== スナップコンテナ（4枚の全画面セクション） ===== */}
      <div
        ref={snapRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >

        {/* ── 1枚目：動画 + 映画クレジット ── */}
        <div id="section-1" className="relative h-screen w-full snap-start overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
          <video
            ref={videoRef}
            src="/videos/nabari-shrine-small.mp4"
            poster="/images/nabari-shrine-festival.jpeg"
            autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65" />
          {videoBlocked && (
            <button
              onClick={() => {
                videoRef.current?.play().catch(() => {});
                setVideoBlocked(false);
              }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 cursor-pointer bg-transparent border-none"
            >
              <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center hover:border-white/80 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white" style={{ opacity: 0.7, marginLeft: 3 }}>
                  <polygon points="4,2 18,10 4,18" />
                </svg>
              </div>
              <p className="text-white/40 text-xs tracking-[0.3em]">タップして再生</p>
            </button>
          )}
          <div className="scroll-credits absolute left-0 right-0 px-8 text-white text-center">
            <div className="max-w-md mx-auto space-y-20 py-8">
              <div className="space-y-6">
                <p className="text-base tracking-[0.5em]" style={{ color: "#c04444" }}>昭和二十七年（一九五二年）九月</p>
                <h1 className="text-5xl font-light tracking-[0.3em] text-white/90 leading-[2]">名張という町</h1>
              </div>
              <div className="space-y-8">
                <p className="text-xl leading-[2.8] tracking-wider text-white/60">
                  江戸川乱歩は、生まれてから一度も名張へ帰ったことがなかった。
                </p>
                <p className="text-2xl tracking-widest text-white/80">それが、五十七年間。</p>
              </div>
              <div className="space-y-3">
                <p className="text-base tracking-[0.4em]" style={{ color: "#c04444" }}>九月二十六日</p>
                <p className="text-3xl font-light tracking-widest text-white/90">宇流冨志禰神社</p>
              </div>
              <p className="text-2xl leading-[2.8]">きっかけは、選挙応援だった。</p>
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

        {/* ── 2枚目：清風亭の夜 ── */}
        <div id="section-2" className="relative h-screen w-full snap-start overflow-hidden">
          {/* 背景：1→2 スクロールに連動してせり上がる */}
          <div
            ref={seifuteiBgRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.12) translateY(140px)", willChange: "transform" }}
          >
            <Image src="/images/seifutei-lantern.jpeg" alt="清風亭の行燈" fill className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.85) 100%)" }} />
          {/* コンテンツ */}
          <div className="relative h-full overflow-hidden">
            <div id="seifutei-finale" className="absolute inset-0 flex flex-col items-center justify-center text-center px-8" style={{ opacity: 0 }}>
              <p id="seifutei-finale-1" className="text-2xl tracking-[0.3em] text-white/70" style={{ opacity: 0 }}>ここから乱歩と名張の物語は</p>
              <div className="h-28" />
              <p id="seifutei-finale-2" className="text-3xl font-light tracking-widest text-white/75" style={{ opacity: 0 }}>再び動き始める</p>
            </div>
            <div id="seifutei-credits" style={{ transform: "translateY(100vh)" }} className="absolute left-0 right-0 px-8 text-white text-center">
              <div className="max-w-lg mx-auto space-y-16 py-8">
                <p className="text-base tracking-[0.4em]" style={{ color: "#c04444" }}>九月二十六日　夜　清風亭</p>
                <p className="text-xl leading-[2.8] tracking-wider text-white/60">
                  名張川に面した旅館の欄干にもたれかかり、<br />
                  川の瀬音を聞きながら、乱歩はぼんやりと夜空を見上げていた。
                </p>
                <p className="text-2xl leading-[2.8] tracking-wider text-white/40">そこに、客があった。</p>
                <blockquote className="text-3xl font-light tracking-widest text-white/90 leading-[2.4]">
                  「先生の生まれた家を、<br />私が知っているのです」
                </blockquote>
                <p className="text-base tracking-wider" style={{ color: "#c04444" }}>本町の書店主　岡村繁次郎</p>
                <div className="text-lg leading-[2.8] text-white/50 text-left space-y-8">
                  <p>乱歩の顔に、一瞬、ただごとでない色がはしった。</p>
                  <p>昭和十二年、旅の途中に名張駅で降りて、生家を求めてさまよったことがある。そのときは見つけられなかった。幻のように脳裡につきまとっていた生家が、翌朝ついに姿を現そうとしていた。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3枚目：夜明け（暁） ── */}
        <div id="section-3" className="relative h-screen w-full snap-start overflow-hidden">
          <Image src="/images/seifutei-exterior.jpeg" alt="清風亭の外観" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.82) 100%)" }} />
          {/* ヘッダー(56px)を避けて top-14 から開始。flex centering との overflow 衝突も解消 */}
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-y-auto snap-hide-scrollbar">
            <div className="min-h-full flex flex-col items-center justify-center px-8 text-center py-4">
              <p className="dawn-fade text-sm tracking-[0.5em] mb-4"
                 style={{ color: "#c04444", opacity: 0, transform: "translateY(20px)" }}>
                昭和二十七年　九月二十七日　暁
              </p>
              <div className="text-xl md:text-3xl font-light tracking-widest text-[#f0ebe0] leading-[2.2] mb-4">
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>清風亭の夜が明け、</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>名張の町が動き出す。</span>
              </div>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2] mb-4">
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>五十七年の歳月を経て、</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>ひっそりと守られてきた</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>生誕の地へ。</span>
              </div>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2]">
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>Rampoにとっては</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>『ふるさと発見』の朝であった。</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4枚目：故郷の誕生 ── */}
        <div id="section-4" className="relative h-screen w-full snap-start overflow-hidden">
          <Image src="/images/nabari-hiawai.jpeg" alt="生誕地に続く路地（ひあわい）" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.82) 100%)" }} />
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-y-auto snap-hide-scrollbar">
            <div className="min-h-full flex flex-col items-center justify-center px-8 text-center py-4">
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2] mb-1">
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>ただの「生まれた町」が、</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>この日、</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>切っても切れない</span>
              </div>
              <p className="hiawai-fade text-2xl md:text-4xl font-light tracking-widest text-[#f0ebe0] mb-4"
                 style={{ opacity: 0, transform: "translateY(20px)" }}>
                「故郷」になった。
              </p>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2] mb-1">
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>生誕の地をひっそりと守り続け、</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>熱を込めて自分を迎えてくれる</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>名張の人々の眼差し。</span>
              </div>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2]">
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>彼らの存在こそが、</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>Rampoの心に</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>本当の「故郷」を</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>創り出したのだ。</span>
              </div>
            </div>
          </div>
        </div>

      </div>{/* /スナップコンテナ */}

      {/* ===== 以下：通常スクロールセクション ===== */}

      {/* 桝田医院 */}
      <div className="max-w-xl mx-auto px-8 py-24">
        <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">九月二十七日　朝</p>
        <h2 className="text-xl font-light tracking-widest text-[var(--foreground)] mb-12">借家は、もうなかった。</h2>
        <div className="relative w-full aspect-[4/3] overflow-hidden mb-10">
          <Image src="/images/rampo-alley.jpg" alt="借家の跡地に立つ乱歩" fill className="object-cover" />
        </div>
        <p className="text-xs text-[var(--muted)] text-center mb-12">昭和二十七年　借家の跡地に立つ乱歩</p>
        <p className="text-sm leading-[2.8] text-[var(--muted)]">
          岡村繁次郎と富森高太郎に案内されて、乱歩は桝田医院を訪ねた。自分が生まれた借家は、もうそこにはなかった。しかし横山文圭が建てた離れの二階に通され、いつ果てるともなく話がはずんだ。
        </p>
        <div className="mt-16 pt-16 border-t border-[#d4c9b0]">
          <p className="text-xs text-[var(--muted)] text-center mb-8">現在の生誕地碑公園</p>
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image src="/images/nabari-monument-park.jpeg" alt="現在の生誕地碑公園" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* 名張川 */}
      <div className="relative">
        <div className="relative w-full h-[80vh] overflow-hidden">
          <Image src="/images/rampo-river.jpg" alt="名張川の川原にて" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="bg-[#1a1a1a] py-24 px-8">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-xl font-light tracking-widest text-white/90 mb-12">石は、動いていなかった。</p>
            <p className="text-sm leading-[3] text-white/50">
              桝田医院から川原へ出ると、母がそこにいた時のまま、川までの石組みが残っていた。洗濯場だった。五十七年という時間が、この場所では止まっていた。
            </p>
            <p className="text-sm leading-[3] text-white/50 mt-6">乱歩はそこにしゃがんで、当時のことを思った。写真を撮ってもらった。</p>
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
          「まあ、あの子がこんな<br />大きい子におなりなさって」
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
        <p className="text-xs tracking-[0.4em] mb-12" style={{ color: "#c04444" }}>昭和二十七年九月二十九日　伊和新聞</p>
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
          誰かに頼まれたわけでも、<br />市の企画でもなかった。
        </p>
      </div>

      {/* 除幕式 */}
      <div className="relative">
        <div className="relative w-full h-[80vh] overflow-hidden">
          <Image src="/images/ceremony-wide.jpg" alt="除幕式の全景" fill className="object-cover object-top" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <p className="text-xs tracking-[0.5em] mb-8" style={{ color: "#c04444" }}>昭和三十年十一月三日</p>
            <p className="text-2xl font-light tracking-[0.3em] text-white leading-[2]">名張の人々が、<br />碑を建てた。</p>
            <p className="mt-10 text-sm text-white/50 leading-[2.4] max-w-xs">誰かに頼まれたわけでも、<br />市の企画でもなかった。</p>
          </div>
        </div>
      </div>

      {/* 祝電 */}
      <div className="bg-[#1a1a1a] py-24 px-8 text-center">
        <p className="text-xs tracking-[0.4em] mb-12" style={{ color: "#c04444" }}>角田喜久雄　祝電より</p>
        <blockquote className="text-lg font-light tracking-widest text-white/80 leading-[2.4]">
          「故郷に錦を飾る人は多し、<br />されど石を飾る人は稀なり、<br />人徳のゆえん」
        </blockquote>
        <p className="mt-12 text-sm text-white/40 leading-[2.8] max-w-sm mx-auto">
          祝電は九十何通にのぼった。碑石は名張川の川上から運んだ御影石の自然石。除幕の綱は、市長のお嬢さんによって引かれた。
        </p>
      </div>

      {/* 碑の前に立つ乱歩 */}
      <div className="relative">
        <div className="relative w-full h-[90vh] overflow-hidden">
          <Image src="/images/ranpo-monument.jpg" alt="生誕地碑の前に立つ乱歩" fill className="object-cover object-top" />
        </div>
        <div className="bg-[var(--background)] py-16 px-8 text-center">
          <p className="text-xs text-[var(--muted)] tracking-wider">昭和三十年十一月　碑の前に立つ乱歩</p>
        </div>
      </div>

      {/* 昼食 */}
      <div className="relative">
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image src="/images/rampo-meal.jpg" alt="昼食うなどん" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="bg-[#1a1a1a] py-20 px-8 text-center">
          <p className="text-xs tracking-[0.4em] mb-8" style={{ color: "#c04444" }}>十一月三日　午後</p>
          <p className="text-sm leading-[3] text-white/60 max-w-sm mx-auto">
            式が終わると、桝田医院二階の広間でうなどんの昼食が振る舞われた。その夜、料亭で名張芸妓が踊り、市長が踊り、伊勢音頭の合唱になった。乱歩は家内に三味線を弾かせた。
          </p>
        </div>
      </div>

      {/* 講演 */}
      <div className="relative">
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image src="/images/rampo-lecture.jpeg" alt="講演する乱歩" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-12 left-0 right-0 text-center">
            <p className="text-xs tracking-[0.4em] mb-4" style={{ color: "#c04444" }}>十一月四日</p>
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
          <Image src="/images/rampo-kaouchi-color.jpeg" alt="香落渓" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="bg-[#1a1a1a] py-24 px-8 text-center">
          <p className="text-xs tracking-[0.4em] mb-10" style={{ color: "#c04444" }}>十一月五日　香落渓</p>
          <p className="text-base font-light tracking-widest text-white/80 mb-10">これが、最後の名張だった。</p>
          <p className="text-sm leading-[3] text-white/50 max-w-sm mx-auto">
            延々二里の渓流沿いを、紅葉が覆っていた。乱歩は16ミリカメラでその風景を記録した。シャッターを押すたびに、何かを封じ込めようとするように。
          </p>
        </div>
      </div>

      {/* 乱歩の言葉 */}
      <div className="bg-[#1a1a1a] py-40 px-8 text-center">
        <p className="text-xs tracking-[0.4em] mb-20" style={{ color: "#c04444" }}>
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
        <p className="text-sm text-[var(--muted)] leading-[2.8] mb-4">乱歩が最初の息を吸った場所が、今もここにある。</p>
        <p className="text-xs text-[var(--muted)] mb-20">彼の足跡の終着点が、あなたの出発点になる。</p>
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
        <p className="text-xs text-[var(--muted)] tracking-widest">江戸川乱歩生誕地ミュージアム ― 名張</p>
      </footer>

    </main>
  );
}
