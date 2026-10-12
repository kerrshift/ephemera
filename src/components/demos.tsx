"use client";

import * as React from "react";
import { Receipt } from "@/registry/ephemera/receipt";
import { Ticket } from "@/registry/ephemera/ticket";
import { BoardingPass } from "@/registry/ephemera/boarding-pass";
import { Polaroid } from "@/registry/ephemera/polaroid";
import { PostageStamp } from "@/registry/ephemera/postage-stamp";
import { RubberStamp } from "@/registry/ephemera/rubber-stamp";
import { Envelope } from "@/registry/ephemera/envelope";
import { WaxSeal } from "@/registry/ephemera/wax-seal";
import { StickyNote } from "@/registry/ephemera/sticky-note";
import { coreDemos } from "./paper-demos";
import { moreDemos } from "./more-demos";

export const photo = (id: number, size = 600) => `https://picsum.photos/id/${id}/${size}/${size}`;

export const demos: Record<string, () => React.ReactNode> = {
  ...coreDemos,
  ...moreDemos,
  receipt: () => (
    <Receipt
      title="NIGHT OWL COFFEE"
      subtitle={"221 Baker St\nOpen till late"}
      meta={[
        { label: "ORDER", value: "#0042" },
        { label: "DATE", value: "12/10/26 23:14" },
      ]}
      items={[
        { name: "Flat white", price: 4.5, qty: 2 },
        { name: "Almond croissant", price: 3.75 },
        { name: "Oat cookie", price: 2.25 },
      ]}
      taxRate={0.08}
    />
  ),
  ticket: () => (
    <Ticket
      eyebrow="The Paper Moon Cinema"
      title="Midnight Matinee"
      details={[
        { label: "Date", value: "Fri 12 Oct" },
        { label: "Doors", value: "11:30 PM" },
        { label: "Seat", value: "F14" },
      ]}
    />
  ),
  "boarding-pass": () => (
    <BoardingPass from={{ code: "LIS", city: "Lisbon" }} to={{ code: "KIX", city: "Osaka" }} passenger="Ada Lovelace" />
  ),
  polaroid: () => (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <Polaroid src={photo(1015)} alt="River valley" caption="road trip '26" rotate={-4} tape />
      <Polaroid src={photo(1025)} alt="A pug in a blanket" caption="meet biscuit" rotate={3} />
    </div>
  ),
  "postage-stamp": () => (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <PostageStamp src={photo(1039, 400)} alt="Waterfall" value="42¢" rotate={-3} />
      <PostageStamp src={photo(1080, 400)} alt="Strawberries" value="€1" label="POSTE RIPE" postmark={{ city: "Lisbon", date: "12 OCT 26" }} rotate={4} />
    </div>
  ),
  "rubber-stamp": () => (
    <div
      className="relative w-full max-w-[520px] rounded-[3px] px-8 py-9 text-[#2a2620] shadow-[0_10px_24px_-8px_rgb(0_0_0/.4)]"
      style={{ background: "#fbf8f1", fontFamily: "var(--font-type)" }}
    >
      <div className="flex justify-between text-[12px] uppercase tracking-[0.2em] opacity-60">
        <span>Invoice Nº 0042</span>
        <span>12 Oct 2026</span>
      </div>
      <div className="mt-5 font-serif text-[26px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        Night Owl Coffee
      </div>
      <div className="mt-4 space-y-1.5 text-[13px]">
        {[["Espresso machine service", "$180.00"], ["Grinder burrs", "$64.00"], ["Call-out fee", "$40.00"]].map(([a, b]) => (
          <div key={a} className="flex justify-between border-b border-dashed border-black/15 pb-1.5">
            <span>{a}</span>
            <span>{b}</span>
          </div>
        ))}
        <div className="flex justify-between pt-1 font-bold">
          <span>Total</span>
          <span>$284.00</span>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6">
        <RubberStamp ink="blue" rotate={4}>
          Approved
        </RubberStamp>
        <RubberStamp ink="green" shape="round" rotate={-14}>
          OK
        </RubberStamp>
      </div>
      <RubberStamp ink="red" sub="12 OCT 2026" className="absolute right-8 top-16">
        Paid
      </RubberStamp>
    </div>
  ),
  envelope: () => (
    <div className="w-full max-w-[420px] pt-[150px]">
      <Envelope to="for Sam" seal={<WaxSeal size={64}>S</WaxSeal>}>
        <div style={{ fontFamily: "var(--font-display)" }} className="text-[26px] italic leading-tight">
          You&rsquo;re invited
        </div>
        <p className="mt-2 text-[13px] leading-snug opacity-75">Saturday, 7pm, at the old boathouse. Bring a sweater and a story.</p>
      </Envelope>
      <p className="mt-6 text-center text-xs opacity-60">click to open</p>
    </div>
  ),
  "wax-seal": () => (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <WaxSeal>E</WaxSeal>
      <WaxSeal color="#1e3a5f" seed={7} size={84}>
        A&amp;B
      </WaxSeal>
      <WaxSeal color="#2d5a3d" seed={11}>
        M
      </WaxSeal>
      <WaxSeal color="#b8862b" seed={2} size={60}>
        ✦
      </WaxSeal>
    </div>
  ),
  "sticky-note": () => (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <StickyNote attach="tape" rotate={-3}>
        call mum back ♥
      </StickyNote>
      <StickyNote color="pink" attach="pin" rotate={3}>
        ship it before friday!!
      </StickyNote>
      <StickyNote color="blue" rotate={-1} size={180}>
        milk, eggs, more tape
      </StickyNote>
    </div>
  ),
};
