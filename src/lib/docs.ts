import registry from "../../registry.json";
import { moreDocs } from "./docs-more";

export type Prop = { name: string; type: string; default?: string; description: string };
export type Doc = {
  slug: string;
  group: "theme" | "core" | "extras";
  title: string;
  description: string;
  file: string;
  usage: string;
  props: Prop[];
  notes?: string;
};

const extra: Record<string, Pick<Doc, "usage" | "props" | "notes">> = {
  "paper-theme": {
    usage: `/* app/globals.css */
@import "tailwindcss";
@import "../styles/paper.css";

/* app/layout.tsx */
<html data-paper="cream">  {/* cream | kraft | ledger | blueprint | newsprint | carbon */}

/* any element can switch paper */
<section data-paper="blueprint" className="paper">…</section>`,
    props: [
      { name: "data-paper", type: '"cream" | "kraft" | "ledger" | "blueprint" | "newsprint" | "carbon"', default: '"cream"', description: "Paper type for that element and everything inside it. Nest them freely." },
      { name: ".paper", type: "class", description: "Paper color, ink color and a fine grain texture." },
      { name: ".paper-ruled", type: "class", description: "Ruled lines with a red margin. Set --line to change the spacing." },
      { name: "--paper, --paper-raised, --paper-sunk", type: "color", description: "Page, cards, and recessed areas." },
      { name: "--ink, --ink-muted, --ink-faint", type: "color", description: "Text, secondary text, placeholders." },
      { name: "--pen, --pen-ink", type: "color", description: "The accent ink and the text that sits on it." },
      { name: "--edge, --rule, --margin, --danger", type: "color", description: "Borders, ruled lines, margin line, destructive ink." },
    ],
    notes:
      "The theme also sets the standard shadcn/ui variables (--background, --primary, --border…), so components you already have pick up the paper colors too. Tip: add \"registries\": { \"@ephemera\": \"<this site>/r/{name}.json\" } to components.json and install with npx shadcn add @ephemera/button.",
  },
  button: {
    usage: `<Button>Send letter</Button>
<Button variant="paper">Save draft</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger" size="sm">Shred</Button>
<Button asChild><a href="/inbox">Open inbox</a></Button>`,
    props: [
      { name: "variant", type: '"ink" | "paper" | "ghost" | "danger"', default: '"ink"', description: "Solid ink key, raised paper, plain underlined text, or red ink." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and padding." },
      { name: "asChild", type: "boolean", default: "false", description: "Style the child element instead, e.g. a link." },
    ],
  },
  input: {
    usage: `<Label htmlFor="name">Your name</Label>
<Input id="name" placeholder="Ada Lovelace" />

<Label htmlFor="note">Note</Label>
<Textarea id="note" placeholder="Dear diary…" />`,
    props: [
      { name: "Input", type: "<input> props", description: "A single ruled line. The line turns to ink on focus and red when aria-invalid." },
      { name: "Textarea", type: "<textarea> props", description: "Notebook paper with a margin. Text sits on the 28px lines." },
      { name: "Label", type: "<label> props", description: "Small typed capitals." },
    ],
  },
  checkbox: {
    usage: `<div className="flex items-center gap-3">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">I read the small print</Label>
</div>`,
    props: [
      { name: "checked / defaultChecked", type: "boolean | 'indeterminate'", description: "Controlled or uncontrolled state." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Called when ticked or unticked." },
      { name: "disabled", type: "boolean", description: "Greyed out and not clickable." },
    ],
    notes: "Built on the Radix Checkbox, so keyboard and screen reader support come for free.",
  },
  card: {
    usage: `<Card ruled>
  <CardHeader>
    <CardTitle>Groceries</CardTitle>
    <CardDescription>Saturday market</CardDescription>
  </CardHeader>
  <CardContent>Bread, figs, good olive oil</CardContent>
  <CardFooter><Button size="sm">Done</Button></CardFooter>
</Card>`,
    props: [
      { name: "ruled", type: "boolean", default: "false", description: "Index-card lines: red under the header, blue in the content." },
      { name: "CardHeader, CardTitle, CardDescription, CardContent, CardFooter", type: "parts", description: "Same structure as shadcn/ui, so it's a drop-in swap." },
    ],
  },
  tabs: {
    usage: `<Tabs defaultValue="drafts">
  <TabsList>
    <TabsTrigger value="drafts">Drafts</TabsTrigger>
    <TabsTrigger value="sent">Sent</TabsTrigger>
  </TabsList>
  <TabsContent value="drafts">Three letters waiting.</TabsContent>
  <TabsContent value="sent">Nothing sent yet.</TabsContent>
</Tabs>`,
    props: [
      { name: "defaultValue / value / onValueChange", type: "string", description: "Which folder is open." },
      { name: "TabsList, TabsTrigger, TabsContent", type: "parts", description: "Same API as Radix and shadcn/ui Tabs." },
    ],
  },
  badge: {
    usage: `<Badge>Draft</Badge>
<Badge tape="red">Urgent</Badge>
<Badge tape="yellow">Pending</Badge>
<Badge tape="ink">v1.0</Badge>`,
    props: [
      { name: "tape", type: '"black" | "red" | "blue" | "green" | "yellow" | "ink"', default: '"black"', description: "Tape color. \"ink\" follows the theme's --pen color." },
    ],
  },
  dialog: {
    usage: `<Dialog>
  <DialogTrigger asChild><Button>Write a letter</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dear Sam,</DialogTitle>
      <DialogDescription>It has been too long.</DialogDescription>
    </DialogHeader>
    <Textarea placeholder="Write something…" />
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Later</Button></DialogClose>
      <Button>Send</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "Dialog", type: "Radix Dialog.Root props", description: "open, defaultOpen, onOpenChange, modal." },
      { name: "DialogContent", type: "Radix Dialog.Content props + showClose", description: "The letter. Opens into the nearest data-paper container so it keeps its theme." },
      { name: "DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose", type: "parts", description: "Same structure as shadcn/ui." },
    ],
  },
  toast: {
    usage: `// once, near the root
<Toaster />

// anywhere
toast("Letter sent", { description: "Sam will get it tomorrow." });
toast("Couldn't send", { tone: "danger" });`,
    props: [
      { name: "toast(title, options)", type: "{ description?: string; tone?: 'default' | 'danger'; duration?: number }", description: "Prints a slip. Returns an id. Default duration is 4000ms; pass Infinity to keep it." },
      { name: "toast.dismiss(id)", type: "(id: number) => void", description: "Tears a slip away." },
      { name: "<Toaster position>", type: '"bottom-right" | "top-right" | "bottom-center"', default: '"bottom-right"', description: "Where slips print." },
    ],
  },
  receipt: {
    usage: `<Receipt
  title="NIGHT OWL COFFEE"
  subtitle={"221 Baker St\\nOpen till late"}
  meta={[{ label: "ORDER", value: "#0042" }, { label: "DATE", value: "12/10/26 23:14" }]}
  items={[
    { name: "Flat white", price: 4.5, qty: 2 },
    { name: "Almond croissant", price: 3.75 },
  ]}
  taxRate={0.08}
/>`,
    props: [
      { name: "items", type: "{ name: string; price: number; qty?: number }[]", description: "Line items. Totals are calculated for you." },
      { name: "title", type: "string", default: '"EPHEMERA GOODS CO."', description: "Store name at the top." },
      { name: "subtitle", type: "string", description: "Address or tagline. Line breaks are kept." },
      { name: "meta", type: "{ label: string; value: string }[]", description: "Order number, date, cashier…" },
      { name: "taxRate", type: "number", default: "0", description: "e.g. 0.08 for 8%. Adds subtotal and tax lines." },
      { name: "currency", type: "string", default: '"$"', description: "Currency prefix." },
      { name: "footer", type: "string", default: '"THANK YOU, COME AGAIN"', description: "Closing line." },
      { name: "barcode", type: "string | false", default: '"0000-EPHEMERA"', description: "Barcode value, or false to hide it." },
      { name: "print", type: "boolean", default: "true", description: "Print line by line when scrolled into view." },
      { name: "width", type: "number", default: "300", description: "Width in px." },
    ],
  },
  ticket: {
    usage: `<Ticket
  eyebrow="The Paper Moon Cinema"
  title="Midnight Matinee"
  details={[
    { label: "Date", value: "Fri 12 Oct" },
    { label: "Doors", value: "11:30 PM" },
    { label: "Seat", value: "F14" },
  ]}
  onTear={() => console.log("checked in")}
/>`,
    props: [
      { name: "title", type: "ReactNode", description: "Big headline." },
      { name: "eyebrow", type: "string", description: "Small line above the title, e.g. the venue." },
      { name: "details", type: "{ label: string; value: string }[]", description: "Date, time, seat…" },
      { name: "admit", type: "string", default: '"ADMIT ONE"', description: "Text on the side band." },
      { name: "serial", type: "string", default: '"Nº 004217"', description: "Number printed on the stub." },
      { name: "accent", type: "string", default: '"#c2410c"', description: "Band and stub color." },
      { name: "paper", type: "string", default: '"#f4ead5"', description: "Paper color." },
      { name: "tearable", type: "boolean", default: "true", description: "Drag the stub to tear it off. Keyboard: focus the stub and press Enter." },
      { name: "onTear", type: "() => void", description: "Called once the stub is torn, e.g. to check someone in." },
      { name: "children", type: "ReactNode", description: "Replace the default body with your own layout." },
    ],
  },
  "boarding-pass": {
    usage: `<BoardingPass
  from={{ code: "LIS", city: "Lisbon" }}
  to={{ code: "KIX", city: "Osaka" }}
  passenger="Ada Lovelace"
  flight="EP 204"
  seat="14A"
/>`,
    props: [
      { name: "from / to", type: "{ code: string; city: string }", description: "Airport codes and city names." },
      { name: "passenger", type: "string", description: "Passenger name." },
      { name: "airline", type: "string", default: '"EPHEMERA AIR"', description: "Header text." },
      { name: "flight, date, boarding, gate, seat, group", type: "string", description: "Trip details. Any of them can be left out." },
      { name: "accent", type: "string", default: '"#1f3b57"', description: "Header band color." },
    ],
  },
  polaroid: {
    usage: `<Polaroid
  src="/summer.jpg"
  alt="Beach at dusk"
  caption="summer '26 ☀"
  rotate={-3}
  tape
/>`,
    props: [
      { name: "src", type: "string", description: "Photo URL." },
      { name: "alt", type: "string", description: "Alt text for the photo." },
      { name: "caption", type: "ReactNode", description: "Handwritten caption below the photo." },
      { name: "rotate", type: "number", default: "-2", description: "Tilt in degrees." },
      { name: "tape", type: "boolean", default: "false", description: "A strip of tape across the top." },
      { name: "develop", type: "boolean", default: "true", description: "Develop when scrolled into view. Click to shake and develop again." },
      { name: "duration", type: "number", default: "4000", description: "Develop time in ms." },
      { name: "width", type: "number", default: "260", description: "Width in px." },
      { name: "children", type: "ReactNode", description: "Any content instead of an image (a video, a canvas, a gradient)." },
    ],
  },
  "postage-stamp": {
    usage: `<PostageStamp
  src="/lighthouse.jpg"
  value="42¢"
  label="EPHEMERA POST"
  postmark={{ city: "Lisbon", date: "12 OCT 26" }}
  rotate={4}
/>`,
    props: [
      { name: "src", type: "string", description: "Artwork URL." },
      { name: "value", type: "string", default: '"42¢"', description: "Denomination in the corner." },
      { name: "label", type: "string", default: '"EPHEMERA POST"', description: "Small text along the bottom." },
      { name: "frame", type: "string", default: '"#f7f1e3"', description: "Frame color around the artwork." },
      { name: "postmark", type: "boolean | { city?: string; date?: string }", default: "false", description: "An inked cancellation mark." },
      { name: "rotate", type: "number", default: "0", description: "Tilt in degrees." },
      { name: "width", type: "number", default: "160", description: "Width in px." },
      { name: "children", type: "ReactNode", description: "Custom artwork, e.g. an avatar or an SVG." },
    ],
  },
  "rubber-stamp": {
    usage: `<RubberStamp ink="red" sub="12 OCT 2026">Paid</RubberStamp>
<RubberStamp ink="blue" shape="round" rotate={12}>Approved</RubberStamp>`,
    props: [
      { name: "children", type: "ReactNode", description: "Stamp text. Short words look best." },
      { name: "sub", type: "ReactNode", description: "Small second line, e.g. a date." },
      { name: "ink", type: '"red" | "blue" | "green" | "black" | "purple" | string', default: '"red"', description: "Preset ink or any CSS color." },
      { name: "shape", type: '"box" | "round"', default: '"box"', description: "Rectangular or circular stamp." },
      { name: "rotate", type: "number", default: "-8", description: "Tilt in degrees. Stamps are never straight." },
      { name: "animate", type: "boolean", default: "true", description: "Thud onto the page when scrolled into view." },
    ],
    notes: "The stamp uses mix-blend-mode: multiply, so place it over light content and the ink soaks into what's underneath.",
  },
  envelope: {
    usage: `<Envelope to="for Sam" seal={<WaxSeal>S</WaxSeal>}>
  <h3>You're invited</h3>
  <p>Saturday, 7pm, the old boathouse.</p>
</Envelope>`,
    props: [
      { name: "children", type: "ReactNode", description: "The letter. The top part peeks out when opened, so lead with the headline." },
      { name: "seal", type: "ReactNode", description: "Shown on the flap, e.g. <WaxSeal />. Fades when opened." },
      { name: "to", type: "ReactNode", description: "Handwritten address on the front." },
      { name: "color", type: "string", default: '"#e9dcc3"', description: "Envelope paper." },
      { name: "letterColor", type: "string", default: '"#fffdf8"', description: "Letter paper." },
      { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open) => void", description: "Controlled or uncontrolled open state." },
    ],
    notes: "When open, the letter rises about 55% of the envelope's height above it, so leave room above.",
  },
  "wax-seal": {
    usage: `<WaxSeal color="#8e1b1f">AB</WaxSeal>`,
    props: [
      { name: "children", type: "ReactNode", default: '"E"', description: "Initials or a short mark." },
      { name: "color", type: "string", default: '"#8e1b1f"', description: "Wax color." },
      { name: "size", type: "number", default: "72", description: "Size in px." },
      { name: "seed", type: "number", default: "3", description: "Changes the shape of the wax drip." },
    ],
  },
  "sticky-note": {
    usage: `<StickyNote color="yellow" attach="tape">
  call mum back ♥
</StickyNote>`,
    props: [
      { name: "children", type: "ReactNode", description: "Note content. Uses the handwriting font." },
      { name: "color", type: '"yellow" | "pink" | "blue" | "green" | "orange"', default: '"yellow"', description: "Note color." },
      { name: "rotate", type: "number", default: "2", description: "Tilt in degrees." },
      { name: "attach", type: '"none" | "tape" | "pin"', default: '"none"', description: "Hold it down with tape or a push pin." },
      { name: "size", type: "number", default: "220", description: "Width and height in px." },
    ],
  },
};

export const docs: Doc[] = registry.items.map((item) => ({
  slug: item.name,
  group: item.categories[0] as Doc["group"],
  title: item.title,
  description: item.description,
  file: item.files[0].path,
  ...(extra[item.name] ?? moreDocs[item.name]),
}));

export const sections: { title: string; slugs: string[] }[] = [
  { title: "Forms", slugs: ["button", "input", "checkbox", "radio-group", "switch", "select", "slider", "date-picker"] },
  { title: "Layout", slugs: ["card", "tabs", "accordion", "separator", "table"] },
  { title: "Overlays", slugs: ["dialog", "sheet", "popover", "tooltip", "dropdown-menu", "toast"] },
  { title: "Display", slugs: ["badge", "avatar", "alert", "progress", "skeleton", "kbd", "calendar", "breadcrumb", "pagination"] },
];

export const getDoc = (slug: string) => docs.find((d) => d.slug === slug);

export const exportsOf: Record<string, string[]> = {
  input: ["Input", "Textarea", "Label"],
  card: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"],
  tabs: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
  dialog: ["Dialog", "DialogTrigger", "DialogContent", "DialogHeader", "DialogTitle", "DialogDescription", "DialogFooter", "DialogClose"],
  toast: ["Toaster", "toast"],
  ...Object.fromEntries(Object.entries(moreDocs).map(([k, v]) => [k, v.exports ?? []])),
};

export const exportName = (slug: string) =>
  slug.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
