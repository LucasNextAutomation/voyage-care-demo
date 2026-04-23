"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  ExternalLink,
  Shield,
  Send,
  Users,
  Linkedin,
  Code,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react"
import AppShell from "@/components/AppShell"

const VOYAGE_BLUE = "#007cba"

const LEADS = [
  {
    name: "Lucas Eschapasse",
    role: "CEO & Co-Founder",
    focus: "Mission Lead — your direct point of contact",
    photo: "/images/lucas-profile.png",
    bio: "Leads discovery, strategy, and every decision on what gets built. Previously trained 12,000+ professionals at Mister IA (France's leading AI consulting firm). On Voyage Care: scopes the commissioning brief, owns the data-source strategy, and signs off every weekly delivery.",
    commitments: [
      "Signs off every weekly deliverable",
      "Same-day reply on scope or strategy questions",
      "Direct Slack / email / WhatsApp channel",
    ],
    linkedin: "https://linkedin.com/in/lucaseschapasse",
  },
  {
    name: "Sasha Deneux",
    role: "CTO & Co-Founder",
    focus: "Technical Lead — heads the development squad",
    photo: "/images/sasha-profile.png",
    bio: "Leads the engineering squad on data pipelines, AI scoring, and the live console. Deep expertise in AI orchestration and real-estate data systems. Oversees every integration — HMLR, Companies House, planning portals, CQC — and the weekly calibration loop.",
    commitments: [
      "Owns data pipeline + AI scoring architecture",
      "Same-day to 72h response on anything technical",
      "Code review on every commit to main",
    ],
    linkedin: "https://linkedin.com/in/sasha-deneux",
  },
]

const DEV_TEAM = [
  { role: "Senior backend / data engineer", focus: "HMLR, CCOD/OCOD, Companies House ingestion + pgvector scoring" },
  { role: "Full-stack engineer", focus: "Dashboard, Site Finder, Morning Brief UI + map layer (Leaflet / PostGIS)" },
  { role: "Compliance + QA lead", focus: "LIA, ROPA, DPIA draft + test coverage + weekly audit" },
]

const TIMELINE = [
  {
    when: "Day 0",
    event: "Kickoff call",
    detail: "30 min with Jack + property team + IT. Data-access paths agreed, 30 priority LPAs confirmed, LIA kick-off.",
    tone: "accent",
  },
  {
    when: "End of Week 1",
    event: "Compliance pack delivered",
    detail: "LIA + ROPA + DPIA drafts for your legal / DPO review. Priority LPA map signed off.",
    tone: "primary",
  },
  {
    when: "End of Week 2",
    event: "Ingestion pipeline live",
    detail: "HMLR + Companies House + planning portals + EPC + flood + CQC + Bona Vacantia flowing. Staging URL shared with you.",
    tone: "primary",
  },
  {
    when: "End of Week 3",
    event: "First ranked parcel list",
    detail: "Scoring engine calibrated on Voyage's historical acquisitions. You review the top 25 with us on a call.",
    tone: "primary",
  },
  {
    when: "End of Week 4",
    event: "Go-live + Morning Brief",
    detail: "Full console live on voyage-care.nextautomation.us. First Morning Brief in Jack's inbox. 30-day post-launch support window opens.",
    tone: "accent",
  },
]

const COMMITMENTS = [
  {
    icon: Calendar,
    title: "Weekly check-ins",
    desc: "A 20-30 min call every week. What we built, what's next, what needs your input. No decks — working software only.",
  },
  {
    icon: ExternalLink,
    title: "Live progress visibility",
    desc: "Staging environment from Week 2. See the dashboard take shape with your real HMLR data, not screenshots.",
  },
  {
    icon: Shield,
    title: "Your data, your infrastructure, your code",
    desc: "Everything on infrastructure Voyage Care controls. Source code via shared Git repo from day 1. Never hostage to us.",
  },
  {
    icon: Send,
    title: "Direct Slack / email channel",
    desc: "Same-day reply on scope or strategy from Lucas. Same-day to 72h on anything technical from Sasha. No tickets.",
  },
]

