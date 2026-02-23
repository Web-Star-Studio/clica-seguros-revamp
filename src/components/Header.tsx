"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-10 md:py-10 text-white">
        {/* Left Menu Icon */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className="flex flex-col gap-2 w-8 h-8 items-start justify-center cursor-pointer group hover:opacity-80 transition-opacity"
        >
          <span className="block h-[2px] w-8 bg-white transition-all" />
          <span className="block h-[2px] w-8 bg-white transition-all" />
        </button>

        {/* Center Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <Image
            src="/assets/logos/clica-logo.png"
            alt="Clica Seguros Logo"
            width={150}
            height={40}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right Simulador Link */}
        <Link
          href="/simulador"
          className="text-sm font-medium tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          Simulador
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </Link>
      </header>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
