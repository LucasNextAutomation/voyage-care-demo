"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import {
  Mail,
  Clock,
  Download,
  Printer,
  MapPin,
  AlertTriangle,
  FileText,
  ChevronRight,
  CheckCircle2,
  Shield,
} from "lucide-react"
import AppShell from "@/components/AppShell"
import { mockDeals, dashboardStats } from "@/data/deals"

const ParcelMap = dynamic(() => import("@/components/ParcelMap"), { ssr: false })

function fmt(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `£${Math.round(n / 1_000)}K`
  return `£${n}`
}

const RECIPIENTS = [
  { name: "Jack Brindle", email: "jack.brindle@voyagecare.com", role: "Property Lead" },
  { name: "Property Team", email: "property@voyagecare.com", role: "Group mailbox" },
  { name: "Commissioning Office", email: "commissioning@voyagecare.com", role: "CC" },
]

const ARCHIVE = [
  { date: "22 Apr 2026 &middot; Tue", topScore: "9.1", topCity: "Rochdale" },
  { date: "21 Apr 2026 &middot; Mon", topScore: "8.9", topCity: "Mansfield" },
  { date: "18 Apr 2026 &middot; Fri", topScore: "8.7", topCity: "Walsall" },
  { date: "17 Apr 2026 &middot; Thu", topScore: "9.3", topCity: "Bolton" },
]

