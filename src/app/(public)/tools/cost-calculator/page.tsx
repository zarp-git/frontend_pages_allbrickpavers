"use client";

import { useState, useMemo } from "react";
import {
  RiHome4Line,
  RiRoadsterLine,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ProjectType = "patio" | "driveway";

interface CalcResults {
  quote: number;
  pricePerSf: number;
}

// ---------------------------------------------------------------------------
// Pricing Constants (from AllBrick Pricing Sheet v18)
// ---------------------------------------------------------------------------
const MATERIAL_COST_PER_SF = 2.925; // Pavers $2.5145 + Sand $0.05 + Base $0.30 + Cement $0.03 ≈ $2.925
const PROFIT_FLOOR_PER_DAY = 1714.29; // Nets $1,200/day after 30% tax
const TAX_RATE = 0.30;

const LABOR_CONFIG = {
  patio: { minimums: { 300: 570, 500: 770 }, perSf: 1.80, perSfThreshold: 600 },
  driveway: { minimums: { 400: 770 }, perSf: 1.40, perSfThreshold: 600 },
};

const DRIVER_RATE = { patio: 220, driveway: 270 };

// ---------------------------------------------------------------------------
// Calculation Engine
// ---------------------------------------------------------------------------
function getInstallDays(sqft: number, type: ProjectType): number {
  if (type === "patio") {
    if (sqft < 1000) return 1;
    if (sqft < 1600) return 2;
    return 3;
  }
  // Driveway: only install days (demo days excluded from profit calc)
  if (sqft < 1400) return 1;
  return 2;
}

function getTotalDays(sqft: number, type: ProjectType): number {
  if (type === "patio") return getInstallDays(sqft, type);
  // Driveway: demo days = install days
  return getInstallDays(sqft, type) * 2;
}

function getLabor(sqft: number, type: ProjectType): number {
  const config = LABOR_CONFIG[type];
  // Check minimums (sorted ascending by sqft threshold)
  const thresholds = Object.entries(config.minimums)
    .map(([k, v]) => [Number(k), v] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  for (const [threshold, minLabor] of thresholds) {
    if (sqft <= threshold) return minLabor;
  }

  if (sqft < config.perSfThreshold) {
    // Between last minimum threshold and per-sf threshold
    return thresholds[thresholds.length - 1][1];
  }

  return Math.round(sqft * config.perSf);
}

function getDriver(sqft: number, type: ProjectType): number {
  return DRIVER_RATE[type] * getTotalDays(sqft, type);
}

function getFuel(sqft: number, type: ProjectType): number {
  if (type === "patio") {
    return 50 * getInstallDays(sqft, type);
  }
  return sqft < 1400 ? 100 : 200;
}

function getDelivery(sqft: number, type: ProjectType): number {
  if (type === "patio") {
    if (sqft <= 500) return 0;
    if (sqft <= 1300) return 350;
    return 700;
  }
  // Driveway
  if (sqft <= 1300) return 350;
  return 700;
}

function getTierPricePerSf(sqft: number, type: ProjectType): number | null {
  if (type === "patio") {
    if (sqft < 400) return null;
    if (sqft < 500) return 10.0;
    if (sqft < 1000) return 9.5;
    if (sqft < 1600) return 9.0;
    return 8.75;
  }
  // Driveway — no tier pricing below 400 sqft, uses minimum only
  if (sqft < 400) return null;
  if (sqft <= 850) return 10.0;
  return 9.5;
}

function calculate(sqft: number, type: ProjectType): CalcResults {
  const clampedSqft = Math.max(sqft, 400);

  const materials = Math.round(clampedSqft * MATERIAL_COST_PER_SF);
  const labor = getLabor(clampedSqft, type);
  const driver = getDriver(clampedSqft, type);
  const fuel = getFuel(clampedSqft, type);
  const delivery = getDelivery(clampedSqft, type);
  const installDays = getInstallDays(clampedSqft, type);

  const internalCost = materials + labor + driver + fuel + delivery;

  // Tier pricing
  const tierPerSf = getTierPricePerSf(clampedSqft, type);
  const tierPrice = tierPerSf ? clampedSqft * tierPerSf : 0;

  // Minimum pricing (profit floor)
  let minPrice = internalCost + PROFIT_FLOOR_PER_DAY * installDays;
  if (type === "driveway") {
    const minPerSf = Math.max(minPrice / clampedSqft, 7.0);
    minPrice = clampedSqft * minPerSf;
  }

  // Quote = tier price for driveway (when defined), or max of tier and minimum for patio
  let quote: number;
  if (tierPerSf === null) {
    quote = minPrice;
  } else if (type === "driveway") {
    quote = tierPrice;
  } else {
    quote = Math.max(tierPrice, minPrice);
  }

  const pricePerSf = quote / clampedSqft;

  return {
    quote: Math.round(quote),
    pricePerSf: Math.round(pricePerSf * 100) / 100,
  };
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------
function fmt(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function fmtDec(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function CostCalculatorPage() {
  const [sqft, setSqft] = useState(1000);
  const [inputValue, setInputValue] = useState("1000");
  const [type, setType] = useState<ProjectType>("driveway");

  const results = useMemo(() => calculate(sqft, type), [sqft, type]);

  const minSqft = 400;
  const maxSqft = 2000;
  const displaySqft = Math.max(sqft, minSqft);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numValue = Number(value);
    if (value && !isNaN(numValue)) {
      setSqft(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = Number(inputValue);
    if (!inputValue || isNaN(numValue) || numValue < minSqft) {
      setSqft(minSqft);
      setInputValue(minSqft.toString());
    } else if (numValue > maxSqft) {
      setSqft(maxSqft);
      setInputValue(maxSqft.toString());
    } else {
      setSqft(numValue);
      setInputValue(numValue.toString());
    }
  };

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-rubik uppercase tracking-[3px] text-primary font-medium mb-2">
            Get Your Estimate
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-hanken text-gray-900 uppercase">
            Paver Cost Calculator
          </h1>
          <p className="text-gray-500 font-rubik mt-2 max-w-xl mx-auto">
            Get an instant estimate for your paver installation project based on area and type.
          </p>
        </div>

        <div className="space-y-6">
          {/* Project Type */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik block mb-4">
              Project Type
            </label>
            <div className="flex gap-3">
              {(["patio", "driveway"] as const).map((t) => {
                const Icon = t === "patio" ? RiHome4Line : RiRoadsterLine;
                const isActive = type === t;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setType(t);
                      if (sqft < 400) {
                        setSqft(400);
                        setInputValue("400");
                      }
                    }}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl font-rubik font-semibold capitalize transition-all cursor-pointer ${
                      isActive
                        ? "bg-secondary text-white shadow-md"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <Icon className="size-5" />
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Input */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik block mb-4">
              Project Area
            </label>
            <div className="flex items-baseline gap-2 mb-4">
              <input
                type="number"
                min={minSqft}
                max={maxSqft}
                step={50}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={handleInputBlur}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-2xl font-bold font-hanken text-gray-900 focus:border-primary focus:ring-0 outline-none transition-all"
              />
              <span className="text-gray-400 font-rubik font-medium text-sm shrink-0">
                sq ft
              </span>
            </div>
            <input
              type="range"
              min={minSqft}
              max={maxSqft}
              step={50}
              value={displaySqft}
              onChange={(e) => {
                const value = e.target.value;
                setSqft(Number(value));
                setInputValue(value);
              }}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 font-rubik mt-1">
              <span>{minSqft} sf</span>
              <span>{maxSqft} sf</span>
            </div>
          </div>

          {/* Estimated Price */}
          <div className="bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-5%] w-56 h-56 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <RiMoneyDollarCircleLine className="size-6 text-white/70" />
                <span className="text-white/70 font-rubik text-sm font-semibold uppercase tracking-wider">
                  Estimated Project Price
                </span>
              </div>
              <p className="text-5xl md:text-6xl font-black font-hanken tracking-tight mt-2">
                {fmt(results.quote)}
              </p>
              <p className="text-white/70 font-rubik text-lg mt-4">
                {fmtDec(results.pricePerSf)} per square foot
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-800 font-rubik">
              This is an estimated price. Final quote may vary based on site conditions and project specifics.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


