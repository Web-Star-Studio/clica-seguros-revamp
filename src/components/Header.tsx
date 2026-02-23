"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const solidRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const threshold = window.innerHeight * 0.8;
    const solid = solidRef.current;
    if (!solid) return;

    const onScroll = () => {
      const currentY = window.scrollY;
      const pastHero = currentY > threshold;
      const scrollingUp = currentY < lastScrollY.current;

      if (pastHero && scrollingUp) {
        solid.style.transform = "translateY(0)";
      } else {
        solid.style.transform = "translateY(-100%)";
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Original transparent header (always in DOM for hero) */}
      <header data-hero-header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-10 md:py-10 text-white">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className="flex flex-col gap-2 w-8 h-8 items-start justify-center cursor-pointer group hover:opacity-80 transition-opacity"
        >
          <span className="block h-[2px] w-8 bg-white transition-all" />
          <span className="block h-[2px] w-8 bg-white transition-all" />
        </button>

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

        <Link
          href="/simulador"
          className="text-sm font-medium tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          Simulador
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </Link>
      </header>

      {/* Solid header — slides in from top on scroll up */}
      <div
        ref={solidRef}
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 pt-3 transition-transform duration-300 ease-out"
        style={{ transform: "translateY(-100%)" }}
      >
        <div className="flex items-center justify-between bg-[#EEEADF] rounded-full px-6 py-4 md:px-8 md:py-5 shadow-sm">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="flex flex-col gap-2 w-8 h-8 items-start justify-center cursor-pointer group hover:opacity-80 transition-opacity"
          >
            <span className="block h-[2px] w-8 bg-[#1a1a2e] transition-all" />
            <span className="block h-[2px] w-8 bg-[#1a1a2e] transition-all" />
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <Image
              src="/assets/logos/Logotipo Clica seguros - Preto.png"
              alt="Clica Seguros Logo"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          <Link
            href="/simulador"
            className="text-[#1a1a2e] text-sm font-medium tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            Simulador
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>
      </div>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
