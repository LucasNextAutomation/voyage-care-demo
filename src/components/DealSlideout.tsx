"use client"

import { motion } from "framer-motion"
import {
  X, Building2, AlertTriangle, TrendingUp, DollarSign,
  Users, Phone, Mail, Activity, ArrowUpRight, BarChart3,
  Database, Clock, MapPin, FileText, ChevronLeft, ChevronRight
} from "lucide-react"
import type { Deal } from "@/data/deals"

function fmt(n: number) {
  if (n >= 1000000) return `£${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `£${(n / 1000).toFixed(0)}K`
  return `£${n}`
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-red-500/10 text-red-600 border-red-200"
    : score >= 6 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}>
      {score.toFixed(1)}/10
    </span>
  )
}

export default function DealSlideout({ deal, onClose, onPrev, onNext }: { deal: Deal; onClose: () => void; onPrev?: () => void; onNext?: () => void }) {
  const totalRevenue = deal.unitMix.reduce((s, u) => s + u.count * u.rent * 12, 0)
  const totalExpenses = deal.expenses.reduce((s, e) => s + e.annual, 0)

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-full md:max-w-xl bg-white border-l border-gray-200 shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-400">{deal.id}</span>
              <ScoreBadge score={deal.distressScore} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">{deal.address}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {deal.city}, {deal.state} &mdash; {deal.county} LPA
            </p>
          </div>
          <div className="flex items-center gap-1">
            {onPrev && (
              <button onClick={onPrev} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors" title="Previous deal">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNext && (
              <button onClick={onNext} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors" title="Next deal">
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Units", value: deal.units.toString(), icon: Building2 },
              { label: "Class", value: deal.class, icon: BarChart3 },
              { label: "Est. Value", value: fmt(deal.estimatedValue), icon: DollarSign },
              { label: "Cap Rate", value: `${deal.capRate}%`, icon: Activity },
              { label: "Value-Add", value: `+${deal.valueAddUpside}%`, icon: ArrowUpRight },
              { label: "$/Unit", value: fmt(deal.pricePerUnit), icon: TrendingUp },
            ].map(m => (
              <div key={m.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-1 mb-1">
                  <m.icon className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="text-base font-bold text-gray-900">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Distress Signals */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Distress Signals — Score {deal.distressScore}/10
            </h3>
            <div className="space-y-2">
              {deal.distressSignals.map((signal, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Financial Analysis
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Current NOI", value: fmt(deal.currentNOI) },
                { label: "Pro Forma NOI", value: fmt(deal.proFormaNOI), green: true },
                { label: "IRR (5yr)", value: `${deal.irr5yr}%` },
                { label: "Equity Multiple", value: `${deal.equityMultiple}x` },
                { label: "Cash-on-Cash", value: `${deal.cashOnCash}%` },
                { label: "DSCR", value: `${deal.dscr}` },
              ].map(m => (
                <div key={m.label}>
                  <p className="text-[10px] text-gray-400 uppercase">{m.label}</p>
                  <p className={`text-base font-bold ${m.green ? "text-emerald-600" : "text-gray-900"}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Owner Intel */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Owner Intelligence
            </h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-[10px] text-gray-400 uppercase block">Owner</span><span className="font-semibold text-gray-900">{deal.ownerName}</span> <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 ml-1">{deal.ownerType}</span></div>
              <div><span className="text-[10px] text-gray-400 uppercase block">Address</span><span className="text-gray-700">{deal.ownerAddress}</span></div>
              <div className="flex items-center gap-4">
                <div><span className="text-[10px] text-gray-400 uppercase block">Owned</span><span className="text-gray-700">{deal.ownershipYears} years</span></div>
                <div><span className="text-[10px] text-gray-400 uppercase block">Tax</span><span className={deal.taxStatus.startsWith("Current") ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>{deal.taxStatus}</span></div>
              </div>
              {deal.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" /><span className="text-gray-700">{deal.phone}</span></div>}
              {deal.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" /><span className="text-gray-700">{deal.email}</span></div>}
              <div><span className="text-[10px] text-gray-400 uppercase block">Mortgage</span><span className={deal.mortgageBalance ? "text-gray-700" : "text-emerald-600 font-medium"}>{deal.mortgageBalance ? fmt(deal.mortgageBalance) : "Free & Clear"}</span></div>
            </div>
          </div>

          {/* Unit Mix */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">Unit Mix — {deal.units} Total</h3>
            <div className="space-y-1.5">
              {deal.unitMix.map((u, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{u.type} x{u.count}</span>
                  <span className="text-gray-900 font-medium">${(u.count * u.rent).toLocaleString()}/mo</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-sm font-bold">
                <span>Total Revenue</span><span>{fmt(totalRevenue)}/yr</span>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">Operating Expenses</h3>
            <div className="space-y-1.5">
              {deal.expenses.map((e, i) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-gray-500">{e.category}</span><span className="text-gray-900 font-medium">{fmt(e.annual)}</span></div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-emerald-600">
                <span>NOI</span><span>{fmt(totalRevenue - totalExpenses)}/yr</span>
              </div>
            </div>
          </div>

          {/* Lien History */}
          {deal.lienHistory.length > 0 && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" /> Lien History
              </h3>
              <div className="space-y-1.5">
                {deal.lienHistory.map((l, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span className="text-gray-700">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Sources */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" /> Data Sources
            </h3>
            <div className="flex flex-wrap gap-2">
              {deal.source.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-600">{s}</span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Found {deal.dateFound}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
