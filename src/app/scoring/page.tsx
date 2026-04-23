"use client"

import { motion } from "framer-motion"
import {
  Sparkles,
  Globe,
  Clock,
  Layers,
  TrendingDown,
  Zap,
  Droplets,
  Building2,
  FileText,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import AppShell from "@/components/AppShell"
import { mockDeals } from "@/data/deals"

interface Signal {
  key: string
  name: string
  icon: typeof Sparkles
  source: string
  query: string
  weight: number
  rationale: string
}

const SIGNALS: Signal[] = [
  {
    key: "admin",
    name: "Companies House: receivership / liquidation",
    icon: Building2,
    source: "Companies House REST API (MVP) + Streaming API (Phase 2)",
    query: "filing history contains insolvency event (AA01, GAZ1, GAZ2, LIQ02) in last 90 days",
    weight: 1.50,
    rationale: "The hardest distress signal. Administrators are legally required to realise assets at arm&apos;s length and at pace &mdash; weeks, not months. Consistently the highest-converting signal in UK commercial property.",
  },
  {
    key: "bonavacantia",
    name: "Bona Vacantia &mdash; unclaimed estate",
    icon: FileText,
    source: "Treasury Solicitor Bona Vacantia Unclaimed Estates List",
    query: "property address on the live BV list, not yet claimed within statutory 30-year window",
    weight: 1.40,
    rationale: "Crown-held pending heir. Often resolved via private sale to avoid Treasury auction. GDPR-clean &mdash; deceased&apos;s rights don&apos;t engage and heirs by definition are unknown. ~20-40 new UK-wide per month; ~4 typically in our 30-LPA window.",
  },
  {
    key: "brownfield",
    name: "Brownfield Register without consent",
    icon: Layers,
    source: "planning.data.gov.uk Brownfield Land Register (38,234 national entities)",
    query: "on LPA Brownfield Register with no linked planning permission",
    weight: 1.30,
    rationale: "A statutory-duty register of deliverable but unconsented plots. By definition the LPA has flagged the site as developable in principle but no developer has engaged &mdash; classic stalled site, motivated owner.",
  },
  {
    key: "ocod",
    name: "Overseas-corporate owner (OCOD)",
    icon: Globe,
    source: "HMLR OCOD &mdash; monthly refresh, ~100,000 records nationally",
    query: "title holder incorporated outside the UK (BVI / Jersey / Guernsey / Cayman most frequent)",
    weight: 1.20,
    rationale: "Passive holders with weaker emotional hold. Economic Crime and Corporate Transparency Act 2023 is actively pushing overseas divestment &mdash; a regulatory tailwind we score on.",
  },
  {
    key: "epc",
    name: "EPC F or G on non-domestic stock",
    icon: Zap,
    source: "EPC Open Data (domestic + non-domestic)",
    query: "most recent non-domestic EPC rating ∈ {F, G} within last 10 years",
    weight: 1.10,
    rationale: "MEES regulations ratchet: letting F/G non-domestic became illegal from April 2023 and the threshold tightens to EPC C by 2028. Owners face a capital cliff &mdash; forced-sale pressure builds.",
  },
  {
    key: "planning_decay",
    name: "Planning history decay",
    icon: TrendingDown,
    source: "Idox (22 LPAs) / Northgate (6) / Ocella (2) portals + planning.data.gov.uk",
    query: "last decision &gt;5yr, prior refusal or withdrawn application in last 36 months",
    weight: 1.00,
    rationale: "Owner has tried and failed to realise value. Psychologically primed to accept a turnkey deal rather than re-enter the planning process. A failed scheme in the last 3 years lifts conversion by a material margin.",
  },
  {
    key: "longhold",
    name: "Long-hold title (&gt;20 years)",
    icon: Clock,
    source: "HMLR title register + Price Paid Data (no transaction since 1995)",
    query: "no HMLR Price Paid entry for the title number since 1995, no outstanding mortgage",
    weight: 0.90,
    rationale: "Generational turnover and inherited-asset fatigue. Capex-deferred properties accumulate here. Weak on its own but a powerful multiplier when paired with OCOD, probate, or insolvency.",
  },
  {
    key: "flood",
    name: "Flood Zone 3 on undeveloped land",
    icon: Droplets,
    source: "Environment Agency Flood Map for Planning",
    query: "parcel geometry intersects EA Flood Zone 3 and current use is undeveloped",
    weight: 0.80,
    rationale: "Long-term holdout with insurance-uninsurable, low-liquid demand &mdash; a negative signal against most buyers. Voyage Care&apos;s C2/supported-living use can be designed around flood constraints, so we surface these parcels flagged rather than hidden.",
  },
]

const CALIBRATION_HISTORY = [
  {
    when: "2026-04-18 &middot; v1.4 retrain",
    event: "Bona Vacantia promoted from 1.10 to 1.40&times;",
    reason: "First two BV parcels (Stourbridge + Bilston) closed at 18% below open-market, faster than the median",
    tone: "up",
  },
  {
    when: "2026-04-11 &middot; v1.3",
    event: "Urban sub-0.35 acres down-weighted",
    reason: "Property team rejected four urban-sub-threshold parcels in a row &mdash; below Voyage scheme viability",
    tone: "down",
  },
  {
    when: "2026-03-28 &middot; v1.2",
    event: "EPC F/G weight lifted from 0.95 to 1.10&times;",
    reason: "MEES 2028 EPC-C ratchet clarified &mdash; non-domestic F/G stock now under hard deadline pressure",
    tone: "up",
  },
  {
    when: "2026-03-14 &middot; v1.1",
    event: "Flood Zone 3 held at 0.80&times; (no change)",
    reason: "Voyage still wants to see them with design-mitigation flags &mdash; surfaced, not hidden",
    tone: "flat",
  },
]

export default function ScoringPage() {
  // Example parcel: PARCEL-009 (Dudley, 9.5)
  const example = mockDeals.find((d) => d.id === "PARCEL-009") ?? mockDeals[0]

  // Map example signals to our canonical keys
  const exampleContribs = [
    { key: "bonavacantia", name: "Probate / Bona Vacantia", hit: true, points: 18 },
    { key: "brownfield", name: "Brownfield Register without consent", hit: true, points: 22 },
    { key: "longhold", name: "Long-hold (42-year hold)", hit: true, points: 17 },
    { key: "planning_decay", name: "Prior planning withdrawn (&times;2)", hit: true, points: 14 },
    { key: "ocod", name: "OCOD owner", hit: false, points: 0 },
    { key: "admin", name: "Companies House insolvency", hit: false, points: 0 },
    { key: "epc", name: "EPC F/G non-domestic", hit: false, points: 0 },
    { key: "adjacent", name: "Adjacent to existing Voyage service", hit: true, points: 14 },
  ]
  const totalPoints = exampleContribs.reduce((s, c) => s + c.points, 0)

  return (
    <AppShell
      title="Scoring Engine"
      actions={
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
          <BarChart3 className="w-3 h-3 text-[#007cba]" />
          Model v1.4 &middot; last retrain 2026-04-18
        </div>
      }
    >
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
          How parcels are ranked
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          Eight UK distress signals, one 0-100 score.
        </h2>
        <p className="text-gray-500 mt-2 max-w-3xl leading-relaxed">
          Every parcel passing the commissioning filter is scored against the eight signals below. Weights are recalibrated monthly from the property team&apos;s pursue / reject decisions, so by month three the top of the list reflects what <span className="font-medium text-gray-900">Voyage Care actually buys</span>, not a generic distress heuristic.
        </p>
      </motion.div>

      {/* Signals grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {SIGNALS.map((s, i) => {
          const Icon = s.icon
          const pct = (s.weight / 1.5) * 100
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#007cba]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#007cba]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight" dangerouslySetInnerHTML={{ __html: s.name }} />
                  <p className="text-[11px] text-gray-400 mt-0.5" dangerouslySetInnerHTML={{ __html: s.source }} />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Weight</p>
                  <p className="text-base font-bold text-[#007cba] font-mono">{s.weight.toFixed(2)}&times;</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#007cba] to-[#005a87]"
                  />
                </div>
                <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1 font-mono">
                  <span>0.0</span>
                  <span>1.5&times;</span>
                </div>
              </div>

              <div className="mb-3 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Query</p>
                <p className="text-[11px] text-gray-700 font-mono leading-snug" dangerouslySetInnerHTML={{ __html: s.query }} />
              </div>

              <p className="text-[11px] text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.rationale }} />
            </motion.div>
          )
        })}
      </div>

      {/* Example parcel breakdown */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl border border-gray-200 bg-white p-6 mb-10 shadow-sm"
      >
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Worked example</p>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
              {example.address} &middot; {example.city}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {example.county} LPA &middot; {example.lotSize} &middot; class {example.class} &middot; owned {example.ownershipYears} years
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] text-white p-4 min-w-[180px]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">Final score</p>
            <p className="text-4xl font-bold tracking-tight mt-1" style={{ color: "#60a5fa" }}>{example.distressScore.toFixed(1)}<span className="text-lg text-white/50 font-normal">/10</span></p>
            <p className="text-[10px] text-white/60 mt-1">{totalPoints} raw points &middot; scaled 0&ndash;10</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {exampleContribs.map((c, i) => {
            const maxPoints = 25
            const pct = c.hit ? (c.points / maxPoints) * 100 : 0
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 grid grid-cols-12 items-center gap-2">
                  <span className="col-span-6 md:col-span-5 text-xs text-gray-700 truncate" dangerouslySetInnerHTML={{ __html: c.name }} />
                  <div className="col-span-4 md:col-span-6">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.04 }}
                        className={`h-full rounded-full ${c.hit ? "bg-gradient-to-r from-[#007cba] to-[#005a87]" : ""}`}
                      />
                    </div>
                  </div>
                  <span className="col-span-2 md:col-span-1 text-xs text-right font-mono text-gray-600">
                    {c.hit ? `+${c.points}` : <span className="text-gray-300">&ndash;</span>}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
          Four signals fired. The combination of <span className="font-medium text-gray-900">probate + brownfield + long-hold + prior planning decay</span>, plus the adjacency bonus to the Stourbridge service, puts this parcel in the top decile. Administrators aren&apos;t involved, so timing is owner-led &mdash; our outreach prep can take the 10 business days it needs.
        </div>
      </motion.section>

      {/* Calibration history */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">Adaptive calibration</p>
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Recent retrain history</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
              Every Monday the model re-weights itself against the last 30 days of property-team decisions. Changes are logged here. No black-box re-ranking &mdash; every weight move has a named reason.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#007cba]">
            Roll back weights <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <div className="space-y-3">
          {CALIBRATION_HISTORY.map((c, i) => {
            const toneClasses = {
              up: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
              down: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
              flat: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
            }[c.tone as "up" | "down" | "flat"]

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${toneClasses.bg} ${toneClasses.border}`}>
                  <TrendingDown className={`w-4 h-4 ${toneClasses.text} ${c.tone === "up" ? "rotate-180" : ""}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400" dangerouslySetInnerHTML={{ __html: c.when }} />
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight" dangerouslySetInnerHTML={{ __html: c.event }} />
                  <p className="text-xs text-gray-500 mt-0.5" dangerouslySetInnerHTML={{ __html: c.reason }} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>
    </AppShell>
  )
}
