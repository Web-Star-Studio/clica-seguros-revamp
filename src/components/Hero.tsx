"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const wrapper = wrapperRef.current;
        const section = sectionRef.current;
        const image = imageRef.current;
        const text = textRef.current;
        const desc = descRef.current;
        const tagline = taglineRef.current;
        const header = document.querySelector("header[data-hero-header]");

        if (!wrapper || !section || !image || !text || !desc || !tagline) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "+=120%",
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                },
            });

            // Phase 1: Header slides up and out fast (0 → 0.15)
            if (header) {
                tl.to(header, {
                    y: -100,
                    autoAlpha: 0,
                    ease: "power2.in",
                    duration: 0.15,
                }, 0);
            }

            // Tagline fades out early (0 → 0.25)
            tl.to(tagline, {
                opacity: 0,
                ease: "none",
                duration: 0.25,
            }, 0);

            // Phase 2: Hero section grows to fill viewport + corners flatten (0 → 0.7)
            tl.to(section, {
                height: "100vh",
                maxHeight: "none",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                ease: "power1.inOut",
                duration: 0.7,
            }, 0);

            // Headline fades out (0.05 → 0.5)
            tl.to(text, {
                opacity: 0,
                y: -60,
                ease: "power1.in",
                duration: 0.45,
            }, 0.05);

            // Subtle image zoom throughout (0 → 1.0)
            tl.to(image, {
                scale: 1.15,
                ease: "none",
                duration: 1.0,
            }, 0);

            // Phase 3: Description fades in once image fills screen (0.72 → 1.0)
            tl.fromTo(desc,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, ease: "power2.out", duration: 0.28 },
                0.72
            );

            // Hold final state for ~2 scrolls before releasing pin (1.0 → 1.2)
            tl.to({}, { duration: 0.2 }, 1.0);
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef}>
            <section
                ref={sectionRef}
                className="relative w-full h-[85vh] md:h-[90vh] max-h-[1200px] bg-black rounded-b-[50px] md:rounded-b-[100px] lg:rounded-b-[150px] overflow-hidden flex flex-col items-center justify-end pb-20 md:pb-24"
            >
                {/* Background Image */}
                <div
                    ref={imageRef}
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/hero-image.jpg')" }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/10 to-black/30 mix-blend-multiply" />

                {/* Hero Text */}
                <div ref={textRef} className="relative z-20 text-center px-6 antialiased">
                    <h1 className="text-white text-[8vw] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[88px] font-bold leading-[0.95] tracking-[-0.04em] md:tracking-[-0.05em]">
                        <span className="block">Simule. Compare.</span>
                        <span className="block">Economize.</span>
                    </h1>
                </div>

                {/* Bottom-left description — fades in when image fills screen */}
                <div
                    ref={descRef}
                    className="absolute bottom-10 left-8 md:bottom-14 md:left-12 z-20 flex items-start gap-3 max-w-xs"
                    style={{ opacity: 0 }}
                >
                    <span className="block w-[2px] h-20 bg-white/70 shrink-0 mt-0.5" />
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        Compare cotações de seguros em minutos.
                        Simples, rápido e transparente — tudo na
                        palma da sua mão.
                    </p>
                </div>
            </section>

            {/* Tagline in the blue strip below hero */}
            <div ref={taglineRef} className="flex items-center justify-center py-6 min-h-[10vh]">
                <p className="text-white text-xs sm:text-sm font-medium tracking-wide">
                    A primeira plataforma de seguros self-service do Brasil.
                </p>
            </div>
        </div>
    );
}
