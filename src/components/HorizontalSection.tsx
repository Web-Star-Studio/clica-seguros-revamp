"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSection() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);
    const image3Ref = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const ctaWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const ctaButtonRef = useRef<HTMLAnchorElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);
    const blogCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const blogHeadingRef = useRef<HTMLHeadingElement>(null);
    const blogButtonRef = useRef<HTMLAnchorElement>(null);
    const saibaMaisButtonClass =
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#1a1a2e]/20 bg-white px-5 py-2.5 text-[1.05rem] font-bold italic leading-none tracking-[0.01em] text-[#1a1a2e] transition-[color,border-color,transform] duration-300 ease-out hover:text-white hover:border-[#0d84ff]/70 focus-visible:text-white focus-visible:border-[#0d84ff]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d84ff]/30 active:translate-y-px";
    const saibaMaisLayerBaseClass =
        "pointer-events-none absolute inset-0 -translate-x-[104%] transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0";
    const handleSaibaMaisClick = () => {
        router.push("/simulador");
    };

    useEffect(() => {
        const container = containerRef.current;
        const headline = headlineRef.current;
        const img1 = image1Ref.current;
        const img2 = image2Ref.current;
        const img3 = image3Ref.current;
        const txt1 = text1Ref.current;
        const txt2 = text2Ref.current;
        const txt3 = text3Ref.current;
        const cta = ctaRef.current;
        const ctaButton = ctaButtonRef.current;
        const ctaWords = ctaWordsRef.current.filter(Boolean) as HTMLSpanElement[];
        const blog = blogRef.current;
        const blogHeading = blogHeadingRef.current;
        const blogButton = blogButtonRef.current;
        const blogCards = blogCardsRef.current.filter(Boolean) as HTMLAnchorElement[];
        if (!container || !headline || !img1 || !img2 || !img3 || !txt1 || !txt2 || !txt3 || !cta || !ctaButton || !blog || !blogHeading || !blogButton) return;

        const viewH = container.offsetHeight;
        const imgWidth = container.offsetWidth * 0.48;
        const imgHeight = imgWidth * (16 / 9);
        const finalScale = (viewH * 0.95) / imgHeight;
        const fullVisualW = imgWidth * finalScale;
        const leftEdgePct = 50 - (fullVisualW / container.offsetWidth) * 50;

        // === INITIAL STATES ===
        // Image 1: tiny at bottom center
        gsap.set(img1, {
            width: "48%", aspectRatio: "9 / 16",
            left: "50%", bottom: "3%", xPercent: -50,
            transformOrigin: "center bottom",
            borderRadius: "12px", scale: 0.06,
        });
        // Image 2: tiny, hidden, to the right
        gsap.set(img2, {
            width: "48%", aspectRatio: "9 / 16",
            left: "68%", bottom: "5%", xPercent: -50,
            transformOrigin: "center bottom",
            borderRadius: "12px", scale: 0.06,
            opacity: 0, zIndex: 2,
        });
        // Image 3: tiny, hidden, to the right
        gsap.set(img3, {
            width: "48%", aspectRatio: "9 / 16",
            left: "68%", bottom: "5%", xPercent: -50,
            transformOrigin: "center bottom",
            borderRadius: "12px", scale: 0.06,
            opacity: 0, zIndex: 3,
        });
        // Texts hidden
        gsap.set([txt1, txt2, txt3], { opacity: 0, y: 20, pointerEvents: "none" });
        // CTA hidden
        gsap.set(cta, { opacity: 0, pointerEvents: "none" });
        gsap.set(ctaWords, { opacity: 0.15, fontWeight: 300 });
        gsap.set(ctaButton, { opacity: 0, y: 20 });
        // Blog hidden
        gsap.set(blog, { opacity: 0, pointerEvents: "none" });
        gsap.set(blogHeading, { opacity: 0, y: 40 });
        gsap.set(blogButton, { opacity: 0, y: 20 });
        gsap.set(blogCards, { opacity: 0, y: 60 });

        // Headline exits via separate ScrollTrigger
        gsap.to(headline, {
            y: -300, opacity: 0, ease: "power2.in",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=60%",
                scrub: 0.5,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=2200%",
                pin: true,
                scrub: 0.5,
                markers: true,
            },
        });

        // ============================================================
        // IMAGE 1 CYCLE (0 → 0.33)
        // ============================================================

        // Image 1 scales up (0 → 0.12)
        tl.to(img1, {
            scale: finalScale, borderRadius: "24px",
            duration: 0.12, ease: "power2.inOut",
        }, 0);

        // Text 1 fades in (0.09 → 0.14)
        tl.set(txt1, { pointerEvents: "auto" }, 0.09);
        tl.to(txt1, {
            opacity: 1, y: 0,
            duration: 0.05, ease: "power2.out",
        }, 0.09);

        // Image 2 thumbnail fades in (0.11 → 0.13)
        tl.to(img2, {
            opacity: 1, duration: 0.02, ease: "power2.out",
        }, 0.11);

        // Hold (0.12 → 0.18)
        tl.to({}, { duration: 0.06 }, 0.12);

        // Text 1 fades out (0.18 → 0.20)
        tl.to(txt1, {
            opacity: 0, y: -20,
            duration: 0.02, ease: "power2.in",
        }, 0.18);
        tl.set(txt1, { pointerEvents: "none" }, 0.2);

        // Image 1: switch to top-left positioning (0.20)
        tl.set(img1, {
            bottom: "auto", top: "2%",
            left: leftEdgePct + "%", xPercent: 0,
            transformOrigin: "left top", zIndex: 1,
        }, 0.20);

        // Image 1 scales down to top-left thumbnail (0.21 → 0.33)
        tl.to(img1, {
            scale: 0.06, left: "24%", top: "3%",
            borderRadius: "12px",
            duration: 0.12, ease: "power2.inOut",
        }, 0.21);

        // Image 2 scales up simultaneously (0.21 → 0.33)
        tl.to(img2, {
            scale: finalScale, left: "45%", bottom: "3%",
            borderRadius: "24px", zIndex: 10,
            duration: 0.12, ease: "power2.inOut",
        }, 0.21);

        // ============================================================
        // IMAGE 2 CYCLE (0.33 → 0.66)
        // ============================================================

        // Text 2 fades in (0.33 → 0.38)
        tl.set(txt2, { pointerEvents: "auto" }, 0.33);
        tl.to(txt2, {
            opacity: 1, y: 0,
            duration: 0.05, ease: "power2.out",
        }, 0.33);

        // Image 3 thumbnail fades in (0.35 → 0.37)
        tl.to(img3, {
            opacity: 1, duration: 0.02, ease: "power2.out",
        }, 0.35);

        // Hold (0.38 → 0.46)
        tl.to({}, { duration: 0.08 }, 0.38);

        // Text 2 fades out (0.46 → 0.48)
        tl.to(txt2, {
            opacity: 0, y: -20,
            duration: 0.02, ease: "power2.in",
        }, 0.46);
        tl.set(txt2, { pointerEvents: "none" }, 0.48);

        // Image 1 thumbnail fades out (0.48)
        tl.to(img1, { opacity: 0, duration: 0.02 }, 0.48);

        // Image 2: calculate left edge at full scale position (left: 45%, xPercent: -50)
        const img2LeftEdgePct = 45 - (fullVisualW / container.offsetWidth) * 50;

        // Image 2: switch to top-left positioning (0.48)
        tl.set(img2, {
            bottom: "auto", top: "2%",
            left: img2LeftEdgePct + "%", xPercent: 0,
            transformOrigin: "left top", zIndex: 1,
        }, 0.48);

        // Image 2 scales down to top-left thumbnail (0.49 → 0.61)
        tl.to(img2, {
            scale: 0.06, left: "24%", top: "3%",
            borderRadius: "12px",
            duration: 0.12, ease: "power2.inOut",
        }, 0.49);

        // Image 3 scales up simultaneously (0.49 → 0.61)
        tl.to(img3, {
            scale: finalScale, left: "45%", bottom: "3%",
            borderRadius: "24px", zIndex: 10,
            duration: 0.12, ease: "power2.inOut",
        }, 0.49);

        // ============================================================
        // IMAGE 3 CYCLE (0.66 → 1.0)
        // ============================================================

        // Text 3 fades in (0.61 → 0.66)
        tl.set(txt3, { pointerEvents: "auto" }, 0.61);
        tl.to(txt3, {
            opacity: 1, y: 0,
            duration: 0.05, ease: "power2.out",
        }, 0.61);

        // Hold image 3 + text 3 (0.61 → 0.68)
        tl.to({}, { duration: 0.07 }, 0.61);

        // Fade out text 3 (0.68 → 0.70)
        tl.to(txt3, {
            opacity: 0, y: -20,
            duration: 0.02, ease: "power2.in",
        }, 0.68);
        tl.set(txt3, { pointerEvents: "none" }, 0.70);

        // Fade out all images and bottom labels (0.70 → 0.74)
        tl.to([img1, img2, img3], {
            opacity: 0, duration: 0.04, ease: "power2.in",
        }, 0.70);

        // ============================================================
        // CTA PHASE (0.74 → 1.0)
        // ============================================================

        // Show CTA container
        tl.set(cta, { opacity: 1, pointerEvents: "auto" }, 0.74);

        // Reveal words one by one (0.74 → 0.92)
        ctaWords.forEach((word, i) => {
            tl.to(word, {
                opacity: 1, fontWeight: 800,
                duration: 0.008, ease: "none",
            }, 0.74 + i * 0.008);
        });

        // Button fades in (0.92 → 0.96)
        tl.to(ctaButton, {
            opacity: 1, y: 0,
            duration: 0.04, ease: "power2.out",
        }, 0.92);

        // Hold CTA (0.92 → 0.96)
        tl.to({}, { duration: 0.04 }, 0.92);

        // ============================================================
        // CTA → BLOG TRANSITION (0.96 → 1.0)
        // ============================================================

        // Fade out CTA (0.96 → 1.0)
        tl.to(cta, {
            opacity: 0, duration: 0.04, ease: "power2.in",
        }, 0.96);
        tl.set(cta, { pointerEvents: "none" }, 1.0);

        // ============================================================
        // BLOG PHASE (1.0 → 1.28)
        // ============================================================

        // Show blog container
        tl.set(blog, { opacity: 1, pointerEvents: "auto" }, 1.0);

        // Blog heading slides in (1.0 → 1.06)
        tl.to(blogHeading, {
            opacity: 1, y: 0,
            duration: 0.06, ease: "power2.out",
        }, 1.0);

        // Blog "Ver todas" button fades in (1.04 → 1.08)
        tl.to(blogButton, {
            opacity: 1, y: 0,
            duration: 0.04, ease: "power2.out",
        }, 1.04);

        // Blog cards stagger in (1.06 → 1.16)
        blogCards.forEach((card, i) => {
            tl.to(card, {
                opacity: 1, y: 0,
                duration: 0.05, ease: "power2.out",
            }, 1.06 + i * 0.03);
        });

        // Hold blog (1.16 → 1.28)
        tl.to({}, { duration: 0.12 }, 1.16);

        // Force ScrollTrigger to recalculate after Hero's pin spacer is in the DOM
        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh(true);
            });
        });

        return () => {
            cancelAnimationFrame(raf);
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-screen h-screen bg-[#EEEADF] overflow-hidden"
        >
            <h2 ref={headlineRef} className="absolute top-6 left-8 md:top-8 md:left-12 text-[#1a1a2e] text-[7.5vw] font-medium leading-[0.92] tracking-[0.01em] whitespace-nowrap uppercase z-[1]">
                Seguro como deve ser
            </h2>

            {/* Image 1 */}
            <div ref={image1Ref} className="absolute overflow-hidden">
                <div className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/slide-01.png')" }} />
            </div>

            {/* Image 2 */}
            <div ref={image2Ref} className="absolute overflow-hidden">
                <div className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/slide-02.png')" }} />
            </div>

            {/* Image 3 */}
            <div ref={image3Ref} className="absolute overflow-hidden">
                <div className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/slide-04.png')" }} />
            </div>

            {/* Text 1 */}
            <div ref={text1Ref} className="absolute left-[67%] right-[3%] top-[30%] z-20">
                <p className="text-[#1a1a2e]/80 text-5xl font-bold leading-tight mb-4">
                    Compare dezenas de seguradoras em uma única plataforma, sem burocracia.
                </p>
                <button type="button" className={saibaMaisButtonClass} onClick={handleSaibaMaisClick}>
                    <span className={`${saibaMaisLayerBaseClass} bg-[#5a2fd2]`} />
                    <span className={`${saibaMaisLayerBaseClass} delay-75 bg-white`} />
                    <span className={`${saibaMaisLayerBaseClass} delay-150 bg-[#0d84ff]`} />
                    <span className="relative z-10">Saiba mais</span>
                </button>
            </div>

            {/* Text 2 */}
            <div ref={text2Ref} className="absolute left-[62%] right-[3%] top-[15%] z-20">
                <p className="text-[#1a1a2e]/80 text-5xl font-bold leading-tight mb-4">
                    Cotação personalizada em minutos. Sem ligações, sem formulários intermináveis.
                </p>
                <button type="button" className={saibaMaisButtonClass} onClick={handleSaibaMaisClick}>
                    <span className={`${saibaMaisLayerBaseClass} bg-[#5a2fd2]`} />
                    <span className={`${saibaMaisLayerBaseClass} delay-75 bg-white`} />
                    <span className={`${saibaMaisLayerBaseClass} delay-150 bg-[#0d84ff]`} />
                    <span className="relative z-10">Saiba mais</span>
                </button>
            </div>

            {/* Text 3 */}
            <div ref={text3Ref} className="absolute left-[62%] right-[3%] top-[15%] z-20">
                <p className="text-[#1a1a2e]/80 text-5xl font-bold leading-tight mb-4">
                    Proteção completa para você, sua família e seus bens — do jeito que precisa.
                </p>
                <button type="button" className={saibaMaisButtonClass} onClick={handleSaibaMaisClick}>
                    <span className={`${saibaMaisLayerBaseClass} bg-[#5a2fd2]`} />
                    <span className={`${saibaMaisLayerBaseClass} delay-75 bg-white`} />
                    <span className={`${saibaMaisLayerBaseClass} delay-150 bg-[#0d84ff]`} />
                    <span className="relative z-10">Saiba mais</span>
                </button>
            </div>

            {/* CTA overlay */}
            <div
                ref={ctaRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-30 px-8 bg-[#0d84ff]"
            >
                <p className="text-white text-3xl md:text-5xl lg:text-6xl leading-snug md:leading-tight italic tracking-[-0.02em] text-center max-w-[900px] font-[var(--font-geist-sans)]">
                    {[
                        "Imagine", "não", "se", "preocupar", "com", "burocracia.",
                        "E", "esquecer", "o", "que", "é", "pagar", "caro",
                        "por", "seguro.", "Quando", "comparar", "é", "simples,",
                        "tudo", "é", "possível.",
                    ].map((word, i) => (
                        <span
                            key={i}
                            ref={el => { ctaWordsRef.current[i] = el; }}
                            style={{ fontWeight: 300 }}
                        >
                            {word}{" "}
                        </span>
                    ))}
                </p>
                <a
                    ref={ctaButtonRef}
                    href="/simulador"
                    className="mt-12 inline-block bg-white text-[#0d84ff] text-sm font-medium tracking-wide px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
                >
                    Simule seu seguro
                </a>
            </div>

            {/* Blog overlay */}
            <div
                ref={blogRef}
                className="absolute inset-0 z-30 px-8 md:px-12 flex flex-col justify-center"
            >
                {/* Header row */}
                <div className="flex items-start justify-between mb-10 md:mb-14">
                    <h2
                        ref={blogHeadingRef}
                        className="text-[#1a1a2e] text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-[-0.02em]"
                    >
                        Notícias do mundo<br />dos seguros
                    </h2>
                    <a
                        ref={blogButtonRef}
                        href="/blog"
                        className="shrink-0 ml-8 mt-2 inline-block bg-[#1a1a2e] text-white text-sm font-medium tracking-wide px-6 py-3 rounded-full hover:bg-[#2a2a3e] transition-colors"
                    >
                        Ver todas
                    </a>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        {
                            date: "Fev 15, 2026",
                            title: "Como Escolher o Seguro Auto Ideal Sem Pagar Mais do Que Precisa",
                            image: "/assets/slide-01.png",
                        },
                        {
                            date: "Jan 29, 2026",
                            title: "Seguro Residencial: O Que Cobre e Por Que Você Precisa de Um",
                            image: "/assets/slide-02.png",
                        },
                        {
                            date: "Jan 7, 2026",
                            title: "Clica Seguros Expande Parcerias com Novas Seguradoras em Todo o Brasil",
                            image: "/assets/slide-04.png",
                        },
                    ].map((post, i) => (
                        <a
                            key={i}
                            href="#"
                            ref={el => { blogCardsRef.current[i] = el; }}
                            className="group block"
                        >
                            <span className="text-[#1a1a2e]/50 text-[13px] font-medium">
                                {post.date}
                            </span>
                            <h3 className="text-[#1a1a2e] text-lg md:text-xl font-medium leading-snug mt-2 mb-4 group-hover:opacity-70 transition-opacity">
                                {post.title}
                            </h3>
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                                <div
                                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url('${post.image}')` }}
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-6 left-8 md:bottom-8 md:left-12 z-20">
                <span className="text-[#1a1a2e]/50 text-[13px] font-medium">
                    Nossos Diferenciais
                </span>
            </div>
            <div className="absolute bottom-6 right-8 md:bottom-8 md:right-12 z-20">
                <span className="text-[#1a1a2e]/50 text-[13px] font-medium">
                    Simule agora, proteja-se
                </span>
            </div>
        </div>
    );
}
