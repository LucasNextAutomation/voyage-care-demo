"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, Zap, Mail, Phone, MessageSquare,
  ChevronRight, Eye, Clock, Target,
  CheckCircle2, AlertTriangle, Calendar, X,
  Send, MousePointerClick
} from "lucide-react"
import { outreachLeads, emailSequence, outreachStats, type OutreachLead, type PipelineStage } from "@/data/outreach"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-red-500/10 text-red-600" : score >= 6 ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>{score.toFixed(1)}</span>
}

const stageConfig: Record<PipelineStage, { label: string; color: string; bgColor: string }> = {
  new: { label: "New", color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200" },
  skip_traced: { label: "Owner Traced", color: "text-purple-600", bgColor: "bg-purple-50 border-purple-200" },
  sequence_active: { label: "Sequence Active", color: "text-amber-600", bgColor: "bg-amber-50 border-amber-200" },
  replied: { label: "Replied", color: "text-emerald-600", bgColor: "bg-emerald-50 border-emerald-200" },
  meeting_set: { label: "Meeting Set", color: "text-[#1E3A5F]", bgColor: "bg-blue-50 border-[#1E3A5F]/30" },
}

const stages: PipelineStage[] = ["new", "skip_traced", "sequence_active", "replied", "meeting_set"]

export default function OutreachPage() {
  const [selectedLead, setSelectedLead] = useState<OutreachLead | null>(null)
  const [view, setView] = useState<"pipeline" | "list">("pipeline")

  const leadsByStage = (stage: PipelineStage) => outreachLeads.filter(l => l.stage === stage)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">GDPR-Compliant Owner Outreach</h1>
            <p className="text-sm text-gray-400 mt-1">Companies House trace, LIA-backed letter / email sequences, full opt-out audit trail per UK PECR.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView("pipeline")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "pipeline" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Pipeline</button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>List</button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: "Total Leads", value: outreachStats.totalLeads.toString(), icon: Users, color: "text-[#1E3A5F]" },
            { label: "Owner Match Rate", value: `${outreachStats.skipTraceHitRate}%`, icon: Target, color: "text-purple-500" },
            { label: "Open Rate", value: `${outreachStats.openRate}%`, icon: Eye, color: "text-amber-500" },
            { label: "Reply Rate", value: `${outreachStats.replyRate}%`, icon: MessageSquare, color: "text-emerald-500" },
            { label: "Meetings Set", value: outreachStats.meetingsSet.toString(), icon: Calendar, color: "text-blue-500" },
            { label: "Sequences Active", value: outreachStats.sequencesActive.toString(), icon: Send, color: "text-orange-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Pipeline View */}
        {view === "pipeline" && (
          <div className="flex flex-col md:grid md:grid-cols-5 gap-3 md:overflow-x-auto">
            {stages.map(stage => {
              const config = stageConfig[stage]
              const leads = leadsByStage(stage)
              return (
                <div key={stage} className="min-w-[220px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>{config.label}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{leads.length}</span>
                  </div>
                  <div className="space-y-2">
                    {leads.map(lead => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setSelectedLead(lead)}
                        className={`bg-white border rounded-xl p-3 cursor-pointer hover:shadow-md transition-all ${
                          selectedLead?.id === lead.id ? "border-[#1E3A5F] shadow-md" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono text-gray-400">{lead.id}</span>
                          <ScoreBadge score={lead.distressScore} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{lead.ownerName}</h4>
                        <p className="text-xs text-gray-500 truncate">{lead.propertyAddress}</p>
                        <p className="text-xs text-gray-400 mt-1">{lead.units} units</p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {lead.distressSignals.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-red-50 text-[9px] text-red-600 truncate max-w-full">{s}</span>
                          ))}
                        </div>

                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
                          {lead.phone && <Phone className="w-3 h-3 text-emerald-500" />}
                          {lead.email && <Mail className="w-3 h-3 text-blue-500" />}
                          {lead.sequenceDay && (
                            <span className="text-[10px] text-gray-400 ml-auto">Day {lead.sequenceDay}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 truncate">{lead.lastActivity}</p>
                      </motion.div>
                    ))}
                    {leads.length === 0 && (
                      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center text-xs text-gray-400">No leads</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {["Owner", "Property", "Units", "Score", "Stage", "Contact", "Sequence", "Last Activity"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {outreachLeads.map(lead => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  >
                    <td className="px-3 py-3 text-sm font-medium text-gray-900">{lead.ownerName}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lead.propertyAddress}</td>
                    <td className="px-3 py-3 text-sm text-gray-700">{lead.units}</td>
                    <td className="px-3 py-3"><ScoreBadge score={lead.distressScore} /></td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${stageConfig[lead.stage].bgColor} ${stageConfig[lead.stage].color}`}>
                        {stageConfig[lead.stage].label}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        {lead.phone && <Phone className="w-3 h-3 text-emerald-500" />}
                        {lead.email && <Mail className="w-3 h-3 text-blue-500" />}
                        {!lead.phone && !lead.email && <span className="text-[10px] text-gray-400">—</span>}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lead.sequenceDay ? `Day ${lead.sequenceDay}` : "—"}</td>
                    <td className="px-3 py-3 text-xs text-gray-400 max-w-[200px] truncate">{lead.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Footer />

        {/* Lead Detail / Sequence View */}
        <AnimatePresence>
          {selectedLead && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                onClick={() => setSelectedLead(null)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 z-50 w-full md:max-w-lg bg-white border-l border-gray-200 shadow-2xl overflow-y-auto"
              >
                <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-start justify-between z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{selectedLead.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${stageConfig[selectedLead.stage].bgColor} ${stageConfig[selectedLead.stage].color}`}>
                        {stageConfig[selectedLead.stage].label}
                      </span>
                      <ScoreBadge score={selectedLead.distressScore} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedLead.ownerName}</h2>
                    <p className="text-sm text-gray-500">{selectedLead.propertyAddress} — {selectedLead.units} units</p>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Contact Info */}
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Info</h3>
                    <div className="space-y-2 text-sm">
                      {selectedLead.phone && (
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500" /><span className="text-gray-700">{selectedLead.phone}</span><span className="text-[10px] text-gray-400">via Companies House trace</span></div>
                      )}
                      {selectedLead.email && (
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /><span className="text-gray-700">{selectedLead.email}</span></div>
                      )}
                      <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-gray-400" /><span className="text-gray-500">{selectedLead.mailingAddress}</span></div>
                      {!selectedLead.phone && !selectedLead.email && (
                        <div className="flex items-center gap-2 text-amber-600"><AlertTriangle className="w-4 h-4" /><span className="text-sm font-medium">No contact info &mdash; trace incomplete</span></div>
                      )}
                    </div>
                  </div>

                  {/* Distress Signals */}
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Distress Signals</h3>
                    <div className="space-y-1.5">
                      {selectedLead.distressSignals.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                          <span className="text-gray-700">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  {selectedLead.openRate !== null && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                        <Eye className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{selectedLead.openRate}%</p>
                        <p className="text-[10px] text-gray-400">Open Rate</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                        <MessageSquare className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{selectedLead.replied ? "Yes" : "No"}</p>
                        <p className="text-[10px] text-gray-400">Replied</p>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                        <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{selectedLead.sequenceDay || "—"}</p>
                        <p className="text-[10px] text-gray-400">Seq. Day</p>
                      </div>
                    </div>
                  )}

                  {/* Meeting Info */}
                  {selectedLead.meetingDate && (
                    <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#1E3A5F]" />
                        <div>
                          <h4 className="text-sm font-bold text-[#1E3A5F]">Meeting Scheduled</h4>
                          <p className="text-sm text-gray-600">{new Date(selectedLead.meetingDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {new Date(selectedLead.meetingDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Sequence */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Outreach Sequence</h3>
                    <div className="space-y-3">
                      {emailSequence.map((email, i) => {
                        const isActive = selectedLead.sequenceDay !== null && selectedLead.sequenceDay >= email.day
                        const isCurrent = selectedLead.sequenceDay === email.day
                        return (
                          <div key={i} className={`border rounded-xl p-4 transition-all ${
                            isCurrent ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : isActive ? "border-emerald-200 bg-emerald-50/50" : "border-gray-200 bg-gray-50 opacity-60"
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {email.channel === "email" ? <Mail className="w-4 h-4 text-blue-500" /> : <MessageSquare className="w-4 h-4 text-emerald-500" />}
                                <span className="text-sm font-medium text-gray-900">Day {email.day} — {email.channel === "email" ? "Email" : "SMS"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {isActive ? (
                                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                                    <CheckCircle2 className="w-3 h-3" /> Sent
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-gray-400">Queued</span>
                                )}
                              </div>
                            </div>
                            {email.subject && <p className="text-sm font-medium text-gray-700 mb-1">Subject: {email.subject.replace("{{address}}", selectedLead.propertyAddress).replace("{{city}}", selectedLead.city)}</p>}
                            <pre className="text-xs text-gray-500 whitespace-pre-wrap font-sans leading-relaxed max-h-32 overflow-hidden">
                              {email.preview
                                .replace(/\{\{firstName\}\}/g, selectedLead.ownerName.split(" ")[0])
                                .replace(/\{\{address\}\}/g, selectedLead.propertyAddress)
                                .replace(/\{\{units\}\}/g, selectedLead.units.toString())
                                .replace(/\{\{city\}\}/g, selectedLead.city)
                                .replace(/\{\{distressAngle\}\}/g, selectedLead.distressSignals[0] || "property changes")
                                .replace(/\{\{priceRange\}\}/g, "$90K-$115K")
                              }
                            </pre>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
