"use client"

import { motion } from "framer-motion"
import {
  Database,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FileText,
  Lock,
  MapPin,
  Cloud,
  Building2,
  Sparkles,
  Scale,
  Radio,
} from "lucide-react"
import AppShell from "@/components/AppShell"

interface Source {
  name: string
  owner: string
  licence: string
  licenceTone: "ogl" | "hmlr" | "psi"
  refresh: string
  lastSync: string
  lastSyncAgo: string
  records: string
  recordsInScope: string
  fields: number
  role: string
  url: string
  icon: typeof Database
  status: "live" | "degraded"
}

const SOURCES: Source[] = [
  {
    name: "HMLR INSPIRE Index Polygons",
    owner: "HM Land Registry",
    licence: "OGL v3 + HMLR bulk-data terms",
    licenceTone: "hmlr",
    refresh: "Monthly",
    lastSync: "2026-04-02 06:14",
    lastSyncAgo: "21 days ago",
    records: "~24M polygons (E&W)",
    recordsInScope: "~4.2M across 30 target LPAs",
    fields: 7,
    role: "Parcel geometry + title-number join key",
    url: "https://use-land-property-data.service.gov.uk/datasets/inspire",
    icon: MapPin,
    status: "live",
  },
  {
    name: "HMLR CCOD",
    owner: "HM Land Registry",
    licence: "HMLR end-user licence &middot; commercial reuse permitted with attribution",
    licenceTone: "hmlr",
    refresh: "Monthly (first working day)",
    lastSync: "2026-04-02 06:18",
    lastSyncAgo: "21 days ago",
    records: "~3.2M records (UK-corporate titles)",
    recordsInScope: "~560,000 in scope",
    fields: 18,
    role: "UK corporate ownership &mdash; directors, addresses, title chains",
    url: "https://use-land-property-data.service.gov.uk/datasets/ccod",
    icon: Building2,
    status: "live",
  },
  {
    name: "HMLR OCOD",
    owner: "HM Land Registry",
    licence: "HMLR end-user licence",
    licenceTone: "hmlr",
    refresh: "Monthly",
    lastSync: "2026-04-02 06:22",
    lastSyncAgo: "21 days ago",
    records: "~100,000 records (overseas titles)",
    recordsInScope: "~12,000 in scope",
    fields: 16,
    role: "Overseas-corporate ownership &mdash; BVI, Jersey, Guernsey, Cayman primaries",
    url: "https://use-land-property-data.service.gov.uk/datasets/ocod",
    icon: Cloud,
    status: "live",
  },
  {
    name: "HMLR Price Paid Data",
    owner: "HM Land Registry",
    licence: "OGL v3",
    licenceTone: "ogl",
    refresh: "Monthly (~20th)",
    lastSync: "2026-04-20 06:02",
    lastSyncAgo: "3 days ago",
    records: "30M+ transactions since 1995",
    recordsInScope: "~5.1M post-1995 in target LPAs",
    fields: 11,
    role: "Long-hold detection + comparables",
    url: "https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads",
    icon: Database,
    status: "live",
  },
  {
    name: "Companies House REST API",
    owner: "Companies House",
    licence: "Fair-use &middot; 600 req / 5 min per key",
    licenceTone: "psi",
    refresh: "Live (polled hourly)",
    lastSync: "2026-04-23 05:12",
    lastSyncAgo: "3 hr ago",
    records: "~5.2M active companies",
    recordsInScope: "~185k UK-corporate owners in scope",
    fields: 22,
    role: "Insolvency &amp; director intelligence &mdash; AA01, GAZ1, GAZ2, LIQ02",
    url: "https://developer.company-information.service.gov.uk/",
    icon: Building2,
    status: "live",
  },
  {
    name: "planning.data.gov.uk",
    owner: "MHCLG / DLUHC",
    licence: "OGL v3",
    licenceTone: "ogl",
    refresh: "Daily",
    lastSync: "2026-04-22 23:40",
    lastSyncAgo: "8 hr ago",
    records: "38,234 Brownfield Register entities + planning apps",
    recordsInScope: "~6,800 brownfield in target LPAs",
    fields: 14,
    role: "Brownfield Register + planning application feed",
    url: "https://www.planning.data.gov.uk/",
    icon: Sparkles,
    status: "live",
  },
  {
    name: "LPA planning portals",
    owner: "30 Local Planning Authorities",
    licence: "Statutory-public &middot; rate-limited politely",
    licenceTone: "psi",
    refresh: "Nightly per LPA",
    lastSync: "2026-04-23 02:45",
    lastSyncAgo: "6 hr ago",
    records: "22 Idox + 6 Northgate + 2 Ocella",
    recordsInScope: "~74k active applications in 30 LPAs",
    fields: 19,
    role: "Planning history decay &mdash; withdrawn, expired, refused flags",
    url: "https://www.planningportal.co.uk/",
    icon: FileText,
    status: "live",
  },
  {
    name: "EPC Open Data",
    owner: "MHCLG (via opendatacommunities.org)",
    licence: "OGL v3",
    licenceTone: "ogl",
    refresh: "Quarterly + daily new lodgements",
    lastSync: "2026-04-22 18:00",
    lastSyncAgo: "14 hr ago",
    records: "~25M domestic / ~1.2M non-domestic certs",
    recordsInScope: "~4.4M / ~210k in scope",
    fields: 28,
    role: "EPC F/G non-domestic MEES exposure",
    url: "https://epc.opendatacommunities.org/",
    icon: Sparkles,
    status: "live",
  },
  {
    name: "Environment Agency Flood Map",
    owner: "Environment Agency",
    licence: "OGL v3",
    licenceTone: "ogl",
    refresh: "Quarterly",
    lastSync: "2026-04-01 04:30",
    lastSyncAgo: "22 days ago",
    records: "National Zones 2 &amp; 3 coverage",
    recordsInScope: "Full national &mdash; intersected per-parcel",
    fields: 6,
    role: "Flood Zone 3 filter (hard negative unless mitigable)",
    url: "https://environment.data.gov.uk/dataset/flood-map-for-planning-rivers-and-sea-flood-zone-3",
    icon: Cloud,
    status: "live",
  },
  {
    name: "CQC Syndication API",
    owner: "Care Quality Commission",
    licence: "OGL v3 &middot; attribution required",
    licenceTone: "ogl",
    refresh: "Daily + weekly Care Directory",
    lastSync: "2026-04-23 00:12",
    lastSyncAgo: "8 hr ago",
    records: "~14,500 registered locations (England)",
    recordsInScope: "~2,550 in 30 LPAs",
    fields: 24,
    role: "Existing supply density &mdash; commissioning-gap detection",
    url: "https://api-portal.service.cqc.org.uk/",
    icon: ShieldCheck,
    status: "live",
  },
  {
    name: "Bona Vacantia list",
    owner: "Treasury Solicitor (Crown)",
    licence: "OGL v3",
    licenceTone: "ogl",
    refresh: "Weekly CSV",
    lastSync: "2026-04-22 09:00",
    lastSyncAgo: "1 day ago",
    records: "~20&ndash;40 new estates / month (UK)",
    recordsInScope: "~4 / month in 30 LPAs",
    fields: 9,
    role: "Unclaimed estates &mdash; GDPR-clean probate signal",
    url: "https://www.gov.uk/government/publications/bona-vacantia-unclaimed-estates-list",
    icon: FileText,
    status: "live",
  },
  {
    name: "The Gazette",
    owner: "HM Stationery Office (Crown)",
    licence: "OGL v3 &middot; personal-data carve-out",
    licenceTone: "ogl",
    refresh: "Live Atom feed",
    lastSync: "2026-04-23 07:58",
    lastSyncAgo: "17 min ago",
    records: "~10,000&ndash;13,500 insolvency notices / month",
    recordsInScope: "~1,800 / month in target",
    fields: 12,
    role: "Aggregate insolvency signal only &mdash; never used as personal-data lead",
    url: "https://www.thegazette.co.uk/insolvency",
    icon: Radio,
    status: "live",
  },
]

