"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);
    const image3Ref = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const headline = headlineRef.current;
        const img1 = image1Ref.current;
        const img2 = image2Ref.current;
        const img3 = image3Ref.current;
        const txt1 = text1Ref.current;
        const txt2 = text2Ref.current;
        const txt3 = text3Ref.current;
        if (!container || !headline || !img1 || !img2 || !img3 || !txt1 || !txt2 || !txt3) return;

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
        gsap.set([txt1, txt2, txt3], { opacity: 0, y: 20 });

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
                end: "+=1200%",
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
        tl.to(txt3, {
            opacity: 1, y: 0,
            duration: 0.05, ease: "power2.out",
        }, 0.61);

        // Hold final state (0.66 → 1.0)
        tl.to({}, { duration: 0.34 }, 0.66);

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
                <a className="text-[#1a1a2e] text-5xl font-bold italic underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity">
                    Saiba mais
                </a>
            </div>

            {/* Text 2 */}
            <div ref={text2Ref} className="absolute left-[62%] right-[3%] top-[15%] z-20">
                <p className="text-[#1a1a2e]/80 text-5xl font-bold leading-tight mb-4">
                    Cotação personalizada em minutos. Sem ligações, sem formulários intermináveis.
                </p>
                <a className="text-[#1a1a2e] text-5xl font-bold italic underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity">
                    Saiba mais
                </a>
            </div>

            {/* Text 3 */}
            <div ref={text3Ref} className="absolute left-[62%] right-[3%] top-[15%] z-20">
                <p className="text-[#1a1a2e]/80 text-5xl font-bold leading-tight mb-4">
                    Proteção completa para você, sua família e seus bens — do jeito que precisa.
                </p>
                <a className="text-[#1a1a2e] text-5xl font-bold italic underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity">
                    Saiba mais
                </a>
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
