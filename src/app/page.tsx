"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Map, FileSpreadsheet, Mail, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"
import VoyageLogo from "@/components/VoyageLogo"

const systems = [
  {
    href: "/deal-finder",
    title: "Off-Market Site Finder",
    icon: Map,
    description:
      "Sweeps HM Land Registry, Companies House, Planning APIs and Brownfield Registers nightly. Scores every parcel against Voyage Care's commissioning brief and surfaces the top opportunities daily.",
    highlights: ["10 UK data sources", "Parcel-level distress scoring", "Live UK map + Morning Brief"],
  },
  {
    href: "/underwriting",
    title: "Feasibility Analyzer",
    icon: FileSpreadsheet,
    description:
      "Pulls planning history, zoning, flood data, EPC and neighbour context for any shortlisted parcel. Generates a 3-page feasibility memo ready for commissioning review.",
    highlights: ["Planning precedent review", "C2 / C3 use-class check", "Risk + site-fit scoring"],
  },
  {
    href: "/outreach",
    title: "GDPR-Compliant Owner Outreach",
    icon: Mail,
    description:
      "Drafts letters and emails to owners via registered Companies House address. Full LIA-backed sequences, tracked replies, and opt-out handling per UK PECR rules.",
    highlights: ["LIA + ROPA documented", "Sequence tracking", "Full opt-out audit trail"],
  },
]

const HERO_STATS = [
  { v: "3,500+", l: "People supported" },
  { v: "35+", l: "Years operating" },
  { v: "~500", l: "Care services" },
  { v: "UK-wide", l: "Footprint" },
]

const DATA_SOURCES = [
  "HMLR INSPIRE",
  "HMLR CCOD / OCOD",
  "HMLR Price Paid",
  "Companies House",
  "Planning.data.gov.uk",
  "Brownfield Registers",
  "EPC Open Data",
  "EA Flood Zones",
  "CQC Syndication",
  "Bona Vacantia",
  "The Gazette",
  "VOA Rating Lists",
]

const VOYAGE_BLUE = "#007cba"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4fbff] via-white to-white" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full blur-3xl opacity-40"
          style={{ background: `radial-gradient(circle, ${VOYAGE_BLUE}22, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(${VOYAGE_BLUE} 1px, transparent 1px), linear-gradient(90deg, ${VOYAGE_BLUE} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Partner banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-5 mb-10"
          >
            <span className="text-base md:text-lg font-bold tracking-tight text-gray-900">
              NextAutomation
            </span>
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full border font-light text-sm"
              style={{ borderColor: `${VOYAGE_BLUE}40`, color: VOYAGE_BLUE, background: `${VOYAGE_BLUE}0D` }}
            >
              &times;
            </span>
            <VoyageLogo variant="full" className="h-7 md:h-8" />
          </motion.div>

          {/* Pilot badge */}
          <div className="flex justify-center mb-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-medium"
              style={{ borderColor: `${VOYAGE_BLUE}60`, background: `${VOYAGE_BLUE}0E`, color: VOYAGE_BLUE }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: VOYAGE_BLUE }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: VOYAGE_BLUE }} />
              </span>
              Proposal demo &middot; April 2026 &middot; Midlands + North West pilot
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs md:text-sm uppercase tracking-[0.22em] text-gray-400 font-medium text-center mb-4"
          >
            Voyage Care &middot; Property &amp; Acquisitions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 tracking-tight leading-[1.05] text-center"
          >
            Off-Market Development
            <br />
            <span style={{ color: VOYAGE_BLUE }}>Site Sourcing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-base md:text-lg text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed text-center"
          >
            Three connected systems &mdash; find UK parcels matching the commissioning brief, check feasibility in minutes, reach owners compliantly. Built to ingest{" "}
            <span className="font-medium text-gray-700">HMLR, Companies House, planning.data.gov.uk, EPC, flood, CQC, Bona Vacantia</span>{" "}
            and score every parcel nightly.
          </motion.p>

          {/* Facts bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-gray-400 font-medium mt-6"
          >
            <span>Specialist care &amp; supported living</span>
            <span className="text-gray-300">&bull;</span>
            <span>0.25 &ndash; 2 acres</span>
            <span className="text-gray-300">&bull;</span>
            <span>C2 / C3 / sui-generis convertible</span>
          </motion.div>

          {/* Voyage Care facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-3xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-sm"
            style={{ borderColor: `${VOYAGE_BLUE}22` }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: `${VOYAGE_BLUE}22` }}>
              {HERO_STATS.map((s) => (
                <div key={s.l} className="px-4 py-4 text-center">
                  <p className="text-lg md:text-xl font-bold tracking-tight" style={{ color: VOYAGE_BLUE }}>
                    {s.v}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <Link
              href="/deal-finder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: VOYAGE_BLUE, boxShadow: `0 8px 24px ${VOYAGE_BLUE}40` }}
            >
              Open live UK map
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/underwriting"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border bg-white/80 text-gray-900 hover:border-gray-400 transition-all"
              style={{ borderColor: "#d1d5db" }}
            >
              Try feasibility analyzer
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Data-source strip */}
      <section className="py-6 border-y bg-gray-50/60">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 text-center mb-3 font-medium">
            Ingested nightly &mdash; open data, Crown-licensed, or HMLR end-user-licensed
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {DATA_SOURCES.map((s) => (
              <span key={s} className="text-[11px] font-medium text-gray-500 whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* System Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-[0.22em] text-gray-400 font-medium mb-4"
          >
            Three connected systems
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-14"
          >
            Explore the live demos
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + 0.07 * i }}
              >
                <Link href={sys.href} className="block group h-full">
                  <div
                    className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors"
                      style={{ background: `${VOYAGE_BLUE}10`, border: `1px solid ${VOYAGE_BLUE}22` }}
                    >
                      <sys.icon className="w-5 h-5" style={{ color: VOYAGE_BLUE }} />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{sys.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{sys.description}</p>

                    <div className="space-y-2 mb-6">
                      {sys.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: VOYAGE_BLUE }} />
                          <span className="text-gray-600">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
                      style={{ color: VOYAGE_BLUE }}
                    >
                      View Demo <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="py-14 border-t bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${VOYAGE_BLUE}12`, border: `1px solid ${VOYAGE_BLUE}30` }}
            >
              <ShieldCheck className="w-5 h-5" style={{ color: VOYAGE_BLUE }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">UK-compliant by design</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5 text-sm">
            {[
              { t: "UK GDPR + DPA 2018 + DUAA 2025", d: "LIA, ROPA, DPIA and retention policy signed before go-live. Article 6(1)(f) legitimate-interests basis for property-owner research." },
              { t: "PECR for any outreach", d: "Soft-opt-in where applicable; postal outreach routed to Companies House registered office address; full opt-out audit trail." },
              { t: "Only licensed data sources", d: "No Rightmove / Zoopla scraping. Gazette deceased notices used at aggregate-signal level only, never as personal-data leads." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border bg-white p-5" style={{ borderColor: "#e5e7eb" }}>
                <p className="text-sm font-semibold text-gray-900 mb-1.5">{c.t}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Interactive demo &mdash; parcel data is simulated for demonstration purposes
          </p>
          <p className="text-xs text-gray-400">
            Built by <span className="font-medium" style={{ color: VOYAGE_BLUE }}>NextAutomation</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
