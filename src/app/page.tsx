"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Map, FileSpreadsheet, Mail, ArrowRight, CheckCircle2 } from "lucide-react"

const systems = [
  {
    href: "/deal-finder",
    title: "Off-Market Site Finder",
    icon: Map,
    description: "Sweeps HM Land Registry, Companies House, Planning APIs and Brownfield Registers nightly. Scores every parcel against Voyage Care's commissioning brief and surfaces the top opportunities daily.",
    highlights: ["10 UK data sources", "Parcel-level distress scoring", "Daily Morning Brief"],
  },
  {
    href: "/underwriting",
    title: "Feasibility Analyzer",
    icon: FileSpreadsheet,
    description: "Pulls planning history, zoning, flood data, EPC and neighbour context for any shortlisted parcel. Generates a 3-page feasibility memo ready for commissioning review.",
    highlights: ["Planning precedent review", "C2/C3 use-class check", "Risk + site-fit scoring"],
  },
  {
    href: "/outreach",
    title: "GDPR-Compliant Owner Outreach",
    icon: Mail,
    description: "Draft letters and emails to owners via registered Companies House address. Full LIA-backed sequences, tracked replies, and opt-out handling per UK PECR rules.",
    highlights: ["LIA + ROPA documented", "Sequence tracking", "Full opt-out audit trail"],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1E3A5F]/[0.03] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-10"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-white text-3xl md:text-4xl font-bold tracking-tight shadow-lg" style={{ background: "linear-gradient(135deg, #1E3A5F, #142B45)" }}>
                VC
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 font-medium mb-6"
            >
              Voyage Care &middot; Property &amp; Acquisitions
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
              Off-Market Development<br />
              Site Sourcing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Three connected systems &mdash; find UK parcels matching the commissioning brief, check feasibility in minutes, and reach owners compliantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Specialist care &amp; supported living
              </span>
              <span>0.25 &ndash; 2 acres</span>
              <span>Midlands &amp; North West (pilot)</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-24 mx-auto border-t border-gray-200" />

      {/* System Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-14"
          >
            Explore the live demos
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + 0.08 * i }}
              >
                <Link href={sys.href} className="block group h-full">
                  <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-[#1E3A5F]/40 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-[#1E3A5F]/5 group-hover:border-[#1E3A5F]/20 transition-colors">
                      <sys.icon className="w-5 h-5 text-gray-400 group-hover:text-[#1E3A5F] transition-colors" />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2">{sys.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{sys.description}</p>

                    <div className="space-y-2 mb-6">
                      {sys.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A5F]/60 flex-shrink-0" />
                          <span className="text-gray-600">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#1E3A5F] group-hover:gap-2.5 transition-all mt-auto">
                      View Demo <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Interactive demo &mdash; parcel data is simulated for demonstration purposes</p>
          <p className="text-xs text-gray-400">
            Built by <span className="text-[#1E3A5F] font-medium">NextAutomation</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
