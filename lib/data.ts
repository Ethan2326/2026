export type MeddicField =
  | "Metrics"
  | "Economic Buyer"
  | "Decision Criteria"
  | "Decision Process"
  | "Identify Pain"
  | "Champion";

export type ActivityType = "call" | "email" | "signal" | "won" | "alert";

export interface Contact {
  name: string;
  title: string;
  role: string;
  lastContact: string;
}

export interface TimelineItem {
  date: string;
  event: string;
  type: ActivityType;
}

export interface Suggestion {
  title: string;
  body: string;
  tag: string;
}

export interface Deal {
  id: number;
  company: string;
  stage: string;
  arr: string;
  arrRaw: number;
  owner: string;
  score: number;
  close: string;
  lastActivity: string;
  meddic: MeddicField[];
  notes: string;
  contacts: Contact[];
  timeline: TimelineItem[];
  suggestions: Suggestion[];
}

export const DEALS: Deal[] = [
  {
    id: 1, company: "Acme Corp", stage: "Proposal", arr: "$120,000", arrRaw: 120000,
    owner: "Sarah K.", score: 82, close: "Jun 30, 2026", lastActivity: "2h ago",
    meddic: ["Metrics", "Economic Buyer", "Identify Pain", "Champion"],
    notes: "David is highly engaged. Sarah Chen met twice — supportive but needs CFO sign-off. Security review is the final gate.",
    contacts: [
      { name: "David Park", title: "RevOps Lead", role: "Champion", lastContact: "2h ago" },
      { name: "Sarah Chen", title: "VP Finance", role: "Economic Buyer", lastContact: "5d ago" },
      { name: "Mike Torres", title: "CTO", role: "Technical Buyer", lastContact: "2w ago" },
    ],
    timeline: [
      { date: "Today, 10:14", event: "Call ended (34 min) — ROI model presented.", type: "call" },
      { date: "May 10", event: "Sarah Chen opened ROI summary email.", type: "signal" },
      { date: "May 8", event: "Proposal sent ($120k, 12-month term).", type: "email" },
      { date: "May 5", event: "Discovery call (52 min) — pain confirmed.", type: "call" },
      { date: "Apr 28", event: "Intro call (20 min) — qualified, moved to Proposal.", type: "call" },
    ],
    suggestions: [
      { title: "Schedule security review", body: "CTO is the last sign-off. Propose a technical workshop before the close date.", tag: "Next Step" },
      { title: "Get CFO introduction", body: "Sarah Chen mentioned CFO approval is needed. Ask David to broker a 15-min intro.", tag: "High Impact" },
    ],
  },
  {
    id: 2, company: "NovaTech", stage: "Discovery", arr: "$84,000", arrRaw: 84000,
    owner: "James L.", score: 61, close: "Jul 31, 2026", lastActivity: "1d ago",
    meddic: ["Metrics", "Identify Pain"],
    notes: "Early stage. Amy is engaged but hasn't confirmed who controls budget.",
    contacts: [
      { name: "Amy Wu", title: "Sales Ops Manager", role: "Champion", lastContact: "1d ago" },
      { name: "Brad Allen", title: "VP Sales", role: "Economic Buyer", lastContact: "2w ago" },
    ],
    timeline: [
      { date: "Yesterday", event: "Amy Wu opened ROI doc.", type: "signal" },
      { date: "May 9", event: "Discovery call #2 (40 min) — process pain confirmed.", type: "call" },
      { date: "May 2", event: "Intro call (25 min) — qualified.", type: "call" },
    ],
    suggestions: [
      { title: "Identify economic buyer", body: "Budget owner unknown. Ask Amy: 'Who owns the budget for this kind of initiative?'", tag: "Risk" },
      { title: "Confirm decision criteria", body: "Ask for the vendor evaluation scorecard before next call.", tag: "Risk" },
    ],
  },
  {
    id: 3, company: "Relay AI", stage: "Negotiation", arr: "$200,000", arrRaw: 200000,
    owner: "Maria T.", score: 44, close: "May 31, 2026", lastActivity: "3d ago",
    meddic: ["Economic Buyer", "Champion"],
    notes: "Deal is at risk. Champion went quiet after procurement pushed back on pricing.",
    contacts: [
      { name: "Lisa Ng", title: "Sales Ops", role: "Champion", lastContact: "3d ago" },
      { name: "Tom Weiss", title: "CRO", role: "Economic Buyer", lastContact: "1w ago" },
    ],
    timeline: [
      { date: "May 10", event: "Deal score dropped 8 pts — champion response time increased.", type: "alert" },
      { date: "May 7", event: "Procurement requested 20% discount.", type: "email" },
      { date: "May 4", event: "Negotiation call (45 min) — pricing discussed.", type: "call" },
      { date: "Apr 25", event: "POC completed — champion signed off.", type: "signal" },
    ],
    suggestions: [
      { title: "Re-engage Tom Weiss (CRO)", body: "No exec contact in 7 days. Send a 1-page business case before end of week.", tag: "High Impact" },
      { title: "Reframe value vs. discount", body: "Counter procurement with multi-year savings vs. a one-time discount.", tag: "High Impact" },
    ],
  },
  {
    id: 4, company: "Stackbase", stage: "Closed Won", arr: "$60,000", arrRaw: 60000,
    owner: "Tom B.", score: 91, close: "May 12, 2026", lastActivity: "Just now",
    meddic: ["Metrics", "Economic Buyer", "Decision Criteria", "Decision Process", "Identify Pain", "Champion"],
    notes: "Won. All MEDDIC criteria confirmed. Smooth close — 6-week cycle. Great reference account.",
    contacts: [
      { name: "Raj Patel", title: "Head of Engineering", role: "Champion", lastContact: "Just now" },
      { name: "Chloe Marsh", title: "CFO", role: "Economic Buyer", lastContact: "2d ago" },
    ],
    timeline: [
      { date: "Today", event: "Contract signed. Closed Won! 🎉", type: "won" },
      { date: "May 10", event: "Legal review completed.", type: "signal" },
      { date: "May 6", event: "Final proposal accepted.", type: "email" },
      { date: "Apr 28", event: "Technical validation completed.", type: "call" },
    ],
    suggestions: [
      { title: "Request a case study", body: "Raj is a strong advocate. Strike while momentum is fresh — ask this week.", tag: "Next Step" },
    ],
  },
];

export function getDeal(id: number | string): Deal | undefined {
  return DEALS.find((d) => d.id === Number(id));
}

export function scoreColor(v: number): string {
  if (v >= 75) return "#E8FF5A";
  if (v >= 50) return "#B8A060";
  return "#E05252";
}

export function activityDotClass(type: ActivityType): string {
  const map: Record<ActivityType, string> = {
    call: "bg-[#B8A060]",
    email: "bg-[#E8E8E4] border border-[#0F0F0F]/20",
    signal: "bg-[#E8FF5A]",
    won: "bg-[#E8FF5A]",
    alert: "bg-[#E05252]",
  };
  return map[type];
}
