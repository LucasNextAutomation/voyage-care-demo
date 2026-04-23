"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Building2, AlertTriangle, TrendingUp, MapPin,
  ChevronRight, Clock, Database, Activity,
  Users, ArrowUpDown, SlidersHorizontal, Layers, FileDown
} from "lucide-react"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"
import AppShell from "@/components/AppShell"
import DealSlideout from "@/components/DealSlideout"

const ParcelMap = dynamic(() => import("@/components/ParcelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="w-2 h-2 rounded-full bg-[#007cba] animate-pulse" />
        Preparing UK parcel map...
      </div>
    </div>
  ),
})

function fmt(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `£${Math.round(n / 1_000)}K`
  return `£${n}`
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8
    ? "bg-red-50 text-red-600 border-red-200"
    : score >= 6
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : "bg-emerald-50 text-emerald-600 border-emerald-200"
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>{score.toFixed(1)}</span>
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const styles = {
    new: "bg-blue-50 text-blue-600 border-blue-200",
    contacted: "bg-amber-50 text-amber-600 border-amber-200",
    underwriting: "bg-purple-50 text-purple-600 border-purple-200",
    passed: "bg-gray-50 text-gray-500 border-gray-200",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>
      {status === "new" ? "New" : status === "contacted" ? "In pipeline" : status === "underwriting" ? "Feasibility" : "Passed"}
    </span>
  )
}

type SortKey = "distressScore" | "capRate" | "units" | "estimatedValue"

