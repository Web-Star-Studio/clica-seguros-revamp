export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] md:h-[90vh] max-h-[1200px] bg-black rounded-b-[50px] md:rounded-b-[100px] lg:rounded-b-[150px] overflow-hidden flex flex-col items-center justify-end pb-20 md:pb-24">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
                style={{ backgroundImage: "url('/assets/hero-image.jpg')" }}
            />

            {/* Subtle Gradient overlay to ensure text readability against the image */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/10 to-black/30 mix-blend-multiply" />

            {/* Hero Text */}
            <div className="relative z-20 text-center px-6 antialiased">
                <h1 className="text-white text-[10vw] sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-bold leading-[0.95] tracking-[-0.04em] md:tracking-[-0.05em]">
                    <span className="block">Simule. Compare.</span>
                    <span className="block">Economize.</span>
                </h1>
            </div>
        </section>
    );
}
