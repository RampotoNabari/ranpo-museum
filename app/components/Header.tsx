"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center transition-colors duration-500 ${isHome ? "bg-transparent" : "bg-[var(--background)] border-b border-[#d4c9b0]"}`}>
      <Link href="/" className={`text-xs tracking-[0.3em] hover:opacity-60 transition-opacity ${isHome ? "text-white/70" : "text-[var(--muted)]"}`}>
        江戸川乱歩生誕地ミュージアム
      </Link>

      {/* デスクトップナビ */}
      <nav className="hidden md:flex gap-10">
        <Link href="/story" className={`text-xs tracking-[0.25em] hover:opacity-60 transition-opacity ${isHome ? "text-white/70" : "text-[var(--muted)]"}`}>
          物語
        </Link>
        <Link href="/reserve" className={`text-xs tracking-[0.25em] hover:opacity-60 transition-opacity ${isHome ? "text-white/70" : "text-[var(--muted)]"}`}>
          予約
        </Link>
      </nav>

      {/* モバイルメニューボタン */}
      <button
        className={`md:hidden text-xs tracking-[0.2em] hover:opacity-60 transition-opacity ${isHome ? "text-white/70" : "text-[var(--muted)]"}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "閉じる" : "メニュー"}
      </button>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[#d4c9b0] py-8 flex flex-col items-center gap-8 md:hidden">
          <Link href="/story" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors" onClick={() => setMenuOpen(false)}>
            物語
          </Link>
          <Link href="/reserve" className="text-xs tracking-[0.3em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors" onClick={() => setMenuOpen(false)}>
            予約
          </Link>
        </div>
      )}
    </header>
  );
}
