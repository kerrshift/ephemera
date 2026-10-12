"use client";

import * as React from "react";
import { Button } from "@/registry/ephemera/button";
import { Input, Textarea, Label } from "@/registry/ephemera/input";
import { Checkbox } from "@/registry/ephemera/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/registry/ephemera/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ephemera/tabs";
import { Badge } from "@/registry/ephemera/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/registry/ephemera/dialog";
import { Toaster, toast } from "@/registry/ephemera/toast";

export const PAPERS = [
  { id: "cream", label: "Cream", swatch: "#fbf8f1", pen: "#1f3c88" },
  { id: "kraft", label: "Kraft", swatch: "#d6bf98", pen: "#8f2d22" },
  { id: "ledger", label: "Ledger", swatch: "#e8efd9", pen: "#1f5a36" },
  { id: "blueprint", label: "Blueprint", swatch: "#1f4f8f", pen: "#f4f8ff" },
  { id: "newsprint", label: "Newsprint", swatch: "#ebe9e1", pen: "#141413" },
  { id: "carbon", label: "Carbon", swatch: "#1c1b19", pen: "#e9cf8f" },
] as const;

/** Paper-type picker + a themed sheet. Shared paper choice across the page. */
const PaperContext = React.createContext<[string, (p: string) => void]>(["cream", () => {}]);

export function PaperProvider({ children }: { children: React.ReactNode }) {
  const state = React.useState("cream");
  return <PaperContext.Provider value={state}>{children}</PaperContext.Provider>;
}

