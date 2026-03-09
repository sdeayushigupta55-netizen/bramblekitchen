   
{/* MENU */}
<section
  id="menu"
  className="relative section-soft py-16 menu-bg"
  style={{
    backgroundImage: "url('/ref/menu-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  <div className="absolute inset-0 bg-black/60" />
  <div className="absolute inset-0" />

  <div className="container-max relative">
    <div className="text-center">
      <div className="text-white/60 tracking-[0.18em] text-sm">Menu</div>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
        Signature picks
      </h2>
      <p className="mt-2 text-white/70">
        Tap categories to preview — View full menu anytime.
      </p>
    </div>

    {/* Category pills */}
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {CATS.map((c) => {
        const active = cat === c;
        return (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-5 py-2 rounded-full text-sm font-semibold border transition"
            style={{
              borderColor: "rgba(255,255,255,.14)",
              background: active ? "rgba(0,200,150,.20)" : "rgba(0,0,0,.35)",
              color: "rgba(255,255,255,.90)",
              backdropFilter: "blur(10px)",
            }}
          >
            {c}
          </button>
        );
      })}
    </div>

    {/* Cards */}
    <motion.div layout className="mt-12 grid lg:grid-cols-2 gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((x) => (
          <motion.div
            key={x.title}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="menu-card p-6"
          >
            <div className="flex gap-5">
              {/* Thumbnail */}
              <div className="menu-thumb h-[92px] w-[92px] shrink-0">
                <div
                  className="h-full w-full bg-center bg-cover"
                  style={{ backgroundImage: `url('${x.img}')` }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xl font-semibold truncate">
                      {x.title}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="menu-chip">{x.tag}</span>
                    </div>
                  </div>

                  <span className="price-chip">{x.price}</span>
                </div>

                <div className="text-white/70 mt-3 text-sm leading-relaxed">
                  {x.desc}
                </div>

                {/* CTAs */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="#reserve" className="btn-accent px-5 py-2.5 text-sm">
                    Book a Table
                  </a>
                  <a
                    href="#contact"
                    className="btn-outline-accent px-5 py-2.5 text-sm"
                  >
                    Ask for Recommendations
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>

    <div className="mt-12 flex justify-center">
      <a href="" className="btn-accent">
        View Full Menu
      </a>
    </div>
  </div>
</section>