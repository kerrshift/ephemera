"use client";

import * as React from "react";
import { Draggable } from "./site";
import { photo } from "./demos";
import { Receipt } from "@/registry/ephemera/receipt";
import { Ticket } from "@/registry/ephemera/ticket";
import { BoardingPass } from "@/registry/ephemera/boarding-pass";
import { Polaroid } from "@/registry/ephemera/polaroid";
import { PostageStamp } from "@/registry/ephemera/postage-stamp";
import { RubberStamp } from "@/registry/ephemera/rubber-stamp";
import { Envelope } from "@/registry/ephemera/envelope";
import { WaxSeal } from "@/registry/ephemera/wax-seal";
import { StickyNote } from "@/registry/ephemera/sticky-note";
import { Button } from "@/registry/ephemera/button";
import { Input, Label } from "@/registry/ephemera/input";
import { Checkbox } from "@/registry/ephemera/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/registry/ephemera/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ephemera/tabs";
import { Badge } from "@/registry/ephemera/badge";
import { PAPERS } from "./paper-demos";
import { MorePreview } from "./more-demos";

function Sheet({ children, paper = "cream" }: { children: React.ReactNode; paper?: string }) {
  return (
    <div data-paper={paper} className="paper rounded-[4px] p-6 shadow-[0_14px_30px_-12px_rgb(0_0_0/.6)]">
      {children}
    </div>
  );
}

export function DeskPieces() {
  return (
    <>
      <Draggable x="3%" y="5%" rotate={-4}>
        <Receipt
          title="EPHEMERA GOODS CO."
          subtitle={"14 Paper Lane\nest. 2026"}
          meta={[{ label: "ORDER", value: "#0001" }]}
          items={[
            { name: "Receipt", price: 0 },
            { name: "Ticket", price: 0 },
            { name: "Polaroid", price: 0 },
            { name: "Rubber stamp", price: 0 },
            { name: "Good taste", price: 0, qty: 99 },
          ]}
          footer="FREE FOREVER · MIT"
          barcode="EPHEMERA-0001"
          width={270}
        />
      </Draggable>
      <Draggable x="27%" y="7%" rotate={3}>
        <Ticket
          className="w-[460px] max-w-full"
          eyebrow="Now showing"
          title="Components with a paper trail"
          details={[
            { label: "Price", value: "Free" },
            { label: "License", value: "MIT" },
            { label: "Seat", value: "Yours" },
          ]}
        />
      </Draggable>
      <Draggable x="78%" y="5%" rotate={7}>
        <Polaroid src={photo(1015)} alt="River valley at dusk" caption="the desk, 2026" width={220} rotate={0} tape />
      </Draggable>
      <Draggable x="35%" y="58%" rotate={-2} className="w-[340px] max-w-full">
        <Envelope to="for you" seal={<WaxSeal size={58}>E</WaxSeal>}>
          <div className="font-serif text-[22px] italic leading-tight">Hello there.</div>
          <p className="mt-1.5 text-[12.5px] leading-snug opacity-75">
            Everything on this desk is a React component. Click the cards below to grab one.
          </p>
        </Envelope>
      </Draggable>
      <Draggable x="64%" y="50%" rotate={-5}>
        <StickyNote attach="pin" size={190}>
          drag things around ↗ they&rsquo;re just divs
        </StickyNote>
      </Draggable>
      <Draggable x="84%" y="58%" rotate={8}>
        <PostageStamp src={photo(1080, 400)} alt="Strawberries" value="€0" label="POSTE RIPE" width={130} postmark={{ city: "Anywhere", date: "12 OCT 26" }} />
      </Draggable>
      <Draggable x="5%" y="74%" rotate={0}>
        <RubberStamp ink="#e2574c" sub="no ai slop inside" rotate={-9} style={{ mixBlendMode: "normal" }}>
          Hand made
        </RubberStamp>
      </Draggable>
      <Draggable x="25%" y="64%" rotate={0}>
        <WaxSeal color="#1e3a5f" seed={7} size={76}>
          ✦
        </WaxSeal>
      </Draggable>
    </>
  );
}

