import { useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { FadeUp } from "./Motion";

const LOCATIONS = [
  // {
  //   key: "jp",
  //   name: "Bramble JP Nagar",
  //   address: "5th Floor, Le Foliage Building, Marenhalli Road, Jayanagar, Bangalore",
  //   reservations: "zomato.com",
  //   phones: ["+918951289994", "+918105679998", "+919980197119"],
  //   image: "/locations/jp.png",
  // },
  {
    key: "marathahalli",
    name: "Bramble Marathahalli",
    address: "Panathur Main Rd, Kadubeesanahalli, Panathur, Bengaluru, Karnataka 560103",
    reservations: "zomato.com",
    phones: ["+917760565100", "+917626974629"],
    image: "/locations/marathahalli.png",
  },
];

export default function Locations() {
  const [active, setActive] = useState(LOCATIONS[0].key);
  const current = LOCATIONS.find((x) => x.key === active) || LOCATIONS[0];

  return (
    <div className="grid lg:grid-cols-[280px,1fr] gap-4">
      <FadeUp>
        <div className="card">
          <div className="font-semibold">Nearby locations</div>
          <div className="mt-3 grid gap-2">
            {LOCATIONS.map((l) => {
              const is = l.key === active;
              return (
                <button
                  key={l.key}
                  onClick={() => setActive(l.key)}
                  className={[
                    "text-left rounded-2xl px-4 py-3 border transition",
                    is ? "bg-white/10 border-white/25" : "bg-white/5 border-white/10 hover:bg-white/8",
                  ].join(" ")}
                >
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-xs text-white/60 mt-1">{l.address}</div>
                </button>
              );
            })}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.05}>
        <div className="card">
          <div className="grid md:grid-cols-[1.3fr,0.9fr] gap-4 items-start">
            <div>
              <div className="text-xl font-semibold">{current.name}</div>
              <div className="mt-4 grid gap-3">
                <div className="pill flex gap-3">
                  <MapPin className="mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-sm text-white/70 mt-1">{current.address}</div>
                  </div>
                </div>

                <div className="pill">
                  <div className="font-semibold">Reservations</div>
                  <div className="text-sm text-white/70 mt-1">{current.reservations}</div>
                </div>

                <div className="pill flex gap-3">
                  <Phone className="mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-semibold">Call</div>
                    <div className="text-sm text-white/70 mt-1">{current.phones.join(", ")}</div>
                  </div>
                </div>

                <a className="btn-ghost w-full" href="https://www.google.com/maps" target="_blank" rel="noreferrer">
                  <ExternalLink size={18} /> Open in Google Maps
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-[4/3] bg-center bg-cover" style={{ backgroundImage: `url('${current.image}')` }} />
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
