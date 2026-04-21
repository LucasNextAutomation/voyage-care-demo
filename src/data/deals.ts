export interface Deal {
  id: string
  address: string
  city: string
  state: string
  county: string
  units: number
  class: "C3" | "C2" | "Sui-Gen" | "Residential"
  yearBuilt: number
  sqft: number
  lotSize: string
  askingPrice: number | null
  estimatedValue: number
  pricePerUnit: number
  currentNOI: number
  proFormaNOI: number
  capRate: number
  proFormaCapRate: number
  cashOnCash: number
  irr5yr: number
  equityMultiple: number
  dscr: number
  rentPerUnit: number
  fairMarketRent: number
  valueAddUpside: number
  distressScore: number
  distressSignals: string[]
  ownerName: string
  ownerType: "LLC" | "Individual" | "Trust" | "Estate"
  ownerAddress: string
  ownershipYears: number
  phone: string | null
  email: string | null
  taxStatus: string
  mortgageBalance: number | null
  assessedValue: number
  lastSaleDate: string
  lastSalePrice: number
  lienHistory: string[]
  source: string[]
  dateFound: string
  status: "new" | "contacted" | "underwriting" | "passed"
  unitMix: { type: string; count: number; rent: number }[]
  expenses: { category: string; annual: number }[]
  hidden?: boolean
}

