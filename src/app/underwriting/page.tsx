"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload, FileText, CheckCircle2, AlertTriangle, Loader2,
  ChevronRight, BrainCircuit, X, Info
} from "lucide-react"
import { underwritingDeal } from "@/data/underwriting"
import Navbar from "@/components/Navbar"
import Spreadsheet from "@/components/Spreadsheet"
import Footer from "@/components/Footer"

type Stage = "upload" | "processing" | "review" | "complete"

export default function UnderwritingPage() {
  const [stage, setStage] = useState<Stage>("upload")
  const [processingStep, setProcessingStep] = useState(0)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [flagsDismissed, setFlagsDismissed] = useState<Set<number>>(new Set())

  const startProcessing = useCallback(() => {
    setStage("processing")
    setProcessingStep(0)
    setProcessingProgress(0)
  }, [])

  useEffect(() => {
    if (stage !== "processing") return
    const steps = underwritingDeal.processingSteps
    const totalDuration = steps.reduce((s, x) => s + x.duration, 0)
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += 50
      const progress = Math.min((elapsed / totalDuration) * 100, 100)
      setProcessingProgress(progress)

      let cumulative = 0
      for (let i = 0; i < steps.length; i++) {
        cumulative += steps[i].duration
        if (elapsed < cumulative) {
          setProcessingStep(i)
          break
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval)
        setTimeout(() => setStage("review"), 300)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [stage])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Feasibility Analyzer</h1>
            <p className="text-sm text-gray-400 mt-1">Drop a parcel reference. AI pulls planning history, EPC, flood zones and neighbour context, then drafts a feasibility memo.</p>
          </div>
          {stage !== "upload" && (
            <button
              onClick={() => { setStage("upload"); setFlagsDismissed(new Set()) }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {(["Select Parcel", "Pull UK Data", "Review Flags", "Memo Ready"] as const).map((label, i) => {
            const stages: Stage[] = ["upload", "processing", "review", "complete"]
            const stageIndex = stages.indexOf(stage)
            const active = i === stageIndex
            const done = i < stageIndex
            return (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  done ? "bg-emerald-100 text-emerald-700" : active ? "bg-[#1E3A5F] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold">{i + 1}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 3 && <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />}
              </div>
            )
          })}
        </div>

        {/* Stage: Upload */}
        <AnimatePresence mode="wait">
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div
                onClick={startProcessing}
                className="border-2 border-dashed border-gray-300 hover:border-[#1E3A5F] rounded-2xl p-12 text-center cursor-pointer transition-all hover:bg-[#1E3A5F]/5 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-[#1E3A5F]/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#1E3A5F] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select Parcel for Feasibility</h3>
                <p className="text-sm text-gray-500 mb-4">Drag & drop a PDF, Word doc, or scanned OM</p>
                <button className="px-6 py-2.5 bg-[#1E3A5F] text-white rounded-lg text-sm font-medium hover:bg-[#003d99] transition-colors">
                  Upload Sample OM
                </button>
                <p className="text-xs text-gray-400 mt-3">Click to load sample: 18-unit conversion site, Stoke-on-Trent</p>
              </div>
            </motion.div>
          )}

          {/* Stage: Processing */}
          {stage === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6 text-[#1E3A5F] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">AI Processing Document</h3>
                    <p className="text-sm text-gray-500">Pulling UK data for the parcel &mdash; INSPIRE, planning, EPC, flood, neighbour context...</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">{underwritingDeal.processingSteps[processingStep]?.label}</span>
                    <span className="text-[#1E3A5F] font-medium">{Math.round(processingProgress)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#1E3A5F] to-blue-400"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Step list */}
                <div className="space-y-2">
                  {underwritingDeal.processingSteps.map((step, i) => (
                    <div key={i} className={`flex items-center gap-3 text-sm transition-all ${
                      i < processingStep ? "text-emerald-600" : i === processingStep ? "text-[#1E3A5F] font-medium" : "text-gray-300"
                    }`}>
                      {i < processingStep ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : i === processingStep ? (
                        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                      )}
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Stage: Review / Complete */}
          {(stage === "review" || stage === "complete") && (
            <motion.div
              key="spreadsheet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* AI Flags Banner */}
              {stage === "review" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-amber-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      AI flagged {underwritingDeal.aiFlags.length - flagsDismissed.size} item{underwritingDeal.aiFlags.length - flagsDismissed.size !== 1 ? "s" : ""} for review
                    </h3>
                    {flagsDismissed.size === underwritingDeal.aiFlags.length && (
                      <button
                        onClick={() => setStage("complete")}
                        className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                      >
                        Confirm All — Finalize Model
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {underwritingDeal.aiFlags.map(flag => {
                      if (flagsDismissed.has(flag.id)) return null
                      return (
                        <div key={flag.id} className="flex items-start justify-between gap-3 bg-white rounded-lg p-3 border border-amber-100">
                          <div className="flex items-start gap-2">
                            {flag.severity === "warning" ? (
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p className="text-sm text-gray-700">{flag.message}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                <span>Field: <span className="font-medium text-gray-600">{flag.field}</span></span>
                                <span>OM: <span className="font-medium text-gray-600">{flag.omValue}</span></span>
                                <span>Model: <span className="font-medium text-gray-600">{flag.modelValue}</span></span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => setFlagsDismissed(prev => new Set([...prev, flag.id]))}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium hover:bg-emerald-200 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setFlagsDismissed(prev => new Set([...prev, flag.id]))}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    {flagsDismissed.size === underwritingDeal.aiFlags.length && (
                      <div className="text-center py-2">
                        <p className="text-sm text-emerald-600 font-medium flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> All items reviewed
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {stage === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                      <h3 className="text-sm font-bold text-emerald-700">Underwriting Complete</h3>
                      <p className="text-xs text-emerald-600">All flags reviewed. Feasibility memo finalized for Former Nurses Home, Meadow Lane, Stoke-on-Trent &mdash; 18 units.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase block">IRR</span>
                      <span className="font-bold text-[#1E3A5F]">{underwritingDeal.summary.irr}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase block">Equity Multiple</span>
                      <span className="font-bold text-[#1E3A5F]">{underwritingDeal.summary.equityMultiple}x</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase block">Cash-on-Cash</span>
                      <span className="font-bold text-[#1E3A5F]">{underwritingDeal.summary.cashOnCash}%</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Spreadsheet */}
              <Spreadsheet />
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  )
}
