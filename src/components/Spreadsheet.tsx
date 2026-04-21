"use client"

import { useState } from "react"
import { underwritingDeal } from "@/data/underwriting"

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

function pct(n: number) { return `${n.toFixed(1)}%` }

const tabs = ["Dashboard", "Assumptions", "Unit Mix", "Expenses", "Sensitivity", "Waterfall"] as const
type Tab = typeof tabs[number]

function Cell({ value, input, highlight, bold, className }: { value: string; input?: boolean; highlight?: boolean; bold?: boolean; className?: string }) {
  return (
    <td className={`px-3 py-2 text-sm font-mono border-b border-gray-100 ${
      input ? "bg-blue-50 text-blue-900 font-semibold" : highlight ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-700"
    } ${bold ? "font-bold" : ""} ${className || ""}`}>
      {input && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 mb-0.5" />}
      {value}
    </td>
  )
}

function HeaderCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 bg-gray-50 ${className || ""}`}>{children}</th>
}

function SectionHeader({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <tr><td colSpan={colSpan || 10} className="px-3 py-2 text-xs font-bold text-white uppercase tracking-wider bg-[#1E3A5F]">{children}</td></tr>
  )
}

function SectionLabel({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return (
    <tr><td colSpan={colSpan || 10} className="px-3 pt-4 pb-2 text-xs font-bold text-[#1E3A5F] uppercase tracking-wider border-b border-gray-200 bg-white">{children}</td></tr>
  )
}

const d = underwritingDeal

function DashboardTab() {
  return (
    <div className="p-4 space-y-6">
      {/* Deal Summary Bar */}
      <div className="bg-[#1E3A5F] rounded-xl p-4 text-white">
        <h3 className="text-lg font-bold">{d.property.name}</h3>
        <p className="text-blue-200 text-sm mt-0.5">{d.property.address}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          <span>{d.property.units} Units</span>
          <span>Class {d.property.class}</span>
          <span>Built {d.property.yearBuilt}</span>
          <span>{d.property.sqft.toLocaleString()} SF</span>
          <span>{d.property.buildings} Buildings</span>
          <span>{d.property.parking} Parking</span>
        </div>
      </div>

      {/* Key Metrics Grid — 2 rows x 4 cols */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Going-In Cap", value: pct(d.summary.goingInCap) },
          { label: "Stabilized Cap", value: pct(d.summary.stabilizedCap) },
          { label: "IRR (5yr)", value: pct(d.summary.irr), accent: true },
          { label: "Equity Multiple", value: `${d.summary.equityMultiple}x`, accent: true },
          { label: "Cash-on-Cash", value: pct(d.summary.cashOnCash) },
          { label: "DSCR", value: d.summary.dscr.toFixed(2) },
          { label: "Price / Unit", value: fmt(d.summary.pricePerUnit) },
          { label: "Price / SqFt", value: `$${d.summary.pricePerSqFt.toFixed(0)}` },
        ].map(m => (
          <div key={m.label} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#1E3A5F] px-3 py-1.5">
              <p className="text-[10px] text-blue-100 uppercase tracking-wider">{m.label}</p>
            </div>
            <div className="px-3 py-3">
              <p className={`text-xl font-bold font-mono ${m.accent ? "text-[#1E3A5F]" : "text-gray-900"}`}>{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Summary */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h4 className="text-xs font-bold text-emerald-600 uppercase mb-2">Investment Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Total Equity Required</span></div><div className="font-semibold text-right font-mono">{fmt(d.summary.totalEquityRequired)}</div>
          <div><span className="text-gray-500">Year 1 NOI</span></div><div className="font-semibold text-right font-mono">{fmt(d.summary.yearOneNOI)}</div>
          <div><span className="text-gray-500">Pro Forma NOI</span></div><div className="font-semibold text-right text-emerald-700 font-mono">{fmt(d.summary.proFormaNOI)}</div>
          <div><span className="text-gray-500">Exit Value (Yr 5)</span></div><div className="font-semibold text-right font-mono">{fmt(d.summary.exitValue)}</div>
          <div><span className="text-gray-500">Total Profit</span></div><div className="font-bold text-right text-emerald-700 font-mono">{fmt(d.summary.totalProfit)}</div>
        </div>
      </div>
    </div>
  )
}

function AssumptionsTab() {
  const units = d.property.units
  return (
    <table className="w-full">
      <thead><tr><HeaderCell>Parameter</HeaderCell><HeaderCell>Value</HeaderCell><HeaderCell>$/Unit</HeaderCell><HeaderCell>Notes</HeaderCell></tr></thead>
      <tbody>
        <SectionHeader>General Info</SectionHeader>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Property Name</td><td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100" colSpan={3}>{d.property.name}</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Address</td><td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100" colSpan={3}>{d.property.address}</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Units / SqFt / Year Built</td><td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100" colSpan={3}>{units} / {d.property.sqft.toLocaleString()} SF / {d.property.yearBuilt}</td></tr>

        <SectionHeader>Financing Assumptions</SectionHeader>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">LTV</td><Cell value={pct(d.financing.ltv)} input /><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Index Rate</td><Cell value={pct(d.financing.indexRate)} input /><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">SOFR</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Spread</td><Cell value={pct(d.financing.spread)} input /><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-900 font-semibold border-b border-gray-200">All-In Rate</td><td className="px-3 py-2 text-sm text-gray-900 font-bold font-mono border-b border-gray-200">{pct(d.financing.allInRate)}</td><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-200" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-200">Index + Spread</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">IO Period</td><Cell value={`${d.financing.ioPeriod} years`} input /><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">Interest-only</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Amortization</td><Cell value={`${d.financing.amortization} years`} input /><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Loan Term</td><Cell value={`${d.financing.loanTerm} years`} input /><td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>

        <SectionHeader>Sources &amp; Uses</SectionHeader>
        <tr className="bg-gray-50"><td className="px-3 py-1.5 text-xs font-bold text-gray-500 border-b border-gray-200" colSpan={4}>Sources</td></tr>
        {d.sourcesAndUses.sources.map((s, i) => (
          <tr key={`s-${i}`}>
            <td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">{s.item}</td>
            <td className="px-3 py-2 text-sm text-gray-700 font-mono border-b border-gray-100">{fmt(s.amount)}</td>
            <td className="px-3 py-2 text-sm text-gray-400 font-mono border-b border-gray-100">{fmt(s.perUnit)}</td>
            <td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td>
          </tr>
        ))}
        <tr className="bg-gray-50 font-bold">
          <td className="px-3 py-2 text-sm text-gray-900 border-b border-gray-200">Total Sources</td>
          <td className="px-3 py-2 text-sm text-gray-900 font-mono border-b border-gray-200">{fmt(d.sourcesAndUses.sources.reduce((s, x) => s + x.amount, 0))}</td>
          <td className="px-3 py-2 text-sm text-gray-400 font-mono border-b border-gray-200">{fmt(Math.round(d.sourcesAndUses.sources.reduce((s, x) => s + x.amount, 0) / units))}</td>
          <td className="px-3 py-2 border-b border-gray-200" />
        </tr>
        <tr className="bg-gray-50"><td className="px-3 py-1.5 text-xs font-bold text-gray-500 border-b border-gray-200" colSpan={4}>Uses</td></tr>
        {d.sourcesAndUses.uses.map((u, i) => (
          <tr key={`u-${i}`}>
            <td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">{u.item}</td>
            <td className="px-3 py-2 text-sm text-gray-700 font-mono border-b border-gray-100">{fmt(u.amount)}</td>
            <td className="px-3 py-2 text-sm text-gray-400 font-mono border-b border-gray-100">{fmt(u.perUnit)}</td>
            <td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td>
          </tr>
        ))}
        <tr className="bg-gray-50 font-bold">
          <td className="px-3 py-2 text-sm text-gray-900 border-b border-gray-200">Total Uses</td>
          <td className="px-3 py-2 text-sm text-gray-900 font-mono border-b border-gray-200">{fmt(d.sourcesAndUses.uses.reduce((s, x) => s + x.amount, 0))}</td>
          <td className="px-3 py-2 text-sm text-gray-400 font-mono border-b border-gray-200">{fmt(Math.round(d.sourcesAndUses.uses.reduce((s, x) => s + x.amount, 0) / units))}</td>
          <td className="px-3 py-2 border-b border-gray-200" />
        </tr>

        <SectionHeader>Equity Detail</SectionHeader>
        {d.sourcesAndUses.equityDetail.map((e, i) => (
          <tr key={`eq-${i}`}>
            <td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">{e.item}</td>
            <td className="px-3 py-2 text-sm text-gray-700 font-mono border-b border-gray-100">{fmt(e.amount)}</td>
            <td className="px-3 py-2 text-sm text-gray-400 font-mono border-b border-gray-100">{fmt(Math.round(e.amount / units))}</td>
            <td className="px-3 py-2 border-b border-gray-100" />
          </tr>
        ))}

        <SectionHeader>Disposition Assumptions</SectionHeader>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Exit Cap Rate</td><Cell value={pct(d.disposition.exitCapRate)} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Disposition Fee</td><Cell value={pct(d.disposition.dispositionFee)} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Hold Period</td><Cell value={`${d.disposition.holdPeriod} years`} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-900 font-semibold border-b border-gray-200">Projected Sale Price</td><td className="px-3 py-2 text-sm text-gray-900 font-bold font-mono border-b border-gray-200">{fmt(d.disposition.salePrice)}</td><td className="px-3 py-2 text-sm text-gray-400 font-mono border-b border-gray-200">{fmt(Math.round(d.disposition.salePrice / units))}</td><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-200">Stabilized NOI / Exit Cap</td></tr>

        <SectionHeader>Returns Summary</SectionHeader>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Going-In Cap</td><Cell value={pct(d.summary.goingInCap)} highlight /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Stabilized Cap</td><Cell value={pct(d.summary.stabilizedCap)} highlight /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">IRR (5yr)</td><Cell value={pct(d.summary.irr)} highlight /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Equity Multiple</td><Cell value={`${d.summary.equityMultiple}x`} highlight /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Cash-on-Cash</td><Cell value={pct(d.summary.cashOnCash)} highlight /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">DSCR</td><Cell value={d.summary.dscr.toFixed(2)} highlight /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>

        <SectionLabel>Operating Assumptions</SectionLabel>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Vacancy Rate</td><Cell value={pct(d.assumptions.vacancyRate)} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">Stabilized</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Rent Growth (annual)</td><Cell value={pct(d.assumptions.annualRentGrowth)} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Expense Growth (annual)</td><Cell value={pct(d.assumptions.annualExpenseGrowth)} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 border-b border-gray-100" /></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Management Fee</td><Cell value={pct(d.assumptions.managementFee)} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">Of EGI</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">CapEx Reserve</td><Cell value={`$${d.assumptions.capexReserve}/unit/yr`} input /><td className="px-3 py-2 border-b border-gray-100" /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">{fmt(d.assumptions.capexReserve * units)}/yr total</td></tr>
      </tbody>
    </table>
  )
}

function UnitMixTab() {
  const totalCurrentRent = d.unitMix.reduce((s, u) => s + u.currentRent, 0)
  const totalProFormaRent = d.unitMix.reduce((s, u) => s + u.proFormaRent, 0)
  const totalSqft = d.unitMix.reduce((s, u) => s + u.sqft, 0)

  return (
    <table className="w-full">
      <thead>
        <tr>
          <HeaderCell>Unit #</HeaderCell>
          <HeaderCell>Type</HeaderCell>
          <HeaderCell className="text-right">SqFt</HeaderCell>
          <HeaderCell className="text-right">Current Rent</HeaderCell>
          <HeaderCell className="text-right">Market Rent</HeaderCell>
          <HeaderCell className="text-right">Pro Forma</HeaderCell>
          <HeaderCell className="text-right">Upside %</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {(["A", "B"] as const).map(bldg => (
          <>
            <SectionHeader key={`h-${bldg}`} colSpan={7}>Building {bldg}</SectionHeader>
            {d.unitMix.filter(u => u.building === bldg).map(u => {
              const upside = Math.round(((u.proFormaRent - u.currentRent) / u.currentRent) * 100)
              return (
                <tr key={u.unit} className="hover:bg-gray-50/50">
                  <td className="px-3 py-1.5 text-sm font-mono text-gray-500 border-b border-gray-100">{u.unit}</td>
                  <td className="px-3 py-1.5 text-sm text-gray-700 font-medium border-b border-gray-100">{u.type}</td>
                  <td className="px-3 py-1.5 text-sm text-gray-700 font-mono text-right border-b border-gray-100">{u.sqft}</td>
                  <td className="px-3 py-1.5 text-sm text-gray-700 font-mono text-right border-b border-gray-100">${u.currentRent.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-sm text-gray-400 font-mono text-right border-b border-gray-100">${u.marketRent.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-sm text-emerald-700 font-semibold font-mono text-right bg-emerald-50/50 border-b border-gray-100">${u.proFormaRent.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-sm text-emerald-600 font-medium text-right border-b border-gray-100">+{upside}%</td>
                </tr>
              )
            })}
          </>
        ))}
        <tr className="bg-gray-100 font-bold">
          <td className="px-3 py-2 text-sm text-gray-900 border-t-2 border-gray-300">Total ({d.unitMix.length})</td>
          <td className="px-3 py-2 text-sm text-gray-400 border-t-2 border-gray-300"></td>
          <td className="px-3 py-2 text-sm text-gray-900 font-mono text-right border-t-2 border-gray-300">{totalSqft.toLocaleString()}</td>
          <td className="px-3 py-2 text-sm text-gray-900 font-mono text-right border-t-2 border-gray-300">${totalCurrentRent.toLocaleString()}</td>
          <td className="px-3 py-2 text-sm text-gray-400 font-mono text-right border-t-2 border-gray-300"></td>
          <td className="px-3 py-2 text-sm text-emerald-700 font-mono text-right border-t-2 border-gray-300">${totalProFormaRent.toLocaleString()}</td>
          <td className="px-3 py-2 text-sm text-emerald-600 text-right border-t-2 border-gray-300">+{Math.round(((totalProFormaRent - totalCurrentRent) / totalCurrentRent) * 100)}%</td>
        </tr>
        <tr className="bg-gray-50">
          <td colSpan={3} className="px-3 py-2 text-sm text-gray-500 border-b border-gray-200">Annual Gross Potential Rent</td>
          <td className="px-3 py-2 text-sm text-gray-900 font-bold font-mono text-right border-b border-gray-200">{fmt(totalCurrentRent * 12)}</td>
          <td className="px-3 py-2 border-b border-gray-200" />
          <td className="px-3 py-2 text-sm text-emerald-700 font-bold font-mono text-right border-b border-gray-200">{fmt(totalProFormaRent * 12)}</td>
          <td className="px-3 py-2 border-b border-gray-200" />
        </tr>
      </tbody>
    </table>
  )
}

function ExpensesTab() {
  const yy = d.yearByYear
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-sm font-bold text-white bg-[#1E3A5F] min-w-[200px]">Line Item</th>
            {yy.map(y => (
              <th key={y.year} className="px-3 py-2 text-right text-sm font-bold text-white bg-[#1E3A5F] min-w-[100px]">Year {y.year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Income Section */}
          <tr><td colSpan={8} className="px-3 pt-3 pb-1 text-xs font-bold text-[#1E3A5F] uppercase tracking-wider bg-blue-50/50 border-b border-gray-200">Income</td></tr>
          <Row label="Gross Potential Rent" values={yy.map(y => y.gpr)} />
          <Row label="Vacancy Loss" values={yy.map(y => y.vacancyLoss)} negative />
          <Row label="Other Income" values={yy.map(y => y.otherIncome)} />
          <TotalRow label="Effective Gross Income" values={yy.map(y => y.egi)} />

          {/* Expense Section */}
          <tr><td colSpan={8} className="px-3 pt-3 pb-1 text-xs font-bold text-[#1E3A5F] uppercase tracking-wider bg-blue-50/50 border-b border-gray-200">Operating Expenses</td></tr>
          <Row label="Property Tax" values={yy.map(y => y.expenses.propertyTax)} />
          <Row label="Insurance" values={yy.map(y => y.expenses.insurance)} />
          <Row label="Maintenance & Repairs" values={yy.map(y => y.expenses.maintenance)} />
          <Row label="Property Management" values={yy.map(y => y.expenses.management)} />
          <Row label="Utilities" values={yy.map(y => y.expenses.utilities)} />
          <Row label="Water / Sewer" values={yy.map(y => y.expenses.waterSewer)} />
          <Row label="Trash Removal" values={yy.map(y => y.expenses.trash)} />
          <Row label="CapEx Reserve" values={yy.map(y => y.expenses.capex)} />
          <TotalRow label="Total Expenses" values={yy.map(y => y.totalExpenses)} negative />

          {/* NOI */}
          <tr className="bg-emerald-50">
            <td className="px-3 py-2.5 text-sm font-bold text-emerald-800 border-t-2 border-b-2 border-emerald-200">Net Operating Income</td>
            {yy.map(y => (
              <td key={y.year} className="px-3 py-2.5 text-sm font-bold text-emerald-800 font-mono text-right border-t-2 border-b-2 border-emerald-200">{fmt(y.noi)}</td>
            ))}
          </tr>

          {/* Below the line */}
          <tr><td colSpan={8} className="px-3 pt-3 pb-1 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Debt Service &amp; Cash Flow</td></tr>
          <Row label="Debt Service" values={yy.map(y => y.debtService)} negative />
          <tr className="bg-emerald-50/50">
            <td className="px-3 py-2.5 text-sm font-bold text-emerald-700 border-t-2 border-gray-300">Cash Flow After DS</td>
            {yy.map(y => (
              <td key={y.year} className="px-3 py-2.5 text-sm font-bold text-emerald-700 font-mono text-right border-t-2 border-gray-300">{fmt(y.cfads)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Row({ label, values, negative }: { label: string; values: number[]; negative?: boolean }) {
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-3 py-1.5 text-sm text-gray-600 border-b border-gray-100">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`px-3 py-1.5 text-sm font-mono text-right border-b border-gray-100 ${negative && v < 0 ? "text-red-500" : "text-gray-700"}`}>
          {negative && v < 0 ? `(${fmt(Math.abs(v))})` : fmt(v)}
        </td>
      ))}
    </tr>
  )
}

function TotalRow({ label, values, negative }: { label: string; values: number[]; negative?: boolean }) {
  return (
    <tr className="bg-gray-50">
      <td className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-b border-gray-200">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`px-3 py-2 text-sm font-bold font-mono text-right border-t border-b border-gray-200 ${negative ? "text-red-600" : "text-gray-900"}`}>
          {negative ? `(${fmt(v)})` : fmt(v)}
        </td>
      ))}
    </tr>
  )
}

function SensitivityTab() {
  const s = d.sensitivity
  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-1">IRR Sensitivity Matrix</h4>
        <p className="text-xs text-gray-400 mb-4">Exit Cap Rate vs. Annual Rent Growth — base case highlighted</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="px-3 py-2 text-sm font-bold text-white bg-[#1E3A5F] text-left">IRR</th>
              {s.exitCapRates.map(cap => (
                <th key={cap} className={`px-4 py-2 text-sm font-bold text-white text-center ${cap === 7.5 ? "bg-[#003a93]" : "bg-[#1E3A5F]"}`}>
                  {cap}% Exit Cap
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rentGrowthRates.map((rg, ri) => (
              <tr key={rg}>
                <td className={`px-3 py-3 text-sm font-semibold border-b border-gray-200 ${rg === 3.0 ? "bg-[#1E3A5F] text-white" : "bg-gray-50 text-gray-700"}`}>
                  {rg}% Rent Growth
                </td>
                {s.matrix[ri].map((irr, ci) => {
                  const isBase = rg === 3.0 && s.exitCapRates[ci] === 7.5
                  const color = irr >= 15 ? "bg-emerald-100 text-emerald-800" : irr >= 10 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
                  return (
                    <td key={ci} className={`px-4 py-3 text-center text-sm font-bold font-mono border-b border-gray-200 ${isBase ? "ring-2 ring-[#1E3A5F] ring-inset " : ""}${color}`}>
                      {irr.toFixed(1)}%
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" /> &gt;15% IRR</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-50 border border-amber-200" /> 10-15%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-50 border border-red-200" /> &lt;10%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded ring-2 ring-[#1E3A5F]" /> Base Case</span>
      </div>
    </div>
  )
}

function WaterfallTab() {
  const w = d.waterfall
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Waterfall Structure</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Preferred Return</span><span className="font-semibold text-gray-900">{w.prefReturn}% annual</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Above Pref Split</span><span className="font-semibold text-gray-900">{w.splitAbovePref.sponsor}/{w.splitAbovePref.lp} (Sponsor/LP)</span></div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Promote Tiers</p>
            {w.promote.map((p, i) => (
              <div key={i} className="flex justify-between py-0.5"><span className="text-gray-500">Above {p.irr}% IRR</span><span className="font-medium text-gray-700">{p.split.sponsor}/{p.split.lp}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Annual Distributions</h4>
        <table className="w-full">
          <thead><tr><HeaderCell>Year</HeaderCell><HeaderCell className="text-right">Cash Flow</HeaderCell><HeaderCell className="text-right">Pref Paid</HeaderCell><HeaderCell className="text-right">Sponsor</HeaderCell><HeaderCell className="text-right">LP</HeaderCell></tr></thead>
          <tbody>
            {w.yearlyDistributions.map(y => (
              <tr key={y.year}>
                <td className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">Year {y.year}</td>
                <td className="px-3 py-2 text-sm text-gray-700 font-mono text-right border-b border-gray-100">{fmt(y.cashFlow)}</td>
                <td className="px-3 py-2 text-sm text-gray-700 font-mono text-right border-b border-gray-100">{fmt(y.prefPaid)}</td>
                <td className="px-3 py-2 text-sm text-[#1E3A5F] font-medium font-mono text-right border-b border-gray-100">{fmt(y.excessToSponsor)}</td>
                <td className="px-3 py-2 text-sm text-emerald-600 font-medium font-mono text-right border-b border-gray-100">{fmt(y.excessToLP)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-xl p-4">
        <h4 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider mb-3">Exit Proceeds (Year 5)</h4>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Sale Price</span><span className="font-semibold font-mono">{fmt(w.exitProceeds.salePrice)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Loan Payoff</span><span className="text-red-500 font-mono">({fmt(w.exitProceeds.loanPayoff)})</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Closing Costs</span><span className="text-red-500 font-mono">({fmt(w.exitProceeds.closingCosts)})</span></div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold"><span>Net Proceeds</span><span className="font-mono">{fmt(w.exitProceeds.netProceeds)}</span></div>
          <div className="flex justify-between text-[#1E3A5F]"><span>Sponsor Share</span><span className="font-bold font-mono">{fmt(w.exitProceeds.sponsorShare)}</span></div>
          <div className="flex justify-between text-emerald-600"><span>LP Share</span><span className="font-bold font-mono">{fmt(w.exitProceeds.lpShare)}</span></div>
        </div>
      </div>
    </div>
  )
}

export default function Spreadsheet() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard")

  const tabContent: Record<Tab, React.ReactNode> = {
    Dashboard: <DashboardTab />,
    Assumptions: <AssumptionsTab />,
    "Unit Mix": <UnitMixTab />,
    Expenses: <ExpensesTab />,
    Sensitivity: <SensitivityTab />,
    Waterfall: <WaterfallTab />,
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Excel-like tab bar */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab
                ? "bg-white text-[#1E3A5F] border-[#1E3A5F]"
                : "text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Property header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{d.property.name}</span>
          <span className="text-xs text-gray-400">{d.property.address}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{d.property.units} units</span>
          <span>Class {d.property.class}</span>
          <span>{d.property.buildings} buildings</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Blue = editable input
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        {tabContent[activeTab]}
      </div>
    </div>
  )
}
