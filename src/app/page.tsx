"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Building2,
  Activity,
  FileText,
  ChevronRight,
  Sparkles,
  MapPin,
  Database,
} from "lucide-react"
import AppShell from "@/components/AppShell"
import { mockDeals, dashboardStats } from "@/data/deals"

const ParcelMap = dynamic(() => import("@/components/ParcelMap"), { ssr: false })

const VOYAGE_BLUE = "#007cba"

function fmtGBP(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `£${Math.round(n / 1_000)}K`
  return `£${n}`
}

const activity = [
  { when: "03 min ago", type: "new", text: "2 new OCOD titles indexed in Walsall LPA (Jersey SPV + BVI SPV)" },
  { when: "18 min ago", type: "update", text: "Companies House: late accounts flagged for Meadow Holdings Ltd (CN 08241123)" },
  { when: "42 min ago", type: "alert", text: "Parcel PARCEL-009 (Dudley) scored 9.5 — probate + brownfield combo" },
  { when: "1 hr ago", type: "new", text: "Bona Vacantia: 1 new unclaimed estate in Stoke-on-Trent (ref BV47188)" },
  { when: "2 hr ago", type: "update", text: "Brownfield register refresh — Dudley MBC (2 new entries)" },
  { when: "3 hr ago", type: "alert", text: "The Gazette: administrators appointed, Canal Heritage Estates Ltd" },
  { when: "5 hr ago", type: "update", text: "EPC feed: 147 non-domestic certificates updated across 30 target LPAs" },
]

const typeColour: Record<string, string> = {
  new: "bg-blue-500",
  update: "bg-gray-400",
  alert: "bg-red-500",
}

export default function DashboardPage() {
  const topPicks = [...mockDeals].sort((a, b) => b.distressScore - a.distressScore).slice(0, 5)
  const signalDist = dashboardStats.signalBreakdown
  const maxSignal = Math.max(...signalDist.map((s) => s.count))

  return (
    <AppShell
      title="Dashboard"
      actions={
        <Link
          href="/deal-finder"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: VOYAGE_BLUE }}
        >
          Open Site Finder
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">
          Wednesday, 23 April 2026 &middot; 08:15 GMT
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Good morning, Jack.
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl leading-relaxed">
          The sourcing engine ran at 06:15 UTC. <span className="font-medium text-gray-900">12 new parcels</span> were surfaced across the 30 priority LPAs, <span className="font-medium text-gray-900">3 scored above 9.0</span>. Your top pick this morning is in Dudley &mdash; probate plus brownfield.
        </p>
      </motion.div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Parcels tracked", value: "10,428", sub: "across 30 priority LPAs", icon: Building2, tone: "blue" },
          { label: "Top score today", value: "9.5", sub: "Victoria Mews, Dudley", icon: Sparkles, tone: "accent" },
          { label: "High-distress (8+)", value: dashboardStats.highDistress.toString(), sub: "immediate opportunities", icon: AlertTriangle, tone: "red" },
          { label: "Sources live", value: `${dashboardStats.sourcesActive} / 12`, sub: "all green &middot; last sync 06:15", icon: Database, tone: "emerald" },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          const toneClasses: Record<string, string> = {
            blue: "bg-[#007cba]/10 text-[#007cba]",
            accent: "bg-amber-50 text-amber-600",
            red: "bg-red-50 text-red-600",
            emerald: "bg-emerald-50 text-emerald-600",
          }
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-400">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${toneClasses[kpi.tone]}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</p>
              <p className="text-[11px] text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: kpi.sub }} />
            </motion.div>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
        {/* Top picks */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Today&apos;s top picks</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Top 5 parcels ranked from tonight&apos;s 06:15 UTC scan</p>
            </div>
            <Link
              href="/deal-finder"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#007cba] hover:gap-2 transition-all"
            >
              See all parcels <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {topPicks.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/50 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
                  style={{
                    background: deal.distressScore >= 9 ? "#fee2e2" : deal.distressScore >= 8 ? "#fef3c7" : "#ecfdf5",
                    color: deal.distressScore >= 9 ? "#dc2626" : deal.distressScore >= 8 ? "#b45309" : "#059669",
                  }}
                >
                  {deal.distressScore.toFixed(1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">{deal.address}</p>
                    <span className="text-[10px] font-mono text-gray-400 flex-shrink-0">{deal.id}</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-300" />
                    {deal.city}, {deal.county} LPA &middot; {deal.lotSize} &middot; {deal.class}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {deal.distressSignals.slice(0, 2).map((s, j) => (
                      <span key={j} className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 truncate max-w-[240px]">
                        {s.split("—")[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Est. value</p>
                  <p className="text-sm font-bold text-gray-900">{fmtGBP(deal.estimatedValue)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Map preview */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">UK pilot footprint</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Midlands + North West</p>
            </div>
            <Link
              href="/deal-finder"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#007cba]"
            >
              Expand <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex-1 min-h-[260px] rounded-lg overflow-hidden">
            <ParcelMap deals={mockDeals.filter((d) => !d.hidden)} selectedDeal={null} onSelect={() => {}} />
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> 8.0+</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> 6.0&ndash;7.9</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;6.0</span>
          </div>
        </motion.section>
      </div>

      {/* Signal breakdown + activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Distress signals &mdash; current pipeline</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Signals firing across all ranked parcels this week</p>
            </div>
            <Link href="/scoring" className="inline-flex items-center gap-1 text-[11px] font-medium text-[#007cba]">
              Open scoring engine <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {signalDist.map((s, i) => (
              <motion.div
                key={s.signal}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 truncate">{s.signal}</span>
                    <span className="text-[11px] text-gray-400 font-mono ml-2 flex-shrink-0">{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.count / maxSignal) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.04, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${VOYAGE_BLUE}, #005a87)` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Live activity</h3>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Realtime
            </span>
          </div>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.04 }}
                className="flex items-start gap-2.5"
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${typeColour[a.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">{a.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.when}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#007cba]/10">
            <FileText className="w-5 h-5 text-[#007cba]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Morning Brief ready</p>
            <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
              Today&apos;s email went to Jack &amp; the property team at 06:35 UTC &mdash; {topPicks.length} top-ranked parcels with evidence-attached cards and Excel export.
            </p>
          </div>
        </div>
        <Link
          href="/brief"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-gray-200 bg-white text-gray-900 hover:border-gray-400 transition-all"
        >
          Preview today&apos;s brief
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </AppShell>
  )
}
