const rooms = [
  {
    name: "乱歩サロン「二銭銅貨」",
    description: "乱歩の世界観を体感するエントランスサロン。乱歩の代表作「二銭銅貨」から名をとった。",
    image: "/images/room-tatami.jpeg",
  },
  {
    name: "赤い部屋",
    description: "乱歩の短編小説「赤い部屋」の世界を体感する空間。名張の廃病院という環境を最大に生かした展示。",
    image: "/images/room-red.jpeg",
  },
  {
    name: "明智探偵事務所",
    description: "名探偵・明智小五郎の事務所を再現。乱歩作品の世界に没入できる展示室。",
    image: "/images/room-akachi-office.jpeg",
  },
  {
    name: "明智小五郎の部屋",
    description: "乱歩が生み出した日本最初の名探偵、明智小五郎の生活空間を再現した部屋。",
    image: "/images/room-akachi.jpeg",
  },
  {
    name: "手術室",
    description: "昔の医療器具がそのまま残る旧桝田医院の手術室。時間が止まったような空間に、乱歩の世界観が重なる。",
    image: null,
  },
  {
    name: "X線室（映写室）",
    description: "旧X線室を改装した映写室。乱歩自身が持参した16ミリカメラで撮影した、70年前の名張の映像を上映。立教大学大衆文化研究センターより借用。",
    image: null,
  },
];

import Image from "next/image";

export default function MuseumPage() {
  return (
    <main className="min-h-screen">
      {/* ヘッダー */}
      <div className="py-20 px-8 text-center border-b border-[#d4c9b0]">
        <a href="/" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← 戻る
        </a>
        <h1 className="mt-8 text-2xl font-light tracking-widest text-[var(--foreground)]">
          ミュージアムについて
        </h1>
        <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
          令和七年十一月三日、開館。<br />
          生誕地碑除幕式からちょうど七十年目の日に。
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-20">

        {/* 場所について */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">この場所について</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              ここは、明治二十七年に江戸川乱歩が生まれた場所です。
              名張市新町の旧桝田医院——乱歩の父が借りていた家があった場所に、
              その後医院が建てられました。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              平成二十八年に廃業し、老朽化が進んでいたこの建物を、
              辻孝信が取得しました。
              解体されれば、百三十年の記憶が消える。
              その危機を回避するために。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              廃病院という環境をそのままに、乱歩の世界観を重ねた施設として再生しました。
              昭和三十年十一月三日の生誕地碑除幕式から、ちょうど七十年目にあたる
              令和七年十一月三日に開館しました。
            </p>
          </div>
        </section>

        {/* 体験について */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">来館体験について</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              完全予約制。少人数。約九十分。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              予約の瞬間から、展示は始まっています。
              来館前にお届けするメッセージが、
              あなたをこの場所の記憶へと静かに誘います。
            </p>
            <p className="text-base leading-[2.4] text-[var(--foreground)]">
              小学校3年生未満のご入館はできません。
              前日午後3時までにご予約ください。
            </p>
          </div>
        </section>

        {/* 展示室 */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-12 text-center">展示室</p>
          <div className="space-y-16">
            {rooms.map((room, i) => (
              <div key={i} className="border-b border-[#e8e0d0] pb-16 last:border-0">
                {room.image && (
                  <div className="relative w-full aspect-[4/3] mb-8 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-base tracking-wider text-[var(--foreground)] mb-3">
                  {room.name}
                </h3>
                <p className="text-sm leading-[2.2] text-[var(--muted)]">
                  {room.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 連携 */}
        <section className="mb-24">
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">連携施設</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-4">
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">立教大学大衆文化研究センター</p>
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">池袋・乱歩邸</p>
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">鳥羽乱歩館</p>
          </div>
        </section>

        {/* 乱歩の言葉 */}
        <section className="py-16 px-8 bg-[#1a1a1a] text-center mb-8 -mx-8">
          <p className="text-xs tracking-[0.4em] text-white/30 mb-10">
            江戸川乱歩「生誕碑除幕式」より
          </p>
          <blockquote className="text-base font-light leading-[2.8] tracking-wider text-white/80">
            「うつし世はゆめ、<br />
            よるの夢こそまこと」
          </blockquote>
          <p className="text-xs text-white/30 mt-6">― 生誕地碑裏面に刻まれた言葉</p>
        </section>

      </div>

      {/* CTA */}
      <div className="border-t border-[#d4c9b0] py-24 px-8 text-center">
        <a
          href="/reserve"
          className="inline-block bg-[var(--accent)] text-white px-14 py-5 text-xs tracking-[0.3em] hover:opacity-80 transition-opacity duration-300"
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