// UK parcel / development site mock data.
// Prices are GBP, rendered as £ by the deal-finder fmt() helper.
// Distress signals are adapted for the UK market (OCOD, long-hold, probate,
// brownfield register, planning decay, EPC F/G, Companies House receivership).
// Sources cite the actual UK Crown-licensed / open datasets the production
// system would use.
export const mockDeals: Deal[] = [
  {
    id: "PARCEL-001",
    address: "Darlaston Road (brownfield rear plot)",
    city: "Walsall",
    state: "West Midlands",
    county: "Walsall",
    units: 14,
    class: "C2",
    yearBuilt: 0,
    sqft: 39640,
    lotSize: "0.91 acres",
    askingPrice: null,
    estimatedValue: 1250000,
    pricePerUnit: 89286,
    currentNOI: 0,
    proFormaNOI: 184000,
    capRate: 0,
    proFormaCapRate: 9.4,
    cashOnCash: 0,
    irr5yr: 17.8,
    equityMultiple: 1.95,
    dscr: 1.32,
    rentPerUnit: 0,
    fairMarketRent: 1250,
    valueAddUpside: 0,
    distressScore: 8.7,
    distressSignals: [
      "OCOD owner — BVI SPV (Stellar Holdings Ltd, incorporated 2004)",
      "No sale on Price Paid Data since 1999 (26-year hold)",
      "Walsall MBC Brownfield Register — listed 2021, no extant consent",
      "Adjacent to existing Voyage Care service (Birmingham Rd, 2.4 miles)",
    ],
    ownerName: "Stellar Holdings Ltd",
    ownerType: "LLC",
    ownerAddress: "Craigmuir Chambers, Road Town, Tortola VG1110, BVI",
    ownershipYears: 26,
    phone: null,
    email: null,
    taxStatus: "Not applicable — undeveloped land",
    mortgageBalance: null,
    assessedValue: 985000,
    lastSaleDate: "1999-05-12",
    lastSalePrice: 184000,
    lienHistory: [],
    source: ["HMLR OCOD", "Walsall MBC Brownfield Register", "HMLR Price Paid", "Companies House"],
    dateFound: "2026-04-18",
    status: "new",
    unitMix: [
      { type: "Supported living bedsit", count: 10, rent: 1180 },
      { type: "Staff flat", count: 4, rent: 1420 }
    ],
    expenses: [
      { category: "Council Tax", annual: 24000 },
      { category: "Buildings Insurance", annual: 12000 },
      { category: "Maintenance & Repairs", annual: 18000 },
      { category: "Registered Manager", annual: 44000 },
      { category: "Utilities (common)", annual: 14000 },
      { category: "Water/Sewer", annual: 8400 },
      { category: "Refuse & Grounds", annual: 5200 },
      { category: "Void Reserve (5%)", annual: 11200 }
    ]
  },
  {
    id: "PARCEL-002",
    address: "42 Commonwealth Road (probate sale)",
    city: "Bolton",
    state: "Greater Manchester",
    county: "Bolton",
    units: 12,
    class: "C3",
    yearBuilt: 1974,
    sqft: 42000,
    lotSize: "0.64 acres",
    askingPrice: null,
    estimatedValue: 1680000,
    pricePerUnit: 140000,
    currentNOI: 98000,
    proFormaNOI: 212000,
    capRate: 5.8,
    proFormaCapRate: 12.6,
    cashOnCash: 8.4,
    irr5yr: 21.2,
    equityMultiple: 2.18,
    dscr: 1.41,
    rentPerUnit: 820,
    fairMarketRent: 1320,
    valueAddUpside: 61,
    distressScore: 9.3,
    distressSignals: [
      "Probate grant — estate of Margaret L. Whitfield (Gazette notice 02/2026)",
      "Long-hold — sole proprietor from 1988 (38-year hold)",
      "EPC F (non-domestic, 2021 cert) — MEES exposure",
      "Council Tax in arrears — £4,810 (Bolton Council 02/2026)",
      "Free of mortgage — no charge on title"
    ],
    ownerName: "Estate of Margaret L. Whitfield",
    ownerType: "Estate",
    ownerAddress: "c/o Lytham & Hodgson Solicitors, 14 Deansgate, Bolton BL1 1BE",
    ownershipYears: 38,
    phone: "+44 1204 555 012",
    email: "probate@lythamhodgson.co.uk",
    taxStatus: "Council Tax arrears £4,810 (FY24 + FY25 outstanding)",
    mortgageBalance: null,
    assessedValue: 1420000,
    lastSaleDate: "1988-06-22",
    lastSalePrice: 142000,
    lienHistory: [
      "Council Tax arrears charge — £4,810 (10/2025)"
    ],
    source: ["The Gazette", "HMLR Price Paid", "EPC Open Data", "Bolton Council (council tax)"],
    dateFound: "2026-04-17",
    status: "new",
    unitMix: [
      { type: "Studio", count: 4, rent: 720 },
      { type: "1-bed", count: 6, rent: 860 },
      { type: "2-bed", count: 2, rent: 980 }
    ],
    expenses: [
      { category: "Council Tax", annual: 18200 },
      { category: "Buildings Insurance", annual: 9200 },
      { category: "Maintenance & Repairs", annual: 14400 },
      { category: "Property Management (8%)", annual: 14800 },
      { category: "Utilities (common)", annual: 7200 },
      { category: "Water/Sewer", annual: 6800 },
      { category: "Refuse", annual: 3200 },
      { category: "Void Reserve (5%)", annual: 9900 }
    ]
  },
  {
    id: "PARCEL-003",
    address: "Former Nurses Home, Meadow Lane",
    city: "Stoke-on-Trent",
    state: "Staffordshire",
    county: "Stoke-on-Trent",
    units: 18,
    class: "C2",
    yearBuilt: 1962,
    sqft: 56800,
    lotSize: "1.22 acres",
    askingPrice: null,
    estimatedValue: 2180000,
    pricePerUnit: 121111,
    currentNOI: 0,
    proFormaNOI: 318000,
    capRate: 0,
    proFormaCapRate: 11.8,
    cashOnCash: 9.1,
    irr5yr: 23.4,
    equityMultiple: 2.32,
    dscr: 1.48,
    rentPerUnit: 0,
    fairMarketRent: 1420,
    valueAddUpside: 0,
    distressScore: 8.2,
    distressSignals: [
      "Planning consent expired — 21/17842/FUL, not implemented (10/2024)",
      "CCOD owner — UK Ltd (Meadow Holdings Ltd, Companies House 08241123)",
      "Companies House: late accounts — strike-off proposed (03/2026)",
      "Brownfield register entry — Stoke LPA, listed 2023",
      "Vacant >5 years per Council Tax Class C record"
    ],
    ownerName: "Meadow Holdings Ltd",
    ownerType: "LLC",
    ownerAddress: "22 Longton Road, Stoke-on-Trent ST1 4JE",
    ownershipYears: 11,
    phone: null,
    email: null,
    taxStatus: "Not applicable — undeveloped land; LA Class C exemption",
    mortgageBalance: null,
    assessedValue: 1820000,
    lastSaleDate: "2015-04-14",
    lastSalePrice: 690000,
    lienHistory: [],
    source: ["HMLR CCOD", "Companies House", "Stoke Planning Portal", "Brownfield Register"],
    dateFound: "2026-04-16",
    status: "new",
    unitMix: [
      { type: "Resident bedroom (en-suite)", count: 14, rent: 1380 },
      { type: "Staff accommodation", count: 4, rent: 1520 }
    ],
    expenses: [
      { category: "Business Rates", annual: 32000 },
      { category: "Buildings Insurance", annual: 18000 },
      { category: "Maintenance & Repairs", annual: 28000 },
      { category: "Registered Manager + Deputy", annual: 72000 },
      { category: "Utilities (common)", annual: 21000 },
      { category: "Water/Sewer", annual: 12400 },
      { category: "Refuse & Grounds", annual: 7800 },
      { category: "Void Reserve (5%)", annual: 15900 }
    ]
  },
  {
    id: "PARCEL-004",
    address: "Ashfield House, Crompton Way",
    city: "Oldham",
    state: "Greater Manchester",
    county: "Oldham",
    units: 8,
    class: "Residential",
    yearBuilt: 1978,
    sqft: 24200,
    lotSize: "0.42 acres",
    askingPrice: 680000,
    estimatedValue: 745000,
    pricePerUnit: 93125,
    currentNOI: 61000,
    proFormaNOI: 92000,
    capRate: 8.2,
    proFormaCapRate: 12.4,
    cashOnCash: 9.5,
    irr5yr: 18.8,
    equityMultiple: 2.02,
    dscr: 1.38,
    rentPerUnit: 660,
    fairMarketRent: 1060,
    valueAddUpside: 61,
    distressScore: 7.1,
    distressSignals: [
      "Long-hold — no sale on Price Paid since 1996 (30-year hold)",
      "Flood Zone 2 (low-to-medium annual probability, EA Flood Map)",
      "EPC D (2019) — upgrade cost £8-12k estimated",
      "Individual owner aged 82 per electoral roll"
    ],
    ownerName: "Harold J. Eastwood",
    ownerType: "Individual",
    ownerAddress: "Ashfield House, Crompton Way, Oldham OL1 2QP",
    ownershipYears: 30,
    phone: "+44 161 555 0284",
    email: null,
    taxStatus: "Council Tax Band C — current",
    mortgageBalance: null,
    assessedValue: 680000,
    lastSaleDate: "1996-03-18",
    lastSalePrice: 112000,
    lienHistory: [],
    source: ["HMLR Price Paid", "EPC Open Data", "EA Flood Map for Planning", "Electoral Register (indicative)"],
    dateFound: "2026-04-15",
    status: "new",
    unitMix: [
      { type: "1-bed", count: 5, rent: 620 },
      { type: "2-bed", count: 3, rent: 720 }
    ],
    expenses: [
      { category: "Council Tax", annual: 9200 },
      { category: "Buildings Insurance", annual: 5800 },
      { category: "Maintenance & Repairs", annual: 8400 },
      { category: "Property Management (8%)", annual: 5072 },
      { category: "Utilities (common)", annual: 3600 },
      { category: "Water/Sewer", annual: 3200 },
      { category: "Refuse", annual: 1800 },
      { category: "Void Reserve (5%)", annual: 3170 }
    ]
  },
  {
    id: "PARCEL-005",
    address: "28 Abbey Road (corner plot)",
    city: "Nuneaton",
    state: "Warwickshire",
    county: "Nuneaton & Bedworth",
    units: 10,
    class: "C3",
    yearBuilt: 0,
    sqft: 34000,
    lotSize: "0.78 acres",
    askingPrice: null,
    estimatedValue: 920000,
    pricePerUnit: 92000,
    currentNOI: 0,
    proFormaNOI: 148000,
    capRate: 0,
    proFormaCapRate: 11.2,
    cashOnCash: 0,
    irr5yr: 18.2,
    equityMultiple: 2.01,
    dscr: 1.34,
    rentPerUnit: 0,
    fairMarketRent: 1180,
    valueAddUpside: 0,
    distressScore: 7.6,
    distressSignals: [
      "Planning application withdrawn — 22/01184/OUT (10/2025)",
      "Long-hold CCOD owner — acquired 2002 (24-year hold)",
      "Companies House: dormant filing every year since 2015",
      "Warwickshire CC identified specialist-care shortfall 2024"
    ],
    ownerName: "Meridian Land Holdings Ltd",
    ownerType: "LLC",
    ownerAddress: "4 Kingfisher Court, Coventry CV2 1WN",
    ownershipYears: 24,
    phone: null,
    email: "info@meridianland.co.uk",
    taxStatus: "Not applicable — undeveloped land",
    mortgageBalance: null,
    assessedValue: 820000,
    lastSaleDate: "2002-08-14",
    lastSalePrice: 245000,
    lienHistory: [],
    source: ["HMLR CCOD", "Companies House (dormant filings)", "Nuneaton Planning Portal", "Warwickshire JSNA"],
    dateFound: "2026-04-14",
    status: "new",
    unitMix: [
      { type: "Supported living bedsit", count: 8, rent: 1120 },
      { type: "Staff flat", count: 2, rent: 1320 }
    ],
    expenses: [
      { category: "Council Tax", annual: 15400 },
      { category: "Buildings Insurance", annual: 8400 },
      { category: "Maintenance & Repairs", annual: 12600 },
      { category: "Registered Manager", annual: 44000 },
      { category: "Utilities (common)", annual: 8800 },
      { category: "Water/Sewer", annual: 5400 },
      { category: "Refuse", annual: 2400 },
      { category: "Void Reserve (5%)", annual: 7400 }
    ]
  },
  {
    id: "PARCEL-006",
    address: "Riverside Lodge, Saltaire Bank",
    city: "Bradford",
    state: "West Yorkshire",
    county: "Bradford",
    units: 16,
    class: "C2",
    yearBuilt: 1988,
    sqft: 48200,
    lotSize: "0.86 acres",
    askingPrice: null,
    estimatedValue: 1820000,
    pricePerUnit: 113750,
    currentNOI: 0,
    proFormaNOI: 268000,
    capRate: 0,
    proFormaCapRate: 11.4,
    cashOnCash: 8.8,
    irr5yr: 22.1,
    equityMultiple: 2.24,
    dscr: 1.44,
    rentPerUnit: 0,
    fairMarketRent: 1420,
    valueAddUpside: 0,
    distressScore: 9.0,
    distressSignals: [
      "Previous care operator in administration — The Gazette notice 01/2026",
      "Existing C2 use class — conversion-ready (existing registered service)",
      "CQC registration lapsed 2024 — CQC public record",
      "OCOD owner — Jersey SPV (Maple Tree Nominees Ltd)",
      "Council Tax Class C exemption applied 06/2025 (vacant)"
    ],
    ownerName: "Maple Tree Nominees Ltd",
    ownerType: "LLC",
    ownerAddress: "3rd Floor, Elizabeth House, 9 Castle St, St Helier JE2 3RT, Jersey",
    ownershipYears: 14,
    phone: null,
    email: null,
    taxStatus: "LA Class C exemption — vacant since 06/2025",
    mortgageBalance: null,
    assessedValue: 1640000,
    lastSaleDate: "2012-11-08",
    lastSalePrice: 890000,
    lienHistory: [
      "Administrators' fixed charge — £182,000 (Dissolved Care Holdings Ltd, 01/2026)"
    ],
    source: ["The Gazette", "CQC", "HMLR OCOD", "Companies House", "Bradford Council"],
    dateFound: "2026-04-13",
    status: "underwriting",
    unitMix: [
      { type: "Resident bedroom (en-suite)", count: 12, rent: 1380 },
      { type: "Resident bedroom (shared)", count: 2, rent: 1180 },
      { type: "Staff flat", count: 2, rent: 1480 }
    ],
    expenses: [
      { category: "Business Rates", annual: 28000 },
      { category: "Buildings Insurance", annual: 14800 },
      { category: "Maintenance & Repairs", annual: 21600 },
      { category: "Registered Manager + Deputy", annual: 68000 },
      { category: "Utilities (common)", annual: 18400 },
      { category: "Water/Sewer", annual: 10400 },
      { category: "Refuse & Grounds", annual: 6800 },
      { category: "Void Reserve (5%)", annual: 13400 }
    ]
  },
  {
    id: "PARCEL-007",
    address: "Former Bakery Site, Canal Street",
    city: "Wolverhampton",
    state: "West Midlands",
    county: "Wolverhampton",
    units: 12,
    class: "Sui-Gen",
    yearBuilt: 1958,
    sqft: 31200,
    lotSize: "0.57 acres",
    askingPrice: 620000,
    estimatedValue: 880000,
    pricePerUnit: 73333,
    currentNOI: 0,
    proFormaNOI: 132000,
    capRate: 0,
    proFormaCapRate: 11.6,
    cashOnCash: 0,
    irr5yr: 18.9,
    equityMultiple: 2.06,
    dscr: 1.36,
    rentPerUnit: 0,
    fairMarketRent: 1080,
    valueAddUpside: 0,
    distressScore: 8.4,
    distressSignals: [
      "CCOD owner in receivership — Companies House filings 03/2026",
      "VOA non-domestic empty rates relief — claimed every year since 2019",
      "EPC G (non-domestic, 2020) — MEES non-compliant",
      "Flood Zone 2 (EA) — mitigation design required",
      "Wolverhampton LPA flagged for conversion to C2 via pre-app 2023"
    ],
    ownerName: "Canal Heritage Estates Ltd (in administration)",
    ownerType: "LLC",
    ownerAddress: "c/o FRP Advisory, Suite 2, Bull Ring, Birmingham B5 4BU",
    ownershipYears: 19,
    phone: "+44 121 555 0184",
    email: "ip.canalheritage@frpadvisory.com",
    taxStatus: "Empty rates relief claimed — £0 business rates effective",
    mortgageBalance: 340000,
    assessedValue: 820000,
    lastSaleDate: "2007-05-30",
    lastSalePrice: 218000,
    lienHistory: [
      "Administrators' floating charge — Lloyds Bank (11/2025)"
    ],
    source: ["Companies House", "HMLR CCOD", "VOA Rating List", "EPC Open Data", "Wolverhampton LPA"],
    dateFound: "2026-04-12",
    status: "contacted",
    unitMix: [
      { type: "Supported living bedsit", count: 10, rent: 1040 },
      { type: "Staff flat", count: 2, rent: 1240 }
    ],
    expenses: [
      { category: "Council Tax", annual: 14000 },
      { category: "Buildings Insurance", annual: 9400 },
      { category: "Maintenance & Repairs", annual: 14600 },
      { category: "Registered Manager", annual: 44000 },
      { category: "Utilities (common)", annual: 10800 },
      { category: "Water/Sewer", annual: 6400 },
      { category: "Refuse", annual: 3000 },
      { category: "Void Reserve (5%)", annual: 8800 }
    ]
  },
  {
    id: "PARCEL-008",
    address: "Highfield Gardens (site of former school)",
    city: "Mansfield",
    state: "Nottinghamshire",
    county: "Mansfield",
    units: 20,
    class: "C2",
    yearBuilt: 0,
    sqft: 62400,
    lotSize: "1.52 acres",
    askingPrice: null,
    estimatedValue: 2420000,
    pricePerUnit: 121000,
    currentNOI: 0,
    proFormaNOI: 352000,
    capRate: 0,
    proFormaCapRate: 11.9,
    cashOnCash: 0,
    irr5yr: 22.8,
    equityMultiple: 2.28,
    dscr: 1.46,
    rentPerUnit: 0,
    fairMarketRent: 1420,
    valueAddUpside: 0,
    distressScore: 8.9,
    distressSignals: [
      "Planning consent granted 2019 — expired unbuilt 03/2024",
      "Trust owner — generational hold since 1998 (27 years)",
      "Mansfield LPA: top-quartile specialist-care placement shortfall (JSNA 2024)",
      "Adjacent to Sherwood Health Hub — healthcare-aligned context",
      "Brownfield Register entry — listed 2020, no extant consent"
    ],
    ownerName: "The Highfield Family Trust",
    ownerType: "Trust",
    ownerAddress: "c/o Knights plc, 4 Baker St, London W1U 8ED",
    ownershipYears: 27,
    phone: "+44 20 7555 0928",
    email: "property@knightsplc.com",
    taxStatus: "Not applicable — undeveloped land",
    mortgageBalance: null,
    assessedValue: 2180000,
    lastSaleDate: "1998-11-04",
    lastSalePrice: 340000,
    lienHistory: [],
    source: ["HMLR INSPIRE", "Mansfield Planning Portal", "Brownfield Register", "Nottinghamshire JSNA"],
    dateFound: "2026-04-10",
    status: "underwriting",
    unitMix: [
      { type: "Resident bedroom (en-suite)", count: 16, rent: 1380 },
      { type: "Staff accommodation", count: 4, rent: 1520 }
    ],
    expenses: [
      { category: "Business Rates", annual: 36000 },
      { category: "Buildings Insurance", annual: 19800 },
      { category: "Maintenance & Repairs", annual: 31200 },
      { category: "Registered Manager + Deputy", annual: 72000 },
      { category: "Utilities (common)", annual: 23400 },
      { category: "Water/Sewer", annual: 13600 },
      { category: "Refuse & Grounds", annual: 8600 },
      { category: "Void Reserve (5%)", annual: 17600 }
    ]
  },
  // Hidden deals — revealed by the "Run Scan" button in the demo.
  {
    id: "PARCEL-009",
    address: "Victoria Mews (probate + brownfield combo)",
    city: "Dudley",
    state: "West Midlands",
    county: "Dudley",
    units: 11,
    class: "C3",
    yearBuilt: 1967,
    sqft: 36800,
    lotSize: "0.71 acres",
    askingPrice: null,
    estimatedValue: 1340000,
    pricePerUnit: 121818,
    currentNOI: 0,
    proFormaNOI: 198000,
    capRate: 0,
    proFormaCapRate: 10.8,
    cashOnCash: 0,
    irr5yr: 20.4,
    equityMultiple: 2.14,
    dscr: 1.39,
    rentPerUnit: 0,
    fairMarketRent: 1280,
    valueAddUpside: 0,
    distressScore: 9.5,
    distressSignals: [
      "Probate grant — The Gazette notice 04/2026",
      "Dudley MBC Brownfield Register — listed 2022",
      "Long-hold — individual owner since 1984 (42-year hold)",
      "Two prior planning applications by others — both withdrawn",
      "Existing Voyage Care service within 1.8 miles (Stourbridge)"
    ],
    ownerName: "Estate of Arthur G. Fenwick",
    ownerType: "Estate",
    ownerAddress: "c/o Higgs & Sons, 3 Waterfront Business Park, Brierley Hill DY5 1LX",
    ownershipYears: 42,
    phone: "+44 1384 555 0417",
    email: "probate@higgsandsons.co.uk",
    taxStatus: "Council Tax Class F exemption — deceased estate",
    mortgageBalance: null,
    assessedValue: 1180000,
    lastSaleDate: "1984-09-12",
    lastSalePrice: 64000,
    lienHistory: [],
    source: ["The Gazette", "HMLR Price Paid", "Dudley Brownfield Register", "Dudley Planning Portal"],
    dateFound: "2026-04-22",
    status: "new",
    unitMix: [
      { type: "Supported living bedsit", count: 8, rent: 1220 },
      { type: "Staff flat", count: 3, rent: 1380 }
    ],
    expenses: [
      { category: "Council Tax", annual: 17200 },
      { category: "Buildings Insurance", annual: 9800 },
      { category: "Maintenance & Repairs", annual: 14400 },
      { category: "Registered Manager", annual: 44000 },
      { category: "Utilities (common)", annual: 10200 },
      { category: "Water/Sewer", annual: 6400 },
      { category: "Refuse", annual: 2800 },
      { category: "Void Reserve (5%)", annual: 9900 }
    ],
    hidden: true,
  },
  {
    id: "PARCEL-010",
    address: "Greenfield Terrace (receivership sale)",
    city: "Rochdale",
    state: "Greater Manchester",
    county: "Rochdale",
    units: 9,
    class: "Residential",
    yearBuilt: 1982,
    sqft: 28400,
    lotSize: "0.48 acres",
    askingPrice: 720000,
    estimatedValue: 880000,
    pricePerUnit: 97778,
    currentNOI: 52000,
    proFormaNOI: 118000,
    capRate: 5.9,
    proFormaCapRate: 13.4,
    cashOnCash: 9.4,
    irr5yr: 21.8,
    equityMultiple: 2.22,
    dscr: 1.42,
    rentPerUnit: 580,
    fairMarketRent: 1120,
    valueAddUpside: 93,
    distressScore: 9.1,
    distressSignals: [
      "Administrators appointed — The Gazette notice 04/2026",
      "Two consecutive years of late accounts — Companies House flag",
      "CCOD owner — Greater Manchester micro-Ltd, single director",
      "EPC E (2018) — upgrade viable alongside C2 conversion",
      "Rochdale LPA: pre-app discussions on supported-living schemes encouraged"
    ],
    ownerName: "Greenfield Lets Ltd (in administration)",
    ownerType: "LLC",
    ownerAddress: "c/o Leonard Curtis, Riverside House, Irwell St, Manchester M3 5EN",
    ownershipYears: 8,
    phone: "+44 161 555 0812",
    email: "ip.greenfield@leonardcurtis.co.uk",
    taxStatus: "Council Tax current — collected by administrator",
    mortgageBalance: 320000,
    assessedValue: 780000,
    lastSaleDate: "2018-02-24",
    lastSalePrice: 480000,
    lienHistory: [
      "Fixed charge — NatWest (2018)",
      "Administrators' floating charge (04/2026)"
    ],
    source: ["The Gazette", "Companies House", "HMLR CCOD", "EPC Open Data"],
    dateFound: "2026-04-23",
    status: "new",
    unitMix: [
      { type: "1-bed", count: 6, rent: 560 },
      { type: "2-bed", count: 3, rent: 620 }
    ],
    expenses: [
      { category: "Council Tax", annual: 11200 },
      { category: "Buildings Insurance", annual: 6800 },
      { category: "Maintenance & Repairs", annual: 9600 },
      { category: "Property Management (8%)", annual: 4160 },
      { category: "Utilities (common)", annual: 4200 },
      { category: "Water/Sewer", annual: 3800 },
      { category: "Refuse", annual: 1800 },
      { category: "Void Reserve (5%)", annual: 2600 }
    ],
    hidden: true,
  }
]

