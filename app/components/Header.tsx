"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const chapters = [
  { label: "ふるさと発見", href: "/nabari", available: true },
  { label: "せきの日記", href: "/seki", available: false },
  { label: "生誕碑除幕式", href: "/unveiling", available: false },
  { label: "横山文圭・よしえ", href: "/yokoyama", available: false },
  { label: "生誕地ミュージアム", href: "/museum", available: false },
];

export default function Header() {
  const pathname = usePathname();
  const isDark = ["/" , "/nabari", "/stories"].some(p => pathname === p || pathname.startsWith("/nabari"));
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (available: boolean) =>
    `text-xs tracking-[0.25em] transition-opacity ${
      isDark ? "text-white/70" : "text-[var(--muted)]"
    } ${available ? "hover:opacity-60" : "opacity-30 pointer-events-none"}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center transition-colors duration-500 ${isDark ? "bg-black/30 backdrop-blur-sm" : "bg-[var(--background)] border-b border-[#d4c9b0]"}`}>
      <Link href="/" className={`text-xs tracking-[0.3em] hover:opacity-60 transition-opacity ${isDark ? "text-white/70" : "text-[var(--muted)]"}`}>
        乱歩と名張
      </Link>

      {/* デスクトップナビ */}
      <nav className="hidden md:flex gap-8 items-center">
        {chapters.map((ch) => (
          ch.available ? (
            <Link key={ch.href} href={ch.href} className={linkClass(true)}>
              {ch.label}
            </Link>
          ) : (
            <span key={ch.href} className={linkClass(false)}>
              {ch.label}
            </span>
          )
        ))}
        <a
          href="https://www.ranpomuseum.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs tracking-[0.25em] hover:opacity-60 transition-opacity ${isDark ? "text-white/40" : "text-[var(--muted)]/40"}`}
        >
          ミュージアム↗
        </a>
      </nav>

      {/* モバイルメニューボタン */}
      <button
        className={`md:hidden text-xs tracking-[0.2em] hover:opacity-60 transition-opacity ${isDark ? "text-white/70" : "text-[var(--muted)]"}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "閉じる" : "メニュー"}
      </button>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm py-10 flex flex-col items-center gap-8 md:hidden">
          {chapters.map((ch) => (
            ch.available ? (
              <Link
                key={ch.href}
                href={ch.href}
                className="text-xs tracking-[0.3em] text-white/70 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {ch.label}
              </Link>
            ) : (
              <span key={ch.href} className="text-xs tracking-[0.3em] text-white/20">
                {ch.label}
              </span>
            )
          ))}
          <a
            href="https://www.ranpomuseum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.3em] text-white/30 hover:text-white/50 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            ミュージアム↗
          </a>
        </div>
      )}
    </header>
  );
}
