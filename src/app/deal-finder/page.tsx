"use client"

import { useState, useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Building2, AlertTriangle, TrendingUp, MapPin,
  ChevronRight, Clock, Database, Activity,
  Users, ArrowUpDown, SlidersHorizontal,
  Radar, Layers
} from "lucide-react"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"
import Navbar from "@/components/Navbar"
import DealSlideout from "@/components/DealSlideout"
import Footer from "@/components/Footer"

const ParcelMap = dynamic(() => import("@/components/ParcelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="w-2 h-2 rounded-full bg-[#1E3A5F] animate-pulse" />
        Preparing UK parcel map...
      </div>
    </div>
  ),
})

function fmt(n: number) {
  if (n >= 1000000) return `£${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `£${(n / 1000).toFixed(0)}K`
  return `£${n}`
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-red-500/10 text-red-600 border-red-200"
    : score >= 6 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>{score.toFixed(1)}</span>
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const styles = {
    new: "bg-blue-500/10 text-blue-600 border-blue-200",
    contacted: "bg-amber-500/10 text-amber-600 border-amber-200",
    underwriting: "bg-purple-500/10 text-purple-600 border-purple-200",
    passed: "bg-gray-500/10 text-gray-500 border-gray-200",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>{status}</span>
}

type SortKey = "distressScore" | "capRate" | "units" | "estimatedValue"

const scanSteps = [
  { label: "Connecting to 10 UK data sources...", duration: 1000 },
  { label: "Scanning HMLR INSPIRE, CCOD & OCOD...", duration: 1500 },
  { label: "Analysing Companies House filings...", duration: 1000 },
  { label: "Cross-referencing Gazette probate & insolvency...", duration: 1000 },
  { label: "AI scoring UK distress signals...", duration: 1500 },
]

const initialActivityFeed = [
  { time: "3 min ago", text: "2 new OCOD titles indexed in Walsall LPA", type: "new" },
  { time: "18 min ago", text: "Companies House trace complete — Stellar Holdings Ltd (BVI)", type: "update" },
  { time: "42 min ago", text: "AI scored PARCEL-002 at 9.3/10 — HIGH PRIORITY", type: "alert" },
  { time: "1 hr ago", text: "Probate grant notice on The Gazette — Bolton estate", type: "new" },
  { time: "2 hr ago", text: "Brownfield register refreshed — Dudley MBC (2 new entries)", type: "update" },
  { time: "3 hr ago", text: "Administrators appointed per Gazette — Canal Heritage Estates", type: "alert" },
]

export default function DealFinderPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [countyFilter, setCountyFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortKey>("distressScore")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState(-1)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [revealedDeals, setRevealedDeals] = useState<string[]>([])
  const [activityFeed, setActivityFeed] = useState(initialActivityFeed)
  const scanningRef = useRef(false)

  const hiddenDeals = mockDeals.filter(d => d.hidden)
  const visibleDeals = mockDeals.filter(d => !d.hidden || revealedDeals.includes(d.id))

  const filteredDeals = visibleDeals
    .filter(d => countyFilter === "all" || d.county === countyFilter)
    .sort((a, b) => {
      const aNew = revealedDeals.includes(a.id) ? 1 : 0
      const bNew = revealedDeals.includes(b.id) ? 1 : 0
      if (aNew !== bNew) return bNew - aNew // New deals first
      return sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    })

  const counties = [...new Set(mockDeals.filter(d => !d.hidden).map(d => d.county))]

  const totalDeals = scanComplete ? dashboardStats.totalDealsFound + hiddenDeals.length : dashboardStats.totalDealsFound
  const totalUnits = scanComplete ? dashboardStats.totalUnits + hiddenDeals.reduce((s, d) => s + d.units, 0) : dashboardStats.totalUnits

  const runScan = useCallback(async () => {
    if (scanningRef.current) return
    scanningRef.current = true
    setScanning(true)
    setScanStep(0)
    setScanProgress(0)
    setScanComplete(false)

    const totalDuration = scanSteps.reduce((s, st) => s + st.duration, 0) + 500

    // Progress through steps
    let elapsed = 0
    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i)
      const step = scanSteps[i]

      // Add activity feed entry during scan
      if (i === 1) {
        setActivityFeed(prev => [{ time: "Just now", text: "Scanning Dudley MBC CCOD titles for new filings...", type: "new" }, ...prev.slice(0, 5)])
      }
      if (i === 3) {
        setActivityFeed(prev => [{ time: "Just now", text: "Cross-referencing 3 new Companies House filings...", type: "update" }, ...prev.slice(0, 5)])
      }
      if (i === 4) {
        setActivityFeed(prev => [{ time: "Just now", text: "AI flagged PARCEL-010 — receivership sale imminent", type: "alert" }, ...prev.slice(0, 5)])
      }

      // Animate progress
      const startProgress = elapsed / totalDuration * 100
      elapsed += step.duration
      const endProgress = elapsed / totalDuration * 100

      await new Promise<void>(resolve => {
        const startTime = Date.now()
        const animate = () => {
          const fraction = Math.min((Date.now() - startTime) / step.duration, 1)
          setScanProgress(startProgress + (endProgress - startProgress) * fraction)
          if (fraction < 1) requestAnimationFrame(animate)
          else resolve()
        }
        requestAnimationFrame(animate)
      })
    }

    // Complete
    setScanStep(scanSteps.length)
    setScanProgress(100)

    await new Promise(r => setTimeout(r, 500))

    // Reveal hidden deals
    const newDealIds = hiddenDeals.map(d => d.id)
    setRevealedDeals(newDealIds)
    setScanComplete(true)
    setScanning(false)
    scanningRef.current = false

    setActivityFeed(prev => [
      { time: "Just now", text: `Scan complete — ${hiddenDeals.length} new deals discovered!`, type: "alert" },
      ...prev.slice(0, 5)
    ])
  }, [hiddenDeals])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Off-Market Site Finder</h1>
            <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {dashboardStats.sourcesActive} UK data sources active &mdash; Last scan: {new Date(dashboardStats.lastScanTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              <span className="text-gray-300">|</span>
              {dashboardStats.countiesMonitored} LPAs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runScan}
              disabled={scanning || scanComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scanning ? "bg-[#1E3A5F] text-white animate-pulse cursor-wait"
                : scanComplete ? "bg-emerald-500 text-white cursor-default"
                : "bg-[#1E3A5F] text-white hover:bg-[#003a93] shadow-lg shadow-[#1E3A5F]/25"
              }`}
            >
              <Radar className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
              {scanning ? "Scanning..." : scanComplete ? `${hiddenDeals.length} New Found` : "Run Scan"}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showFilters ? "bg-gray-900 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Scan Progress Bar */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1E3A5F]">
                    {scanStep < scanSteps.length ? scanSteps[scanStep].label : `Scan complete — ${hiddenDeals.length} new deals found`}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#1E3A5F] rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {scanSteps.map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i < scanStep ? "bg-emerald-500" : i === scanStep ? "bg-[#1E3A5F] animate-pulse" : "bg-gray-300"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Local Authority</label>
                  <select
                    value={countyFilter}
                    onChange={e => setCountyFilter(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
                  >
                    <option value="all">All LPAs</option>
                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortKey)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
                  >
                    <option value="distressScore">Distress Score</option>
                    <option value="capRate">Pro-forma Cap Rate</option>
                    <option value="units">Buildable Units</option>
                    <option value="estimatedValue">Estimated Value</option>
                  </select>
                </div>
                <button
                  onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
                  className="flex items-center gap-1 px-3 py-1.5 mt-4 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {sortDir === "desc" ? "High \u2192 Low" : "Low \u2192 High"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* UK Parcel Map */}
        <div className="mb-6 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl bg-white border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 leading-tight">Midlands &amp; North West pilot footprint</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Each marker is a scored parcel &mdash; colour = distress band, click to expand</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> 8.0+</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 6.0&ndash;7.9</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;6.0</span>
              </div>
            </div>
            <div className="h-[360px]">
              <ParcelMap
                deals={filteredDeals}
                selectedDeal={selectedDeal}
                onSelect={setSelectedDeal}
                highlightIds={revealedDeals}
              />
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#142B45] text-white p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl bg-[#007cba]/30 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#D4A253]" />
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70">Morning Brief &mdash; 22 April</p>
              </div>
              <p className="text-2xl font-bold tracking-tight leading-tight mb-2">
                {totalDeals} parcels ranked <span className="text-[#D4A253]">today</span>
              </p>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                {hiddenDeals.length > 0 && !scanComplete
                  ? `${hiddenDeals.length} new parcels waiting in queue &mdash; run scan to surface.`
                  : `${dashboardStats.highDistress} parcels above 8.0 distress. Top pick: ${mockDeals.sort((a, b) => b.distressScore - a.distressScore)[0]?.address || "—"}.`}
              </p>
              <div className="space-y-1.5">
                {["OCOD / Overseas Corporate Owner", "Long-Hold (20+ years)", "Probate / Bona Vacantia"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-[11px] text-white/80">
                    <div className="w-1 h-1 rounded-full bg-[#D4A253]" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-white/60">
              <span>Refreshed daily 06:00 UTC</span>
              <span>{dashboardStats.sourcesActive} sources live</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Parcels", value: totalDeals.toString(), sub: `${scanComplete ? dashboardStats.newThisWeek + hiddenDeals.length : dashboardStats.newThisWeek} new this week`, icon: Search, color: "text-[#1E3A5F]" },
            { label: "High Distress (8+)", value: (scanComplete ? dashboardStats.highDistress + hiddenDeals.filter(d => d.distressScore >= 8).length : dashboardStats.highDistress).toString(), sub: "Immediate opportunities", icon: AlertTriangle, color: "text-red-500" },
            { label: "Buildable Units", value: totalUnits.toString(), sub: `Across ${dashboardStats.countiesMonitored} LPAs`, icon: Building2, color: "text-purple-500" },
            { label: "Avg Pro-forma Cap", value: `${dashboardStats.avgCapRate}%`, sub: "Post-conversion model", icon: TrendingUp, color: "text-emerald-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content — Deal Table */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {filteredDeals.length} {filteredDeals.length === 1 ? "Parcel" : "Parcels"} found
                {countyFilter !== "all" && <span className="text-gray-400 font-normal"> in {countyFilter}</span>}
              </h2>
            </div>

            {filteredDeals.length === 0 && (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-500 mb-1">No deals match your filters</h3>
                <p className="text-xs text-gray-400">Try adjusting your county filter or sort criteria.</p>
                <button onClick={() => setCountyFilter("all")} className="mt-3 text-xs text-[#1E3A5F] font-medium hover:underline">Clear filters</button>
              </div>
            )}

            {filteredDeals.map((deal, index) => {
              const isNew = revealedDeals.includes(deal.id)
              return (
                <motion.div
                  key={deal.id}
                  initial={isNew ? { opacity: 0, y: -20, scale: 0.95 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={isNew ? { delay: 0.2 * revealedDeals.indexOf(deal.id), type: "spring", stiffness: 200 } : { delay: 0.03 * index }}
                  onClick={() => setSelectedDeal(deal)}
                  className={`group bg-white border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    isNew ? "border-[#1E3A5F] ring-1 ring-[#1E3A5F]/20" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{deal.id}</span>
                        <StatusBadge status={deal.status} />
                        <ScoreBadge score={deal.distressScore} />
                        {isNew && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1E3A5F] text-white animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#1E3A5F] transition-colors">{deal.address}</h3>
                      <p className="text-sm text-gray-500">{deal.city}, {deal.state} &mdash; {deal.county} LPA</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {deal.distressSignals.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-red-50 border border-red-100 text-[10px] text-red-600 truncate max-w-[200px]">
                            {s.split("\u2014")[0].trim()}
                          </span>
                        ))}
                        {deal.distressSignals.length > 3 && (
                          <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400">+{deal.distressSignals.length - 3}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-right hidden sm:grid">
                      <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                      <div><p className="text-[10px] text-gray-400">Value</p><p className="text-sm font-bold text-gray-900">{fmt(deal.estimatedValue)}</p></div>
                      <div><p className="text-[10px] text-gray-400">Cap</p><p className="text-sm font-bold text-gray-900">{deal.capRate}%</p></div>
                      <div><p className="text-[10px] text-gray-400">NOI</p><p className="text-sm font-bold text-gray-900">{fmt(deal.currentNOI)}</p></div>
                      <div><p className="text-[10px] text-gray-400">Pro Forma</p><p className="text-sm font-bold text-emerald-600">{fmt(deal.proFormaNOI)}</p></div>
                      <div><p className="text-[10px] text-gray-400">Upside</p><p className="text-sm font-bold text-emerald-600">+{deal.valueAddUpside}%</p></div>
                    </div>
                    <div className="flex items-center gap-3 sm:hidden text-right flex-shrink-0">
                      <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                      <div><p className="text-[10px] text-gray-400">Cap</p><p className="text-sm font-bold text-gray-900">{deal.capRate}%</p></div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1E3A5F] transition-colors mt-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> {deal.ownerName}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Owned {deal.ownershipYears}yr</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Database className="w-3 h-3" /> {deal.source.length} sources</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* County Breakdown */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Parcels by LPA
              </h3>
              <div className="space-y-2.5">
                {dashboardStats.countyBreakdown.map(c => (
                  <div key={c.county}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{c.county}</span>
                      <span className="text-xs text-gray-400">{c.deals}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#1E3A5F]/50" style={{ width: `${(c.deals / 12) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Breakdown */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Signal Types
              </h3>
              <div className="space-y-2">
                {dashboardStats.signalBreakdown.map(s => (
                  <div key={s.signal} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 truncate max-w-[140px]">{s.signal}</span>
                    <span className="text-xs font-medium text-gray-400 ml-2">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" /> Source Activity
              </h3>
              <div className="space-y-3">
                {activityFeed.map((a, i) => (
                  <motion.div
                    key={`${a.text}-${i}`}
                    initial={a.time === "Just now" ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      a.type === "alert" ? "bg-red-500" : a.type === "new" ? "bg-blue-500" : "bg-gray-400"
                    }`} />
                    <div>
                      <p className="text-xs text-gray-700">{a.text}</p>
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

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
    </div>
  )
}