export const dashboardStats = {
  totalDealsFound: 41,
  newThisWeek: 9,
  highDistress: 12,
  avgCapRate: 10.9,
  totalUnits: 342,
  avgDistressScore: 7.8,
  countiesMonitored: 18,
  sourcesActive: 10,
  lastScanTime: "2026-04-22T06:15:00",
  countyBreakdown: [
    { county: "Walsall", deals: 7, units: 58 },
    { county: "Bolton", deals: 6, units: 52 },
    { county: "Stoke-on-Trent", deals: 5, units: 48 },
    { county: "Oldham", deals: 4, units: 32 },
    { county: "Wolverhampton", deals: 5, units: 42 },
    { county: "Bradford", deals: 4, units: 44 },
    { county: "Mansfield", deals: 4, units: 38 },
    { county: "Dudley", deals: 3, units: 28 },
    { county: "Rochdale", deals: 3, units: 26 },
  ],
  signalBreakdown: [
    { signal: "OCOD / Overseas Corporate Owner", count: 14 },
    { signal: "Long-Hold (20+ years)", count: 18 },
    { signal: "Probate / Deceased Estate", count: 9 },
    { signal: "Brownfield Register (no consent)", count: 11 },
    { signal: "Planning History Decay", count: 8 },
    { signal: "EPC F / G (non-domestic)", count: 7 },
    { signal: "Companies House: Receivership / Late Accounts", count: 6 },
    { signal: "Flood Zone 3 (undeveloped)", count: 4 },
    { signal: "Vacant (LA Class C exemption)", count: 5 },
  ]
}