const LICENCE_CLASSES: Record<Source["licenceTone"], { bg: string; text: string; border: string; label: string }> = {
  ogl: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "OGL v3" },
  hmlr: { bg: "bg-[#007cba]/10", text: "text-[#007cba]", border: "border-[#007cba]/30", label: "HMLR EUL" },
  psi: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "PSI open" },
}

const LIA = [
  {
    step: "01",
    title: "Purpose test",
    body: "Voyage Care has a documented commercial and public-benefit interest in identifying 0.25&ndash;2 acre development sites to convert to CQC-registered supported-living and specialist care accommodation. Commissioning demand from 250+ Local Authorities and Integrated Care Boards is evidenced in JSNAs. Sourcing off-market materially accelerates provision for learning-disability, autism and acquired-brain-injury placements.",
  },
  {
    step: "02",
    title: "Necessity test",
    body: "All processed data is already published under open licence &mdash; HMLR, Companies House, planning.data.gov.uk, The Gazette, Bona Vacantia. We process property-linked metadata only: title numbers, corporate owner entities, polygon geometry. Natural-person owners in CCOD aggregate to entity-level scores, not individual profiles. No enrichment beyond what statutory registers publish.",
  },
  {
    step: "03",
    title: "Balancing test",
    body: "The only individuals incidentally processed are (a) registered directors of corporate freeholders (public by statute), (b) probate addresses on the Bona Vacantia list (intentionally published to surface heirs). No Article 22 automated decisions. No direct marketing in MVP. Output is a ranked site list for human review by the Voyage acquisitions team. Owner rights are preserved &mdash; engagement, negotiation, disposal all stay owner-led.",
  },
]

