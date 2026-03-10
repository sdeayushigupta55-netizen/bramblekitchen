import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone, X, Menu } from "lucide-react";

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Book", href: "#reserve" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const linkCls =
    "text-sm text-white/75 hover:text-white transition whitespace-nowrap";

  return (
    <header
      className={`sticky top-0 z-50 ${
        scrolled
          ? "border-b border-white/10 bg-black/55 backdrop-blur-xl"
          : "bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="bg-[var(--accent)] px-3 py-2 text-center text-[11px] font-semibold text-black sm:text-sm">
        <div className="mx-auto max-w-7xl leading-snug">
          50% OFF on Bill • All Day Happy Hours • Reserve Now
        </div>
      </div>

      <div className="container-max flex h-16 items-center justify-between gap-3 sm:h-[72px]">
        <a
          href="#hero"
          className="flex min-w-0 items-center gap-3"
          onClick={closeMenu}
          aria-label="Go to homepage"
        >
          <Image
            className="h-9 w-auto object-contain sm:h-10 md:h-11"
            src="/logo.png"
            alt="Bramble Kitchen logo"
            width={140}
            height={44}
            priority
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Primary navigation">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={linkCls}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
  href="#reserve"
  className="btn-accent hidden min-h-[40px] items-center justify-center whitespace-nowrap rounded-full px-3 text-xs sm:inline-flex sm:min-h-[42px] sm:px-4 sm:text-sm md:min-h-[44px] md:px-5"
  onClick={closeMenu}
>
  Book a Table
</a>

          <a
            href="tel:+917760565100"
            className="btn-ghost hidden text-sm md:inline-flex"
            aria-label="Call Bramble Kitchen"
          >
            <Phone size={16} />
            Call
          </a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-black/85 backdrop-blur-xl lg:hidden"
        >
          <div className="container-max grid gap-2 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </a>
            ))}

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <a
                href="#reserve"
                onClick={closeMenu}
                className="btn-accent w-full justify-center px-4 py-2 text-sm"
              >
                Book a Table
              </a>

              <a
                href="tel:+917760565100"
                onClick={closeMenu}
                className="btn-ghost w-full justify-center"
                aria-label="Call Bramble Kitchen now"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}