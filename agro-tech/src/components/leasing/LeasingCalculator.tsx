import { useEffect, useMemo, useState } from 'react'
import { useSiteContent } from '../../context/SiteContext'
import { calculateLeasing } from '../../utils/leasing'
import { formatPrice } from '../../utils/format'
import { Button } from '../ui/Button'

interface LeasingCalculatorProps {
  initialPrice?: number
}

export function LeasingCalculator({ initialPrice = 15_000_000 }: LeasingCalculatorProps) {
  const { content } = useSiteContent()
  const defaults = content?.leasing

  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    if (initialPrice) setPrice(initialPrice)
  }, [initialPrice])
  const [downPercent, setDownPercent] = useState(defaults?.defaultDownPayment ?? 20)
  const [term, setTerm] = useState(defaults?.defaultTerm ?? 36)
  const [rate, setRate] = useState(defaults?.defaultRate ?? 14.5)

  const result = useMemo(
    () =>
      calculateLeasing({
        price,
        downPaymentPercent: downPercent,
        termMonths: term,
        annualRatePercent: rate,
      }),
    [price, downPercent, term, rate],
  )

  const minTerm = defaults?.minTerm ?? 12
  const maxTerm = defaults?.maxTerm ?? 84

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="surface-card space-y-6 p-8">
        <h3 className="font-display text-xl font-bold text-agro-950 dark:text-white">
          Параметры лизинга
        </h3>

        <label className="block">
          <span className="text-sm font-medium text-agro-800 dark:text-agro-200">
            Стоимость техники: {formatPrice(price)}
          </span>
          <input
            type="range"
            min={1_000_000}
            max={50_000_000}
            step={500_000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-2 w-full accent-agro-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-agro-800 dark:text-agro-200">
            Первоначальный взнос: {downPercent}%
          </span>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="mt-2 w-full accent-agro-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-agro-800 dark:text-agro-200">
            Срок: {term} мес.
          </span>
          <input
            type="range"
            min={minTerm}
            max={maxTerm}
            step={6}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="mt-2 w-full accent-agro-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-agro-800 dark:text-agro-200">
            Ставка: {rate}% годовых
          </span>
          <input
            type="range"
            min={8}
            max={24}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full accent-agro-600"
          />
        </label>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-agro-700 to-agro-900 p-8 text-white">
        <h3 className="font-display text-xl font-bold">Расчёт платежа</h3>
        <p className="mt-2 text-agro-200 text-sm">Ориентировочный расчёт, не является офертой</p>

        <dl className="mt-8 space-y-4">
          <div className="flex justify-between border-b border-white/10 pb-3">
            <dt className="text-agro-200">Первый взнос</dt>
            <dd className="font-semibold">{formatPrice(result.downPayment)}</dd>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-3">
            <dt className="text-agro-200">Сумма лизинга</dt>
            <dd className="font-semibold">{formatPrice(result.principal)}</dd>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-3">
            <dt className="text-agro-200">Ежемесячный платёж</dt>
            <dd className="font-display text-2xl font-bold text-earth-300">
              {formatPrice(result.monthlyPayment)}
            </dd>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-3">
            <dt className="text-agro-200">Итого к выплате</dt>
            <dd className="font-semibold">{formatPrice(result.totalPayment)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-agro-200">Переплата</dt>
            <dd className="font-semibold text-earth-300">+{formatPrice(result.overpayment)}</dd>
          </div>
        </dl>

        <Button to="/contact" variant="secondary" className="mt-8 w-full">
          Запросить одобрение
        </Button>
      </div>
    </div>
  )
}
