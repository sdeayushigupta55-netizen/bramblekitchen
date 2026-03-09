export default function SectionTitle({ kicker, title, desc, align = "left" }) {
  const a = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={"mb-8 flex flex-col gap-3 " + a}>
      {kicker ? (
        <div className="badge">
          <span className="h-2 w-2 rounded-full bg-teal" />
          <span className="text-white/80">{kicker}</span>
        </div>
      ) : null}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">{title}</h2>
      {desc ? <p className="muted max-w-2xl leading-relaxed">{desc}</p> : null}
    </div>
  );
}
