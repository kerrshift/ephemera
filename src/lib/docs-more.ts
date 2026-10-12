import type { Prop } from "./docs";

type Entry = { usage: string; props: Prop[]; notes?: string; exports?: string[] };

const radix = (name: string) => `Built on the Radix ${name}, so keyboard navigation and screen reader support come for free.`;

export const moreDocs: Record<string, Entry> = {
  "radio-group": {
    exports: ["RadioGroup", "RadioGroupItem"],
    usage: `<RadioGroup defaultValue="post">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="post" id="post" />
    <Label htmlFor="post">First-class post</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="pigeon" id="pigeon" />
    <Label htmlFor="pigeon">Carrier pigeon</Label>
  </div>
</RadioGroup>`,
    props: [
      { name: "value / defaultValue / onValueChange", type: "string", description: "Selected option." },
      { name: "RadioGroupItem value", type: "string", description: "The value this circle represents." },
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Arrow-key direction." },
    ],
    notes: radix("Radio Group"),
  },
  switch: {
    exports: ["Switch"],
    usage: `<div className="flex items-center gap-3">
  <Switch id="night" />
  <Label htmlFor="night">Night post</Label>
</div>`,
    props: [
      { name: "checked / defaultChecked / onCheckedChange", type: "boolean", description: "On or off." },
      { name: "disabled", type: "boolean", description: "Lock the lever." },
    ],
    notes: radix("Switch"),
  },
  select: {
    exports: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectItem", "SelectGroup", "SelectLabel", "SelectSeparator"],
    usage: `<Select defaultValue="kraft">
  <SelectTrigger>
    <SelectValue placeholder="Choose paper" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="cream">Cream</SelectItem>
    <SelectItem value="kraft">Kraft</SelectItem>
    <SelectItem value="ledger">Ledger</SelectItem>
  </SelectContent>
</Select>`,
    props: [
      { name: "value / defaultValue / onValueChange", type: "string", description: "Selected value." },
      { name: "SelectContent position", type: '"popper" | "item-aligned"', default: '"popper"', description: "Drop below the trigger, or align over the selected item like a native select." },
      { name: "SelectItem value / disabled", type: "string / boolean", description: "One drawer card." },
    ],
    notes: `${radix("Select")} The menu opens inside the nearest data-paper container so it keeps its theme.`,
  },
  slider: {
    exports: ["Slider"],
    usage: `<Slider defaultValue={[40]} max={100} step={1} />
<Slider defaultValue={[20, 80]} />  {/* a range */}`,
    props: [
      { name: "value / defaultValue / onValueChange", type: "number[]", description: "One number for a single marker, two for a range." },
      { name: "min, max, step", type: "number", default: "0, 100, 1", description: "Scale of the ruler." },
    ],
    notes: radix("Slider"),
  },
  "date-picker": {
    exports: ["DatePicker"],
    usage: `const [date, setDate] = useState<Date>();

<Label htmlFor="due">Due date</Label>
<DatePicker id="due" value={date} onChange={setDate} />`,
    props: [
      { name: "value / defaultValue / onChange", type: "Date", description: "Chosen date." },
      { name: "placeholder", type: "string", default: '"Pick a date"', description: "Shown before a date is picked." },
      { name: "disabled", type: "(date: Date) => boolean", description: "Days that can't be picked." },
      { name: "locale", type: "string", default: '"en-US"', description: "Formatting locale." },
    ],
    notes: "Installs Calendar alongside it.",
  },
  calendar: {
    exports: ["Calendar"],
    usage: `const [date, setDate] = useState<Date>();

<Calendar selected={date} onSelect={setDate} />`,
    props: [
      { name: "selected / onSelect", type: "Date / (date: Date) => void", description: "The circled day." },
      { name: "defaultMonth", type: "Date", description: "Month shown first. Defaults to the selected date or this month." },
      { name: "weekStartsOn", type: "0 | 1", default: "1", description: "Sunday or Monday first." },
      { name: "disabled", type: "(date: Date) => boolean", description: "Days that can't be picked (shown crossed out)." },
      { name: "locale", type: "string", default: '"en-US"', description: "Month and weekday names." },
    ],
    notes: "Arrow keys move by day and week, Page Up/Down by month. No date library needed.",
  },
  accordion: {
    exports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    usage: `<Accordion type="single" collapsible defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>How long does post take?</AccordionTrigger>
    <AccordionContent>Two to three days, weather permitting.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>Can I send it back?</AccordionTrigger>
    <AccordionContent>Write "return to sender" on the front.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      { name: "type", type: '"single" | "multiple"', description: "One open at a time, or many." },
      { name: "collapsible", type: "boolean", description: "Allow closing the open item (single only)." },
      { name: "value / defaultValue / onValueChange", type: "string | string[]", description: "Which items are open." },
    ],
    notes: radix("Accordion"),
  },
  separator: {
    exports: ["Separator"],
    usage: `<Separator />
<Separator variant="double" />
<Separator variant="perforated" />
<Separator variant="scissors" />
<Separator orientation="vertical" />`,
    props: [
      { name: "variant", type: '"rule" | "double" | "perforated" | "scissors"', default: '"rule"', description: "Line style." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Vertical is always a plain rule." },
    ],
  },
  table: {
    exports: ["Table", "TableHeader", "TableBody", "TableFooter", "TableRow", "TableHead", "TableCell", "TableCaption"],
    usage: `<Table>
  <TableCaption>October accounts</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Description</TableHead>
      <TableHead numeric>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Oct 02</TableCell>
      <TableCell>Stamps</TableCell>
      <TableCell numeric>12.40</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell numeric>12.40</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
    props: [
      { name: "TableHead / TableCell numeric", type: "boolean", description: "Right-aligned, typewritten tabular figures." },
      { name: "TableRow data-state", type: '"selected"', description: "Highlight a row." },
      { name: "parts", type: "Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption", description: "Same structure as shadcn/ui Table, so it works with TanStack Table." },
    ],
  },
  sheet: {
    exports: ["Sheet", "SheetTrigger", "SheetContent", "SheetHeader", "SheetTitle", "SheetDescription", "SheetFooter", "SheetClose"],
    usage: `<Sheet>
  <SheetTrigger asChild><Button variant="paper">Open folder</Button></SheetTrigger>
  <SheetContent tab="Settings">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Everything in one folder.</SheetDescription>
    </SheetHeader>
    …
  </SheetContent>
</Sheet>`,
    props: [
      { name: "SheetContent side", type: '"right" | "left" | "bottom"', default: '"right"', description: "Edge it slides in from." },
      { name: "SheetContent tab", type: "ReactNode", description: "Label on the folder tab sticking out of the sheet." },
      { name: "Sheet open / onOpenChange", type: "boolean", description: "Controlled state (Radix Dialog)." },
    ],
    notes: radix("Dialog"),
  },
  popover: {
    exports: ["Popover", "PopoverTrigger", "PopoverContent", "PopoverClose", "PopoverAnchor"],
    usage: `<Popover>
  <PopoverTrigger asChild><Button variant="paper">Address</Button></PopoverTrigger>
  <PopoverContent>
    <Label>Street</Label>
    <Input defaultValue="221B Baker St" />
  </PopoverContent>
</Popover>`,
    props: [
      { name: "PopoverContent side / align / sideOffset", type: "Radix positioning", default: 'side "bottom", align "center", 8', description: "Where the slip appears." },
      { name: "open / onOpenChange", type: "boolean", description: "Controlled state." },
    ],
    notes: radix("Popover"),
  },
  tooltip: {
    exports: ["Tooltip", "TooltipTrigger", "TooltipContent", "TooltipProvider"],
    usage: `<Tooltip>
  <TooltipTrigger asChild><Button variant="ghost">Hover me</Button></TooltipTrigger>
  <TooltipContent>Don't forget the stamp!</TooltipContent>
</Tooltip>`,
    props: [
      { name: "TooltipContent note", type: '"yellow" | "pink" | "blue" | "green"', default: '"yellow"', description: "Sticky note color." },
      { name: "TooltipContent side / sideOffset", type: "Radix positioning", description: "Where the note sticks." },
      { name: "TooltipProvider delayDuration", type: "number", default: "200", description: "Wrap your app once to share the hover delay." },
    ],
    notes: radix("Tooltip"),
  },
  "dropdown-menu": {
    exports: [
      "DropdownMenu",
      "DropdownMenuTrigger",
      "DropdownMenuContent",
      "DropdownMenuItem",
      "DropdownMenuCheckboxItem",
      "DropdownMenuRadioGroup",
      "DropdownMenuRadioItem",
      "DropdownMenuLabel",
      "DropdownMenuSeparator",
      "DropdownMenuShortcut",
      "DropdownMenuGroup",
      "DropdownMenuSub",
      "DropdownMenuSubTrigger",
      "DropdownMenuSubContent",
    ],
    usage: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="paper">Letter ▾</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>This letter</DropdownMenuLabel>
    <DropdownMenuItem>Reply <DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuItem>Forward</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="danger">Shred</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    props: [
      { name: "DropdownMenuItem variant", type: '"default" | "danger"', default: '"default"', description: "Red ink for destructive actions." },
      { name: "CheckboxItem / RadioGroup + RadioItem", type: "Radix props", description: "Ticks and ink blots for options." },
      { name: "Sub, SubTrigger, SubContent", type: "parts", description: "Nested menus." },
    ],
    notes: radix("Dropdown Menu"),
  },
  avatar: {
    exports: ["Avatar", "AvatarImage", "AvatarFallback"],
    usage: `<Avatar>
  <AvatarImage src="/ada.jpg" alt="Ada" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>
<Avatar shape="postmark" size="lg">…</Avatar>`,
    props: [
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "32, 44, 64 or 88px." },
      { name: "shape", type: '"stamp" | "postmark"', default: '"stamp"', description: "Perforated stamp, or a round postmark ring." },
      { name: "AvatarFallback", type: "ReactNode", description: "Initials shown while the image loads or if it fails." },
    ],
    notes: radix("Avatar"),
  },
  alert: {
    exports: ["Alert", "AlertTitle", "AlertDescription"],
    usage: `<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>The post office closes early on Fridays.</AlertDescription>
</Alert>
<Alert variant="danger">…</Alert>`,
    props: [
      { name: "variant", type: '"note" | "danger" | "success"', default: '"note"', description: "Ink color of the margin mark." },
      { name: "icon", type: "ReactNode", default: '"NB" / "!!" / "OK"', description: "What's written in the margin." },
    ],
  },
  progress: {
    exports: ["Progress"],
    usage: `<Progress value={60} />
<Progress value={3} max={10} holes={10} />`,
    props: [
      { name: "value / max", type: "number", default: "0 / 100", description: "How much is done." },
      { name: "holes", type: "number", default: "20", description: "Number of holes on the punch card." },
    ],
    notes: radix("Progress"),
  },
  skeleton: {
    exports: ["Skeleton"],
    usage: `<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>`,
    props: [{ name: "className", type: "string", description: "Size and shape it with Tailwind classes." }],
  },
  kbd: {
    exports: ["Kbd", "KbdGroup"],
    usage: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    props: [{ name: "children", type: "ReactNode", description: "Key label." }],
  },
  breadcrumb: {
    exports: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator"],
    usage: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Drawer</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/letters">Letters</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Dear Sam</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    props: [
      { name: "BreadcrumbLink asChild", type: "boolean", description: "Use your router's Link." },
      { name: "BreadcrumbSeparator children", type: "ReactNode", default: '"›"', description: "Custom separator." },
    ],
  },
  pagination: {
    exports: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
    usage: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    props: [{ name: "PaginationLink isActive", type: "boolean", description: "Circle the current page in pen." }],
  },
};
