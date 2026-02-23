import Link from "next/link";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-10 md:py-10 text-white">
            {/* Left Menu Icon */}
            <button aria-label="Menu" className="flex flex-col gap-2 w-8 h-8 items-start justify-center cursor-pointer group hover:opacity-80 transition-opacity">
                <span className="block h-[2px] w-8 bg-white transition-all"></span>
                <span className="block h-[2px] w-8 bg-white transition-all"></span>
            </button>

            {/* Center Logo Area */}
            {/* Replacing the missing logo with a stylized SVG that loosely resembles the loop from the design */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity" aria-label="Home">
                <svg
                    width="40"
                    height="24"
                    viewBox="0 0 40 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                >
                    <path
                        d="M20 12C20 12 18 20 12 20C6 20 2 16 2 10C2 4 10 2 16 8L24 16C30 22 38 20 38 14C38 8 34 4 28 4C22 4 20 12 20 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>

            {/* Right Investors Link */}
            <Link href="/investors" className="text-sm font-medium tracking-wide flex items-center gap-1 hover:opacity-80 transition-opacity">
                Investors
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </Link>
        </header>
    );
}
