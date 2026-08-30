import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

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

type Offset = { x: number; y: number };

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mobile;
}

export function PolaroidBoard() {
  const isMobile = useIsMobile();
  const [offsets, setOffsets] = useState<Record<string, Offset>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const start = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);

  const onPointerDown = (key: string) => (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const cur = offsets[key] ?? { x: 0, y: 0 };
    start.current = { px: e.clientX, py: e.clientY, ox: cur.x, oy: cur.y };
    setDragging(key);
    setOrder((o) => [...o.filter((k) => k !== key), key]);
  };

  const onPointerMove = (key: string) => (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging !== key || !start.current) return;
    const s = start.current;
    setOffsets((o) => ({
      ...o,
      [key]: { x: s.ox + (e.clientX - s.px), y: s.oy + (e.clientY - s.py) },
    }));
  };

  const endDrag = () => {
    start.current = null;
    setDragging(null);
  };

  /* ---- MOBILE: vertical scrollable grid of polaroids ---- */
  if (isMobile) {
    return (
      <section className="relative flex min-h-screen w-full flex-col overflow-y-auto bg-board">
        <div className="pointer-events-none absolute inset-0 board-grid" />
        <div className="pointer-events-none absolute inset-0 board-vignette" />

        <div className="relative z-10 grid grid-cols-2 gap-4 px-4 py-8">
          {POLAROIDS.map((p) => (
            <div
              key={p.src}
              className="mx-auto w-full max-w-[170px] select-none rounded-xl bg-white p-2 shadow-xl"
              style={{ rotate: p.rot }}
            >
              <div className="relative">
                <img
                  src={p.src}
                  alt={p.caption}
                  draggable={false}
                  loading="lazy"
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="pointer-events-none absolute -right-3 -top-3 z-50 text-2xl drop-shadow-md">
                  ❤️
                </div>
                <p className="hand mt-2 text-center text-xl font-semibold text-neutral-700">
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---- DESKTOP: original draggable scattered board ---- */
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-board">
      <div className="pointer-events-none absolute inset-0 board-grid" />
      <div className="pointer-events-none absolute inset-0 board-vignette" />

      <span className="pointer-events-none absolute left-[7%] top-[5%] text-2xl text-black/15">✿</span>
      <span className="pointer-events-none absolute right-[6%] bottom-[6%] text-2xl text-black/15">♡</span>
      <span className="pointer-events-none absolute right-[8%] top-[45%] text-xl text-black/15">✨</span>

      {POLAROIDS.map((p) => {
        const off = offsets[p.src] ?? { x: 0, y: 0 };
        const isDragging = dragging === p.src;
        const stackIndex = order.indexOf(p.src);
        return (
          <div
            key={p.src}
            onPointerDown={onPointerDown(p.src)}
            onPointerMove={onPointerMove(p.src)}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`absolute min-h-60 w-52 touch-none select-none rounded-xl bg-white p-3 shadow-2xl ${
              isDragging ? "cursor-grabbing scale-[1.05]" : "cursor-grab transition-transform duration-300 hover:scale-[1.03]"
            } ${p.pos}`}
            style={{
              rotate: p.rot,
              translate: `${off.x}px ${off.y}px`,
              zIndex: 10 + (stackIndex >= 0 ? stackIndex + 1 : 0) + (isDragging ? 100 : 0),
            }}
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
        );
      })}
    </section>
  );
}
