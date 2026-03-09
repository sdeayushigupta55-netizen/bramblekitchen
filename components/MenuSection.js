import { useMemo, useState } from "react";
import { FadeUp } from "./Motion";
import Lightbox from "./Lightbox";
import { FileText } from "lucide-react";

const MENU = [
  { key: "cocktails", title: "Legend’s Cocktails", items: [
    { name: "Martini", desc: "Gin, vermouth, olive brine", price: "₹325" },
    { name: "Margarita", desc: "Tequila, triple sec, fresh lime juice", price: "₹345" },
    { name: "Long Island Iced Tea", desc: "Vodka, tequila, rum, gin, triple sec, lime, coke", price: "₹595" },
    { name: "Whisky Sour", desc: "Whisky, egg white, sugar syrup, fresh lime", price: "₹375" },
    { name: "Negroni", desc: "Gin, campari, sweet vermouth, orange twist", price: "₹575" },
  ]},
  { key: "signatures", title: "Bramble’s Signatures", items: [
    { name: "Bramble", desc: "Gin, blueberry liqueur, special mix, lime", price: "₹625" },
    { name: "Blood on the Roof Top", desc: "Vodka, rum, gin, tequila, red wine, lime", price: "₹595" },
    { name: "Maria Maria", desc: "Gin, cucumber, sweet basil, demerara sugar", price: "₹475" },
    { name: "King Kong", desc: "Dark rum, coke, sweet sour, basil", price: "₹455" },
    { name: "Koo-Koo Cabana", desc: "Vodka, caribbean rum, coconut water", price: "₹495" },
  ]},
  { key: "spirits", title: "Spirits & Beverages", items: [
    { name: "Whiskies", desc: "Black & White, Dewars, VAT 69, Jim Beam", price: "₹275+" },
    { name: "Vodkas", desc: "Smirnoff, Absolut, Ketel One, Grey Goose", price: "₹395+" },
    { name: "Gins", desc: "Hendrick’s, Bombay Sapphire, Gordon’s", price: "₹125+" },
    { name: "Tequila", desc: "Jose Cuervo, Sauza, Patron", price: "₹375+" },
    { name: "Zero Alcohol", desc: "Fruit Punch, Twilight Saga, Mango Shango", price: "₹225+" },
  ]},
];

const MENU_IMAGES = [
  { src: "/menu/menu-1.jpg", alt: "Menu page 1" },
  { src: "/menu/menu-2.jpg", alt: "Menu page 2" },
  { src: "/menu/menu-3.jpg", alt: "Menu page 3" },
];

function Row({ item }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-white/10">
      <div className="min-w-0">
        <div className="font-semibold">{item.name}</div>
        {item.desc ? <div className="text-sm text-white/70 mt-0.5">{item.desc}</div> : null}
      </div>
      <div className="shrink-0 font-semibold text-white/90">{item.price}</div>
    </div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState(MENU[0].key);
  const tab = useMemo(() => MENU.find((m) => m.key === active) || MENU[0], [active]);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const openAt = (i) => { setIdx(i); setOpen(true); };
  const prev = () => setIdx((p) => (p - 1 + MENU_IMAGES.length) % MENU_IMAGES.length);
  const next = () => setIdx((p) => (p + 1) % MENU_IMAGES.length);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4">
        <FadeUp>
          <div className="card shadow-glow">
            <div className="flex flex-wrap gap-2">
              {MENU.map((t) => {
                const is = t.key === active;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={[
                      "rounded-2xl px-4 py-2 text-sm font-semibold transition border",
                      is ? "bg-white/10 border-white/25" : "bg-white/5 border-white/10 hover:bg-white/8",
                    ].join(" ")}
                  >
                    {t.title}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <div className="text-lg font-semibold">{tab.title}</div>
              <div className="mt-3">
                {tab.items.map((it, i) => <Row key={i} item={it} />)}
              </div>

              <button className="btn-ghost mt-5 w-full" onClick={() => openAt(0)}>
                <FileText size={18} /> View Full Menu (images)
              </button>
              <div className="mt-3 text-xs text-white/60">
                Full menu images are in <span className="text-white/80">/public/menu</span>.
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="card relative overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-70" />
            <div className="noise" />
            <div className="relative">
              <div className="text-lg font-semibold">Delightful Dishes</div>
              <p className="mt-2 text-white/75 leading-relaxed">
                Our food is inspired by Glocal cuisine which is a mix of global and local cuisines and has something for everyone.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {MENU_IMAGES.map((m, i) => (
                  <button
                    key={m.src}
                    onClick={() => openAt(i)}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <div className="aspect-[3/4] bg-center bg-cover" style={{ backgroundImage: `url('${m.src}')` }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      <Lightbox open={open} images={MENU_IMAGES} index={idx} onClose={() => setOpen(false)} onPrev={prev} onNext={next} />
    </>
  );
}
