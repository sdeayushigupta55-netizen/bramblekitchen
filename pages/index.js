import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Lightbox from "@/components/Lightbox";
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

const GALLERY = Array.from({ length: 8 }).map((_, i) => ({
  src: `/gallery/${i + 1}.png`,
  alt: `Gallery ${i + 1}`,
  title:
    [
      "Rooftop Vibes",
      "Signature Cocktails",
      "Glocal Cuisine",
      "Live Ambience",
      "Night Mood",
      "Best Bites",
      "Elegant Interiors",
      "Weekend Energy",
    ][i] || `Gallery ${i + 1}`,
}));

const LOCATIONS = [
  {
    key: "marathahalli",
    name: "Bramble Marathahalli",
    address:
      "Panathur Main Rd, Kadubeesanahalli, Panathur, Bengaluru, Karnataka 560103",
    phones: ["+917760565100", "+917626974629"],
    image: "/locations/marathahalli.png",
    map: "https://www.google.com/maps?q=Panathur%20Main%20Rd%20Kadubeesanahalli%20Bengaluru&output=embed",
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
    img: "/events/event-birthday.jpg",
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
    img: "/events/event-private.png",
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
    img: "/events/event-custom.png",
  },
];

export default function Home() {
  const restroName =
    process.env.NEXT_PUBLIC_RESTRO_NAME || "Bramble Kitchen & Bar";
  const email =
    process.env.NEXT_PUBLIC_RESTRO_EMAIL || "bramblekitchenandbar@gmail.com";
  const apiUrl = process.env.NEXT_PUBLIC_BOOKING_API || "";

  const [activeLoc, setActiveLoc] = useState(LOCATIONS[0].key);
  const loc = useMemo(
    () => LOCATIONS.find((l) => l.key === activeLoc) || LOCATIONS[0],
    [activeLoc]
  );

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    note: "",
  });

  const [gOpen, setGOpen] = useState(false);
  const [gIdx, setGIdx] = useState(0);

  const openGallery = (i) => {
    setGIdx(i);
    setGOpen(true);
  };

  const gPrev = () => setGIdx((p) => (p - 1 + GALLERY.length) % GALLERY.length);
  const gNext = () => setGIdx((p) => (p + 1) % GALLERY.length);

  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setToast("");

    if (!apiUrl) {
      setToast("❌ Add NEXT_PUBLIC_BOOKING_API in .env.local.");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, branch: loc.name };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.message || "Booking failed");

      setToast("✅ Booking sent! Confirmation email sent.");
      setForm({
        name: "",
        email: "",
        phone: "",
        guests: "",
        date: "",
        time: "",
        note: "",
      });
    } catch (err) {
      setToast("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const [slide, setSlide] = useState(0);
  const prev = () => setSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide((p) => (p + 1) % SLIDES.length);

  return (
    <>
      <Head>
        <title>{restroName} • Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Restaurant landing page with menu and table booking."
        />
      </Head>

      <div className="premium-dark min-h-screen">
        <Navbar />

        {/* HERO */}
        <section id="hero" className="relative min-h-[88svh] overflow-hidden">
         <div className="absolute inset-0">
  {/* Mobile image */}
  <div className="absolute inset-0 md:hidden">
    <Image
      src="/gallery/1.png"
      alt="Bramble Kitchen rooftop ambience"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>

  {/* Desktop video */}
  <div className="absolute inset-0 hidden md:block">
    <Image
      src="/gallery/hero-poster.webp"
      alt="Bramble Kitchen rooftop ambience"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />

    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/gallery/hero-poster.webp"
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    >
      <source src="/gallery/LaunchVideo.webm" type="video/webm" />
      <source src="/gallery/LaunchVideo.mp4" type="video/mp4" />
    </video>
  </div>
</div>

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 hero-spotlight" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/80" />
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

                <h1 className="hero-title text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  Bramble Kitchen{" "}
                  <span style={{ color: "var(--accent)" }}>& Bar</span>
                </h1>

                <p className="hero-sub mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                  Rooftop dining, crafted cocktails and glocal cuisine in a
                  premium ambience.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a href="#reserve" className="btn-outline-accent w-full sm:w-auto">
                    Reservation
                  </a>

                  <a
                    href={`tel:${LOCATIONS[0].phones[0]}`}
                    className="btn-ghost w-full sm:w-auto"
                    aria-label="Call Bramble Kitchen now"
                  >
                    <Phone size={18} /> Call Now
                  </a>
                </div>

                <div className="mt-6 text-sm text-white/65 sm:mt-7">
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
                <div className="p-6 text-white sm:p-8 md:p-10">
                  <div className="text-xs tracking-[0.18em] text-white/60 sm:text-sm">
                    SPECIAL OFFER
                  </div>

                  <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                    <span style={{ color: "var(--accent)" }}>50% OFF</span> on
                    Bill
                  </h2>

                  <p className="mt-4 max-w-xl leading-relaxed text-white/75">
                    Enjoy all-day happy hours at Bramble. Great food, signature
                    drinks, rooftop ambience, and special savings for your next
                    outing.
                  </p>

                  <div className="mt-6 gap-3 text-sm sm:grid-cols-2">
                    <div className="pill mb-3 text-white/85">All Day Happy Hours</div>
                    <div className="pill mb-3 text-white/85">Open Air Ambience</div>
                    <div className="pill mb-3 text-white/85">Crafted Cocktails</div>
                    <div className="pill mb-3 text-white/85">Limited Time Offer</div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <a href="#reserve" className="btn-accent w-full sm:w-auto">
                      Reserve Now
                    </a>
                  </div>

                  <div className="mt-6 text-sm leading-relaxed text-white/60">
                    📍 Panathur Main Rd, Kadubeesanahalli, Panathur, Bengaluru
                    <br />
                    📞 +91 7760 565 100 &nbsp; | &nbsp; +91 7626 974 629
                  </div>
                </div>

                <div className="relative min-h-[320px] sm:min-h-[700px] lg:min-h-[700px]">
                  <Image
                    src="/offer2.png"
                    alt="Bramble special offer"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/25" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative section-alt py-16 sm:py-20">
          <div className="absolute inset-0">
            <Image
              src="/gallery/7.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 500px at 20% 30%, rgba(0,200,150,.18), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(255,255,255,.05), transparent 60%)",
            }}
          />

          <div className="container-max relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <div className="text-sm tracking-[0.18em] text-white/60">
                  ABOUT
                </div>
                <h2 className="mt-3 text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl">
                  What we stand for —{" "}
                  <span style={{ color: "var(--accent)" }}>cocktails</span>,{" "}
                  <span className="text-white/80">glocal plates</span> &{" "}
                  <span className="text-white/80">rooftop energy</span>.
                </h2>
              </div>

              <div className="lg:border-l lg:border-white/10 lg:pl-6">
                <p className="leading-relaxed text-white/70">
                  In the heart of South Bangalore,{" "}
                  <span className="font-semibold text-white">Bramble</span> comes
                  to life — inspired by the berry and built around a beautiful
                  affair between{" "}
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

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
              <FadeUp>
                <div className="card-dark card-hover p-6 sm:p-7 md:p-9">
                  <h3 className="mb-4 text-2xl font-semibold">
                    A two-floor experience
                  </h3>

                  <p className="text-[15px] leading-relaxed text-white/75 md:text-[16px]">
                    The space is elevated with aesthetic furniture and neon
                    eclectic artwork, creating a lively vibe that beckons to be
                    discovered. Our menu blends global techniques with local
                    favorites — from{" "}
                    <span className="text-white">Kundapur Ghee Roast</span>,{" "}
                    <span className="text-white">Nethli Fry</span>,{" "}
                    <span className="text-white">Curd Rice Bonda</span> — to
                    Italian, Asian, Mediterranean and modern Indian creations.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="pill flex items-center gap-2 text-white/85">
                      <span className="text-lg">🍸</span>
                      <span>Signature cocktails & mocktails</span>
                    </div>
                    <div className="pill flex items-center gap-2 text-white/85">
                      <span className="text-lg">🌆</span>
                      <span>Rooftop city-view ambience</span>
                    </div>
                    <div className="pill flex items-center gap-2 text-white/85">
                      <span className="text-lg">🍛</span>
                      <span>Glocal cuisine — global + local</span>
                    </div>
                    <div className="pill flex items-center gap-2 text-white/85">
                      <span className="text-lg">🎶</span>
                      <span>Weekend music & nightlife</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a className="btn-outline-accent w-full sm:w-auto" href="#gallery">
                      See Gallery
                    </a>
                    <a className="btn-ghost w-full sm:w-auto" href="#events">
                      Private Events
                    </a>
                    <a className="btn-accent w-full sm:w-auto" href="#reserve">
                      <CalendarCheck size={18} />
                      Reserve
                    </a>
                  </div>

                  <div className="mt-6 text-xs text-white/55">
                    ✨ Best time to visit:{" "}
                    <span className="text-white/75">Sunset → late night</span>
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
                        src="/gallery/1.png"
                        alt="Bramble ambience"
                        width={1200}
                        height={1600}
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
              <div className="text-sm tracking-[0.18em] text-white/60">
                EVENTS & CELEBRATIONS
              </div>

              <h2 className="mt-3 text-3xl font-semibold text-emerald-300 sm:text-4xl">
                Celebrate your special moments
              </h2>

              <p className="mt-3 text-white/70">
                Birthdays • private parties • corporate evenings • outdoor
                catering
              </p>
            </div>

            <div className="relative mt-12 overflow-hidden card-dark">
              <div className="grid lg:grid-cols-2">
                <div className="p-6 sm:p-7 md:p-10">
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
                            className="flex items-start gap-3 text-white/80"
                          >
                            <span
                              className="mt-1 h-3 w-3 rounded-sm"
                              style={{ background: "var(--accent)" }}
                            />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <p className="mt-6 leading-relaxed text-white/70">
                        {SLIDES[slide].desc}
                      </p>

                      <div className="mt-8">
                        <a href="#reserve" className="btn-accent text-sm">
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
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition hover:bg-black/60 sm:left-4"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                aria-label="Next event slide"
                onClick={next}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition hover:bg-black/60 sm:right-4"
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
                    className="h-2.5 w-2.5 rounded-full"
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
          <div className="absolute inset-0">
            <Image
              src="/gallery/2.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 500px at 20% 30%, rgba(0,200,150,.18), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(255,255,255,.05), transparent 60%)",
            }}
          />
          <div className="container-max relative">
            <div className="text-center">
              <div className="text-sm tracking-[0.18em] text-white/60">
                GALLERY
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-emerald-300 sm:text-4xl">
                A glimpse of the vibe
              </h2>
              <p className="mt-2 text-white/70">
                Click any photo to open full-screen.
              </p>
            </div>

            <Stagger>
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
                          <div className="mt-0.5 text-xs text-white/80">
                            Tap to open
                          </div>
                        </div>
                      </div>
                    </button>
                  </Item>
                ))}
              </div>
            </Stagger>
          </div>
        </section>

        {/* BOOKING */}
        <section id="reserve" className="relative overflow-hidden py-16 sm:py-20">
          <div className="container-max relative">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="text-white">
                <h2 className="text-3xl font-semibold">Book Your Table</h2>

                <p className="mt-3 max-w-lg leading-relaxed text-white/70">
                  Reserve your table in seconds. You’ll receive a confirmation
                  email once your booking is submitted.
                </p>

                <div className="mt-7 space-y-5 text-sm">
                  <InfoLine
                    title="Timings"
                    text={`Opening Time - 12:00PM
Closing Time - 1:00 AM`}
                  />
                  <InfoLine title="Location" text={loc.address} />
                  <InfoLine title="Call Us" text={loc.phones.join("\n")} />
                </div>

                <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    width={1200}
                    height={700}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              <div className="card-dark p-6 text-white sm:p-7 md:p-9">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold">Book A Table</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Please fill the form below to make a reservation
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {LOCATIONS.map((l) => (
                    <button
                      key={l.key}
                      type="button"
                      aria-label={`Select location ${l.name}`}
                      onClick={() => setActiveLoc(l.key)}
                      className="rounded-full border px-5 py-2 text-sm font-semibold transition"
                      style={{
                        borderColor: "rgba(255,255,255,.10)",
                        background:
                          activeLoc === l.key
                            ? "rgba(0,200,150,.18)"
                            : "rgba(255,255,255,.04)",
                        color: "rgba(255,255,255,.88)",
                      }}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>

                <form onSubmit={submit} className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="mb-2 block text-sm text-white/80">
                      Your Name
                    </label>
                    <input
                      id="name"
                      className="input-dark w-full"
                      name="name"
                      required
                      value={form.name}
                      onChange={onChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="mb-2 block text-sm text-white/80">
                      Your Email
                    </label>
                    <input
                      id="email"
                      className="input-dark w-full"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={onChange}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="mb-2 block text-sm text-white/80">
                      Your Phone
                    </label>
                    <input
                      id="phone"
                      className="input-dark w-full"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={onChange}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="guests" className="mb-2 block text-sm text-white/80">
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      className="input-dark w-full"
                      name="guests"
                      required
                      value={form.guests}
                      onChange={onChange}
                    >
                      <option value="">Number of guests</option>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          {i + 1} Guests
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="date" className="mb-2 block text-sm text-white/80">
                      Date
                    </label>
                    <input
                      id="date"
                      className="input-dark w-full"
                      type="date"
                      min={minDate}
                      name="date"
                      required
                      value={form.date}
                      onChange={onChange}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="time" className="mb-2 block text-sm text-white/80">
                      Time
                    </label>
                    <input
                      id="time"
                      className="input-dark w-full"
                      type="time"
                      name="time"
                      required
                      value={form.time}
                      onChange={onChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="note" className="mb-2 block text-sm text-white/80">
                      Special Requests
                    </label>
                    <textarea
                      id="note"
                      className="input-dark min-h-[110px] w-full"
                      name="note"
                      value={form.note}
                      onChange={onChange}
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="btn-accent mt-1 w-full sm:col-span-2"
                  >
                    {loading ? "Sending..." : "Book Now"}
                  </button>
                </form>

                {toast && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                    {toast}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0">
            <Image
              src="/gallery/1.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 500px at 20% 30%, rgba(0,200,150,.18), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(255,255,255,.05), transparent 60%)",
            }}
          />

          <div className="container-max relative text-white">
            <div className="text-center">
              <div className="text-3xl font-semibold md:text-4xl">Location</div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {LOCATIONS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  aria-label={`Show location ${l.name}`}
                  onClick={() => setActiveLoc(l.key)}
                  className="rounded-full border px-5 py-2 text-sm font-semibold transition"
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
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                <iframe
                  key={loc.key}
                  title={`${loc.name} map`}
                  className="h-[340px] w-full sm:h-[420px]"
                  loading="lazy"
                  src={loc.map}
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
                <div className="text-2xl font-semibold">Visit {loc.name}</div>

                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <MapPin size={20} style={{ color: "var(--accent)" }} />
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-sm text-white/60">{loc.address}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail size={20} style={{ color: "var(--accent)" }} />
                    <div>
                      <div className="font-semibold">Reservations</div>
                      <div className="text-sm text-white/60">{email}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={20} style={{ color: "var(--accent)" }} />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-sm text-white/60">
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
                  <a href="#reserve" className="btn-accent flex-1 text-center text-sm">
                    Make Reservation
                  </a>

                  <a
                    href="#contact"
                    className="btn-outline-accent flex-1 text-center text-sm"
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
            <div className="text-center text-3xl font-semibold">
              Get in Touch
            </div>
            <div className="mt-2 text-center text-white/60">
              For reservations & events, reach us anytime.
            </div>

            <div className="card-dark mx-auto mt-8 max-w-5xl p-6 md:p-10">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm text-white/80"
                  >
                    Your Name
                  </label>
                  <input id="contact-name" className="input-dark w-full" />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm text-white/80"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="input-dark w-full"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm text-white/80"
                >
                  Subject
                </label>
                <input id="contact-subject" className="input-dark w-full" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm text-white/80"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="input-dark min-h-[150px] w-full"
                />
              </div>

              <div className="mt-7 flex justify-center">
                <button className="btn-accent px-10 text-sm">SEND MESSAGE</button>
              </div>
            </div>

            <footer className="mt-14 border-t border-white/10 pt-10 text-white/70">
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

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Premium cocktail bar & kitchen — rooftop vibes, glocal
                    flavours, and signature drinks.
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <a
                      href="https://www.facebook.com/brambleblr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Bramble Kitchen Facebook page"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition hover:scale-110"
                    >
                      <Facebook size={18} />
                    </a>

                    <a
                      href="https://www.instagram.com/bramble.blr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Bramble Kitchen Instagram page"
                      className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-110"
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
                  <div className="font-semibold text-white/90">Useful Links</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/60">
                    <li><a className="hover:text-white" href="#hero">Home</a></li>
                    <li><a className="hover:text-white" href="#about">About</a></li>
                    <li><a className="hover:text-white" href="#gallery">Gallery</a></li>
                    <li><a className="hover:text-white" href="#events">Events</a></li>
                    <li><a className="hover:text-white" href="#reserve">Book</a></li>
                    <li><a className="hover:text-white" href="#location">Location</a></li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-white/90">Our Services</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/60">
                    <li>Rooftop Dining</li>
                    <li>Private Parties</li>
                    <li>Birthday Celebrations</li>
                    <li>Outdoor Catering</li>
                    <li>Corporate Events</li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-white/90">Contact</div>

                  <div className="mt-4 text-sm leading-relaxed text-white/60">
                    <div className="font-semibold text-white/80">
                      Marathahalli
                    </div>
                    Panathur Main Rd, Kadubeesanahalli, Bengaluru
                    <br />
                    <span className="text-white/80">Phone:</span> +917760565100
                    <br />
                    <span className="text-white/80">Phone:</span> +917626974629
                  </div>

                  <div className="mt-4 text-sm text-white/60">
                    <span className="text-white/80">Email:</span> {email}
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center text-xs text-white/50">
                © {new Date().getFullYear()} {restroName}. All Rights Reserved
              </div>
            </footer>
          </div>
        </section>

        <Lightbox
          open={gOpen}
          images={GALLERY}
          index={gIdx}
          onClose={() => setGOpen(false)}
          onPrev={gPrev}
          onNext={gNext}
        />
      </div>
    </>
  );
}

function InfoLine({ title, text }) {
  return (
    <div>
      <div className="font-semibold text-white/90">{title}</div>
      <div className="whitespace-pre-line text-white/60">{text}</div>
    </div>
  );
}