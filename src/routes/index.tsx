import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/Hero";
import { PolaroidBoard } from "@/components/PolaroidBoard";
import { CountdownGate } from "@/components/CountdownGate";

const Scrapbook = lazy(() => import("@/components/Scrapbook"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Sweety — A Scrapbook Of Us" },
      {
        name: "description",
        content:
          "A birthday page made with love: a live age counter, a trail of memories, polaroids and a flip-through scrapbook.",
      },
      { property: "og:title", content: "Happy Birthday Sweety" },
      {
        property: "og:description",
        content:
          "A birthday page made with love: a live age counter, memories, polaroids and a flip-through scrapbook.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CountdownGate>
    <main className="h-screen w-full snap-y snap-mandatory select-none overflow-x-hidden overflow-y-scroll scroll-smooth bg-zinc-50">
      <section className="relative z-10 h-screen w-full shrink-0 snap-start snap-always">
        <iframe
          src="/birthday.html"
          title="Birthday Reveal"
          allow="autoplay"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </section>

      <section className="relative z-10 h-screen w-full shrink-0 snap-start snap-always overflow-hidden">
        <Hero />
      </section>

      <section className="relative z-10 h-screen w-full shrink-0 snap-start snap-always overflow-hidden">
        <PolaroidBoard />
      </section>

      <section className="relative z-10 h-screen w-full shrink-0 snap-start snap-always">
        <ClientOnly fallback={<div className="h-screen w-full bg-zinc-50" />}>
          <Suspense fallback={<div className="h-screen w-full bg-zinc-50" />}>
            <Scrapbook />
          </Suspense>
        </ClientOnly>
      </section>
    </main>
  );
}
