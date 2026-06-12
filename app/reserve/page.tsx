"use client";

import { useState } from "react";
import { schedule, prefectures } from "./schedule";

// ここにFormspreeのIDを入れてください（設定後に更新します）
const FORMSPREE_ID = "mdavwbwa";

export default function ReservePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    prefecture: "",
    email: "",
    people: "",
    crowdfunding: "",
    month: "",
    date: "",
    note: "",
  });

  const selectedMonth = schedule.find((s) => s.month === form.month);
  const selectedDateObj = selectedMonth?.dates.find((d) => d.label === form.date);
  const availableTimes = selectedDateObj?.times ?? [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "month") {
      setForm({ ...form, month: value, date: "" });
      setSelectedTime("");
    } else if (name === "date") {
      setForm({ ...form, date: value });
      setSelectedTime("");
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      "_subject": "【来館予約】" + form.name + "様 " + form.date + " " + selectedTime,
      "【お名前】": form.name,
      "【メールアドレス】": form.email,
      "【希望日】": form.date,
      "【希望時間】": selectedTime,
      "電話番号": form.phone,
      "都道府県": form.prefecture,
      "来館人数": form.people,
      "クラウドファンディング支援": form.crowdfunding,
      "連絡事項": form.note || "なし",
    };

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("送信に失敗しました。もう一度お試しください。");
      }
    } catch {
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  const labelClass = "block text-xs tracking-[0.2em] text-[var(--muted)] mb-3";
  const inputClass = "w-full bg-transparent border-b border-[#d4c9b0] py-3 text-base text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors";
  const selectClass = inputClass + " cursor-pointer";

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <p className="text-xs tracking-[0.3em] text-[var(--muted)] mb-12">予約完了</p>
        <h1 className="text-2xl font-light leading-loose tracking-wider text-[var(--foreground)] mb-12">
          あなたは今、<br />
          130年続く記憶の連鎖に<br />
          加わりました。
        </h1>
        <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm mb-16">
          来館の3日前に、一通のメッセージをお送りします。<br />
          それが、展示の始まりです。
        </p>
        <a href="/" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← トップへ戻る
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="py-20 px-8 text-center border-b border-[#d4c9b0]">
        <a href="/" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← 戻る
        </a>
        <h1 className="mt-8 text-2xl font-light tracking-widest text-[var(--foreground)]">
          来館予約
        </h1>
        <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
          前日午後3時までにご予約ください
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          小学校3年未満のご入館はできません
        </p>
      </div>

      <div className="max-w-lg mx-auto px-8 py-20">
        <form onSubmit={handleSubmit} className="space-y-10">

          <div>
            <label className={labelClass}>氏名 *</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="山田 太郎" />
          </div>

          <div>
            <label className={labelClass}>電話番号 *</label>
            <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className={inputClass} placeholder="090-0000-0000" />
          </div>

          <div>
            <label className={labelClass}>ご住所（都道府県）*</label>
            <select name="prefecture" required value={form.prefecture} onChange={handleChange} className={selectClass}>
              <option value="" className="bg-[var(--background)]">選択してください</option>
              {prefectures.map((p) => (
                <option key={p} value={p} className="bg-[var(--background)]">{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>メールアドレス *</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
          </div>

          <div>
            <label className={labelClass}>来館人数 *</label>
            <select name="people" required value={form.people} onChange={handleChange} className={selectClass}>
              <option value="" className="bg-[var(--background)]">選択してください</option>
              {["1名", "2名", "3名", "4名", "5名"].map((n) => (
                <option key={n} value={n} className="bg-[var(--background)]">{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>クラウドファンディング支援の有無 *</label>
            <p className="text-xs text-[var(--muted)] mb-3 leading-relaxed">
              一般見学者にはお一人様1,000円〜の施設維持協力金を申し受けます
            </p>
            <select name="crowdfunding" required value={form.crowdfunding} onChange={handleChange} className={selectClass}>
              <option value="" className="bg-[var(--background)]">選択してください</option>
              <option value="支援者" className="bg-[var(--background)]">クラウドファンディング支援者</option>
              <option value="一般" className="bg-[var(--background)]">一般見学者</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>ご希望の月 *</label>
            <select name="month" required value={form.month} onChange={handleChange} className={selectClass}>
              <option value="" className="bg-[var(--background)]">選択してください</option>
              {schedule.map((s) => (
                <option key={s.month} value={s.month} className="bg-[var(--background)]">{s.month}のご予約</option>
              ))}
            </select>
          </div>

          {selectedMonth && (
            <div>
              <label className={labelClass}>来館希望日 *</label>
              <select name="date" required value={form.date} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[var(--background)]">選択してください</option>
                {selectedMonth.dates.map((d) => (
                  <option key={d.label} value={d.label} className="bg-[var(--background)]">{d.label}</option>
                ))}
              </select>
            </div>
          )}

          {availableTimes.length > 0 && (
            <div>
              <label className={labelClass}>希望時間 *</label>
              <div className="grid grid-cols-3 gap-3 mt-1">
                {availableTimes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 text-sm border transition-colors duration-200 ${
                      selectedTime === t
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                        : "border-[#d4c9b0] text-[var(--foreground)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>連絡事項</label>
            <textarea name="note" value={form.note} onChange={handleChange} rows={4} className={inputClass + " resize-none"} placeholder="ご質問・ご要望など、自由にどうぞ。" />
          </div>

          <div className="pt-6 text-center">
            <button
              type="submit"
              disabled={!selectedTime || submitting}
              className="inline-block bg-[var(--accent)] text-[var(--background)] px-12 py-4 text-sm tracking-[0.2em] hover:opacity-80 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "送信中..." : "予約する"}
            </button>
          </div>
        </form>
      </div>

      <footer className="py-8 px-8 border-t border-[#d4c9b0] text-center mt-8">
        <p className="text-xs text-[var(--muted)] tracking-widest">
          江戸川乱歩生誕地ミュージアム ― 名張
        </p>
      </footer>
    </main>
  );
}
