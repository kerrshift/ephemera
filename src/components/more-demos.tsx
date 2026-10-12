"use client";

import * as React from "react";
import { Framed } from "./paper-demos";
import { Button } from "@/registry/ephemera/button";
import { Input, Label } from "@/registry/ephemera/input";
import { RadioGroup, RadioGroupItem } from "@/registry/ephemera/radio-group";
import { Switch } from "@/registry/ephemera/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/registry/ephemera/select";
import { Slider } from "@/registry/ephemera/slider";
import { DatePicker } from "@/registry/ephemera/date-picker";
import { Calendar } from "@/registry/ephemera/calendar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ephemera/accordion";
import { Separator } from "@/registry/ephemera/separator";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/registry/ephemera/table";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/registry/ephemera/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ephemera/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ephemera/tooltip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/ephemera/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ephemera/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/registry/ephemera/alert";
import { Progress } from "@/registry/ephemera/progress";
import { Skeleton } from "@/registry/ephemera/skeleton";
import { Kbd, KbdGroup } from "@/registry/ephemera/kbd";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/ephemera/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ephemera/pagination";

const photo = (id: number, size = 600) => `https://picsum.photos/id/${id}/${size}/${size}`;

// fixed so the server and client render the same month
const OCT = new Date(2026, 9, 12);

const ledger = [
  ["Oct 02", "Stamps, first class", "12.40"],
  ["Oct 05", "Envelopes (100)", "8.95"],
  ["Oct 09", "Sealing wax, red", "6.50"],
  ["Oct 11", "Fountain pen ink", "14.00"],
];

function PunchDemo() {
  const [v, setV] = React.useState(35);
  return (
    <div className="mx-auto flex max-w-md flex-col gap-5">
      <Progress value={v} />
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-(--ink-muted)" style={{ fontFamily: "var(--font-type)" }}>
          {v}% punched
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="paper" onClick={() => setV((x) => Math.max(0, x - 15))}>
            − Less
          </Button>
          <Button size="sm" onClick={() => setV((x) => Math.min(100, x + 15))}>
            + More
          </Button>
        </div>
      </div>
    </div>
  );
}

function CalendarDemo() {
  const [d, setD] = React.useState<Date | undefined>(OCT);
  return (
    <div className="flex justify-center">
      <Calendar selected={d} onSelect={setD} defaultMonth={OCT} />
    </div>
  );
}

function SliderDemo() {
  const [v, setV] = React.useState([40]);
  return (
    <div className="mx-auto flex max-w-md flex-col gap-10">
      <div>
        <Label>Paper weight · {v[0]} gsm</Label>
        <Slider value={v} onValueChange={setV} min={0} max={200} className="mt-2" />
      </div>
      <div>
        <Label>Price range</Label>
        <Slider defaultValue={[20, 70]} className="mt-2" />
      </div>
    </div>
  );
}

