from reportlab.lib.pagesizes import LETTER
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from datetime import date

OUT = "output/pdf/clica-seguros-app-summary-one-page.pdf"

PAGE_W, PAGE_H = LETTER
MARGIN_X = 42
TOP = PAGE_H - 42
BOTTOM = 42
CONTENT_W = PAGE_W - (2 * MARGIN_X)

TITLE_COLOR = HexColor("#0D84FF")
TEXT_COLOR = HexColor("#1A1A2E")
MUTED_COLOR = HexColor("#5C6073")


def wrap_lines(text, font, size, max_w):
    words = text.split()
    if not words:
        return [""]
    lines = []
    cur = words[0]
    for w in words[1:]:
        test = f"{cur} {w}"
        if stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def build_content():
    today = date.today().isoformat()
    sections = [
        ("What it is", [
            "A Next.js 16 + React 19 front-end revamp for Clica Seguros focused on an animated, high-impact landing page experience.",
            "The implemented app is currently a single-page site with client-side UI/animation components and static content.",
        ], "paragraph"),
        ("Who it\'s for", [
            "Primary persona: Brazilian auto insurance shoppers who are price-conscious and prefer a digital-first journey (inferred from on-page copy and docs/business-overview.md).",
        ], "paragraph"),
        ("What it does", [
            "Animated hero with pinned scroll transitions, zooming background, and copy reveal.",
            "Dual header behavior: transparent hero header plus solid fixed header shown on scroll up.",
            "Animated full-screen menu with links to Sobre, Simulador, Blog, Ajuda, and Contato.",
            "Horizontal storytelling section that cycles through feature images and text using GSAP timelines.",
            "Mid-flow CTA overlay with animated sentence build and a \"Simule seu seguro\" button.",
            "Blog highlight overlay with three featured cards and a \"Ver todas\" link.",
            "Floating scroll-to-top control that appears after scrolling.",
        ], "bullets"),
        ("How it works (repo-based architecture)", [
            "Composition: src/app/page.tsx renders Header, Hero, HorizontalSection, and ScrollToTop.",
            "Framework layer: Next.js App Router + React + Tailwind CSS v4.",
            "Animation layer: GSAP + ScrollTrigger orchestrate scroll pinning, transitions, and menu motion.",
            "Content/data layer: text and blog entries are hardcoded in components; images are served from public/assets.",
            "Navigation flow: Next/Link and anchor links route users to paths such as /simulador and /blog.",
            "Backend/API/database/auth services: Not found in repo.",
        ], "bullets"),
        ("How to run (minimal)", [
            "Install dependencies: npm install (or bun install / yarn / pnpm).",
            "Start dev server: npm run dev.",
            "Open http://localhost:3000.",
            "Production deployment instructions: Not found in repo (README is default Next.js template).",
        ], "steps"),
    ]
    return today, sections


def estimate_height(sections, body_size, bullet_size, heading_size):
    h = 0
    h += 26  # title
    h += 14  # subtitle
    h += 8
    for heading, items, kind in sections:
        h += heading_size + 4
        if kind == "paragraph":
            for p in items:
                lines = wrap_lines(p, "Helvetica", body_size, CONTENT_W)
                h += len(lines) * (body_size + 2)
                h += 2
        elif kind == "bullets":
            for b in items:
                lines = wrap_lines(b, "Helvetica", bullet_size, CONTENT_W - 14)
                h += len(lines) * (bullet_size + 2)
                h += 1
        elif kind == "steps":
            for s in items:
                lines = wrap_lines(s, "Helvetica", bullet_size, CONTENT_W - 18)
                h += len(lines) * (bullet_size + 2)
                h += 1
        h += 7
    return h


def draw_pdf():
    today, sections = build_content()

    # Fit strategy: shrink fonts slightly until content fits one page.
    heading_size = 12
    body_size = 9.4
    bullet_size = 9.2

    while True:
        needed = estimate_height(sections, body_size, bullet_size, heading_size)
        available = TOP - BOTTOM
        if needed <= available:
            break
        body_size -= 0.2
        bullet_size -= 0.2
        heading_size -= 0.2
        if body_size < 7.6:
            raise RuntimeError("Could not fit content on one page without overflow")

    c = canvas.Canvas(OUT, pagesize=LETTER)

    y = TOP

    c.setFillColor(TITLE_COLOR)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN_X, y, "Clica Seguros Revamp - One-Page App Summary")
    y -= 22

    c.setFillColor(MUTED_COLOR)
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN_X, y, f"Evidence scope: repository files only | Generated: {today}")
    y -= 14

    c.setStrokeColor(HexColor("#D5D9E6"))
    c.setLineWidth(1)
    c.line(MARGIN_X, y, PAGE_W - MARGIN_X, y)
    y -= 10

    for heading, items, kind in sections:
        c.setFillColor(TEXT_COLOR)
        c.setFont("Helvetica-Bold", heading_size)
        c.drawString(MARGIN_X, y, heading)
        y -= heading_size + 4

        c.setFillColor(TEXT_COLOR)
        if kind == "paragraph":
            for p in items:
                c.setFont("Helvetica", body_size)
                lines = wrap_lines(p, "Helvetica", body_size, CONTENT_W)
                for ln in lines:
                    c.drawString(MARGIN_X, y, ln)
                    y -= body_size + 2
                y -= 2

        elif kind == "bullets":
            c.setFont("Helvetica", bullet_size)
            for b in items:
                lines = wrap_lines(b, "Helvetica", bullet_size, CONTENT_W - 14)
                for idx, ln in enumerate(lines):
                    if idx == 0:
                        c.drawString(MARGIN_X + 2, y, "-")
                        c.drawString(MARGIN_X + 12, y, ln)
                    else:
                        c.drawString(MARGIN_X + 12, y, ln)
                    y -= bullet_size + 2
                y -= 1

        elif kind == "steps":
            c.setFont("Helvetica", bullet_size)
            for i, step in enumerate(items, start=1):
                lines = wrap_lines(step, "Helvetica", bullet_size, CONTENT_W - 18)
                for idx, ln in enumerate(lines):
                    if idx == 0:
                        c.drawString(MARGIN_X + 2, y, f"{i}.")
                        c.drawString(MARGIN_X + 14, y, ln)
                    else:
                        c.drawString(MARGIN_X + 14, y, ln)
                    y -= bullet_size + 2
                y -= 1

        y -= 7

    if y < BOTTOM:
        raise RuntimeError(f"Overflow detected: y={y:.2f}, bottom={BOTTOM}")

    c.save()
    return y


if __name__ == "__main__":
    final_y = draw_pdf()
    print(f"Generated: {OUT}")
    print(f"Bottom clearance: {final_y - BOTTOM:.2f} pts")
