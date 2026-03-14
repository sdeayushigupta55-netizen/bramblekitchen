import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { FadeUp, Stagger, Item } from "@/components/Motion";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CalendarCheck,
  Users,
  Cake,
  Utensils,
} from "lucide-react";

const Lightbox = dynamic(() => import("@/components/Lightbox"), {
  ssr: false,
});

const GALLERY = [
  {
    src: "/gallery/bramble-rooftop-bar-bangalore.webp",
    alt: "Bramble rooftop bar ambience in Marathahalli Bangalore",
    title: "Rooftop Vibes",
  },
  {
    src: "/gallery/bramble-signature-cocktails.webp",
    alt: "Signature cocktails at Bramble Kitchen and Bar Bangalore",
    title: "Signature Cocktails",
  },
  {
    src: "/gallery/bramble-rooftop-dining-bangalore.webp",
    alt: "Rooftop dining experience at Bramble Kitchen and Bar Bangalore",
    title: "Rooftop Dining",
  },
  {
    src: "/gallery/bramble-nightlife-ambience.webp",
    alt: "Nightlife ambience at Bramble rooftop bar Marathahalli",
    title: "Nightlife Ambience",
  },
  {
    src: "/gallery/bramble-bar-food-bites.webp",
    alt: "Delicious bar food and bites at Bramble Kitchen and Bar",
    title: "Food Bites",
  },
  {
    src: "/gallery/bramble-craft-cocktail-bar.webp",
    alt: "Craft cocktail bar experience at Bramble Kitchen and Bar",
    title: "Craft Cocktails",
  },
  {
    src: "/gallery/bramble-rooftop-evening-vibes.webp",
    alt: "Evening rooftop vibes at Bramble Kitchen and Bar Bangalore",
    title: "Evening Vibes",
  },
  {
    src: "/gallery/bramble-marathahalli-bar-ambience.webp",
    alt: "Bramble bar ambience in Marathahalli Bangalore rooftop restaurant",
    title: "Bar Ambience",
  },
];

const LOCATIONS = [
  {
    key: "marathahalli",
    name: "Bramble Marathahalli",
    address:
      "Panathur Main Rd, Kadubeesanahalli, Panathur, Bengaluru, Karnataka 560087",
    phones: ["+917626974629", "+917760565100"],
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.549431466336!2d77.7037178!3d12.936655000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a2b1b5cc29%3A0xd4b44af926c5e64f!2sBramble%20Kitchen%20%26%20Bar!5e0!3m2!1sen!2sin!4v1773413832129!5m2!1sen!2sin",
    directions:
      "https://maps.google.com/?q=Bramble%20Kitchen%20%26%20Bar%20Bengaluru",
  },
];

const SLIDES = [
  {
    title: "Birthday Celebrations",
    icon: <Cake size={18} />,
    bullets: [
      "Rooftop celebration setup",
      "Cake & decor arrangement",
      "Music + cocktail packages",
    ],
    desc:
      "Celebrate your birthday with a vibrant rooftop ambience, signature cocktails, and curated menus designed to make your special day unforgettable.",
    img: "/events/event-birthday.webp",
  },
  {
    title: "Private Parties",
    icon: <Users size={18} />,
    bullets: [
      "Reserved private sections",
      "Customized menu options",
      "Dedicated service staff",
    ],
    desc:
      "Host your private party with us in a warm and stylish atmosphere. Perfect for anniversaries, gatherings, and special celebrations with friends and family.",
    img: "/events/event-private.webp",
  },
  {
    title: "Outdoor Catering",
    icon: <Utensils size={18} />,
    bullets: [
      "Catering for weddings & parties",
      "Custom menus for events",
      "Professional service staff",
    ],
    desc:
      "Create memorable moments with our outdoor catering services. From family functions to weddings and corporate gatherings, we bring our culinary experience to your location.",
    img: "/events/event-custom.webp",
  },
];

