import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HorizontalSection from "@/components/HorizontalSection";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d84ff] flex flex-col font-sans">
      <Header />
      <Hero />
      <HorizontalSection />
      <ScrollToTop />
    </div>
  );
}
