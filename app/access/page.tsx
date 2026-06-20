export default function AccessPage() {
  return (
    <main className="min-h-screen">
      <div className="py-20 px-8 text-center border-b border-[#d4c9b0]">
        <a href="/" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← 戻る
        </a>
        <h1 className="mt-8 text-2xl font-light tracking-widest text-[var(--foreground)]">
          来館案内
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-20 space-y-20">

        {/* 所在地 */}
        <section>
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">所在地</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-3">
            <p className="text-base text-[var(--foreground)] tracking-wide">
              乱歩と名張
            </p>
            <p className="text-sm text-[var(--muted)] leading-loose">
              〒518-0727<br />
              三重県名張市新町193番地
            </p>
            <p className="text-sm text-[var(--muted)]">
              TEL：0595-68-0880
            </p>
          </div>
        </section>

        {/* 交通案内 */}
        <section>
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">交通案内</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-6">
            <div>
              <p className="text-sm text-[var(--foreground)] mb-2">電車でお越しの場合</p>
              <p className="text-sm text-[var(--muted)] leading-loose">
                近鉄「名張」駅から南西へ約1.1km<br />
                徒歩約14分
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--foreground)] mb-2">大阪方面から</p>
              <p className="text-sm text-[var(--muted)] leading-loose">
                近鉄大阪線「鶴橋」から約1時間30分<br />
                近鉄名古屋線「近鉄名古屋」から「大和八木」乗り換え<br />
                近鉄大阪線にて計約1時間30分
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--foreground)] mb-2">名古屋方面から</p>
              <p className="text-sm text-[var(--muted)] leading-loose">
                近鉄名古屋線「近鉄名古屋」から約1時間30分
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--foreground)] mb-2">京都・奈良方面から</p>
              <p className="text-sm text-[var(--muted)] leading-loose">
                近鉄京都線「京都」から約1時間30分
              </p>
            </div>
            <p className="text-xs text-[var(--muted)]">
              ※お車の場合、ミュージアム周辺のコインパーキング等をご利用ください。
            </p>
          </div>
        </section>

        {/* 予約について */}
        <section>
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">ご予約について</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-4">
            <p className="text-sm leading-[2.2] text-[var(--foreground)]">
              当ミュージアムは日時指定の完全予約制です。
            </p>
            <p className="text-sm leading-[2.2] text-[var(--muted)]">
              下記QRコードまたはWEBサイトからご予約ください。<br />
              前日午後3時までにご予約をお願いいたします。
            </p>
            <p className="text-sm text-[var(--muted)]">
              ※小学3年生未満はご入館できません。
            </p>
          </div>
        </section>

        {/* 協力金 */}
        <section>
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">施設維持協力金</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-4">
            <div className="flex items-baseline gap-6">
              <span className="text-sm text-[var(--foreground)] w-40 shrink-0">クラウドファンディング支援者</span>
              <span className="text-sm text-[var(--muted)]">無料<br /><span className="text-xs">（ハガキで参加者2名まで無料）</span></span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-sm text-[var(--foreground)] w-40 shrink-0">一般見学者</span>
              <span className="text-sm text-[var(--muted)]">1名1,000円〜の施設維持協力金</span>
            </div>
          </div>
        </section>

        {/* お問い合わせ */}
        <section>
          <p className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8">お問い合わせ</p>
          <div className="border-l-2 border-[#d4c9b0] pl-8 space-y-3">
            <p className="text-sm text-[var(--muted)] leading-loose">
              お問い合わせは原則WEBサイトよりお願いいたします。
            </p>
            <p className="text-sm text-[var(--muted)]">TEL：0595-68-0880</p>
            <p className="text-sm text-[var(--muted)]">EMAIL：cupoftea0414@gmail.com</p>
          </div>
        </section>

      </div>

      {/* 予約CTA */}
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
          乱歩と名張
        </p>
      </footer>
    </main>
  );
}