export default function SourcesPage() {
  const okCount = SOURCES.filter((s) => s.status === "live").length

  return (
    <AppShell
      title="Sources & Compliance"
      actions={
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          {okCount}/{SOURCES.length} sources live
        </div>
      }
    >
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
          12 sources &middot; one scoring engine
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          Only licensed, open, or Crown-authorised data.
        </h2>
        <p className="text-gray-500 mt-2 max-w-3xl leading-relaxed">
          Every source is either Open Government Licence, HMLR end-user-licensed, or Crown data under the Public Sector Information Regulations. No Rightmove, Zoopla, OnTheMarket scraping. No unlicensed scraping of any kind. The Gazette&apos;s personal-data carve-out is respected &mdash; we read aggregate insolvency signal, never the deceased&apos;s name as a lead.
        </p>
      </motion.div>

      {/* Source grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {SOURCES.map((s, i) => {
          const Icon = s.icon
          const licenceCl = LICENCE_CLASSES[s.licenceTone]
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#007cba]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#007cba]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-gray-900 truncate tracking-tight">{s.name}</h3>
                    <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-medium flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{s.owner}</p>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#007cba] transition-colors"
                  aria-label="Source docs"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${licenceCl.bg} ${licenceCl.text} ${licenceCl.border}`}>
                  <Lock className="w-2.5 h-2.5" />
                  {licenceCl.label}
                </span>
                <span className="text-[10px] text-gray-400">
                  Licence: <span dangerouslySetInnerHTML={{ __html: s.licence }} />
                </span>
              </div>

              <p className="text-[11px] text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.role }} />

              <dl className="grid grid-cols-2 gap-3 text-[10px] mb-4">
                <div>
                  <dt className="text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Records</dt>
                  <dd className="text-gray-800 font-medium leading-tight" dangerouslySetInnerHTML={{ __html: s.records }} />
                </div>
                <div>
                  <dt className="text-gray-400 uppercase tracking-wider font-semibold mb-0.5">In scope</dt>
                  <dd className="text-gray-800 font-medium leading-tight" dangerouslySetInnerHTML={{ __html: s.recordsInScope }} />
                </div>
                <div>
                  <dt className="text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Refresh</dt>
                  <dd className="text-gray-800 font-medium leading-tight">{s.refresh}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Last sync</dt>
                  <dd className="text-gray-800 font-medium leading-tight">{s.lastSyncAgo}</dd>
                </div>
              </dl>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                <span>{s.fields} fields ingested</span>
                <span className="font-mono">{s.lastSync}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* LIA */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[#007cba]/10 flex items-center justify-center">
            <Scale className="w-5 h-5 text-[#007cba]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-0.5">
              UK GDPR Article 6(1)(f)
            </p>
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              Legitimate Interests Assessment &mdash; three-part test
            </h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {LIA.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-gray-100 bg-gray-50/40 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-widest text-[#007cba]">{item.step}</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 tracking-tight">{item.title}</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.body }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>LIA signed pre-go-live &middot; annual review scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <a href="#" className="text-[#007cba] hover:underline font-medium">Download LIA + ROPA + DPIA pack (PDF, 14 pages)</a>
          </div>
        </div>
      </motion.section>

      {/* Compliance badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { t: "UK GDPR", s: "Art 6(1)(f) LIA signed", icon: ShieldCheck },
          { t: "DPA 2018", s: "ROPA &amp; retention documented", icon: FileText },
          { t: "DUAA 2025", s: "Recognised LI verified", icon: Scale },
          { t: "PECR", s: "N/A in MVP; gated in Phase 2", icon: Radio },
        ].map((c) => {
          const Icon = c.icon
          return (
            <div key={c.t} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 text-[#007cba]" />
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{c.t}</span>
              </div>
              <p className="text-xs font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: c.s }} />
            </div>
          )
        })}
      </div>

      {/* Residency */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-1">UK data residency &middot; no cross-border transfer</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Hosted on <span className="font-medium text-gray-900">AWS London (eu-west-2)</span> by default. No data leaves the UK without Voyage Care&apos;s explicit consent. Per-tenant encryption keys (AES-256 at rest, TLS 1.3 in transit), retention capped at 24 months for derived scores, 60 days for access logs. Signed DPA available on request.
            </p>
          </div>
        </div>
      </motion.div>
    </AppShell>
  )
}
