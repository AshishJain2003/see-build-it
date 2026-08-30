import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";

type Layer = { src: string; className: string };

const L = (src: string, className: string): Layer => ({ src, className });

const SPREADS: Layer[][] = [
  [
    L("/pages/left.jpg", ""),
    L("/elements/fwine.png", "-rotate-12 -translate-x-34 -translate-y-33 scale-35"),
    L("/elements/side3.png", "-translate-x-23 -translate-y-14 scale-78"),
    L("/elements/mouse.png", "z-50 translate-x-20 translate-y-46 scale-55"),
    L("/elements/butter.png", "scale-45 rotate-30 -translate-x-28 translate-y-32"),
    L("/ref/girl.jpg", "scale-33 rotate-10 translate-x-14 -translate-y-23"),
    L("/elements/frame10.png", "scale-65 rotate-10 translate-x-14 -translate-y-20"),
    L("/elements/text1.png", "scale-45 translate-x-10 translate-y-15"),
  ],
  [
    L("/pages/right.jpg", ""),
    L("/elements/paper.png", "rotate-90 translate-x-18 translate-y-38 scale-50"),
    L("/elements/starB.png", "-rotate-50 -translate-x-17 translate-y-30 scale-50"),
    L("/ref/girl.jpg", "rotate-20 translate-x-19 -translate-y-22 scale-22"),
    L("/ref/girl2.jpg", "rotate-20 translate-x-26 -translate-y-43 scale-22"),
    L("/ref/girl3.jpg", "rotate-20 translate-x-11 translate-y-1 scale-22"),
    L("/elements/frame9.png", "rotate-12 translate-x-18 -translate-y-20 scale-80"),
    L("/elements/text2.png", "-translate-x-13 -translate-y-40 scale-60"),
    L("/elements/kit.png", "-translate-x-13 -translate-y-16 scale-60"),
  ],
  [
    L("/pages/left.jpg", ""),
    L("/elements/billa6.png", "scale-55 rotate-1 -translate-x-30 -translate-y-10"),
    L("/elements/side1.png", "scale-50 rotate-180 -translate-x-26 translate-y-31"),
    L("/elements/starem.png", "scale-16 -rotate-18 translate-x-18 -translate-y-56 z-20"),
    L("/ref/girl4.jpg", "scale-33 rotate-17 translate-x-13 -translate-y-21 z-30"),
    L("/elements/frame11.png", "scale-75 rotate-18 translate-x-10 -translate-y-11 z-30"),
    L("/elements/moon.png", "scale-34 -rotate-14 -translate-x-20 translate-y-30 z-40"),
    L("/elements/fits.png", "scale-44 -rotate-14 -translate-x-30 -translate-y-50 z-40"),
    L("/elements/note1.png", "scale-68 -rotate-7 z-50 translate-x-14 translate-y-38"),
    L("/elements/lovetape.png", "scale-19 z-50 translate-x-10 translate-y-24"),
  ],
  [
    L("/pages/right.jpg", ""),
    L("/elements/side2.png", "scale-68 z-50 translate-x-16 translate-y-23"),
    L("/elements/billa.png", "scale-38 z-50 -translate-x-14 -translate-y-28"),
    L("/elements/boqey.png", "scale-48 z-50 -translate-x-14 translate-y-28"),
    L("/ref/girl5.jpg", "scale-32 z-50 translate-x-19 -translate-y-32"),
    L("/ref/girl1.jpg", "scale-68 z-50 translate-x-18 -translate-y-28"),
    L("/frames/frame5.png", "scale-68 z-50 translate-x-18 -translate-y-28"),
    L("/elements/miss.png", "scale-48 rotate-18 z-50 translate-x-28 translate-y-4"),
  ],
  [
    L("/pages/left.jpg", ""),
    L("/elements/side4.png", "scale-68 z-50 -translate-x-22 translate-y-23"),
    L("/elements/disk.png", "scale-68 z-50 -translate-x-50 -translate-y-15"),
    L("/elements/billa5.png", "scale-68 z-50 translate-x-19 translate-y-33"),
    L("/ref/girl11.jpg", "scale-26 -rotate-11 z-50 translate-x-4 -translate-y-12"),
    L("/ref/girl10.jpg", "scale-26 rotate-11 z-50 translate-x-16 -translate-y-40"),
    L("/elements/frame8.png", "scale-68 z-50 translate-x-10 -translate-y-25"),
    L("/elements/twoStar.png", "scale-38 z-50 -translate-x-14 translate-y-20"),
    L("/elements/text3.png", "scale-48 z-50 -translate-x-22 -translate-y-48"),
  ],
  [
    L("/pages/right.jpg", ""),
    L("/elements/side5.png", "scale-78 z-50 translate-x-22 translate-y-14"),
    L("/elements/text4.png", "scale-58 z-50 -translate-x-6 -translate-y-40"),
    L("/ref/girl9.jpg", "scale-28 -rotate-4 z-50 -translate-x-18 -translate-y-16"),
    L("/ref/girl8.jpg", "scale-27 rotate-10 z-50 -translate-x-11 translate-y-13"),
    L("/elements/frame7.png", "scale-68 z-50 -translate-x-14 translate-y-1"),
    L("/elements/billa4.png", "scale-58 z-50 -translate-x-17 translate-y-40"),
  ],
];

function Layers({ layers }: { layers: Layer[] }) {
  return (
    <>
      {layers.map((l, i) => (
        <img
          key={`${l.src}-${i}`}
          src={l.src}
          alt=""
          draggable={false}
          loading="lazy"
          className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain ${l.className}`}
        />
      ))}
    </>
  );
}

export default function Scrapbook() {
  const [size, setSize] = useState({ w: 400, h: 500 });

  useEffect(() => {
    const update = () => {
      const h = Math.min(500, Math.max(320, window.innerHeight * 0.72));
      setSize({ w: Math.round(h * 0.8), h: Math.round(h) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden bg-zinc-50">
      {/* @ts-expect-error react-pageflip types are loose about children */}
      <HTMLFlipBook
        width={size.w}
        height={size.h}
        size="fixed"
        maxShadowOpacity={0.4}
        showCover
        mobileScrollSupport={false}
        className="scrapbook"
        style={{}}
      >
        <div className="book-page" data-density="hard">
          <img
            src="/pages/front.png"
            alt="Front cover"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain scale-130 translate-x-3"
          />
        </div>

        {SPREADS.map((layers, i) => (
          <div className="book-page bg-amber-50" key={i}>
            <Layers layers={layers} />
          </div>
        ))}

        <div className="book-page" data-density="hard">
          <img
            src="/pages/back.png"
            alt="Back cover"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain scale-130 translate-x-3"
          />
        </div>
      </HTMLFlipBook>
      <p className="hero-mono mt-6 text-[10px] uppercase tracking-[0.25em] text-mute">
        Drag a page corner to turn
      </p>
    </div>
  );
}
