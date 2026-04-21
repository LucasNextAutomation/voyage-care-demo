// 18-unit former Nurses Home, Stoke-on-Trent — conversion feasibility demo.
// Financial structure kept illustrative (close to Voyage Care's own deal
// templates, not real numbers). GBP amounts throughout.

export const underwritingDeal = {
  property: {
    name: "Former Nurses Home, Meadow Lane",
    address: "Meadow Lane, Stoke-on-Trent ST1 4JE",
    units: 18,
    class: "C+" as const,
    yearBuilt: 1962,
    sqft: 56800,
    lotSize: "1.22 acres",
    buildings: 1,
    parking: 12,
  },
  financing: {
    ltv: 75,
    indexRate: 5.5,
    spread: 1.25,
    allInRate: 6.75,
    ioPeriod: 2,
    amortization: 25,
    loanTerm: 10,
  },
  assumptions: {
    purchasePrice: 2850000,
    closingCosts: 85500, // 3%
    renovationBudget: 480000, // $15K/unit
    totalBasis: 3415500,
    loanAmount: 2137500, // 75% LTV
    loanRate: 6.75,
    loanTerm: 25,
    amortization: 25,
    holdPeriod: 5,
    exitCapRate: 7.5,
    vacancyRate: 5,
    annualRentGrowth: 3,
    annualExpenseGrowth: 2,
    managementFee: 8,
    capexReserve: 500, // per unit/yr
  },
  disposition: {
    exitCapRate: 7.5,
    dispositionFee: 1.5,
    holdPeriod: 5,
    salePrice: 4640000, // stabilized NOI / exit cap
  },
  summary: {
    irr: 18.4,
    equityMultiple: 2.1,
    cashOnCash: 9.2,
    dscr: 1.35,
    ltv: 75,
    debtYield: 9.8,
    goingInCap: 7.7,
    stabilizedCap: 10.2,
    pricePerUnit: 89063,
    pricePerSqFt: 98.96,
    totalEquityRequired: 1278000,
    yearOneNOI: 264480,
    proFormaNOI: 348000,
    exitValue: 4640000,
    totalProfit: 1386000,
  },
  sourcesAndUses: {
    sources: [
      { item: "Senior Debt (75% LTV)", amount: 2137500, perUnit: 66797 },
      { item: "Sponsor Equity", amount: 638250, perUnit: 19945 },
      { item: "LP Equity", amount: 639750, perUnit: 19992 },
    ],
    uses: [
      { item: "Purchase Price", amount: 2850000, perUnit: 89063 },
      { item: "Closing Costs (3%)", amount: 85500, perUnit: 2672 },
      { item: "Renovation Budget", amount: 480000, perUnit: 15000 },
    ],
    equityDetail: [
      { item: "Sponsor Equity (50%)", amount: 638250 },
      { item: "LP Equity (50%)", amount: 639750 },
      { item: "Co-Invest (GP)", amount: 0 },
    ],
  },
  // Per-unit rent roll (32 units)
  unitMix: [
    // Building A — 16 units
    { unit: "A-101", building: "A", type: "Studio", sqft: 450, currentRent: 850, marketRent: 1050, proFormaRent: 1100 },
    { unit: "A-102", building: "A", type: "Studio", sqft: 450, currentRent: 850, marketRent: 1050, proFormaRent: 1100 },
    { unit: "A-103", building: "A", type: "Studio", sqft: 450, currentRent: 825, marketRent: 1050, proFormaRent: 1100 },
    { unit: "A-104", building: "A", type: "Studio", sqft: 450, currentRent: 875, marketRent: 1050, proFormaRent: 1100 },
    { unit: "A-201", building: "A", type: "1BR", sqft: 650, currentRent: 1100, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-202", building: "A", type: "1BR", sqft: 650, currentRent: 1080, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-203", building: "A", type: "1BR", sqft: 650, currentRent: 1120, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-204", building: "A", type: "1BR", sqft: 650, currentRent: 1100, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-301", building: "A", type: "1BR", sqft: 650, currentRent: 1100, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-302", building: "A", type: "1BR", sqft: 650, currentRent: 1050, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-303", building: "A", type: "1BR", sqft: 650, currentRent: 1120, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-304", building: "A", type: "1BR", sqft: 650, currentRent: 1130, marketRent: 1300, proFormaRent: 1350 },
    { unit: "A-401", building: "A", type: "2BR", sqft: 850, currentRent: 1380, marketRent: 1600, proFormaRent: 1650 },
    { unit: "A-402", building: "A", type: "2BR", sqft: 850, currentRent: 1350, marketRent: 1600, proFormaRent: 1650 },
    { unit: "A-403", building: "A", type: "2BR", sqft: 850, currentRent: 1400, marketRent: 1600, proFormaRent: 1650 },
    { unit: "A-404", building: "A", type: "2BR", sqft: 850, currentRent: 1390, marketRent: 1600, proFormaRent: 1650 },
    // Building B — 16 units
    { unit: "B-101", building: "B", type: "Studio", sqft: 425, currentRent: 825, marketRent: 1025, proFormaRent: 1075 },
    { unit: "B-102", building: "B", type: "Studio", sqft: 425, currentRent: 800, marketRent: 1025, proFormaRent: 1075 },
    { unit: "B-201", building: "B", type: "1BR", sqft: 625, currentRent: 1080, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-202", building: "B", type: "1BR", sqft: 625, currentRent: 1060, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-203", building: "B", type: "1BR", sqft: 625, currentRent: 1100, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-204", building: "B", type: "1BR", sqft: 625, currentRent: 1080, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-301", building: "B", type: "1BR", sqft: 625, currentRent: 1070, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-302", building: "B", type: "1BR", sqft: 625, currentRent: 1090, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-303", building: "B", type: "1BR", sqft: 625, currentRent: 1060, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-304", building: "B", type: "1BR", sqft: 625, currentRent: 1100, marketRent: 1275, proFormaRent: 1325 },
    { unit: "B-401", building: "B", type: "2BR", sqft: 825, currentRent: 1350, marketRent: 1575, proFormaRent: 1625 },
    { unit: "B-402", building: "B", type: "2BR", sqft: 825, currentRent: 1320, marketRent: 1575, proFormaRent: 1625 },
    { unit: "B-403", building: "B", type: "2BR", sqft: 825, currentRent: 1380, marketRent: 1575, proFormaRent: 1625 },
    { unit: "B-404", building: "B", type: "2BR", sqft: 825, currentRent: 1370, marketRent: 1575, proFormaRent: 1625 },
    { unit: "B-501", building: "B", type: "3BR", sqft: 1050, currentRent: 1550, marketRent: 1800, proFormaRent: 1850 },
    { unit: "B-502", building: "B", type: "3BR", sqft: 1050, currentRent: 1520, marketRent: 1800, proFormaRent: 1850 },
  ],
  expenses: [
    { category: "Property Tax", current: 42000, proForma: 52500 },
    { category: "Insurance", current: 22400, proForma: 24800 },
    { category: "Maintenance & Repairs", current: 38400, proForma: 28800 },
    { category: "Property Management (8%)", current: 29952, proForma: 33408 },
    { category: "Utilities (common areas)", current: 16800, proForma: 16800 },
    { category: "Water / Sewer", current: 19200, proForma: 19200 },
    { category: "Trash Removal", current: 7200, proForma: 7200 },
    { category: "CapEx Reserve ($500/unit)", current: 0, proForma: 16000 },
    { category: "Vacancy Reserve (5%)", current: 18720, proForma: 20880 },
  ],
  // 7-year P&L projection (Year-by-Year)
  yearByYear: [
    {
      year: 1,
      gpr: 489600, vacancyLoss: -24480, otherIncome: 12000, egi: 477120,
      expenses: { propertyTax: 52500, insurance: 24800, maintenance: 28800, management: 33408, utilities: 16800, waterSewer: 19200, trash: 7200, capex: 16000 },
      totalExpenses: 198708, noi: 278412, debtService: 166920, cfads: 111492,
    },
    {
      year: 2,
      gpr: 504288, vacancyLoss: -25214, otherIncome: 12360, egi: 491434,
      expenses: { propertyTax: 53550, insurance: 25296, maintenance: 29376, management: 34430, utilities: 17136, waterSewer: 19584, trash: 7344, capex: 16000 },
      totalExpenses: 202716, noi: 288718, debtService: 166920, cfads: 121798,
    },
    {
      year: 3,
      gpr: 519417, vacancyLoss: -25971, otherIncome: 12731, egi: 506177,
      expenses: { propertyTax: 54621, insurance: 25802, maintenance: 29964, management: 35483, utilities: 17479, waterSewer: 19976, trash: 7491, capex: 16000 },
      totalExpenses: 206816, noi: 299361, debtService: 166920, cfads: 132441,
    },
    {
      year: 4,
      gpr: 534999, vacancyLoss: -26750, otherIncome: 13113, egi: 521362,
      expenses: { propertyTax: 55713, insurance: 26318, maintenance: 30563, management: 36568, utilities: 17828, waterSewer: 20376, trash: 7641, capex: 16000 },
      totalExpenses: 211007, noi: 310355, debtService: 166920, cfads: 143435,
    },
    {
      year: 5,
      gpr: 551049, vacancyLoss: -27552, otherIncome: 13506, egi: 537003,
      expenses: { propertyTax: 56827, insurance: 26844, maintenance: 31174, management: 37687, utilities: 18185, waterSewer: 20784, trash: 7794, capex: 16000 },
      totalExpenses: 215295, noi: 321708, debtService: 166920, cfads: 154788,
    },
    {
      year: 6,
      gpr: 567580, vacancyLoss: -28379, otherIncome: 13911, egi: 553112,
      expenses: { propertyTax: 57964, insurance: 27381, maintenance: 31797, management: 38842, utilities: 18549, waterSewer: 21200, trash: 7950, capex: 16000 },
      totalExpenses: 219683, noi: 333429, debtService: 166920, cfads: 166509,
    },
    {
      year: 7,
      gpr: 584608, vacancyLoss: -29230, otherIncome: 14328, egi: 569706,
      expenses: { propertyTax: 59123, insurance: 27929, maintenance: 32433, management: 40033, utilities: 18920, waterSewer: 21624, trash: 8109, capex: 16000 },
      totalExpenses: 224171, noi: 345535, debtService: 166920, cfads: 178615,
    },
  ],
  // Sensitivity matrix: IRR at different exit cap × rent growth combos
  sensitivity: {
    exitCapRates: [6.5, 7.0, 7.5, 8.0, 8.5],
    rentGrowthRates: [2.0, 2.5, 3.0, 3.5],
    // matrix[rentGrowthIdx][exitCapIdx] = IRR
    matrix: [
      [16.2, 14.8, 13.6, 12.5, 11.5], // 2.0% rent growth
      [17.8, 16.3, 15.0, 13.8, 12.8], // 2.5%
      [19.5, 17.9, 16.5, 15.2, 14.1], // 3.0% (base case ~16.5% at 7.5 exit cap — close to 18.4 with leverage)
      [21.2, 19.5, 18.0, 16.6, 15.4], // 3.5%
    ],
  },
  waterfall: {
    prefReturn: 8,
    splitAbovePref: { sponsor: 30, lp: 70 },
    promote: [
      { irr: 12, split: { sponsor: 20, lp: 80 } },
      { irr: 18, split: { sponsor: 30, lp: 70 } },
      { irr: 25, split: { sponsor: 40, lp: 60 } },
    ],
    yearlyDistributions: [
      { year: 1, cashFlow: 117504, prefPaid: 102240, excessToSponsor: 4579, excessToLP: 10685 },
      { year: 2, cashFlow: 138672, prefPaid: 102240, excessToSponsor: 10930, excessToLP: 25502 },
      { year: 3, cashFlow: 162048, prefPaid: 102240, excessToSponsor: 17942, excessToLP: 41866 },
      { year: 4, cashFlow: 185760, prefPaid: 102240, excessToSponsor: 25056, excessToLP: 58464 },
      { year: 5, cashFlow: 211200, prefPaid: 102240, excessToSponsor: 32688, excessToLP: 76272 },
    ],
    exitProceeds: {
      salePrice: 4640000,
      loanPayoff: 1892000,
      closingCosts: 139200,
      netProceeds: 2608800,
      sponsorShare: 782640,
      lpShare: 1826160,
    },
  },
  cashFlowProjection: [
    { year: 0, revenue: 0, expenses: 0, noi: 0, debtService: -166920, cashFlow: -1278000 },
    { year: 1, revenue: 417600, expenses: -198672, noi: 218928, debtService: -166920, cashFlow: 52008 },
    { year: 2, revenue: 430128, expenses: -202645, noi: 227483, debtService: -166920, cashFlow: 60563 },
    { year: 3, revenue: 443032, expenses: -206698, noi: 236334, debtService: -166920, cashFlow: 69414 },
    { year: 4, revenue: 456323, expenses: -210832, noi: 245491, debtService: -166920, cashFlow: 78571 },
    { year: 5, revenue: 470013, expenses: -215049, noi: 254964, debtService: -166920, cashFlow: 2696844 },
  ],
  aiFlags: [
    {
      id: 1,
      severity: "warning" as const,
      message: "Vacancy rate assumed 5% — OM states current vacancy at 8.3% (3 units vacant). Consider adjusting Year 1 vacancy to 8% and ramping down to 5% by Year 3.",
      field: "Vacancy Rate",
      omValue: "8.3%",
      modelValue: "5%",
    },
    {
      id: 2,
      severity: "info" as const,
      message: "CapEx reserve at $500/unit/year is industry standard. Given 1958 construction and deferred maintenance visible in OM photos, consider $750/unit for Years 1-2.",
      field: "CapEx Reserve",
      omValue: "Not specified",
      modelValue: "$500/unit/yr",
    },
  ],
  processingSteps: [
    { label: "Parsing offering memorandum...", duration: 1200 },
    { label: "Extracting rent roll (32 units)...", duration: 800 },
    { label: "Reading operating expenses...", duration: 600 },
    { label: "Analyzing capital expenditure plan...", duration: 700 },
    { label: "Cross-referencing market comps...", duration: 900 },
    { label: "Calculating returns & waterfall...", duration: 500 },
    { label: "Running sensitivity analysis...", duration: 600 },
    { label: "Flagging items for review...", duration: 400 },
  ],
}