export const moreDemos: Record<string, () => React.ReactNode> = {
  "radio-group": () => (
    <Framed>
      <RadioGroup defaultValue="post" className="mx-auto max-w-xs">
        {[
          ["post", "First-class post"],
          ["courier", "Courier, next day"],
          ["pigeon", "Carrier pigeon"],
        ].map(([v, l]) => (
          <div key={v} className="flex items-center gap-3">
            <RadioGroupItem value={v} id={`r-${v}`} />
            <Label htmlFor={`r-${v}`} className="cursor-pointer">
              {l}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Framed>
  ),
  switch: () => (
    <Framed>
      <div className="mx-auto flex max-w-xs flex-col gap-5">
        {[
          ["s-night", "Night post", true],
          ["s-recorded", "Recorded delivery", false],
          ["s-fragile", "Mark as fragile", false],
        ].map(([id, l, on]) => (
          <div key={id as string} className="flex items-center justify-between gap-4">
            <Label htmlFor={id as string} className="cursor-pointer">
              {l}
            </Label>
            <Switch id={id as string} defaultChecked={on as boolean} />
          </div>
        ))}
      </div>
    </Framed>
  ),
  select: () => (
    <Framed>
      <div className="mx-auto grid max-w-md gap-6 sm:grid-cols-2">
        <div>
          <Label>Paper</Label>
          <Select defaultValue="kraft">
            <SelectTrigger>
              <SelectValue placeholder="Choose paper" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cream">Cream</SelectItem>
              <SelectItem value="kraft">Kraft</SelectItem>
              <SelectItem value="ledger">Ledger</SelectItem>
              <SelectItem value="blueprint">Blueprint</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Delivery</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="How fast?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Standard</SelectLabel>
                <SelectItem value="2nd">Second class</SelectItem>
                <SelectItem value="1st">First class</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Express</SelectLabel>
                <SelectItem value="courier">Courier</SelectItem>
                <SelectItem value="pigeon" disabled>
                  Pigeon (resting)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Framed>
  ),
  slider: () => (
    <Framed>
      <SliderDemo />
    </Framed>
  ),
  "date-picker": () => (
    <Framed>
      <div className="mx-auto max-w-xs">
        <Label htmlFor="dp">Deliver on</Label>
        <DatePicker id="dp" />
      </div>
    </Framed>
  ),
  calendar: () => (
    <Framed>
      <CalendarDemo />
    </Framed>
  ),
  accordion: () => (
    <Framed>
      <Accordion type="single" collapsible defaultValue="a" className="mx-auto max-w-lg">
        <AccordionItem value="a">
          <AccordionTrigger>How long does post take?</AccordionTrigger>
          <AccordionContent>Two to three days, weather and pigeons permitting.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Can I send it back?</AccordionTrigger>
          <AccordionContent>Write &ldquo;return to sender&rdquo; on the front and pop it in any box.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Is wax sealing extra?</AccordionTrigger>
          <AccordionContent>No. Every letter is sealed by hand, free of charge.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Framed>
  ),
  separator: () => (
    <Framed>
      <div className="mx-auto flex max-w-md flex-col gap-6 text-[14px]" style={{ fontFamily: "var(--font-type)" }}>
        <span>rule</span>
        <Separator />
        <span>double</span>
        <Separator variant="double" />
        <span>perforated</span>
        <Separator variant="perforated" />
        <span>scissors</span>
        <Separator variant="scissors" />
        <div className="flex h-6 items-center gap-4">
          <span>Inbox</span>
          <Separator orientation="vertical" />
          <span>Drafts</span>
          <Separator orientation="vertical" />
          <span>Sent</span>
        </div>
      </div>
    </Framed>
  ),
  table: () => (
    <Framed className="max-w-[720px]">
      <Table>
        <TableCaption>October stationery accounts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ledger.map(([d, desc, a]) => (
            <TableRow key={d}>
              <TableCell className="text-(--ink-muted)" style={{ fontFamily: "var(--font-type)" }}>
                {d}
              </TableCell>
              <TableCell>{desc}</TableCell>
              <TableCell numeric>{a}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell numeric>41.85</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Framed>
  ),
  sheet: () => (
    <Framed>
      <div className="flex flex-wrap justify-center gap-3">
        {(["right", "left", "bottom"] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="paper">Open {side}</Button>
            </SheetTrigger>
            <SheetContent side={side} tab="Settings">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Everything in one folder.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-5">
                <div>
                  <Label htmlFor={`sh-name-${side}`}>Name</Label>
                  <Input id={`sh-name-${side}`} defaultValue="Ada Lovelace" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`sh-sw-${side}`}>Night post</Label>
                  <Switch id={`sh-sw-${side}`} defaultChecked />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Save</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </Framed>
  ),
  popover: () => (
    <Framed>
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="paper">Edit address</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <div className="text-[18px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                Address
              </div>
              <div>
                <Label htmlFor="pop-street">Street</Label>
                <Input id="pop-street" defaultValue="221B Baker St" />
              </div>
              <div>
                <Label htmlFor="pop-city">City</Label>
                <Input id="pop-city" defaultValue="London" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Framed>
  ),
  tooltip: () => (
    <Framed>
      <div className="flex flex-wrap justify-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="paper">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Don&rsquo;t forget the stamp!</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Or me</Button>
          </TooltipTrigger>
          <TooltipContent note="pink" side="bottom">
            pink ones are urgent ♥
          </TooltipContent>
        </Tooltip>
      </div>
    </Framed>
  ),
  "dropdown-menu": () => (
    <Framed>
      <div className="flex justify-center">
        <MenuDemo />
      </div>
    </Framed>
  ),
  avatar: () => (
    <Framed>
      <div className="flex flex-wrap items-end justify-center gap-6">
        <Avatar size="sm">
          <AvatarImage src={photo(64, 120)} alt="" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={photo(65, 160)} alt="" />
          <AvatarFallback>SO</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar size="lg" shape="postmark">
          <AvatarImage src={photo(91, 200)} alt="" />
          <AvatarFallback>GM</AvatarFallback>
        </Avatar>
        <Avatar size="xl">
          <AvatarImage src={photo(177, 240)} alt="" />
          <AvatarFallback>EP</AvatarFallback>
        </Avatar>
      </div>
    </Framed>
  ),
  alert: () => (
    <Framed>
      <div className="flex flex-col gap-4">
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>The post office closes early on Fridays.</AlertDescription>
        </Alert>
        <Alert variant="danger">
          <AlertTitle>Returned to sender</AlertTitle>
          <AlertDescription>The address on letter #0042 could not be found.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Delivered</AlertTitle>
          <AlertDescription>Sam signed for it at 9:41.</AlertDescription>
        </Alert>
      </div>
    </Framed>
  ),
  progress: () => (
    <Framed>
      <PunchDemo />
    </Framed>
  ),
  skeleton: () => (
    <Framed>
      <div className="mx-auto flex max-w-sm items-center gap-4">
        <Skeleton className="size-14 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
    </Framed>
  ),
  kbd: () => (
    <Framed>
      <div className="flex flex-col items-center gap-5 text-[14px]">
        <div className="flex items-center gap-3">
          Search
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
        <div className="flex items-center gap-3">
          New letter
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>N</Kbd>
          </KbdGroup>
        </div>
      </div>
    </Framed>
  ),
  breadcrumb: () => (
    <Framed>
      <Breadcrumb>
        <BreadcrumbList className="justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Drawer</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Letters</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dear Sam</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Framed>
  ),
  pagination: () => (
    <Framed>
      <PagesDemo />
    </Framed>
  ),
};

function MenuDemo() {
  const [cc, setCc] = React.useState(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="paper">Letter ▾</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>This letter</DropdownMenuLabel>
        <DropdownMenuItem>
          Reply <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Forward <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem checked={cc} onCheckedChange={setCc}>
          Keep a carbon copy
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Shred</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PagesDemo() {
  const [page, setPage] = React.useState(2);
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(Math.min(5, Math.max(1, p)));
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={go(page - 1)} />
        </PaginationItem>
        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href="#" isActive={page === p} onClick={go(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive={page === 5} onClick={go(5)}>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Sheet2({ children, paper = "cream" }: { children: React.ReactNode; paper?: string }) {
  return (
    <div data-paper={paper} className="paper rounded-[4px] p-6 shadow-[0_14px_30px_-12px_rgb(0_0_0/.6)]">
      {children}
    </div>
  );
}

/** Static previews for the collection grid. */
export function MorePreview({ slug }: { slug: string }) {
  switch (slug) {
    case "radio-group":
      return (
        <Sheet2>
          <RadioGroup defaultValue="a">
            <div className="flex items-center gap-3"><RadioGroupItem value="a" tabIndex={-1} /><Label>First class</Label></div>
            <div className="flex items-center gap-3"><RadioGroupItem value="b" tabIndex={-1} /><Label>Pigeon</Label></div>
          </RadioGroup>
        </Sheet2>
      );
    case "switch":
      return (
        <Sheet2 paper="ledger">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-6"><Label>Night post</Label><Switch defaultChecked tabIndex={-1} /></div>
            <div className="flex items-center justify-between gap-6"><Label>Fragile</Label><Switch tabIndex={-1} /></div>
          </div>
        </Sheet2>
      );
    case "select":
      return (
        <div data-paper="cream" className="paper w-[220px] rounded-[3px] border border-(--edge) bg-(--paper-raised) p-1 shadow-[0_14px_30px_-12px_rgb(0_0_0/.6)]" style={{ fontFamily: "var(--font-type)" }}>
          {["Cream", "Kraft", "Ledger"].map((x, i) => (
            <div key={x} className={`flex items-center gap-2 border-b border-dashed border-(--edge) py-2 pl-3 text-[14px] last:border-0 ${i === 1 ? "bg-(--paper-sunk)" : ""}`}>
              <span className="w-4 text-(--pen)">{i === 1 ? "✓" : ""}</span>
              {x}
            </div>
          ))}
        </div>
      );
    case "slider":
      return (
        <Sheet2 paper="kraft">
          <div className="w-[240px]">
            <Slider defaultValue={[55]} tabIndex={-1} />
          </div>
        </Sheet2>
      );
    case "date-picker":
      return (
        <Sheet2>
          <div className="w-[220px]">
            <Label>Deliver on</Label>
            <DatePicker defaultValue={OCT} />
          </div>
        </Sheet2>
      );
    case "calendar":
      return (
        <div data-paper="cream" className="origin-center scale-[.62]">
          <Calendar selected={OCT} defaultMonth={OCT} />
        </div>
      );
    case "accordion":
      return (
        <Sheet2>
          <div className="w-[250px] text-[12px] font-bold uppercase tracking-[0.16em]" style={{ fontFamily: "var(--font-type)" }}>
            <div className="flex justify-between border-b border-dashed border-(--edge) pb-3">Shipping <span>×</span></div>
            <p className="py-2 text-[13px] font-normal normal-case tracking-normal text-(--ink-muted)" style={{ fontFamily: "var(--font-body)" }}>Two to three days.</p>
            <div className="flex justify-between border-t border-dashed border-(--edge) pt-3">Returns <span>+</span></div>
          </div>
        </Sheet2>
      );
    case "separator":
      return (
        <Sheet2>
          <div className="flex w-[240px] flex-col gap-4">
            <Separator />
            <Separator variant="double" />
            <Separator variant="scissors" />
          </div>
        </Sheet2>
      );
    case "table":
      return (
        <div data-paper="ledger" className="w-[290px]">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Date</TableHead><TableHead numeric>Amount</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Stamps</TableCell><TableCell numeric>12.40</TableCell></TableRow>
              <TableRow><TableCell>Ink</TableCell><TableCell numeric>14.00</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      );
    case "sheet":
      return (
        <div data-paper="kraft" className="relative h-[170px] w-[270px] overflow-hidden rounded-[4px] bg-black/20">
          <div className="paper absolute inset-y-0 right-0 w-[62%] border-l border-(--edge) bg-(--paper-raised) p-4 shadow-[-10px_0_30px_-10px_rgb(0_0_0/.5)]">
            <div className="text-[18px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>Settings</div>
            <div className="mt-3 h-px bg-(--rule)" />
            <div className="mt-5 h-px bg-(--rule)" />
          </div>
          <span className="absolute right-[62%] top-6 rounded-l-[6px] border border-r-0 border-(--edge) bg-(--paper-raised) px-1.5 py-3 text-[9px] font-bold tracking-[0.2em] text-(--ink-muted) [writing-mode:vertical-rl] rotate-180" style={{ fontFamily: "var(--font-type)" }}>
            SETTINGS
          </span>
        </div>
      );
    case "popover":
      return (
        <div data-paper="cream" className="drop-shadow-[0_12px_18px_rgb(0_0_0/.45)]">
          <div className="paper relative w-[220px] bg-(--paper-raised) p-5" style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)" }}>
            <span className="absolute right-0 top-0 size-4" style={{ background: "linear-gradient(225deg, transparent 50%, color-mix(in srgb, var(--paper-sunk) 80%, #000) 50%)" }} />
            <Label>Street</Label>
            <Input defaultValue="221B Baker St" tabIndex={-1} />
          </div>
        </div>
      );
    case "tooltip":
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="rotate-[-2deg] px-3.5 py-2 text-[19px]" style={{ background: "#fff1a1", color: "#2a2a4a", fontFamily: "var(--font-hand)", boxShadow: "2px 6px 12px -4px rgb(0 0 0 / .5)" }}>
            Don&rsquo;t forget the stamp!
          </div>
          <div data-paper="cream"><Button variant="paper" size="sm" tabIndex={-1}>Hover me</Button></div>
        </div>
      );
    case "dropdown-menu":
      return (
        <div data-paper="cream" className="paper w-[210px] rounded-[3px] border border-(--edge) bg-(--paper-raised) p-1 text-[13px] shadow-[0_14px_30px_-12px_rgb(0_0_0/.6)]" style={{ fontFamily: "var(--font-type)" }}>
          <div className="flex justify-between rounded-[2px] bg-(--paper-sunk) py-2 pl-3 pr-3"><span><span className="text-(--pen)">›</span> Reply</span><span className="text-(--ink-faint)">⌘R</span></div>
          <div className="flex justify-between py-2 pl-5 pr-3">Forward<span className="text-(--ink-faint)">⌘F</span></div>
          <div className="my-1 border-t border-dashed border-(--edge)" />
          <div className="py-2 pl-5 text-(--danger)">Shred</div>
        </div>
      );
    case "avatar":
      return (
        <div data-paper="cream" className="flex items-end gap-4">
          <Avatar><AvatarImage src={photo(64, 120)} alt="" /><AvatarFallback>AL</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>SO</AvatarFallback></Avatar>
          <Avatar size="lg" shape="postmark"><AvatarImage src={photo(91, 160)} alt="" /><AvatarFallback>GM</AvatarFallback></Avatar>
        </div>
      );
    case "alert":
      return (
        <div data-paper="cream" className="w-[280px]">
          <Alert variant="danger"><AlertTitle>Returned</AlertTitle><AlertDescription>Address not found.</AlertDescription></Alert>
        </div>
      );
    case "progress":
      return (
        <div data-paper="kraft" className="w-[260px]">
          <Progress value={60} holes={14} />
        </div>
      );
    case "skeleton":
      return (
        <Sheet2>
          <div className="flex w-[220px] items-center gap-3">
            <Skeleton className="size-11 rounded-full" />
            <div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-2/3" /></div>
          </div>
        </Sheet2>
      );
    case "kbd":
      return (
        <Sheet2>
          <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
        </Sheet2>
      );
    case "breadcrumb":
      return (
        <Sheet2>
          <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink>Drawer</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Letters</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        </Sheet2>
      );
    case "pagination":
      return (
        <Sheet2>
          <Pagination><PaginationContent><PaginationItem><PaginationLink>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink>3</PaginationLink></PaginationItem></PaginationContent></Pagination>
        </Sheet2>
      );
    default:
      return null;
  }
}
