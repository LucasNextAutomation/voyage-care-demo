export type PipelineStage = "new" | "skip_traced" | "sequence_active" | "replied" | "meeting_set"

export interface OutreachLead {
  id: string
  ownerName: string
  propertyAddress: string
  city: string
  state: string
  units: number
  distressScore: number
  distressSignals: string[]
  phone: string | null
  email: string | null
  mailingAddress: string
  stage: PipelineStage
  skipTraceStatus: "hit" | "miss" | "pending"
  sequenceDay: number | null
  lastActivity: string
  openRate: number | null
  replied: boolean
  meetingDate: string | null
}

// UK owner outreach pipeline — demo data.
// All sequences are LIA-documented under UK GDPR Art.6(1)(f) + registered
// address service per Companies House data. PECR opt-outs honoured.
export const outreachLeads: OutreachLead[] = [
  {
    id: "LEAD-001",
    ownerName: "Stellar Holdings Ltd (BVI)",
    propertyAddress: "Darlaston Road, Walsall",
    city: "Walsall",
    state: "West Midlands",
    units: 14,
    distressScore: 8.7,
    distressSignals: ["OCOD overseas owner", "26-year hold", "Brownfield Register entry"],
    phone: null,
    email: null,
    mailingAddress: "Craigmuir Chambers, Road Town, Tortola VG1110, BVI",
    stage: "replied",
    skipTraceStatus: "hit",
    sequenceDay: 14,
    lastActivity: "Local agent responded via tracing letter — open to proposal",
    openRate: 100,
    replied: true,
    meetingDate: null,
  },
  {
    id: "LEAD-002",
    ownerName: "Estate of Margaret L. Whitfield",
    propertyAddress: "42 Commonwealth Road, Bolton",
    city: "Bolton",
    state: "Greater Manchester",
    units: 12,
    distressScore: 9.3,
    distressSignals: ["Probate grant filed", "38-year hold", "EPC F — MEES exposure"],
    phone: "+44 1204 555 012",
    email: "probate@lythamhodgson.co.uk",
    mailingAddress: "c/o Lytham & Hodgson Solicitors, 14 Deansgate, Bolton BL1 1BE",
    stage: "meeting_set",
    skipTraceStatus: "hit",
    sequenceDay: 21,
    lastActivity: "Viewing confirmed: 28 Apr, 14:00 BST",
    openRate: 100,
    replied: true,
    meetingDate: "2026-04-28T14:00:00",
  },
  {
    id: "LEAD-003",
    ownerName: "Meadow Holdings Ltd",
    propertyAddress: "Former Nurses Home, Meadow Lane, Stoke-on-Trent",
    city: "Stoke-on-Trent",
    state: "Staffordshire",
    units: 18,
    distressScore: 8.2,
    distressSignals: ["CCOD owner — strike-off proposed", "Expired consent", "Vacant >5yr"],
    phone: null,
    email: null,
    mailingAddress: "22 Longton Road, Stoke-on-Trent ST1 4JE",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 7,
    lastActivity: "Letter #1 delivered — tracked via Royal Mail Signed For",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
  {
    id: "LEAD-004",
    ownerName: "Maple Tree Nominees Ltd (Jersey)",
    propertyAddress: "Riverside Lodge, Saltaire Bank, Bradford",
    city: "Bradford",
    state: "West Yorkshire",
    units: 16,
    distressScore: 9.0,
    distressSignals: ["Previous operator in admin", "CQC lapsed", "Jersey SPV owner"],
    phone: null,
    email: null,
    mailingAddress: "3rd Floor, Elizabeth House, 9 Castle St, St Helier JE2 3RT",
    stage: "skip_traced",
    skipTraceStatus: "hit",
    sequenceDay: null,
    lastActivity: "Companies House trace complete — Jersey beneficial owner filing pulled",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
  {
    id: "LEAD-005",
    ownerName: "Harold J. Eastwood",
    propertyAddress: "Ashfield House, Crompton Way, Oldham",
    city: "Oldham",
    state: "Greater Manchester",
    units: 8,
    distressScore: 7.1,
    distressSignals: ["30-year hold", "Individual owner age 82", "EPC D"],
    phone: "+44 161 555 0284",
    email: null,
    mailingAddress: "Ashfield House, Crompton Way, Oldham OL1 2QP",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 14,
    lastActivity: "Letter #2 sent via Signed For — no reply yet",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
  {
    id: "LEAD-006",
    ownerName: "Canal Heritage Estates Ltd (in administration)",
    propertyAddress: "Former Bakery Site, Canal Street, Wolverhampton",
    city: "Wolverhampton",
    state: "West Midlands",
    units: 12,
    distressScore: 8.4,
    distressSignals: ["Administrators appointed", "EPC G — MEES non-compliant", "Empty rates relief"],
    phone: "+44 121 555 0184",
    email: "ip.canalheritage@frpadvisory.com",
    mailingAddress: "c/o FRP Advisory, Suite 2, Bull Ring, Birmingham B5 4BU",
    stage: "new",
    skipTraceStatus: "pending",
    sequenceDay: null,
    lastActivity: "Imported from Site Finder",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
  {
    id: "LEAD-007",
    ownerName: "Meridian Land Holdings Ltd",
    propertyAddress: "28 Abbey Road, Nuneaton",
    city: "Nuneaton",
    state: "Warwickshire",
    units: 10,
    distressScore: 7.6,
    distressSignals: ["Planning withdrawn 2025", "Dormant filings since 2015", "24-year hold"],
    phone: null,
    email: "info@meridianland.co.uk",
    mailingAddress: "4 Kingfisher Court, Coventry CV2 1WN",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 21,
    lastActivity: "Final letter sent via Signed For — awaiting response",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
  {
    id: "LEAD-008",
    ownerName: "The Highfield Family Trust",
    propertyAddress: "Highfield Gardens, Mansfield",
    city: "Mansfield",
    state: "Nottinghamshire",
    units: 20,
    distressScore: 8.9,
    distressSignals: ["Expired consent 2024", "Trust hold 27yr", "JSNA shortfall area"],
    phone: "+44 20 7555 0928",
    email: "property@knightsplc.com",
    mailingAddress: "c/o Knights plc, 4 Baker St, London W1U 8ED",
    stage: "skip_traced",
    skipTraceStatus: "hit",
    sequenceDay: null,
    lastActivity: "Solicitor contact confirmed — legitimate interest letter drafted",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
]

// Sequences use Royal Mail Signed For to the registered/solicitor address
// as the primary channel, with email only where an agent address is public.
// Every send carries the LIA reference + clear opt-out instructions per PECR.
export const emailSequence = [
  {
    day: 1,
    channel: "email" as const,
    subject: "{{address}} — Voyage Care enquiry about your property",
    preview: "Dear {{firstName}},\n\nI'm writing from the Property & Acquisitions team at Voyage Care, one of the UK's largest specialist care providers. We support over 3,500 people across 350 services.\n\nWe have an active brief in the {{city}} area for development or conversion sites that would suit supported-living or specialist-care use. Your property at {{address}} has come up as a potential fit.\n\nI understand the current position on the site may involve {{distressAngle}}. If there's any interest in exploring a sale, we can move quickly: decision in principle within two weeks, full survey at our cost, and we're comfortable buying with planning still to be sought.\n\nHappy to pick up the phone at a time that suits you.\n\nBest regards,\nProperty & Acquisitions Team\nVoyage Care Ltd (Companies House 04250960)\nLichfield, Staffordshire\n\n—\nLegitimate-interest basis: Voyage Care LIA-2026-03 (property sourcing).\nOpt out anytime: reply STOP or email NewServiceDevelopments@voyagecare.com.",
    status: "sent" as const,
  },
  {
    day: 7,
    channel: "email" as const,
    subject: "Following up — {{address}}",
    preview: "Dear {{firstName}},\n\nFollowing my previous note, I wanted to share a little context. Local commissioners in {{city}} have identified a shortfall in specialist-care placements, which is part of why your site is a fit for what we build.\n\nIf you'd prefer a letter rather than email, we're also happy to send anything through your solicitor. Whatever works.\n\nKind regards,\nProperty & Acquisitions Team\nVoyage Care",
    status: "queued" as const,
  },
  {
    day: 14,
    channel: "email" as const,
    subject: "Closing the loop on {{address}}",
    preview: "Dear {{firstName}},\n\nI'll keep this short. If the timing ever makes sense to discuss your property, we'd welcome a conversation. No pressure.\n\nIf I've reached you in error, please do reply STOP and we'll remove you from our records immediately.\n\nBest,\nProperty & Acquisitions Team\nVoyage Care\nNewServiceDevelopments@voyagecare.com",
    status: "queued" as const,
  },
]

export const outreachStats = {
  totalLeads: 41,
  skipTraceHitRate: 84, // % of leads where a Companies House / electoral-roll trace finds contact
  openRate: 42,
  replyRate: 9,
  meetingsSet: 2,
  pipelineValue: 12400000, // GBP estimated pipeline value
  sequencesActive: 14,
  avgResponseTime: "4.8 days",
}