export default function TeamPage() {
  return (
    <AppShell
      title="Team & Way of Working"
      actions={
        <a
          href="https://book.nextautomation.us/sasha-strategy-call"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
          style={{ background: VOYAGE_BLUE }}
        >
          Book a walkthrough
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      }
    >
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Who's on the build &middot; how we work together
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
          Two founders running point. A focused engineering squad behind.
        </h2>
        <p className="text-gray-500 mt-2 max-w-3xl leading-relaxed">
          Small enough to move fast. Experienced enough to hit an enterprise compliance bar. For the full 4-week build you'll have direct lines to both of us, plus a staging environment you can log into from Week 2.
        </p>
      </motion.div>

      {/* Leads grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {LEADS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-bold text-xl"
                style={{
                  background: `linear-gradient(135deg, ${VOYAGE_BLUE}, #005a87)`,
                  boxShadow: `0 4px 16px ${VOYAGE_BLUE}22`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none"
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{m.name}</h3>
                <p className="text-sm font-semibold" style={{ color: VOYAGE_BLUE }}>{m.role}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.focus}</p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#0077b5] mt-1.5 transition-colors"
                >
                  <Linkedin className="w-3 h-3" />
                  LinkedIn
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">{m.bio}</p>

            <div className="pt-4 border-t border-gray-100 space-y-1.5">
              {m.commitments.map((c, j) => (
                <div key={j} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: VOYAGE_BLUE }} />
                  <span className="text-xs text-gray-700">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dev team */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl border border-gray-200 p-6 mb-10 shadow-sm"
      >
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${VOYAGE_BLUE}0E`, border: `1px solid ${VOYAGE_BLUE}33` }}
          >
            <Users className="w-5 h-5" style={{ color: VOYAGE_BLUE }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-0.5">
              Behind the founders
            </p>
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Development squad</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
              Every engineer committed to the project signs the same DPA as NextAutomation itself. UK-residency enforced. Every commit code-reviewed.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {DEV_TEAM.map((d) => (
            <div key={d.role} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-xs font-semibold text-gray-900 leading-tight">{d.role}</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{d.focus}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl border border-gray-200 p-6 mb-10 shadow-sm"
      >
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">
            4-week build &middot; 5 checkpoints
          </p>
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
            Weekly deliverables with Jack's sign-off
          </h3>
        </div>

        <div className="relative">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-[#007cba]/30 via-gray-200 to-[#007cba]/30" />
          <div className="space-y-5">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 relative"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{
                    background: t.tone === "accent" ? VOYAGE_BLUE : "white",
                    border: `2px solid ${t.tone === "accent" ? VOYAGE_BLUE : "#D1D5DB"}`,
                    boxShadow: t.tone === "accent" ? `0 4px 12px ${VOYAGE_BLUE}33` : "0 2px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <Clock className={`w-4 h-4 ${t.tone === "accent" ? "text-white" : "text-gray-400"}`} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">{t.when}</span>
                    <span className="text-gray-300">&middot;</span>
                    <h4 className="text-sm font-semibold text-gray-900">{t.event}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Commitments */}
      <div className="mb-10">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">How we work</p>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
            Four touchpoints a week. Zero surprises at delivery.
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${VOYAGE_BLUE}10` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: VOYAGE_BLUE }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{c.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #0F172A, #1E3A5F)` }}
      >
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: `${VOYAGE_BLUE}33` }}
        />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" style={{ color: VOYAGE_BLUE }} />
              <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/60">Kickoff available this week</p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Ready when Voyage Care is.
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              30 min kickoff with Jack + property team + IT. Data-access paths confirmed, 30 priority LPAs agreed, LIA kick-off. Week 1 starts the following Monday.
            </p>
          </div>
          <a
            href="https://book.nextautomation.us/sasha-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex-shrink-0"
            style={{ background: VOYAGE_BLUE, color: "white", boxShadow: `0 8px 24px ${VOYAGE_BLUE}50` }}
          >
            Book the kickoff call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </AppShell>
  )
}
