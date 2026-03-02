"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const navLinks = [
  { label: "Sobre", href: "/sobre" },
  { label: "Simulador", href: "/simulador" },
  { label: "Blog", href: "/blog" },
  { label: "Ajuda", href: "/ajuda" },
  { label: "Contato", href: "/contato" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const footerLinks = [
  { label: "Política de Privacidade", href: "/privacy-policy" },
  { label: "Termos de Uso", href: "#" },
];

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const deepLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const topLayerRef = useRef<HTMLDivElement>(null);
  const layerRevealPx = 14;

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    const deepLayer = deepLayerRef.current;
    const midLayer = midLayerRef.current;
    const topLayer = topLayerRef.current;
    if (!panel || !backdrop || !content || !deepLayer || !midLayer || !topLayer) return;

    // Blur the page content behind the menu
    const pageContent = document.getElementById("page-content");

    if (isOpen) {
      gsap.set(backdrop, { display: "block", opacity: 0 });
      gsap.set(panel, { display: "flex" });
      gsap.set([deepLayer, midLayer, topLayer], { yPercent: -100 });
      gsap.set(content.querySelectorAll(".menu-nav-item"), { opacity: 0, y: 40 });
      gsap.set(content.querySelectorAll(".menu-social-item"), { opacity: 0, y: 15 });
      gsap.set(content.querySelectorAll(".menu-footer-item"), { opacity: 0 });
      gsap.set(content.querySelector(".menu-close-btn"), { opacity: 0, y: -15 });

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      tl.to(backdrop, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 0)
        .to(deepLayer, {
          yPercent: 0,
          duration: 0.95,
          ease: "power4.inOut",
        }, 0)
        .to(midLayer, {
          yPercent: 0,
          duration: 0.92,
          ease: "power4.inOut",
        }, 0.08)
        .to(topLayer, {
          yPercent: 0,
          duration: 0.88,
          ease: "power4.inOut",
        }, 0.16)
        .to(
          content.querySelector(".menu-close-btn"),
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          0.62
        )
        .to(
          content.querySelectorAll(".menu-nav-item"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
          0.62
        )
        .to(
          content.querySelectorAll(".menu-social-item"),
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power3.out" },
          0.67
        )
        .to(
          content.querySelectorAll(".menu-footer-item"),
          { opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
          0.72
        );

      if (pageContent) {
        gsap.to(pageContent, {
          filter: "blur(12px)",
          scale: 0.97,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    } else {
      if (panel.style.display === "none") return;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(panel, { display: "none" });
          gsap.set(backdrop, { display: "none" });
          document.body.style.overflow = "";
        },
      });

      tl.to(
        content.querySelectorAll(".menu-nav-item, .menu-social-item, .menu-footer-item, .menu-close-btn"),
        { opacity: 0, y: -15, duration: 0.25, stagger: 0.02, ease: "power3.in" },
        0
      )
        .to(topLayer, {
          yPercent: -100,
          duration: 0.56,
          ease: "power4.inOut",
        }, 0.1)
        .to(midLayer, {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.inOut",
        }, 0.15)
        .to(deepLayer, {
          yPercent: -100,
          duration: 0.64,
          ease: "power4.inOut",
        }, 0.2)
        .to(backdrop, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        }, 0.2);

      if (pageContent) {
        gsap.to(pageContent, {
          filter: "blur(0px)",
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40"
        style={{ display: "none" }}
      />

      {/* Menu panel — 60vh with rounded bottom */}
      <div
        ref={panelRef}
        className="fixed top-0 left-0 right-0 z-[9999] h-[60vh] flex-col shadow-2xl"
        style={{ display: "none" }}
      >
        {/* Deep layer: purple */}
        <div
          ref={deepLayerRef}
          className="absolute inset-x-0 top-0 bottom-0 rounded-b-[40px] md:rounded-b-[60px] bg-[#5a2fd2]"
        />

        {/* Middle layer: white */}
        <div
          ref={midLayerRef}
          className="absolute inset-x-0 top-0 rounded-b-[40px] md:rounded-b-[60px] bg-[#f7f5ef]"
          style={{ bottom: `${layerRevealPx}px` }}
        />

        {/* Top layer: current blue */}
        <div
          ref={topLayerRef}
          className="absolute inset-x-0 top-0 rounded-b-[40px] md:rounded-b-[60px] bg-[#0d84ff]"
          style={{ bottom: `${layerRevealPx * 2}px` }}
        />

        <div
          ref={contentRef}
          className="relative z-10 flex flex-col h-full box-border"
          style={{ paddingBottom: `${layerRevealPx * 2}px` }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-8 md:px-10 md:py-10">
            <button
              onClick={onClose}
              className="menu-close-btn text-white text-sm font-medium tracking-wide flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Fechar menu"
            >
              <span className="relative w-8 h-8 flex items-center justify-center">
                <span className="absolute h-[2px] w-8 bg-white rotate-45" />
                <span className="absolute h-[2px] w-8 bg-white -rotate-45" />
              </span>
              Fechar
            </button>

            <Link
              href="/simulador"
              className="text-white text-sm font-medium tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity"
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
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-row px-6 md:px-10 pb-6 md:pb-10 min-h-0">
            {/* Left column — social + footer links */}
            <div className="hidden md:flex w-48 flex-col justify-between">
              <nav className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-social-item text-white text-sm font-medium hover:opacity-70 transition-opacity w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <nav className="flex flex-col gap-1">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="menu-footer-item text-white/50 text-[11px] font-medium hover:text-white/80 transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center — main navigation */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="menu-nav-item text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right spacer for symmetry */}
            <div className="hidden md:block w-48" />

            {/* Mobile social links */}
            <div className="flex md:hidden absolute bottom-6 left-6">
              <nav className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-social-item text-white text-xs font-medium hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
