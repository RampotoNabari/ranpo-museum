"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CREDITS_DURATION = 30000;

export default function NabariPage() {
  const snapRef = useRef<HTMLDivElement>(null);
  const seifuteiBgRef = useRef<HTMLDivElement>(null);
  const exteriorBgRef = useRef<HTMLDivElement>(null);
  const hiawaiiBgRef = useRef<HTMLDivElement>(null);
  const masudaBgRef = useRef<HTMLDivElement>(null);
  const riverBgRef = useRef<HTMLDivElement>(null);
  const tsujiRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoBlocked, setVideoBlocked] = useState(false);

  // BGM: フェードアウト開始時刻（秒）と長さ（秒）
  const BGM_FADE_START = 220; // 3分40秒から
  const BGM_FADE_DURATION = 10; // 10秒かけてフェード

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let onInteract: (() => void) | null = null;

    const playWithFade = () => {
      if (onInteract) {
        document.removeEventListener("mousemove", onInteract, true);
        document.removeEventListener("touchstart", onInteract, true);
        onInteract = null;
      }
      audio.volume = 0;
      audio.play().then(() => {
        const FADE_IN_DURATION = 3000;
        const target = 0.6;
        const step = 50;
        const inc = target / (FADE_IN_DURATION / step);
        const fadeIn = setInterval(() => {
          audio.volume = Math.min(target, audio.volume + inc);
          if (audio.volume >= target) clearInterval(fadeIn);
        }, step);
      }).catch(() => {});
    };

    // 3秒後に再生。ブロックされた場合は最初のインタラクションで再試行
    const timer = setTimeout(() => {
      audio.volume = 0;
      audio.play().then(() => {
        const FADE_IN_DURATION = 3000;
        const target = 0.6;
        const step = 50;
        const inc = target / (FADE_IN_DURATION / step);
        const fadeIn = setInterval(() => {
          audio.volume = Math.min(target, audio.volume + inc);
          if (audio.volume >= target) clearInterval(fadeIn);
        }, step);
      }).catch(() => {
        let started = false;
        onInteract = () => {
          if (started) return;
          started = true;
          playWithFade();
        };
        document.addEventListener("mousemove", onInteract, true);
        document.addEventListener("touchstart", onInteract, true);
      });
    }, 3000);

    let fadeInterval: ReturnType<typeof setInterval> | null = null;
    const onTimeUpdate = () => {
      if (audio.currentTime >= BGM_FADE_START && !fadeInterval) {
        fadeInterval = setInterval(() => {
          const elapsed = audio.currentTime - BGM_FADE_START;
          const newVol = Math.max(0, 0.6 * (1 - elapsed / BGM_FADE_DURATION));
          audio.volume = newVol;
          if (newVol <= 0) {
            audio.pause();
            if (fadeInterval) clearInterval(fadeInterval);
          }
        }, 200);
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      clearTimeout(timer);
      if (onInteract) {
        document.removeEventListener("mousemove", onInteract, true);
        document.removeEventListener("touchstart", onInteract, true);
      }
      audio.removeEventListener("timeupdate", onTimeUpdate);
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, []);

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
    // 再レンダリング時にJSで変更した値がReactに上書きされないよう初期状態を明示的にセット
    const finale = document.getElementById("seifutei-finale");
    const l1 = document.getElementById("seifutei-finale-1");
    const l2 = document.getElementById("seifutei-finale-2");
    const credits = document.getElementById("seifutei-credits");
    if (finale) finale.style.opacity = "0";
    if (l1) l1.style.opacity = "0";
    if (l2) l2.style.opacity = "0";
    if (credits) credits.style.transform = "translateY(100vh)";
    if (credits) credits.style.animation = "none";
  }, []);

  useEffect(() => {
    const container = snapRef.current;
    if (!container) return;

    const BG_DURATION = 10000; // 背景せり上がり：10秒

    // 背景せり上がり＋スナップ解除スクロールを同時実行するヘルパー
    const transitionToSection = (
      sectionId: string,
      bgRef: React.RefObject<HTMLDivElement | null>
    ) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      // スナップ解除 → JS スクロール（10秒）→ スナップ再有効化
      container.style.scrollSnapType = "none";
      const startTop = container.scrollTop;
      const endTop = section.offsetTop;
      const startTime = performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / BG_DURATION, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        container.scrollTop = startTop + (endTop - startTop) * ease;
        if (t < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          container.style.scrollSnapType = "y mandatory";
        }
      };
      requestAnimationFrame(animateScroll);

      // 背景せり上がり（スクロールと同時・10秒）
      if (bgRef.current) {
        bgRef.current.style.transition = `transform ${BG_DURATION}ms ease-out`;
        bgRef.current.style.transform = "scale(1.12) translateY(0px)";
      }
    };

    // ─── 背景タイマー（ページロードからの絶対時間） ───
    const t2 = setTimeout(() => transitionToSection("section-2", seifuteiBgRef), 35000);

    // セクションごとのタイマー管理
    const sectionTimers: Record<string, ReturnType<typeof setTimeout>[]> = {};
    const cancelSection = (id: string) => {
      (sectionTimers[id] || []).forEach(clearTimeout);
      sectionTimers[id] = [];
    };
    const addSectionTimer = (id: string, fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      sectionTimers[id] = [...(sectionTimers[id] || []), t];
      return t;
    };

    // 自動遷移タイマー（手動移動時にキャンセル）
    let transitionTimer: ReturnType<typeof setTimeout> | undefined;
    const cancelTransition = () => { if (transitionTimer) clearTimeout(transitionTimer); };
    const scheduleNext = (fn: () => void, ms: number) => {
      cancelTransition();
      transitionTimer = setTimeout(fn, ms);
    };

    // リセットヘルパー
    const resetScroll = (scrollId: string) => {
      const el = document.getElementById(scrollId);
      if (el) { el.style.animation = "none"; el.style.transform = "translateY(100vh)"; }
    };
    const resetPhoto = (photoId: string) => {
      const el = document.getElementById(photoId);
      if (el) { el.style.transition = "none"; el.style.opacity = "0"; }
    };
    const resetBg = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) { ref.current.style.transition = "none"; ref.current.style.transform = "scale(1.12) translateY(140px)"; }
    };

    const observerOpts = { root: container, threshold: 0.1 };
    const fullViewOpts = { root: container, threshold: 0.5 };

    // ─── 2枚目：クレジット + フィナーレ ───
    const s2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(t2); cancelTransition(); cancelSection("s2");
          const credits = document.getElementById("seifutei-credits");
          if (credits) credits.style.animation = "scrollUp 50s linear forwards";
          addSectionTimer("s2", () => {
            const finale = document.getElementById("seifutei-finale");
            if (finale) finale.style.opacity = "1";
            const l1 = document.getElementById("seifutei-finale-1");
            if (l1) { l1.style.transition = "opacity 2.5s ease-in"; l1.style.opacity = "1"; }
            addSectionTimer("s2", () => {
              const l2 = document.getElementById("seifutei-finale-2");
              if (l2) { l2.style.transition = "opacity 2.5s ease-in"; l2.style.opacity = "1"; }
            }, 2000);
          }, 30000);
          scheduleNext(() => transitionToSection("section-3", exteriorBgRef), 40000);
        } else {
          cancelSection("s2");
          const credits = document.getElementById("seifutei-credits");
          if (credits) { credits.style.animation = "none"; credits.style.transform = "translateY(100vh)"; }
          const finale = document.getElementById("seifutei-finale");
          if (finale) finale.style.opacity = "0";
          const l1 = document.getElementById("seifutei-finale-1");
          if (l1) { l1.style.transition = "none"; l1.style.opacity = "0"; }
          const l2 = document.getElementById("seifutei-finale-2");
          if (l2) { l2.style.transition = "none"; l2.style.opacity = "0"; }
        }
      });
    }, observerOpts);

    // ─── 3枚目：テキストフェードイン ───
    const s3Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(t2); cancelTransition(); cancelSection("s3");
          document.querySelectorAll<HTMLElement>(".dawn-fade").forEach((el, i) => {
            addSectionTimer("s3", () => {
              el.style.transition = "opacity 2.5s ease-out, transform 3s ease-out";
              el.style.opacity = "1"; el.style.transform = "translateY(0)";
            }, i * 1000);
          });
          scheduleNext(() => transitionToSection("section-4", hiawaiiBgRef), 15000);
        } else {
          cancelSection("s3");
          document.querySelectorAll<HTMLElement>(".dawn-fade").forEach((el) => {
            el.style.transition = "none"; el.style.opacity = "0"; el.style.transform = "translateY(20px)";
          });
        }
      });
    }, observerOpts);

    // ─── 4枚目：テキストフェードイン ───
    const s4Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(t2); cancelTransition(); cancelSection("s4");
          document.querySelectorAll<HTMLElement>(".hiawai-fade").forEach((el, i) => {
            addSectionTimer("s4", () => {
              el.style.transition = "opacity 2.5s ease-out, transform 3s ease-out";
              el.style.opacity = "1"; el.style.transform = "translateY(0)";
            }, i * 1000);
          });
          scheduleNext(() => transitionToSection("section-5", masudaBgRef), 15000);
        } else {
          cancelSection("s4");
          document.querySelectorAll<HTMLElement>(".hiawai-fade").forEach((el) => {
            el.style.transition = "none"; el.style.opacity = "0"; el.style.transform = "translateY(20px)";
          });
        }
      });
    }, observerOpts);

    // ─── 5枚目：桝田医院 ───
    const s5Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(t2); cancelTransition(); cancelSection("s5");
          if (masudaBgRef.current) {
            masudaBgRef.current.style.transition = "transform 10s ease-out";
            masudaBgRef.current.style.transform = "scale(1.12) translateY(0px)";
          }
          const scroll = document.getElementById("masuda-scroll");
          if (scroll) scroll.style.animation = "scrollUp 30s linear forwards";
          addSectionTimer("s5", () => {
            const photo = document.getElementById("masuda-photo");
            if (photo) { photo.style.transition = "opacity 4s ease-in"; photo.style.opacity = "1"; }
          }, 20000);
          scheduleNext(() => transitionToSection("section-6", riverBgRef), 32000);
        } else {
          cancelSection("s5");
          resetScroll("masuda-scroll"); resetPhoto("masuda-photo"); resetBg(masudaBgRef);
        }
      });
    }, fullViewOpts);

    // ─── 6枚目：河原 ───
    const s6Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(t2); cancelTransition(); cancelSection("s6");
          if (riverBgRef.current) {
            riverBgRef.current.style.transition = "transform 10s ease-out";
            riverBgRef.current.style.transform = "scale(1.12) translateY(0px)";
          }
          const scroll = document.getElementById("river-scroll");
          if (scroll) scroll.style.animation = "scrollUp 30s linear forwards";
          addSectionTimer("s6", () => {
            const photo = document.getElementById("river-photo");
            if (photo) { photo.style.transition = "opacity 4s ease-in"; photo.style.opacity = "1"; }
          }, 20000);
          scheduleNext(() => transitionToSection("section-7", tsujiRef), 32000);
        } else {
          cancelSection("s6");
          resetScroll("river-scroll"); resetPhoto("river-photo"); resetBg(riverBgRef);
        }
      });
    }, fullViewOpts);

    // ─── 7枚目：辻酒店・結び ───
    const s7Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(t2); cancelTransition(); cancelSection("s7");
          if (tsujiRef.current) {
            tsujiRef.current.style.transition = "transform 10s ease-out";
            tsujiRef.current.style.transform = "scale(1.12) translateY(0px)";
          }
          const scroll = document.getElementById("tsuji-scroll");
          if (scroll) scroll.style.animation = "scrollUp 42s linear forwards";
          addSectionTimer("s7", () => {
            const photo = document.getElementById("tsuji-photo");
            if (photo) { photo.style.transition = "opacity 4s ease-in"; photo.style.opacity = "1"; }
          }, 25000);
        } else {
          cancelSection("s7");
          resetScroll("tsuji-scroll"); resetPhoto("tsuji-photo");
          if (tsujiRef.current) { tsujiRef.current.style.transition = "none"; tsujiRef.current.style.transform = "scale(1.0) translateY(0px)"; }
        }
      });
    }, fullViewOpts);

    const s2el = document.getElementById("section-2");
    if (s2el) s2Observer.observe(s2el);
    const s3el = document.getElementById("section-3");
    if (s3el) s3Observer.observe(s3el);
    const s4el = document.getElementById("section-4");
    if (s4el) s4Observer.observe(s4el);
    const s5el = document.getElementById("section-5");
    if (s5el) s5Observer.observe(s5el);
    const s6el = document.getElementById("section-6");
    if (s6el) s6Observer.observe(s6el);
    const s7el = document.getElementById("section-7");
    if (s7el) s7Observer.observe(s7el);

    return () => {
      clearTimeout(t2);
      cancelTransition();
      Object.values(sectionTimers).flat().forEach(clearTimeout);
      s2Observer.disconnect();
      s3Observer.disconnect();
      s4Observer.disconnect();
      s5Observer.disconnect();
      s6Observer.disconnect();
      s7Observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/audio/kokyounosora.m4a" preload="auto" />

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
                <p className="text-xl tracking-[0.5em] whitespace-nowrap" style={{ color: "#c04444" }}>昭和二十七年（一九五二年）九月</p>
                <h1 className="text-5xl font-light tracking-[0.3em] text-white/90 leading-[2]">名張という町</h1>
              </div>
              <div className="space-y-8">
                <p className="text-xl leading-[2.8] tracking-wider text-white/60">
                  江戸川乱歩は、生まれてから一度も名張へ帰ったことがなかった。
                </p>
                <p className="text-2xl tracking-widest text-white/80">それが、五十七年間。</p>
              </div>
              <div className="space-y-3">
                <p className="text-xl tracking-[0.4em]" style={{ color: "#c04444" }}>九月二十六日</p>
                <p className="text-3xl font-light tracking-widest text-white/90">宇流冨志禰神社</p>
              </div>
              <p className="text-2xl leading-[2.8]">きっかけは、選挙応援だった。</p>
              <div className="space-y-8 text-lg text-white/70">
                <p className="leading-[2.8]">乱歩が世話になった川崎克代議士の息子、川崎秀二が初出馬することになった。</p>
                <p className="leading-[2.8]">「名張にも行く」と聞いて——それならと。</p>
                <p className="leading-[2.8]">五十七年間、一度も踏まなかった土地へ、乱歩はそうやって、ほとんど偶然のように帰ってきた。</p>
                <p className="leading-[2.8]">宇流冨志禰神社の境内は、人で埋め尽くされていた。</p>
                <p className="leading-[2.8]">地元の人々は「お春日さん」と呼ぶ、この町の氏神。</p>
                <p className="text-2xl leading-[2.8]" style={{ color: "#c04444" }}>その社の前に、江戸川乱歩は立った。</p>
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
            <div id="seifutei-finale" className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 opacity-0">
              <p id="seifutei-finale-1" className="text-2xl tracking-[0.3em] text-white/70 opacity-0">ここから乱歩と名張の物語は</p>
              <div className="h-28" />
              <p id="seifutei-finale-2" className="text-3xl font-light tracking-widest text-white/75 opacity-0">再び動き始める</p>
            </div>
            <div id="seifutei-credits" style={{ transform: "translateY(100vh)" }} className="absolute left-0 right-0 px-8 text-white text-center">
              <div className="max-w-lg mx-auto space-y-16 py-8">
                <p className="text-2xl tracking-[0.4em]" style={{ color: "#c04444" }}>九月二十六日　夜　清風亭</p>
                <p className="text-2xl leading-[2.8] tracking-wider text-white/60">
                  名張川に面した旅館の欄干にもたれかかり、<br />
                  川の瀬音を聞きながら、乱歩はぼんやりと夜空を見上げていた。
                </p>
                <p className="text-3xl leading-[2.8] tracking-wider text-white/40">そこに、客があった。</p>
                <blockquote className="text-4xl font-light tracking-widest text-white/90 leading-[2.5]">
                  「先生の生まれた家を、<br />私が知っているのです」
                </blockquote>
                <p className="text-2xl tracking-wider" style={{ color: "#c04444" }}>本町の書店主　岡村繁次郎</p>
                <div className="text-2xl leading-[2.8] text-white/50 text-left space-y-8">
                  <p>乱歩の顔に、一瞬、ただごとでない色がはしった。</p>
                  <p>昭和十二年、旅の途中に名張駅で降りて、生家を求めてさまよったことがある。そのときは見つけられなかった。幻のように脳裡につきまとっていた生家が、翌朝ついに姿を現そうとしていた。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3枚目：夜明け（暁） ── */}
        <div id="section-3" className="relative h-screen w-full snap-start overflow-hidden">
          <div
            ref={exteriorBgRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.12) translateY(140px)", willChange: "transform" }}
          >
            <Image src="/images/seifutei-exterior.jpeg" alt="清風亭の外観" fill className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.82) 100%)" }} />
          {/* ヘッダー(56px)を避けて top-14 から開始。flex centering との overflow 衝突も解消 */}
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-y-auto snap-hide-scrollbar">
            <div className="min-h-full flex flex-col items-center justify-center px-8 text-center py-4">
              <p className="dawn-fade text-xl tracking-[0.5em] mb-4"
                 style={{ color: "#c04444", opacity: 0, transform: "translateY(20px)" }}>
                昭和二十七年　九月二十七日　暁
              </p>
              <div className="text-xl md:text-3xl font-light tracking-widest text-[#f0ebe0] leading-[2.2] mb-4">
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>清風亭の夜が明け、</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>名張の町が動き出す。</span>
              </div>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2] mb-4">
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>五十七年の歳月を経て、</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>ひっそりと守られてきた生誕の地へ。</span>
              </div>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2]">
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>乱歩にとっては</span>
                <span className="dawn-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>『ふるさと発見』の朝であった。</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4枚目：故郷の誕生 ── */}
        <div id="section-4" className="relative h-screen w-full snap-start overflow-hidden">
          <div
            ref={hiawaiiBgRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.12) translateY(140px)", willChange: "transform" }}
          >
            <Image src="/images/nabari-hiawai.jpeg" alt="生誕地に続く路地（ひあわい）" fill className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.82) 100%)" }} />
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-y-auto snap-hide-scrollbar">
            <div className="min-h-full flex flex-col items-center justify-center px-8 text-center py-4">
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2] mb-1">
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>ただの「生まれた町」が、この日、</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>切っても切れない</span>
              </div>
              <p className="hiawai-fade text-2xl md:text-4xl font-light tracking-widest text-[#f0ebe0] mb-4"
                 style={{ opacity: 0, transform: "translateY(20px)" }}>
                「ふるさと」になった。
              </p>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2] mb-1">
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>生誕の地をひっそりと守り続け、</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>熱を込めて自分を迎えてくれる</span>
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>名張の人々の眼差し。</span>
              </div>
              <div className="text-base md:text-2xl font-light tracking-wider text-[#f0ebe0]/70 leading-[2.2]">
                <span className="hiawai-fade block" style={{ opacity: 0, transform: "translateY(20px)" }}>彼らの存在こそが、乱歩の心に</span>
              </div>
              <div className="hiawai-fade h-[4.5em]" style={{ opacity: 0, transform: "translateY(20px)" }} />
              <span className="hiawai-fade block text-base md:text-2xl font-light tracking-wider leading-[2.2]" style={{ opacity: 0, transform: "translateY(20px)", color: "#c04444" }}>本当の「ふるさと」を創り出したのだ。</span>
            </div>
          </div>
        </div>

        {/* ── 5枚目：桝田医院 ── */}
        <div id="section-5" className="relative h-screen w-full snap-start overflow-hidden">
          <div
            ref={masudaBgRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.12) translateY(140px)", willChange: "transform" }}
          >
            <Image src="/images/nabari-masuda-now.jpeg" alt="現在の桝田医院跡の通り" fill className="object-cover object-center" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, transparent 0%, rgba(0,0,0,0.55) 100%)" }} />
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-hidden">
            {/* スクロールするテキスト */}
            <div id="masuda-scroll" className="absolute w-full text-center px-8" style={{ transform: "translateY(100vh)" }}>
              <div className="py-16 flex flex-col items-center gap-8">
                <p className="text-xl tracking-[0.5em]" style={{ color: "#c04444" }}>九月二十七日　朝</p>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/70">
                  <span>岡村繁次郎と富森高太郎に案内されて、</span>
                  <span>乱歩は桝田医院を訪ねた。</span>
                </div>
                <p className="text-xl md:text-3xl font-light tracking-widest text-[#f0ebe0]">
                  自分が生まれた借家は、もうそこにはなかった。
                </p>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/70">
                  <span>昭和二十六年——</span>
                  <span>この建物は横山家から桝田医師の手に渡っていた。</span>
                  <span>乱歩は、建て替えられた本宅の二階に案内された。</span>
                </div>
              </div>
            </div>
            {/* 写真：背景から浮き出す */}
            <div id="masuda-photo" className="absolute top-1/2 left-1/2 flex flex-col gap-1" style={{ transform: "translateX(-50%) translateY(-50%)", width: "min(432px, 88vw)", opacity: 0 }}>
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image src="/images/masuda-with-rampo.jpg" alt="桝田医師と乱歩" fill className="object-cover object-center" loading="lazy" style={{ filter: "brightness(0.6)", transform: "scale(1.08)", transformOrigin: "center" }} />
                <p className="absolute bottom-0 left-0 right-0 text-center text-sm tracking-wider py-1 bg-black/60" style={{ color: "rgba(255,255,255,0.9)" }}>昭和二十七年　桝田医師と乱歩</p>
              </div>
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image src="/images/rampo-alley.jpg" alt="借家跡に立つ乱歩" fill className="object-cover object-center" loading="lazy" style={{ filter: "brightness(0.6)", transform: "scale(1.08)", transformOrigin: "center" }} />
                <p className="absolute bottom-0 left-0 right-0 text-center text-sm tracking-wider py-1 bg-black/60" style={{ color: "rgba(255,255,255,0.9)" }}>借家跡に立つ乱歩</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 6枚目：河原 ── */}
        <div id="section-6" className="relative h-screen w-full snap-start overflow-hidden">
          <div
            ref={riverBgRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.12) translateY(140px)", willChange: "transform" }}
          >
            <Image src="/images/nabari-river-now.jpeg" alt="現在の名張川河原" fill className="object-cover object-center" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 50% 50%, transparent 0%, rgba(0,0,0,0.60) 100%)" }} />
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-hidden">
            {/* スクロールするテキスト */}
            <div id="river-scroll" className="absolute w-full text-center px-8" style={{ transform: "translateY(100vh)" }}>
              <div className="py-16 flex flex-col items-center gap-8">
                <p className="text-xl tracking-[0.5em]" style={{ color: "#c04444" }}>九月二十七日　午後</p>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/70">
                  <span>桝田医院から辻酒店に向かう前に、</span>
                  <span>乱歩は河原に出てみた。</span>
                </div>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/70">
                  <span>川までの石組みがしてあって、</span>
                  <span>洗濯ができるようになっている。</span>
                </div>
                <p className="text-xl md:text-3xl font-light tracking-widest text-[#f0ebe0]">
                  母は毎日ここにきて洗濯していたのだ。
                </p>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/60">
                  <span>乱歩は当時の母の様子を思いながら、</span>
                  <span className="text-xl md:text-3xl font-light tracking-widest" style={{ color: "#c04444" }}>故郷の空を見上げた。</span>
                </div>
              </div>
            </div>
            {/* 写真：背景から浮き出す */}
            <div id="river-photo" className="absolute top-1/2 left-1/2 aspect-[4/3] overflow-hidden" style={{ transform: "translateX(-50%) translateY(-50%)", width: "min(432px, 88vw)", opacity: 0 }}>
              <Image src="/images/rampo-river.jpg" alt="河原に立つ乱歩" fill className="object-cover object-center" loading="lazy" style={{ filter: "brightness(0.6)", transform: "scale(1.18)" }} />
              <p className="absolute bottom-0 left-0 right-0 text-center text-sm tracking-wider py-1 bg-black/60" style={{ color: "rgba(255,255,255,0.9)" }}>昭和二十七年　名張川にて</p>
            </div>
          </div>
        </div>

        {/* ── 7枚目：辻酒店・結び ── */}
        <div id="section-7" className="relative h-screen w-full snap-start overflow-hidden">
          <div
            ref={tsujiRef}
            className="absolute inset-0"
            style={{ transform: "scale(1.0) translateY(0px)", willChange: "transform" }}
          >
            <Image src="/images/IMG_2639.jpeg" alt="辻せきが作った人形たち" fill className="object-cover" style={{ objectPosition: "center center" }} loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.65) 100%)" }} />
          <div className="absolute left-0 right-0 bottom-0 top-14 overflow-hidden">
            {/* 日記写真：背景から浮き出す */}
            <div id="tsuji-photo" className="flex flex-col" style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)", width: "min(432px, 88vw)", opacity: 0 }}>
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image src="/images/seki-diary.jpeg" alt="辻せきの日記" fill className="object-cover object-top" loading="lazy" style={{ filter: "brightness(0.75) sepia(0.2)" }} />
              </div>
              <p className="text-center text-xs tracking-wider py-2 text-[#f0ebe0]/60">辻せきの日記　昭和二十七年九月二十七日</p>
            </div>
            <div id="tsuji-scroll" className="absolute w-full text-center px-8" style={{ transform: "translateY(100vh)" }}>
              <div className="py-20 flex flex-col items-center gap-8">
                <p className="text-xl tracking-[0.5em]" style={{ color: "#c04444" }}>九月二十七日　午後</p>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/80">
                  <span>乱歩は辻酒店を訪れた。</span>
                  <span>辻せきとの、五十七年ぶりの再会である。</span>
                </div>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/60 my-4">
                  <span>「こちらは横山にいた平井さんの息子さんだ」</span>
                  <span className="text-2xl md:text-3xl text-[#f0ebe0]/90">「まあ。大きくおなりなさって」</span>
                </div>
                <div className="flex flex-col items-center gap-[2.5em] text-base md:text-xl font-light tracking-wider text-[#f0ebe0]/70">
                  <span>乱歩に会ったせきの、第一声だった。</span>
                  <span>前にみたのは、赤ん坊の乱歩だったのだから。</span>
                </div>
                <div className="h-12" />
                <p className="text-base tracking-[0.5em] text-[#f0ebe0]/60">せきの日記より</p>
                <div className="h-4" />
                <p className="text-base tracking-[0.3em] text-[#f0ebe0]/70">昭和二十七年　九月二十七日</p>
                <div className="flex flex-col items-center gap-[2.5em] text-xl md:text-3xl font-light tracking-widest text-[#f0ebe0]/80">
                  <span>本名平井太郎君　江戸川らん歩さん、</span>
                  <span>お母さんの乳房にすがる姿</span>
                </div>
                <p className="text-xl md:text-3xl font-light tracking-widest mt-4" style={{ color: "#c04444" }}>目に浮かぶ。</p>
                <div className="flex flex-col items-center gap-[2.5em] text-lg md:text-2xl font-light tracking-wider text-[#f0ebe0]/60 mt-6">
                  <span>今は五十九才</span>
                  <span>さすが有名の人物と見受けた</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>{/* /スナップコンテナ */}

    </main>
  );
}
