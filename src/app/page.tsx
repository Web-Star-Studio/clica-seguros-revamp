import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d84ff] flex flex-col font-sans">
      <Header />
      <Hero />

      {/* Bottom section matching the image pixel-perfect */}
      <section className="flex-1 flex items-center justify-center py-10 min-h-[15vh]">
        <p className="text-white text-xs sm:text-sm font-medium tracking-wide">
          The future of aviation is coming soon.
        </p>
      </section>
    </div>
  );
}
