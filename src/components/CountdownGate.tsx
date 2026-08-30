import { useEffect, useState, type ReactNode } from "react";

// TEMPORARY: 10-min test — will revert to 14 Sep 2026 after verifying Vercel deploy
const TARGET = new Date("2026-08-30T18:56:00Z").getTime();

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="hero-display text-[13vw] font-bold leading-none tabular-nums text-ink sm:text-6xl lg:text-7xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="hero-mono mt-3 text-[9px] uppercase tracking-[0.3em] text-mute sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownGate({ children }: { children: ReactNode }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return <div className="min-h-screen w-full bg-paper" />;
  }

  if (now >= TARGET) return <>{children}</>;

  const { days, hours, minutes, seconds } = parts(TARGET - now);

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-paper">
      <div className="hero-mono flex items-center justify-between px-8 pt-8 text-[11px] uppercase tracking-[0.25em] text-mute sm:px-14">
        <span>Aug 31 (test)</span>
        <span>00:26</span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 sm:px-14">
        <h1 className="hero-display text-[13vw] leading-[0.86] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <span className="font-light">Something</span>
          <br />
          <span className="font-bold">is coming</span>
          <br />
          <span className="font-bold text-accent-gold">Madam Jii</span>
        </h1>
        <div className="mt-6 h-px w-16 bg-rule" />
        <p className="hero-body mt-6 max-w-sm text-base leading-relaxed text-body">
          This page unlocks on your birthday — 14th September, at midnight sharp.
        </p>

        <div className="mt-12 flex items-start gap-6 sm:gap-12">
          <Unit value={days} label="Days" />
          <Unit value={hours} label="Hours" />
          <Unit value={minutes} label="Minutes" />
          <Unit value={seconds} label="Seconds" />
        </div>
      </div>

      <div className="flex items-center gap-4 px-8 pb-6 sm:px-14">
        <div className="h-px flex-1 bg-ink/10" />
        <span className="hero-mono text-[10px] uppercase tracking-[0.25em] text-mute">
          Made for you
        </span>
      </div>
    </main>
  );
}

export default CountdownGate;
