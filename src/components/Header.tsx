"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLAnchorElement[]>([]);

    useEffect(() => {
        if (isOpen) {
            // Open Animation
            gsap.to(menuRef.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.inOut",
            });

            gsap.fromTo(
                linksRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.4, // Wait for background to slide in
                }
            );
        } else {
            // Close Animation
            gsap.to(menuRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power3.inOut",
            });
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Sobre", href: "/sobre" },
        { label: "Simulador", href: "/simulador" },
        { label: "Blog", href: "/blog" },
        { label: "Ajuda", href: "/ajuda" },
    ];

    const socialLinks = [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "WhatsApp", href: "#" },
    ];

    const legalLinks = [
        { label: "Política de Privacidade", href: "/privacy-policy" },
        { label: "Termos de Uso", href: "#" },
    ];

    return (
        <>
            {/* Persistent Header */}
            <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-10 md:py-10 text-white mix-blend-difference">
                {/* Left Menu Button */}
                <button
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close Menu" : "Open Menu"}
                    className="flex items-center gap-4 cursor-pointer group hover:opacity-80 transition-opacity z-50 min-w-[80px]"
                >
                    {isOpen ? (
                        <>
                            <span className="block h-[2px] w-8 bg-white transition-all"></span>
                            <span className="text-sm font-medium tracking-wide">Close</span>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2 w-8 h-8 items-start justify-center">
                            <span className="block h-[2px] w-8 bg-white transition-all"></span>
                            <span className="block h-[2px] w-8 bg-white transition-all"></span>
                        </div>
                    )}
                </button>

                {/* Center Logo Area */}
                <Link
                    href="/"
                    className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity z-50"
                    aria-label="Home"
                    onClick={() => setIsOpen(false)}
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
                    className="text-sm font-medium tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity z-50"
                    onClick={() => setIsOpen(false)}
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
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </Link>
            </header>

            {/* Fullscreen Overlay Menu */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-[#0d84ff] flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-32 md:p-24 overflow-y-auto"
                style={{ transform: "translateY(-100%)" }}
            >
                {/* Left column (Social & Legal) */}
                <div className="flex flex-col h-full justify-between gap-16 md:gap-0 mt-8 md:mt-24">
                    <div className="flex flex-col gap-2">
                        {socialLinks.map((link, i) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-white text-lg font-medium hover:opacity-75 transition-opacity"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1 mt-auto whitespace-nowrap">
                        {legalLinks.map((link, i) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-white/80 text-xs font-medium hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Center column (Main Navigation) */}
                <div className="flex flex-col gap-2 md:gap-4 mt-16 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            ref={(el) => {
                                if (el) linksRef.current[i] = el;
                            }}
                            className="text-white text-5xl md:text-7xl font-semibold tracking-tight hover:opacity-75 transition-opacity"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
