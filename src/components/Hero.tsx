import { useEffect, useRef, useState } from "react";

const PATH =
  "M 1 209.434 C 58.5872 255.935 387.926 325.938 482.583 209.434 C 600.905 63.8051 525.516 -43.2211 427.332 19.9613 C 329.149 83.1436 352.902 242.723 515.041 267.302 C 644.752 286.966 943.56 181.94 995 156.5";

const PHOTOS = [
  "/ref/heart.jpg",
  "/ref/girl.jpg",
  "/ref/girl2.jpg",
  "/ref/girl3.jpg",
  "/ref/girl4.jpg",
  "/ref/girl5.jpg",
  "/ref/girl6.jpg",
  "/ref/girl7.jpg",
  "/ref/girl8.jpg",
  "/ref/girl9.jpg",
  "/ref/girl10.jpg",
  "/ref/girl11.jpg",
];

const ITEMS = [...PHOTOS, ...PHOTOS];
const DURATION = 70;

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 996);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-paper">
      <div className="hero-mono flex items-center justify-between px-8 pt-8 text-[11px] uppercase tracking-[0.25em] text-mute sm:px-14">
        <span>Aug 02</span>
      </div>

      <div className="px-8 pt-16 sm:px-14 sm:pt-20">
        <h1 className="hero-display text-[15vw] leading-[0.86] tracking-tight text-ink sm:text-7xl lg:text-8xl">
          <span className="font-light">Happy</span>
          <br />
          <span className="font-bold">Birthday</span>
          <br />
          <span className="font-bold text-accent-gold">Madam Jii</span>
        </h1>
        <div className="mt-6 h-px w-16 bg-rule" />
        <p className="hero-body mt-6 max-w-sm text-base leading-relaxed text-body">
          May this year bring you closer to everything you&apos;re chasing.
        </p>
      </div>

      <div
        ref={wrapRef}
        className="pointer-events-none absolute left-1/2 top-50 w-screen -translate-x-1/2 -rotate-10"
      >
        <div
          className="relative"
          style={{
            width: 996,
            height: 330,
            transform: `scale(${scale})`,
            transformOrigin: "left top",
          }}
        >
          {ITEMS.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="marquee-item absolute left-0 top-0"
              style={{
                offsetPath: `path("${PATH}")`,
                animationDuration: `${DURATION}s`,
                animationDelay: `-${(i / ITEMS.length) * DURATION}s`,
              }}
            >
              <div className="h-14 w-14 overflow-hidden border border-ink/15 bg-ink/5">
                <img
                  src={src}
                  alt={`Memory ${(i % PHOTOS.length) + 1}`}
                  draggable={false}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-4 px-8 pb-6 sm:px-14">
        <div className="h-px flex-1 bg-ink/10" />
        <span className="hero-mono text-[10px] uppercase tracking-[0.25em] text-mute">
          Made for you
        </span>
      </div>
    </section>
  );
}
