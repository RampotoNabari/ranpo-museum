import type { Metadata } from "next";
import { Noto_Serif_JP, Shippori_Mincho, Cormorant_Garamond } from "next/font/google";
import Opening from "./components/Opening";
import CreditScroll from "./components/CreditScroll";
import Hero from "./components/Hero";
import Origin from "./components/Origin";
import Numbers from "./components/Numbers";
import Turn from "./components/Turn";
import Akiya from "./components/Akiya";
import Hakubaiken from "./components/Hakubaiken";
import Spread from "./components/Spread";
import Timeline from "./components/Timeline";
import TownMap from "./components/TownMap";
import Future from "./components/Future";
import Ending from "./components/Ending";

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  weight: ["400", "500", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "乱歩と名張 第二章 | 幾重にも仕組まれた偶然。それを人は運命と呼ぶ。",
  description:
    "江戸川乱歩生誕地ミュージアムから始まった物語は、町へ広がる。空き家に灯りをともし、乱歩の世界を名張の路地に。堆積した時間をつなぎ、循環させる100年構想の第二章。",
  openGraph: {
    title: "乱歩と名張 第二章",
    description:
      "幾重にも仕組まれた偶然。それを人は運命と呼ぶ。——物語は、町へ広がる。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/images/dainisho/hero-hanabi.jpg", width: 2400, height: 1800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "乱歩と名張 第二章",
    description: "物語は、町へ広がる。",
  },
};

export default function Page() {
  return (
    <main
      className={`${notoSerif.variable} ${shippori.variable} ${cormorant.variable} dainisho-root grain antialiased`}
    >
      <Opening />
      <CreditScroll />
      <Hero />
      <Origin />
      <Numbers />
      <Turn />
      <Akiya />
      <Hakubaiken />
      <Spread />
      <Timeline />
      <TownMap />
      <Future />
      <Ending />
    </main>
  );
}