export default function Home() {
  const restroName =
    process.env.NEXT_PUBLIC_RESTRO_NAME || "Bramble Kitchen & Bar";
  const email =
    process.env.NEXT_PUBLIC_RESTRO_EMAIL || "bramblekitchenandbar02@gmail.com";
  const phonePrimary =
    process.env.NEXT_PUBLIC_RESTRO_PHONE || "+917626974629";
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917626974629";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.bramblethebar.com";

  const [activeLoc, setActiveLoc] = useState(LOCATIONS[0].key);
  const [gOpen, setGOpen] = useState(false);
  const [gIdx, setGIdx] = useState(0);
  const [slide, setSlide] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showHeroVideo, setShowHeroVideo] = useState(false);

  const loc = useMemo(
    () => LOCATIONS.find((l) => l.key === activeLoc) || LOCATIONS[0],
    [activeLoc]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setSuccess(true);

      setTimeout(() => {
        const cleanUrl =
          window.location.origin + window.location.pathname + "#contact";
        window.history.replaceState({}, document.title, cleanUrl);
      }, 100);
    }

    const videoTimer = setTimeout(() => {
      setShowHeroVideo(true);
    }, 2200);

    return () => clearTimeout(videoTimer);
  }, []);

  const bookTableWhatsapp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ${restroName} 👋

I would like to reserve a table.

Please let me know the available time slots.

