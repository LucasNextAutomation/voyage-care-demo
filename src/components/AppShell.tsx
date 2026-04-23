"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  Database,
  Mail,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Radio,
} from "lucide-react"
import VoyageLogo from "./VoyageLogo"

const VOYAGE_BLUE = "#007cba"
const INK = "#0F172A"

interface NavItem {
  href: string
  label: string
  icon: typeof LayoutDashboard
  badge?: string
}

const NAV: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/deal-finder", label: "Site Finder", icon: MapPin, badge: "Live" },
  { href: "/scoring", label: "Scoring Engine", icon: Sparkles },
  { href: "/sources", label: "Sources & Compliance", icon: Database },
  { href: "/brief", label: "Morning Brief", icon: Mail },
]

interface AppShellProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AppShell({ children, title, subtitle, actions }: AppShellProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white flex-col z-30">
        <div className="px-5 pt-6 pb-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <VoyageLogo variant="full" className="h-7" />
          </Link>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Off-market sourcing engine
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 px-3 mb-2">
            Operations
          </p>
          {NAV.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active ? "bg-[#007cba]/10 text-[#007cba]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${active ? "text-[#007cba]" : "text-gray-400 group-hover:text-gray-600"}`}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                      active ? "bg-[#007cba] text-white" : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}

          <div className="pt-6 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 px-3 mb-2">
              Commissioning brief
            </p>
            <div className="mx-1 rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-3">
              <ul className="space-y-1.5 text-[11px] text-gray-600">
                <li className="flex items-start gap-1.5">
                  <span className="text-gray-300 mt-0.5">&bull;</span>
                  <span>
                    <span className="font-medium text-gray-900">0.25 &ndash; 2 acres</span> single plot
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gray-300 mt-0.5">&bull;</span>
                  <span>
                    <span className="font-medium text-gray-900">C2 / C3 / sui-generis</span> convertible
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gray-300 mt-0.5">&bull;</span>
                  <span>
                    Midlands + <span className="font-medium text-gray-900">North West</span> pilot
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-gray-300 mt-0.5">&bull;</span>
                  <span>Specialist care &amp; supported living</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Footer — user + build */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs"
              style={{ background: `linear-gradient(135deg, ${VOYAGE_BLUE}, #005a87)` }}
            >
              JB
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate leading-tight">Jack Brindle</p>
              <p className="text-[10px] text-gray-400 leading-tight">Voyage Care &middot; Property</p>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 flex items-center justify-between">
            <span>Built by</span>
            <span style={{ color: INK }} className="font-semibold">
              NextAutomation
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-gray-200 bg-white/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center">
          <VoyageLogo variant="full" className="h-6" />
        </Link>
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white border-r border-gray-200 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <VoyageLogo variant="full" className="h-7" />
            </div>
            <nav className="space-y-0.5">
              {NAV.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm font-medium ${
                      active ? "bg-[#007cba]/10 text-[#007cba]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Topbar — desktop-only */}
        <div className="hidden lg:flex sticky top-0 z-20 h-16 border-b border-gray-200 bg-white/90 backdrop-blur-xl items-center justify-between px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium mb-0.5">
              <span>Voyage Care</span>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span>Property &amp; Acquisitions</span>
            </div>
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <Radio className="w-3 h-3 text-emerald-500" />
              Last sync 06:15 UTC
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
              <ShieldCheck className="w-3 h-3 text-[#007cba]" />
              UK-hosted &middot; DPIA signed
            </div>
          </div>
        </div>

        {/* Page heading strip (mobile) */}
        <div className="lg:hidden px-4 pt-4 pb-2 border-b border-gray-100 bg-white">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