export function PaperPicker({ dark = false }: { dark?: boolean }) {
  const [paper, setPaper] = React.useContext(PaperContext);
  return (
    <div role="radiogroup" aria-label="Paper type" className="flex flex-wrap items-center gap-1.5">
      {PAPERS.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={paper === p.id}
          onClick={() => setPaper(p.id)}
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
            paper === p.id
              ? dark
                ? "border-white/60 bg-white/15 text-white"
                : "border-ink bg-ink text-bg"
              : dark
                ? "border-white/15 text-white/70 hover:text-white"
                : "border-line text-muted hover:text-ink"
          }`}
        >
          <span
            className="size-3.5 rounded-full"
            style={{ background: `linear-gradient(135deg, ${p.swatch} 55%, ${p.pen} 55%)`, boxShadow: "inset 0 0 0 1px rgb(0 0 0 / .2)" }}
          />
          {p.label}
        </button>
      ))}
    </div>
  );
}

export function PaperSheet({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [paper] = React.useContext(PaperContext);
  return (
    <div data-paper={paper} className={`paper rounded-[4px] text-(--ink) shadow-[0_20px_50px_-20px_rgb(0_0_0/.6)] ${className}`}>
      {children}
      <Toaster />
    </div>
  );
}

export function Framed({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <PaperProvider>
      <div className="flex w-full flex-col items-center gap-5">
        <PaperPicker dark />
        <PaperSheet className={`w-full max-w-[640px] p-6 sm:p-10 ${className}`}>{children}</PaperSheet>
      </div>
    </PaperProvider>
  );
}

const letters = [
  { from: "Sam Okafor", subject: "Postcard from Lisbon", tag: <Badge tape="blue">Travel</Badge>, date: "Oct 12" },
  { from: "Studio Mori", subject: "Invoice Nº 0042", tag: <Badge tape="red">Due</Badge>, date: "Oct 11" },
  { from: "Grandma", subject: "The fig jam recipe", tag: <Badge tape="yellow">Keep</Badge>, date: "Oct 9" },
];

/** A small correspondence app built only from Ephemera core. */
export function Showcase() {
  const [seal, setSeal] = React.useState(true);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <Card ruled>
        <CardHeader>
          <CardTitle>New letter</CardTitle>
          <CardDescription>Goes out with the morning post.</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-5 px-6 pb-2 pt-5">
          <div>
            <Label htmlFor="sc-to">To</Label>
            <Input id="sc-to" defaultValue="Sam Okafor" />
          </div>
          <div>
            <Label htmlFor="sc-subject">Subject</Label>
            <Input id="sc-subject" placeholder="Re: Lisbon" />
          </div>
          <div>
            <Label htmlFor="sc-body" className="mb-2">
              Letter
            </Label>
            <Textarea id="sc-body" rows={4} defaultValue={"Dear Sam,\nThe figs are in. Come by on Saturday?"} />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="sc-seal" checked={seal} onCheckedChange={(v) => setSeal(v === true)} />
            <Label htmlFor="sc-seal" className="cursor-pointer">
              Seal with wax
            </Label>
          </div>
        </div>
        <CardFooter className="justify-end pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">Preview</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dear Sam,</DialogTitle>
                <DialogDescription>The figs are in. Come by on Saturday?</DialogDescription>
              </DialogHeader>
              <p className="text-[14px] text-(--ink-muted)">{seal ? "Sealed with wax." : "Not sealed."}</p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="paper">Keep editing</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => toast("Letter sent", { description: "Sam will get it tomorrow." })}>Send</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={() => toast("Letter sent", { description: "Sam will get it tomorrow." })}>Send</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="p-0">
          <ul>
            {letters.map((l, i) => (
              <li key={l.subject} className={`flex items-center gap-4 px-6 py-4 ${i ? "border-t border-dashed border-(--edge)" : ""}`}>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--ink-muted)" style={{ fontFamily: "var(--font-type)" }}>
                    {l.from}
                  </div>
                  <div className="mt-0.5 truncate text-[17px]" style={{ fontFamily: "var(--font-display)" }}>
                    {l.subject}
                  </div>
                </div>
                {l.tag}
                <span className="hidden text-[12px] text-(--ink-faint) sm:inline" style={{ fontFamily: "var(--font-type)" }}>
                  {l.date}
                </span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="drafts">
          <p className="text-(--ink-muted)">One draft, half written, in the second drawer.</p>
        </TabsContent>
        <TabsContent value="sent">
          <p className="text-(--ink-muted)">Nothing sent this week.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const coreDemos: Record<string, () => React.ReactNode> = {
  "paper-theme": () => (
    <Framed className="max-w-[1000px]">
      <Showcase />
    </Framed>
  ),
  button: () => (
    <Framed>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button>Send letter</Button>
        <Button variant="paper">Save draft</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Shred</Button>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
    </Framed>
  ),
  input: () => (
    <Framed>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="d-name">Your name</Label>
          <Input id="d-name" placeholder="Ada Lovelace" />
        </div>
        <div>
          <Label htmlFor="d-email">Email</Label>
          <Input id="d-email" type="email" defaultValue="not-an-email" aria-invalid />
        </div>
      </div>
      <div className="mt-6">
        <Label htmlFor="d-note" className="mb-2">
          Note
        </Label>
        <Textarea id="d-note" placeholder="Dear diary…" />
      </div>
    </Framed>
  ),
  checkbox: () => <Framed><Todo /></Framed>,
  card: () => (
    <Framed className="max-w-[760px]">
      <div className="grid gap-6 sm:grid-cols-2">
        <Card ruled>
          <CardHeader>
            <CardTitle>Groceries</CardTitle>
            <CardDescription>Saturday market</CardDescription>
          </CardHeader>
          <CardContent>
            Bread, figs
            <br />
            Good olive oil
            <br />
            Flowers for Sam
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stationery box</CardTitle>
            <CardDescription>Twelve cards, envelopes and a wax seal.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-[36px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              $24
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to basket</Button>
          </CardFooter>
        </Card>
      </div>
    </Framed>
  ),
  tabs: () => (
    <Framed>
      <Tabs defaultValue="drafts">
        <TabsList>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="drafts">Three letters waiting for stamps.</TabsContent>
        <TabsContent value="sent">Nothing sent yet this week.</TabsContent>
        <TabsContent value="archive">Every letter since 2019, alphabetised.</TabsContent>
      </Tabs>
    </Framed>
  ),
  badge: () => (
    <Framed>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge>Draft</Badge>
        <Badge tape="red">Urgent</Badge>
        <Badge tape="blue">Travel</Badge>
        <Badge tape="green">Paid</Badge>
        <Badge tape="yellow">Pending</Badge>
        <Badge tape="ink">v1.0</Badge>
      </div>
    </Framed>
  ),
  dialog: () => (
    <Framed>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Write a letter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dear Sam,</DialogTitle>
              <DialogDescription>It has been too long. Here is what happened.</DialogDescription>
            </DialogHeader>
            <Textarea placeholder="Write something…" rows={4} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Later</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => toast("Letter sent")}>Send</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Framed>
  ),
  toast: () => (
    <Framed>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={() => toast("Letter sent", { description: "Sam will get it tomorrow." })}>Send letter</Button>
        <Button variant="paper" onClick={() => toast("Draft saved")}>
          Save draft
        </Button>
        <Button variant="danger" onClick={() => toast("Couldn't send", { tone: "danger", description: "The post office is closed." })}>
          Fail
        </Button>
      </div>
    </Framed>
  ),
};

function Todo() {
  const [items, setItems] = React.useState([
    { t: "Buy stamps", done: true },
    { t: "Write to grandma", done: false },
    { t: "Return library books", done: false },
  ]);
  return (
    <ul className="mx-auto flex max-w-xs flex-col gap-4">
      {items.map((it, i) => (
        <li key={it.t} className="flex items-center gap-3">
          <Checkbox
            id={`todo-${i}`}
            checked={it.done}
            onCheckedChange={(v) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, done: v === true } : x)))}
          />
          <label
            htmlFor={`todo-${i}`}
            className={`cursor-pointer text-[20px] transition-colors ${it.done ? "text-(--ink-faint) line-through decoration-(--pen) decoration-2" : ""}`}
            style={{ fontFamily: "var(--font-hand)" }}
          >
            {it.t}
          </label>
        </li>
      ))}
    </ul>
  );
}