Thank you.`
  )}`;

  const callLink = `tel:${phonePrimary.replace(/\s+/g, "")}`;

  const openGallery = (i) => {
    setGIdx(i);
    setGOpen(true);
  };

  const gPrev = () => setGIdx((p) => (p - 1 + GALLERY.length) % GALLERY.length);
  const gNext = () => setGIdx((p) => (p + 1) % GALLERY.length);
  const prev = () => setSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide((p) => (p + 1) % SLIDES.length);

  return (
    <>
      <Head>
        <title>
          Bramble Kitchen & Bar | Rooftop Bar in Marathahalli Bangalore
        </title>
        <meta
          name="description"
          content="Experience rooftop dining at Bramble Kitchen & Bar in Marathahalli Bangalore. Enjoy crafted cocktails, glocal cuisine, open-air ambience and happy hours. Reserve your table today."
        />
        <meta
          name="keywords"
          content="rooftop bar marathahalli, bar near panathur bangalore, rooftop restaurant bangalore, cocktail bar marathahalli, happy hours bangalore, rooftop dining bangalore, pub near kadubeesanahalli, bar near bellandur"
        />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content="Bramble Kitchen & Bar | Rooftop Bar in Marathahalli Bangalore"
        />
        <meta
          property="og:description"
          content="Rooftop dining, cocktails, nightlife and happy hours at Bramble Kitchen & Bar in Marathahalli Bangalore."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="Bramble Kitchen & Bar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bramble Kitchen & Bar | Rooftop Bar in Marathahalli Bangalore"
        />
        <meta
          name="twitter:description"
          content="Rooftop dining, crafted cocktails, glocal cuisine and nightlife in Marathahalli Bangalore."
        />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Bramble Kitchen & Bar",
              image: [`${siteUrl}/og-image.jpg`],
              url: siteUrl,
              telephone: "+91 7760565100",
              email,
              priceRange: "₹₹",
              servesCuisine: ["Indian", "Asian", "Mediterranean"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Panathur Main Rd, Kadubeesanahalli",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560087",
                addressCountry: "IN",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "12:00",
                  closes: "01:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/brambleblr/",
                "https://www.instagram.com/bramble.blr",
              ],
            }),
          }}
        />
      </Head>

      <div className="premium-dark min-h-screen">
        <Navbar />

        <main>
          {/* HERO */}
          <section
            id="hero"
            className="relative min-h-[88svh] overflow-hidden"
            aria-label="Hero section"
          >
            <div className="absolute inset-0">
              <Image
                src="/gallery/bramble-rooftop-bar-bangalore.webp"
                alt="Bramble rooftop bar Marathahalli Bangalore"
                fill
                priority
                fetchPriority="high"
                quality={75}
                sizes="100vw"
                className="object-cover"
              />

              {/* {showHeroVideo && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/gallery/bramble-rooftop-bar-bangalore.webp"
                  className="absolute inset-0 hidden h-full w-full object-cover md:block"
                  aria-hidden="true"
                >
                  <source src="/gallery/LaunchVideo.webm" type="video/webm" />
                  <source src="/gallery/LaunchVideo.mp4" type="video/mp4" />
                </video>
              )} */}
            </div>

            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 hero-spotlight" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
            <div className="absolute inset-0 hero-grain" />

            <div className="container-max relative flex min-h-[88svh] items-center justify-center py-24 sm:py-28">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-5xl"
              >
                <div className="hero-panel mx-auto max-w-4xl px-5 py-8 text-center sm:px-8 sm:py-10 md:px-10 md:py-12">
                  <div className="badge hero-badge mx-auto mb-4 w-fit text-[11px] sm:text-sm">
                    <Sparkles size={14} /> Rooftop • Cocktails • Glocal Cuisine
                  </div>

                  <h1 className="hero-title text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                    <span className="text-white">Bramble Kitchen & Bar</span>
                    <span className="text-white/70"> — </span>
                    <span style={{ color: "var(--accent)" }}>
                      Rooftop Dining
                    </span>
                    <span className="text-white/80"> • </span>
                    <span className="text-white/90">Crafted Cocktails</span>
                    <span className="text-white/80"> • </span>
                    <span style={{ color: "var(--accent)" }}>Nightlife</span>
                  </h1>

                  <p className="hero-sub mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                    Rooftop dining, crafted cocktails and glocal cuisine in a
                    premium ambience at Marathahalli, Bangalore.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <a
                      href={bookTableWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-accent w-full sm:w-auto"
                    >
                      Book a Table
                    </a>

                    <a
                      href={callLink}
                      className="btn-ghost w-full sm:w-auto"
                      aria-label="Call Bramble Kitchen now"
                    >
                      <Phone size={18} /> Call Now
                    </a>
                  </div>

                  <div className="mt-6 text-sm text-white/75 sm:mt-7">
                    Marathahalli • Bangalore
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

        {/* OFFER */}
<section id="offer" className="relative section-soft py-16 sm:py-20">
  <div className="container-max">
    <div className="card-dark overflow-hidden">
      <div className="grid lg:grid-cols-2">

        {/* TEXT CONTENT */}
        <div className="p-6 text-white sm:p-8 md:p-10">
          <p className="text-xs tracking-[0.18em] text-white/70 sm:text-sm">
            SPECIAL OFFER
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            <span style={{ color: "var(--accent)" }}>50% OFF</span> on Bill
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-white/80">
            Enjoy all-day happy hours at Bramble. Great food, signature drinks,
            rooftop ambience, and special savings for your next outing.
          </p>

          <div className="mt-6 gap-3 text-sm sm:grid-cols-2">
            <div className="pill mb-3 text-white/90">All Day Happy Hours</div>
            <div className="pill mb-3 text-white/90">Open Air Ambience</div>
            <div className="pill mb-3 text-white/90">Crafted Cocktails</div>
            <div className="pill mb-3 text-white/90">Limited Time Offer</div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={bookTableWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full sm:w-auto"
            >
              Reserve Now
            </a>
          </div>

          <div className="mt-6 text-sm leading-relaxed text-white/70">
            📍 Panathur Main Rd, Kadubeesanahalli, Panathur, Bengaluru
            <br />
            📞 +91 7760 565 100 &nbsp; | &nbsp; +91 7626 974 629
          </div>
        </div>

        {/* IMAGE (DESKTOP ONLY) */}
        <div className="relative hidden lg:block min-h-[520px]">
          <Image
            src="/gallery/offerbramble-nightlife-ambience.webp"
            alt="Bramble special offer happy hours Bangalore"
            fill
            loading="lazy"
            quality={70}
            sizes="(max-width: 1024px) 0px, 50vw"
            className="object-contain object-center bg-black/5 transition duration-700 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/25" />
        </div>

      </div>
    </div>
  </div>
</section>

        {/* ABOUT */}
<section id="about" className="relative section-alt py-16 sm:py-20">
  <div className="container-max relative">
    <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
      <div>
        <p className="text-sm tracking-[0.18em] text-white/70">
          ABOUT
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl">
          What we stand for —{" "}
          <span style={{ color: "var(--accent)" }}>cocktails</span>,{" "}
          <span className="text-white/85">glocal plates</span> &{" "}
          <span className="text-white/85">rooftop energy</span>.
        </h2>
      </div>

      <div className="lg:border-l lg:border-white/10 lg:pl-6">
        <p className="leading-relaxed text-white/80">
          In the heart of South Bangalore,{" "}
          <span className="font-semibold text-white">Bramble</span>{" "}
          comes to life — inspired by the berry and built around a
          beautiful affair between{" "}
          <span className="font-semibold text-white">
            crafted cocktails
          </span>{" "}
          and{" "}
          <span className="font-semibold text-white">
            glocal cuisine
          </span>
          . Two floors: cozy indoor dining below and a spectacular
          rooftop view above.
        </p>
      </div>
    </div>

    {/* STATS */}
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
        <div
          className="text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--accent)" }}
        >
          250+
        </div>
        <p className="mt-2 text-sm text-white/70">Guests Capacity</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
        <div
          className="text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--accent)" }}
        >
          500+
        </div>
        <p className="mt-2 text-sm text-white/70">Celebrations Hosted</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
        <div
          className="text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--accent)" }}
        >
          5★
        </div>
        <p className="mt-2 text-sm text-white/70">Rooftop Experience</p>
      </div>
    </div>

    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
      <FadeUp>
        <div className="card-dark card-hover p-6 sm:p-7 md:p-9">
          <h3 className="mb-4 text-2xl font-semibold">
            A two-floor experience
          </h3>

          <p className="text-[15px] leading-relaxed text-white/80 md:text-[16px]">
            The space is elevated with aesthetic furniture and neon
            eclectic artwork, creating a lively vibe that beckons to
            be discovered. Our menu blends global techniques with
            local favorites — from{" "}
            <span className="text-white">Kundapur Ghee Roast</span>,{" "}
            <span className="text-white">Nethli Fry</span>,{" "}
            <span className="text-white">Curd Rice Bonda</span> — to
            Italian, Asian, Mediterranean and modern Indian
            creations.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="pill flex items-center gap-2 text-white/90">
              <span className="text-lg">🍸</span>
              <span>Signature cocktails & mocktails</span>
            </div>
            <div className="pill flex items-center gap-2 text-white/90">
              <span className="text-lg">🌆</span>
              <span>Rooftop city-view ambience</span>
            </div>
            <div className="pill flex items-center gap-2 text-white/90">
              <span className="text-lg">🍛</span>
              <span>Glocal cuisine — global + local</span>
            </div>
            <div className="pill flex items-center gap-2 text-white/90">
              <span className="text-lg">🎶</span>
              <span>Weekend music & nightlife</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              className="btn-outline-accent w-full sm:w-auto"
              href="#gallery"
            >
              See Gallery
            </a>
            <a className="btn-ghost w-full sm:w-auto" href="#events">
              Private Events
            </a>
            <a
              className="btn-accent w-full sm:w-auto"
              href={bookTableWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarCheck size={18} />
              Reserve
            </a>
          </div>

          <div className="mt-6 text-xs text-white/65">
            ✨ Best time to visit:{" "}
            <span className="text-white/85">Sunset → late night</span>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.06}>
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(0,200,150,0.35), transparent 55%), radial-gradient(circle at 70% 80%, rgba(0,200,150,0.22), transparent 60%)",
            }}
          />

          <div className="card-dark overflow-hidden p-3">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/gallery/bramble-rooftop-bar-bangalore.webp"
                alt="Bramble rooftop ambience and cocktails in Bangalore"
                width={1200}
                height={1600}
                loading="lazy"
                quality={70}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover transition duration-700 hover:scale-[1.03] sm:max-h-[620px] lg:max-h-[780px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </div>
</section>

          {/* EVENTS */}
          <section id="events" className="relative section-alt py-16 sm:py-20">
            <div className="container-max relative">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm tracking-[0.18em] text-white/70">
                  EVENTS & CELEBRATIONS
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-emerald-300 sm:text-4xl">
                  Celebrate your special moments
                </h2>

                <p className="mt-3 text-white/80">
                  Birthdays • private parties • corporate evenings • outdoor
                  catering
                </p>
              </div>

              <div className="relative mt-12 overflow-hidden card-dark">
                <div className="grid lg:grid-cols-2">
                  <div className="p-6 sm:p-7 md:p-14">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                            {SLIDES[slide].icon}
                          </div>

                          <h3 className="text-2xl font-semibold md:text-3xl">
                            {SLIDES[slide].title}
                          </h3>
                        </div>

                        <div className="mt-6 space-y-3">
                          {SLIDES[slide].bullets.map((b) => (
                            <div
                              key={b}
                              className="flex items-start gap-3 text-white/85"
                            >
                              <span
                                className="mt-1 h-3 w-3 rounded-sm"
                                style={{ background: "var(--accent)" }}
                              />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>

                        <p className="mt-6 leading-relaxed text-white/80">
                          {SLIDES[slide].desc}
                        </p>

                        <div className="mt-8 flex justify-center md:justify-start">
                          <a
                            href={bookTableWhatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-accent text-sm"
                          >
                            Book Event
                          </a>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[520px]">
                    <Image
                      src={SLIDES[slide].img}
                      alt={SLIDES[slide].title}
                      fill
                      loading="lazy"
                      quality={70}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Previous event slide"
                  onClick={prev}
className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition hover:bg-black/60 sm:left-4"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Next event slide"
                  onClick={next}
className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition hover:bg-black/60 sm:right-4"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to event slide ${i + 1}`}
                      onClick={() => setSlide(i)}
                      className="h-3 w-3 rounded-full"
                      style={{
                        background:
                          i === slide
                            ? "var(--accent)"
                            : "rgba(255,255,255,.25)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* GALLERY */}
          <section id="gallery" className="relative section-soft py-16 sm:py-20">
            <div className="container-max relative">
              <div className="text-center">
                <p className="text-sm tracking-[0.18em] text-white/70">
                  GALLERY
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-emerald-300 sm:text-4xl">
                  A glimpse of the vibe
                </h2>
                <p className="mt-2 text-white/80">
                  Click any photo to open full-screen.
                </p>
              </div>

        
                <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {GALLERY.map((g, i) => (
                    <Item key={g.src}>
                      <button
                        type="button"
                        aria-label={`Open gallery image ${i + 1}: ${g.title}`}
                        onClick={() => openGallery(i)}
                        className="gallery-card group relative w-full overflow-hidden"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={g.src}
                            alt={g.alt}
                            fill
                            loading="lazy"
                            quality={65}
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition duration-500 group-hover:scale-[1.07]"
                          />
                        </div>

                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 text-left">
                            <div className="truncate font-semibold text-white">
                              {g.title}
                            </div>
                            <div className="mt-0.5 text-xs text-white/85">
                              Tap to open
                            </div>
                          </div>
                        </div>
                      </button>
                    </Item>
                  ))}
                </div>
            
            </div>
          </section>
          {/* REVIEWS */}
<section id="reviews" className="relative overflow-hidden py-16 sm:py-20">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,200,150,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_35%)]" />

  <div className="container-max relative">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-sm tracking-[0.22em] text-white/60">REVIEWS</p>
      <h2 className="mt-3 text-3xl font-semibold text-emerald-300 sm:text-4xl">
        Reviews from the web
      </h2>
      <p className="mt-3 text-white/75">
        Trusted ratings across top dining platforms that reflect the Bramble
        rooftop experience.
      </p>
    </motion.div>

    <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      {/* LEFT SUMMARY CARD */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,200,150,0.08),transparent_45%,rgba(255,255,255,0.03))]" />
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition duration-700 group-hover:scale-125" />
        <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/5 blur-3xl transition duration-700 group-hover:scale-125" />

        <div className="relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-white/60">Overall online reputation</p>

              <div className="mt-3 flex items-end gap-3">
                <span
                  className="text-5xl font-bold leading-none sm:text-6xl"
                  style={{ color: "var(--accent)" }}
                >
                  4.4
                </span>
                <span className="pb-1 text-xl text-white/70">/ 5</span>
              </div>

              <p className="mt-3 text-sm text-white/60">
                Based on major restaurant discovery platforms
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                Highlight
              </p>
              <p className="mt-2 text-sm text-white/80">
                Strong presence on Zomato & Justdial
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              {
                label: "Guest Satisfaction",
                value: "4.4/5",
                width: "88%",
                note: "Excellent digital rating mix",
              },
              {
                label: "Dining Discovery",
                value: "4.4/5",
                width: "86%",
                note: "Strong on food discovery apps",
              },
              {
                label: "Venue Trust",
                value: "4.3/5",
                width: "84%",
                note: "Consistent customer confidence",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white/85">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {item.value}
                  </span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.15 }}
                    className="h-full rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                </div>

                <p className="mt-2 text-xs text-white/55">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* RIGHT PLATFORM CARDS */}
      <div className="grid gap-4">
        {[
          {
            name: "Zomato",
            rating: "4.4/5",
            votes: "7,380 votes",
            delay: 0,
          },
          {
            name: "EazyDiner",
            rating: "4.2/5",
            votes: "69 votes",
            delay: 0.1,
          },
          {
            name: "Justdial",
            rating: "4.4/5",
            votes: "2,877 votes",
            delay: 0.2,
          },
        ].map((platform) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: platform.delay }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%,rgba(0,200,150,0.08))]" />
            <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl transition duration-700 group-hover:scale-125" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {platform.name}
                </h3>
                <p className="mt-1 text-sm text-white/55">{platform.votes}</p>
              </div>

              <div className="text-right">
                <div
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--accent)" }}
                >
                  {platform.rating}
                </div>
                <div className="mt-1 flex justify-end gap-1 text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-yellow-400/70">★</span>
                </div>
              </div>
            </div>

            <div className="relative mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width:
                    platform.name === "Zomato"
                      ? "88%"
                      : platform.name === "EazyDiner"
                      ? "84%"
                      : "88%",
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: platform.delay + 0.2 }}
                className="h-full rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-[26px] border border-emerald-400/20 bg-emerald-400/10 p-5"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/70">
            Why it matters
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            A strong rating profile builds trust instantly and helps guests feel
            confident about the ambience, food, and overall rooftop experience
            before booking.
          </p>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* BOOKING */}
