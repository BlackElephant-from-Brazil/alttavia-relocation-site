'use client'

import { useId, useState } from 'react'

type CategoryKey = 'housing' | 'groceries' | 'health' | 'transport' | 'lifestyle'

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'housing', label: 'Housing (rent or mortgage)' },
  { key: 'groceries', label: 'Groceries & everyday expenses' },
  { key: 'health', label: 'Health insurance & medical' },
  { key: 'transport', label: 'Transportation & car expenses' },
  { key: 'lifestyle', label: 'Dining, travel & entertainment' },
]

const usaDefaults: Record<CategoryKey, number> = {
  housing: 1800,
  groceries: 500,
  health: 700,
  transport: 400,
  lifestyle: 400,
}

const portugalDefaults: Record<CategoryKey, number> = {
  housing: 900,
  groceries: 350,
  health: 150,
  transport: 150,
  lifestyle: 300,
}

function sum(values: Record<CategoryKey, number>): number {
  return categories.reduce((total, { key }) => total + (values[key] || 0), 0)
}

function formatMoney(value: number, currency: 'USD' | 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
}: {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  prefix: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-graphite">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-primary/15 bg-white/70 px-3 focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-secondary/15">
        <span className="text-sm text-graphite/60">{prefix}</span>
        <input
          id={id}
          type="number"
          min={0}
          inputMode="numeric"
          value={value || ''}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-full bg-transparent px-2 py-2.5 text-sm text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  )
}

export function RetirementCalculator() {
  const idPrefix = useId()
  const [usa, setUsa] = useState<Record<CategoryKey, number>>(usaDefaults)
  const [portugal, setPortugal] = useState<Record<CategoryKey, number>>(portugalDefaults)
  const [rate, setRate] = useState(1.08)

  const totalUsa = sum(usa)
  const totalPortugal = sum(portugal)
  const portugalInUsd = totalPortugal * rate
  const monthlySavings = totalUsa - portugalInUsd
  const annualSavings = monthlySavings * 12
  const savingsPercent = totalUsa > 0 ? Math.round((monthlySavings / totalUsa) * 100) : 0

  return (
    <div className="not-prose my-10 overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft">
      <div className="border-b border-primary/10 bg-mist/40 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Interactive Tool
        </p>
        <h3 className="mt-1 font-serif text-2xl text-ink">Portugal Retirement Budget Calculator</h3>
        <p className="mt-2 text-sm leading-6 text-graphite">
          Adjust the figures to reflect your own situation. This is a planning estimate, not a
          financial projection.
        </p>
      </div>

      <div className="grid gap-8 px-6 py-7 sm:px-8 md:grid-cols-2">
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink/70">
            Current — United States
          </h4>
          <div className="space-y-4">
            {categories.map(({ key, label }) => (
              <NumberField
                key={key}
                id={`${idPrefix}-usa-${key}`}
                label={label}
                prefix="$"
                value={usa[key]}
                onChange={(v) => setUsa((prev) => ({ ...prev, [key]: v }))}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            Expected — Portugal
          </h4>
          <div className="space-y-4">
            {categories.map(({ key, label }) => (
              <NumberField
                key={key}
                id={`${idPrefix}-pt-${key}`}
                label={label}
                prefix="€"
                value={portugal[key]}
                onChange={(v) => setPortugal((prev) => ({ ...prev, [key]: v }))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary/10 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor={`${idPrefix}-rate`} className="text-sm text-graphite">
            Exchange rate assumption
          </label>
          <div className="flex items-center gap-2 text-sm text-ink">
            <span>€1 =</span>
            <input
              id={`${idPrefix}-rate`}
              type="number"
              min={0}
              step={0.01}
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))}
              className="w-20 rounded-lg border border-primary/15 bg-white/70 px-2 py-1.5 text-center outline-none [appearance:textfield] focus:border-secondary/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span>USD</span>
          </div>
        </div>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-primary/10 bg-primary/10 sm:mx-8 sm:mb-8 sm:grid-cols-4">
        <div className="bg-white/90 px-5 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite/60">
            Monthly — USA
          </p>
          <p className="mt-2 font-serif text-2xl text-ink">{formatMoney(totalUsa, 'USD')}</p>
        </div>
        <div className="bg-white/90 px-5 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite/60">
            Monthly — Portugal
          </p>
          <p className="mt-2 font-serif text-2xl text-ink">
            {formatMoney(totalPortugal, 'EUR')}
          </p>
        </div>
        <div className="bg-primary px-5 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
            Est. Monthly Savings
          </p>
          <p className="mt-2 font-serif text-2xl text-white">
            {formatMoney(monthlySavings, 'USD')}
          </p>
        </div>
        <div className="bg-primary px-5 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
            Est. Annual Savings
          </p>
          <p className="mt-2 font-serif text-2xl text-white">
            {formatMoney(annualSavings, 'USD')}
            {savingsPercent !== 0 && (
              <span className="ml-1.5 text-sm font-sans font-normal text-white/70">
                ({savingsPercent}%)
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-8">
        <p className="text-xs leading-5 text-graphite/60">
          Estimate only. Does not account for taxes, inflation, investment returns, exchange-rate
          risk, or the sustainability of a given withdrawal rate over time.
        </p>
      </div>
    </div>
  )
}
