const POLAROIDS = [
  { src: "/ref/girl3.jpg", caption: "Cutie 🥹", pos: "top-[8%] left-[8%]", rot: "-8deg" },
  { src: "/ref/girl4.jpg", caption: "Baddie 😎", pos: "top-[15%] left-[35%]", rot: "6deg" },
  { src: "/ref/girl5.jpg", caption: "Pretty ✨", pos: "top-[10%] right-[10%]", rot: "-5deg" },
  { src: "/ref/girl6.jpg", caption: "My Love 🤍", pos: "top-[45%] left-[12%]", rot: "7deg" },
  { src: "/ref/girl7.jpg", caption: "Sunshine ☀️", pos: "top-[50%] left-[40%]", rot: "-6deg" },
  { src: "/ref/girl8.jpg", caption: "Angel 🪽", pos: "top-[40%] right-[12%]", rot: "10deg" },
  { src: "/ref/girl9.jpg", caption: "Beautiful 🌸", pos: "bottom-[10%] left-[18%]", rot: "-10deg" },
  { src: "/ref/girl10.jpg", caption: "Dream Girl 💫", pos: "bottom-[12%] left-[45%]", rot: "5deg" },
  { src: "/ref/girl11.jpg", caption: "Queen 👑", pos: "bottom-[8%] right-[15%]", rot: "-7deg" },
];

export function PolaroidBoard() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-board">
      <div className="pointer-events-none absolute inset-0 board-grid" />
      <div className="pointer-events-none absolute inset-0 board-vignette" />

      <span className="pointer-events-none absolute left-[7%] top-[5%] text-2xl text-black/15">✿</span>
      <span className="pointer-events-none absolute right-[6%] bottom-[6%] text-2xl text-black/15">♡</span>
      <span className="pointer-events-none absolute right-[8%] top-[45%] text-xl text-black/15">✨</span>

      {POLAROIDS.map((p) => (
        <div
          key={p.src}
          className={`absolute z-10 min-h-60 w-52 rounded-xl bg-white p-3 shadow-2xl transition-transform duration-300 hover:scale-[1.03] ${p.pos}`}
          style={{ rotate: p.rot }}
        >
          <div className="relative">
            <img
              src={p.src}
              alt={p.caption}
              draggable={false}
              loading="lazy"
              className="h-56 w-56 rounded-lg object-cover"
            />
            <div className="pointer-events-none absolute -right-7 -top-7 z-50 text-5xl drop-shadow-md">
              ❤️
            </div>
            <p className="hand mt-3 text-center text-3xl font-semibold text-neutral-700">
              {p.caption}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