<section id="reserve" className="relative overflow-hidden py-14 sm:py-20">
         
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,200,150,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_35%)]" />
  <div className="container-max relative">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm tracking-[0.18em] text-white/70">
        Reservation
      </p>

      <h2 className="mt-3 text-3xl font-semibold text-emerald-300 sm:text-4xl">
        Book Your Table
      </h2>

      <p className="mt-3 text-white/80">
        Enjoy rooftop dining, crafted cocktails, and a premium ambience.
        Reserve your table instantly through WhatsApp and our team will
        confirm your booking.
      </p>
    </div>

    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div className="card-dark p-6 sm:p-8 md:p-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-white">Timings</div>
            <div className="mt-2 text-sm text-white/75">
              Opening Time - 12:00 PM
              <br />
              Closing Time - 1:00 AM
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-white">Call Us</div>
            <div className="mt-2 text-sm text-white/75">
              {loc.phones.join(", ")}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
            <div className="text-sm font-semibold text-white">Location</div>
            <div className="mt-2 text-sm text-white/75">{loc.address}</div>
          </div>
        </div>
      </div>

      <div className="card-dark flex flex-col items-center justify-center p-6 text-center sm:p-8 md:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 sm:h-16 sm:w-16">
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7 fill-green-400 sm:h-8 sm:w-8"
            aria-hidden="true"
          >
            <path d="M16 .396C7.163.396 0 7.56 0 16.396c0 2.887.76 5.594 2.094 7.938L.066 32l7.864-2.062A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837.396 16 .396z" />
          </svg>
        </div>

        <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
          Book A Table on WhatsApp
        </h3>

        <p className="mt-3 max-w-sm text-sm text-white/75">
          Tap the button below to connect with our team instantly and reserve
          your table in seconds.
        </p>

        <a
          href={bookTableWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-green-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600 sm:w-auto"
        >
          Book Table on WhatsApp
        </a>

        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={callLink}
            className="btn-ghost w-full justify-center sm:w-auto"
            aria-label="Call Bramble Kitchen now"
          >
            <Phone size={18} /> Call Now
          </a>

          <a
            href={loc.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-accent w-full justify-center sm:w-auto"
          >
            <MapPin size={18} /> Get Directions
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
       {/* LOCATION */}
<section id="location" className="relative overflow-hidden py-16 sm:py-20">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,200,150,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_35%)]" />

  <div className="container-max relative text-white">
    <div className="text-center">
      <h2 className="text-3xl font-semibold md:text-4xl">Location</h2>
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {LOCATIONS.map((l) => (
        <button
          key={l.key}
          type="button"
          aria-label={`Show location ${l.name}`}
          onClick={() => setActiveLoc(l.key)}
          className="min-h-[44px] rounded-full border px-5 py-2 text-sm font-semibold transition"
          style={{
            borderColor: "rgba(255,255,255,.14)",
            background:
              activeLoc === l.key
                ? "rgba(0,200,150,.20)"
                : "rgba(255,255,255,.06)",
          }}
        >
          {l.name}
        </button>
      ))}
    </div>

    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {/* MOBILE: SIMPLE MAP CARD */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur lg:hidden">
        <div className="flex h-[340px] flex-col items-center justify-center px-6 text-center">
          <MapPin size={34} style={{ color: "var(--accent)" }} />
          <h3 className="mt-4 text-xl font-semibold text-white">
            Find Us on Google Maps
          </h3>
          <p className="mt-2 max-w-sm text-sm text-white/75">
            Open directions directly in Google Maps for the fastest route to Bramble Kitchen & Bar.
          </p>
          <a
            href={loc.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-6"
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* DESKTOP: EMBED MAP */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur lg:block">
        <iframe
          key={loc.key}
          title={`${loc.name} map`}
          className="h-[420px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={loc.map}
        />
      </div>

      {/* LOCATION INFO */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <div className="text-2xl font-semibold">Visit {loc.name}</div>

        <div className="mt-6 space-y-6">
          <div className="flex gap-3">
            <MapPin size={20} style={{ color: "var(--accent)" }} />
            <div>
              <div className="font-semibold">Address</div>
              <div className="text-sm text-white/75">{loc.address}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail size={20} style={{ color: "var(--accent)" }} />
            <div>
              <div className="font-semibold">Reservations</div>
              <div className="text-sm text-white/75">{email}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone size={20} style={{ color: "var(--accent)" }} />
            <div>
              <div className="font-semibold">Phone</div>
              <div className="text-sm text-white/75">
                {loc.phones.map((p) => (
                  <div key={p}>
                    <a
                      href={`tel:${p}`}
                      className="transition hover:text-white"
                    >
                      {p}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={bookTableWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-accent w-full sm:w-auto"
          >
            Book a Table
          </a>

          <a
            href="#contact"
            className="btn-outline-accent w-full sm:w-auto"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* CONTACT + FOOTER */}
          <section id="contact" className="relative section-soft py-16 sm:py-20">
            <div className="container-max relative text-white">
              <h2 className="text-center text-3xl font-semibold">
                Get in Touch
              </h2>

              <p className="mt-2 text-center text-white/75">
                For reservations & events, reach us anytime.
              </p>

              {success && (
                <div className="mx-auto mt-6 max-w-5xl rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-green-400">
                  ✅ Message sent successfully! Our team will get back to you
                  shortly.
                </div>
              )}

              <form
                action="https://formsubmit.co/vedicventures@zohomail.in"
                method="POST"
                className="card-dark mx-auto mt-8 max-w-5xl p-6 md:p-10"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_next"
                  value={`${siteUrl}/?success=true#contact`}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-white/90"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="input-dark w-full"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-white/90"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="input-dark w-full"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm text-white/90"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    className="input-dark w-full"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-white/90"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="input-dark min-h-[150px] w-full"
                    required
                  />
                </div>

                <div className="mt-7 flex justify-center">
                  <button
                    type="submit"
                    className="btn-accent min-h-[44px] px-10 text-sm"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>

              <div className="mx-auto mb-12 mt-14 max-w-4xl text-center">
                <h2 className="text-2xl font-semibold text-white">
                  Best Rooftop Bar in Marathahalli Bangalore
                </h2>
                <p className="mt-4 text-white/75">
                  Bramble Kitchen & Bar is one of the best rooftop bars in
                  Marathahalli Bangalore offering crafted cocktails, rooftop
                  dining and glocal cuisine. Located on Panathur Main Road near
                  Kadubeesanahalli and Bellandur, Bramble is a popular
                  destination for happy hours, birthday celebrations and
                  nightlife.
                </p>
              </div>

              <footer className="mt-14 border-t border-white/10 pt-10 text-white/80">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <a href="#hero" className="flex items-center gap-3">
                      <Image
                        className="h-10 w-auto object-contain"
                        src="/logo.png"
                        alt="Bramble Kitchen logo"
                        width={120}
                        height={40}
                      />
                    </a>

                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      Premium cocktail bar & kitchen — rooftop vibes, glocal
                      flavours, and signature drinks.
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <a
                        href="https://www.facebook.com/brambleblr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Bramble Kitchen Facebook page"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition hover:scale-110"
                      >
                        <Facebook size={18} />
                      </a>

                      <a
                        href="https://www.instagram.com/bramble.blr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Bramble Kitchen Instagram page"
                        className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-110"
                        style={{
                          background:
                            "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
                        }}
                      >
                        <Instagram size={18} />
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-white">Useful Links</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      <li>
                        <a className="hover:text-white" href="#hero">
                          Home
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-white" href="#about">
                          About
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-white" href="#gallery">
                          Gallery
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-white" href="#events">
                          Events
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-white" href="#reserve">
                          Book
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-white" href="#location">
                          Location
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold text-white">Our Services</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      <li>Rooftop Dining</li>
                      <li>Private Parties</li>
                      <li>Birthday Celebrations</li>
                      <li>Outdoor Catering</li>
                      <li>Corporate Events</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold text-white">Contact</div>

                    <div className="mt-4 text-sm leading-relaxed text-white/75">
                      <div className="font-semibold text-white">
                        Marathahalli
                      </div>
                      Panathur Main Rd, Kadubeesanahalli, Bengaluru, 560087
                      <br />
                      <span className="text-white">Phone:</span> +917626974629
                      <br />
                      <span className="text-white">Phone:</span> +917760565100
                    </div>

                    <div className="mt-4 text-sm text-white/75">
                      <span className="text-white">Email:</span> {email}
                    </div>
                  </div>
                </div>

                <div className="mt-10 text-center text-xs text-white/60">
                  © {new Date().getFullYear()} {restroName}. All Rights Reserved
                </div>
              </footer>
            </div>
          </section>
        </main>

        {/* FLOATING BUTTONS - MOBILE ONLY */}
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 px-4 md:hidden">
          <div className="flex items-center justify-between">
            <a
              href={callLink}
              aria-label="Call Restaurant"
              className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00c896] to-[#00e0a3] text-white shadow-[0_10px_30px_rgba(59,130,246,0.45)] transition duration-300 hover:scale-110"
            >
              <Phone size={24} className="relative z-10" />
            </a>

            <a
              href={bookTableWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-[0_10px_30px_rgba(34,197,94,0.45)] transition duration-300 hover:scale-110"
            >
              <svg
                viewBox="0 0 32 32"
                className="relative z-10 h-6 w-6 fill-current"
                aria-hidden="true"
              >
                <path d="M16 .396C7.163.396 0 7.56 0 16.396c0 2.887.76 5.594 2.094 7.938L.066 32l7.864-2.062A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837.396 16 .396zm0 29.29a13.2 13.2 0 01-6.726-1.83l-.482-.285-4.67 1.225 1.247-4.552-.314-.47A13.2 13.2 0 1129.2 16c0 7.282-5.918 13.686-13.2 13.686zm7.254-9.996c-.396-.198-2.34-1.156-2.7-1.287-.36-.132-.624-.198-.888.198-.264.396-1.02 1.287-1.25 1.552-.228.264-.456.297-.852.099-.396-.198-1.674-.618-3.186-1.97-1.177-1.05-1.972-2.35-2.205-2.746-.228-.396-.024-.61.173-.808.177-.177.396-.456.594-.684.198-.228.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.888-2.145-1.217-2.94-.32-.768-.646-.663-.888-.675l-.756-.014c-.264 0-.693.099-1.056.495-.363.396-1.386 1.353-1.386 3.3s1.419 3.825 1.617 4.089c.198.264 2.79 4.26 6.762 5.973.946.408 1.683.652 2.258.834.949.302 1.813.259 2.495.157.761-.114 2.34-.957 2.673-1.881.33-.924.33-1.716.231-1.881-.099-.165-.363-.264-.759-.462z" />
              </svg>
            </a>
          </div>
        </div>

       {gOpen && (
  <Lightbox
    open={gOpen}
    images={GALLERY}
    index={gIdx}
    onClose={() => setGOpen(false)}
    onPrev={gPrev}
    onNext={gNext}
  />
)}
      </div>
    </>
  );
}