/** Small, non-interactive previews for the collection grid. */
export function CardPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "paper-theme":
      return (
        <div className="flex -space-x-10">
          {PAPERS.map((p, i) => (
            <div
              key={p.id}
              data-paper={p.id}
              className="paper flex h-[150px] w-[92px] items-end rounded-[3px] p-2.5 shadow-[0_8px_18px_-6px_rgb(0_0_0/.55)]"
              style={{ rotate: `${(i - 2.5) * 4}deg`, translate: `0 ${Math.abs(i - 2.5) * 6}px` }}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-(--ink)" style={{ fontFamily: "var(--font-type)" }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>
      );
    case "button":
      return (
        <Sheet>
          <div className="flex gap-3">
            <Button>Send</Button>
            <Button variant="paper">Draft</Button>
          </div>
        </Sheet>
      );
    case "input":
      return (
        <Sheet>
          <div className="w-[230px]">
            <Label>Your name</Label>
            <Input defaultValue="Ada Lovelace" tabIndex={-1} />
          </div>
        </Sheet>
      );
    case "checkbox":
      return (
        <Sheet>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3"><Checkbox defaultChecked tabIndex={-1} /><Label>Buy stamps</Label></div>
            <div className="flex items-center gap-3"><Checkbox tabIndex={-1} /><Label>Write to grandma</Label></div>
          </div>
        </Sheet>
      );
    case "card":
      return (
        <div data-paper="cream" className="w-[250px]">
          <Card ruled>
            <CardHeader className="pb-3 pt-4"><CardTitle className="text-[19px]">Groceries</CardTitle></CardHeader>
            <CardContent className="py-2 text-[14px]">Bread, figs<br />Good olive oil</CardContent>
          </Card>
        </div>
      );
    case "tabs":
      return (
        <div data-paper="kraft" className="w-[280px]">
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a" tabIndex={-1}>Drafts</TabsTrigger>
              <TabsTrigger value="b" tabIndex={-1}>Sent</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="p-4 text-[14px]">Three letters waiting.</TabsContent>
          </Tabs>
        </div>
      );
    case "badge":
      return (
        <div data-paper="cream" className="flex flex-wrap justify-center gap-2.5">
          <Badge>Draft</Badge>
          <Badge tape="red">Urgent</Badge>
          <Badge tape="yellow">Pending</Badge>
        </div>
      );
    case "dialog":
      return (
        <div data-paper="cream" className="relative">
          <div className="paper w-[250px] rotate-[-2deg] rounded-[3px] border border-(--edge) bg-(--paper-raised) p-5 shadow-[0_16px_30px_-10px_rgb(0_0_0/.6)]">
            <div className="text-[20px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>Dear Sam,</div>
            <p className="mt-1 text-[13px] text-(--ink-muted)">It has been too long.</p>
            <div className="mt-4 flex justify-end"><Button size="sm" tabIndex={-1}>Send</Button></div>
          </div>
        </div>
      );
    case "toast":
      return (
        <div data-paper="cream" className="w-[250px] rotate-[2deg]" style={{ filter: "drop-shadow(0 6px 10px rgb(0 0 0 / .35))" }}>
          <div
            className="paper bg-(--paper-raised) px-4 pb-5 pt-3.5"
            style={{ mask: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 10px 100%", fontFamily: "var(--font-receipt)" }}
          >
            <div className="text-[12.5px] font-bold uppercase tracking-[0.12em]">Letter sent</div>
            <div className="mt-1 text-[12px] text-(--ink-muted)">Sam will get it tomorrow.</div>
          </div>
        </div>
      );
    case "receipt":
      return (
        <div className="translate-y-[30%] scale-[.8]">
          <Receipt items={[{ name: "Flat white", price: 4.5 }, { name: "Croissant", price: 3.75 }]} title="NIGHT OWL COFFEE" print={false} width={240} />
        </div>
      );
    case "ticket":
      return (
        <div className="w-[400px] scale-[.72]">
          <Ticket eyebrow="Paper Moon Cinema" title="Midnight Matinee" details={[{ label: "Seat", value: "F14" }]} tearable={false} />
        </div>
      );
    case "boarding-pass":
      return (
        <div className="w-[520px] scale-[.6]">
          <BoardingPass from={{ code: "LIS", city: "Lisbon" }} to={{ code: "KIX", city: "Osaka" }} passenger="Ada Lovelace" />
        </div>
      );
    case "polaroid":
      return (
        <div className="translate-y-[12%] scale-[.68]">
          <Polaroid src={photo(1025, 400)} alt="" caption="meet biscuit" develop={false} rotate={-4} />
        </div>
      );
    case "postage-stamp":
      return <PostageStamp src={photo(1039, 300)} alt="" width={120} rotate={-4} postmark />;
    case "rubber-stamp":
      return (
        <RubberStamp ink="red" sub="12 OCT 2026" animate={false} style={{ mixBlendMode: "normal" }}>
          Approved
        </RubberStamp>
      );
    case "envelope":
      return (
        <div className="w-[260px]">
          <Envelope to="for Sam" seal={<WaxSeal size={48}>S</WaxSeal>}>
            <span />
          </Envelope>
        </div>
      );
    case "wax-seal":
      return (
        <div className="flex gap-3">
          <WaxSeal size={70}>E</WaxSeal>
          <WaxSeal size={70} color="#1e3a5f" seed={7}>
            ✦
          </WaxSeal>
        </div>
      );
    case "sticky-note":
      return <StickyNote attach="tape" size={160}>call mum back ♥</StickyNote>;
    default:
      return <MorePreview slug={slug} />;
  }
}