export default function BriefPage() {
  const today = [...mockDeals].sort((a, b) => b.distressScore - a.distressScore).slice(0, 5)
  const totalPoints = today.reduce((s, d) => s + d.distressScore, 0)
  const avgScore = (totalPoints / today.length).toFixed(1)

  return (
    <AppShell
      title="Morning Brief"
      actions={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 bg-white text-gray-600 hover:border-gray-400 transition-all">
            <Download className="w-3.5 h-3.5" />
            Excel export
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 bg-white text-gray-600 hover:border-gray-400 transition-all">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      }
    >
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Daily email &middot; delivered 06:35 GMT
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          Today&apos;s brief for the property team.
        </h2>
        <p className="text-gray-500 mt-2 max-w-3xl leading-relaxed">
          One email. Top 5 ranked parcels, each with its evidence attached. Zero logins required to act &mdash; click through for the full dossier, or reply <span className="font-medium text-gray-900">pursue</span> / <span className="font-medium text-gray-900">reject</span> / <span className="font-medium text-gray-900">defer</span> and the system retrains tomorrow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Email preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Email client chrome */}
          <div className="border-b border-gray-100 px-5 py-3 bg-gray-50 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <span className="text-[11px] text-gray-400 font-mono truncate">Inbox &mdash; jack.brindle@voyagecare.com</span>
            </div>
            <span className="text-[10px] text-gray-400">06:35 GMT</span>
          </div>

          {/* Email header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-xs">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">From</span>
              <span className="text-gray-900"><span className="font-medium">Voyage Care Sourcing Engine</span> &middot; <span className="text-gray-400">noreply@voyage-care.nextautomation.us</span></span>
              <span className="text-gray-400 font-semibold uppercase tracking-wider">To</span>
              <span className="text-gray-900">Jack Brindle, Property Team &lt;property@voyagecare.com&gt;</span>
              <span className="text-gray-400 font-semibold uppercase tracking-wider">Cc</span>
              <span className="text-gray-500">Commissioning Office</span>
              <span className="text-gray-400 font-semibold uppercase tracking-wider">Subject</span>
              <span className="text-gray-900 font-semibold">Morning Brief &middot; 23 April &middot; {today.length} top parcels &middot; avg score {avgScore}</span>
            </div>
          </div>

          {/* Email body */}
          <div className="px-6 py-6 space-y-5">
            <p className="text-sm text-gray-900 leading-relaxed">Morning Jack,</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Overnight the engine ranked <span className="font-semibold text-gray-900">{dashboardStats.totalDealsFound + 12} parcels</span> across the {dashboardStats.countiesMonitored} active LPAs. Here are the top {today.length} for this morning &mdash; each with full evidence attached. Click any card for the dossier (INSPIRE polygon, title chain, CCOD/OCOD holders, planning history, EPC, flood, adjacency).
            </p>

            {/* Map strip */}
            <div className="rounded-lg overflow-hidden border border-gray-100 h-[220px]">
              <ParcelMap deals={today} selectedDeal={null} onSelect={() => {}} />
            </div>

            {/* Top picks */}
            <div className="space-y-3">
              {today.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="rounded-lg border border-gray-200 p-4 hover:border-[#007cba]/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
                      style={{
                        background: deal.distressScore >= 9 ? "#fee2e2" : deal.distressScore >= 8 ? "#fef3c7" : "#ecfdf5",
                        color: deal.distressScore >= 9 ? "#dc2626" : deal.distressScore >= 8 ? "#b45309" : "#059669",
                      }}
                    >
                      {deal.distressScore.toFixed(1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-900">{deal.address}</p>
                        <span className="text-[10px] font-mono text-gray-400">{deal.id}</span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-gray-300" />
                        {deal.city}, {deal.county} LPA &middot; {deal.lotSize} &middot; class {deal.class} &middot; owned {deal.ownershipYears}yr
                      </p>
                      <ul className="space-y-1 mb-3">
                        {deal.distressSignals.slice(0, 3).map((s, j) => (
                          <li key={j} className="text-[11px] text-gray-700 flex items-start gap-1.5">
                            <span className="text-red-400 font-bold mt-0.5">&bull;</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-gray-500">
                          Est. <span className="font-semibold text-gray-900">{fmt(deal.estimatedValue)}</span>
                        </span>
                        <span className="text-gray-300">&middot;</span>
                        <span className="text-gray-500">
                          NOI pro forma <span className="font-semibold text-emerald-600">{fmt(deal.proFormaNOI)}</span>
                        </span>
                        <span className="text-gray-300">&middot;</span>
                        <span className="text-gray-500">
                          Cap <span className="font-semibold text-gray-900">{deal.proFormaCapRate}%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button className="px-3 py-1 rounded-md text-[11px] font-semibold bg-[#007cba] text-white hover:opacity-90">
                      Pursue
                    </button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-semibold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                      Defer
                    </button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-semibold border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                      Reject
                    </button>
                    <button className="ml-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#007cba] hover:underline">
                      Full dossier <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats block */}
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                This week at a glance
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-gray-900">{dashboardStats.newThisWeek + 8}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">new parcels</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{dashboardStats.highDistress}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">high distress</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{dashboardStats.avgCapRate}%</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">avg pro-forma cap</p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="rounded-lg border border-[#007cba]/20 bg-[#007cba]/5 p-4">
              <div className="flex items-start gap-3">
                <Download className="w-4 h-4 text-[#007cba] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Full ranked list as Excel</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Download <span className="font-medium">voyage_brief_2026-04-23.xlsx</span> &mdash; all 25 ranked parcels with title numbers, owner details, planning history, and the per-signal contribution breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* LIA reminder */}
            <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed">
              <p className="flex items-start gap-1.5 mb-1">
                <Shield className="w-3 h-3 text-[#007cba] mt-0.5 flex-shrink-0" />
                <span>
                  This brief processes property data under <span className="font-medium text-gray-500">UK GDPR Article 6(1)(f)</span> legitimate interests. LIA, ROPA and DPIA documented and signed pre-go-live &middot; reviewed annually. No owner outreach from this email.
                </span>
              </p>
              <p className="italic">Hosted on AWS London &middot; UK data residency &middot; retention 24 months. Reply &quot;unsubscribe&quot; to pause delivery.</p>
            </div>

            {/* Signoff */}
            <p className="text-sm text-gray-600 pt-2">
              Have a good one,
              <br />
              <span className="font-medium text-gray-900">Voyage Care Sourcing Engine</span>
              <br />
              <span className="text-xs text-gray-400">Built by NextAutomation &middot; v1.4</span>
            </p>
          </div>
        </motion.div>

        {/* Side panel */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Schedule</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Scan</span>
                <span className="text-gray-900 font-mono">06:00 UTC daily</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Score + rank</span>
                <span className="text-gray-900 font-mono">06:15 UTC daily</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Brief dispatch</span>
                <span className="text-gray-900 font-mono">06:35 UTC daily</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Model retrain</span>
                <span className="text-gray-900 font-mono">Mondays 04:00</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Queued for tomorrow 06:35 GMT</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Recipients</h3>
            </div>
            <div className="space-y-3">
              {RECIPIENTS.map((r) => (
                <div key={r.email} className="flex items-start gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ background: "#007cba" }}
                  >
                    {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate leading-tight">{r.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{r.email}</p>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium uppercase tracking-wider flex-shrink-0 mt-1">
                    {r.role}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 pt-4 border-t border-gray-100 w-full text-left text-[11px] text-[#007cba] font-medium hover:underline">
              Manage recipients + copy-lists &rarr;
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Recent briefs</h3>
            </div>
            <div className="space-y-2.5">
              {ARCHIVE.map((a) => (
                <div
                  key={a.date}
                  className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-900 leading-tight" dangerouslySetInnerHTML={{ __html: a.date }} />
                    <p className="text-[10px] text-gray-400 leading-tight">Top pick: {a.topCity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-gray-600">{a.topScore}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-amber-100 bg-amber-50/60 p-5"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Feedback loop</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Reply <span className="font-mono font-medium">pursue</span>, <span className="font-mono font-medium">defer</span>, or <span className="font-mono font-medium">reject</span> to any parcel. The model retrains Monday 04:00 UTC against your decisions &mdash; by month three the top of the list reflects what Voyage actually buys, not a generic distress heuristic.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}