export default function SiteFinderPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [countyFilter, setCountyFilter] = useState("all")
  const [scoreFilter, setScoreFilter] = useState<"all" | "high" | "mid">("all")
  const [sortBy, setSortBy] = useState<SortKey>("distressScore")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)

  const filteredDeals = useMemo(() => {
    return mockDeals
      .filter((d) => countyFilter === "all" || d.county === countyFilter)
      .filter((d) => scoreFilter === "all" || (scoreFilter === "high" ? d.distressScore >= 8 : d.distressScore >= 6 && d.distressScore < 8))
      .sort((a, b) => (sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]))
  }, [countyFilter, scoreFilter, sortBy, sortDir])

  const counties = [...new Set(mockDeals.map((d) => d.county))]
  const totalDeals = mockDeals.length
  const totalUnits = mockDeals.reduce((s, d) => s + d.units, 0)
  const highCount = mockDeals.filter((d) => d.distressScore >= 8).length

  return (
    <AppShell
      title="Site Finder"
      actions={
        <>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showFilters ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-gray-600 border border-gray-200 hover:border-gray-400 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export to Excel
          </button>
        </>
      }
    >
      {/* Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-5"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-end gap-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Local Authority</label>
                <select
                  value={countyFilter}
                  onChange={(e) => setCountyFilter(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 min-w-[180px]"
                >
                  <option value="all">All 30 priority LPAs</option>
                  {counties.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Score band</label>
                <select
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value as "all" | "high" | "mid")}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
                >
                  <option value="all">All scores</option>
                  <option value="high">High (8.0+)</option>
                  <option value="mid">Mid (6.0-7.9)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
                >
                  <option value="distressScore">Distress score</option>
                  <option value="capRate">Pro-forma cap rate</option>
                  <option value="units">Buildable units</option>
                  <option value="estimatedValue">Estimated value</option>
                </select>
              </div>
              <button
                onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sortDir === "desc" ? "High → Low" : "Low → High"}
              </button>
              <button
                onClick={() => { setCountyFilter("all"); setScoreFilter("all") }}
                className="text-xs text-gray-500 hover:text-gray-800 underline ml-auto"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map + Stats */}
      <div className="mb-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl bg-white border border-gray-200 p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#007cba]/10 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-[#007cba]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 leading-tight">Midlands &amp; North West pilot footprint</p>
                <p className="text-[10px] text-gray-400 leading-tight">Colour = distress band &middot; pulse = surfaced in last scan &middot; click marker for full dossier</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> 8.0+</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 6.0&ndash;7.9</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;6.0</span>
            </div>
          </div>
          <div className="h-[420px]">
            <ParcelMap
              deals={filteredDeals}
              selectedDeal={selectedDeal}
              onSelect={setSelectedDeal}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] text-white p-5 flex flex-col relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl bg-[#007cba]/30 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#007cba]" />
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70">
                  Tonight&apos;s 06:15 scan
                </p>
              </div>
              <p className="text-2xl font-bold tracking-tight leading-tight mb-1">
                {totalDeals} parcels surfaced
              </p>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                {highCount} above 8.0 distress &middot; {totalUnits} buildable units across {dashboardStats.countiesMonitored} LPAs.
              </p>
              <div className="flex items-center justify-between text-[10px] text-white/60 border-t border-white/10 pt-3">
                <span>Refreshed daily 06:00 UTC</span>
                <span>{dashboardStats.sourcesActive}/12 sources live</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> By LPA (active week)
            </p>
            <div className="space-y-2.5">
              {dashboardStats.countyBreakdown.slice(0, 6).map((c) => (
                <div key={c.county}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-gray-700 font-medium">{c.county}</span>
                    <span className="text-gray-400 font-mono text-[10px]">{c.deals} parcels &middot; {c.units} units</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(c.deals / 10) * 100}%`, background: "#007cba" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Parcels in window", value: filteredDeals.length.toString(), sub: `of ${totalDeals} total`, icon: Search, color: "text-[#007cba]" },
          { label: "High distress (8+)", value: highCount.toString(), sub: "immediate opportunities", icon: AlertTriangle, color: "text-red-500" },
          { label: "Buildable units", value: totalUnits.toString(), sub: `across ${dashboardStats.countiesMonitored} LPAs`, icon: Building2, color: "text-purple-500" },
          { label: "Avg pro-forma cap", value: `${dashboardStats.avgCapRate}%`, sub: "post-conversion model", icon: TrendingUp, color: "text-emerald-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.18em] font-semibold">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{s.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Deals table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
              {filteredDeals.length} {filteredDeals.length === 1 ? "parcel" : "parcels"} matching filters
              {countyFilter !== "all" && <span className="text-gray-400 font-normal"> &middot; {countyFilter}</span>}
            </h2>
            <p className="text-[10px] text-gray-400">Click any row for full dossier</p>
          </div>

          {filteredDeals.length === 0 && (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-gray-500 mb-1">No parcels match these filters</h3>
              <p className="text-xs text-gray-400">Try widening the score band or clearing the LPA filter.</p>
            </div>
          )}

          {filteredDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => setSelectedDeal(deal)}
              className="group bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{deal.id}</span>
                    <StatusBadge status={deal.status} />
                    <ScoreBadge score={deal.distressScore} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#007cba] transition-colors">{deal.address}</h3>
                  <p className="text-sm text-gray-500">{deal.city}, {deal.state} &mdash; {deal.county} LPA</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {deal.distressSignals.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-red-50 border border-red-100 text-[10px] text-red-600 truncate max-w-[240px]">
                        {s.split("—")[0].trim()}
                      </span>
                    ))}
                    {deal.distressSignals.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400">+{deal.distressSignals.length - 3}</span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 hidden sm:grid grid-cols-3 gap-3 text-right">
                  <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                  <div><p className="text-[10px] text-gray-400">Value</p><p className="text-sm font-bold text-gray-900">{fmt(deal.estimatedValue)}</p></div>
                  <div><p className="text-[10px] text-gray-400">Cap</p><p className="text-sm font-bold text-gray-900">{deal.capRate || deal.proFormaCapRate}%</p></div>
                  <div><p className="text-[10px] text-gray-400">NOI</p><p className="text-sm font-bold text-gray-900">{fmt(deal.currentNOI)}</p></div>
                  <div><p className="text-[10px] text-gray-400">Pro forma</p><p className="text-sm font-bold text-emerald-600">{fmt(deal.proFormaNOI)}</p></div>
                  <div><p className="text-[10px] text-gray-400">Upside</p><p className="text-sm font-bold text-emerald-600">+{deal.valueAddUpside}%</p></div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#007cba] transition-colors mt-2 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> {deal.ownerName}</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Owned {deal.ownershipYears}yr</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1"><Database className="w-3 h-3" /> {deal.source.length} sources</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar — signals */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" /> Signals firing
            </h3>
            <div className="space-y-2.5">
              {dashboardStats.signalBreakdown.slice(0, 7).map((s) => (
                <div key={s.signal} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-[#007cba]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-700 leading-tight pr-2">{s.signal}</span>
                      <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">{s.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-3 flex items-center gap-2">
              <Activity className="w-3 h-3" /> Source events
            </h3>
            <div className="space-y-3">
              {[
                { when: "03 min ago", text: "2 new OCOD titles indexed in Walsall LPA", type: "new" },
                { when: "18 min ago", text: "Stellar Holdings Ltd (CN 04826128) — Companies House trace complete", type: "update" },
                { when: "42 min ago", text: "Parcel PARCEL-009 scored 9.5 — highest of the week", type: "alert" },
                { when: "1 hr ago", text: "Probate notice on The Gazette — Stoke-on-Trent estate", type: "new" },
                { when: "2 hr ago", text: "Brownfield Register refresh — Dudley MBC (2 new entries)", type: "update" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    a.type === "alert" ? "bg-red-500" : a.type === "new" ? "bg-blue-500" : "bg-gray-400"
                  }`} />
                  <div>
                    <p className="text-[11px] text-gray-700 leading-snug">{a.text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{a.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Slideout */}
      <AnimatePresence>
        {selectedDeal && (
          <DealSlideout
            deal={selectedDeal}
            onClose={() => setSelectedDeal(null)}
            onPrev={filteredDeals.indexOf(selectedDeal) > 0 ? () => setSelectedDeal(filteredDeals[filteredDeals.indexOf(selectedDeal) - 1]) : undefined}
            onNext={filteredDeals.indexOf(selectedDeal) < filteredDeals.length - 1 ? () => setSelectedDeal(filteredDeals[filteredDeals.indexOf(selectedDeal) + 1]) : undefined}
          />
        )}
      </AnimatePresence>
    </AppShell>
  )
}
