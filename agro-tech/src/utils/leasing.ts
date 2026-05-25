export interface LeasingInput {
  price: number
  downPaymentPercent: number
  termMonths: number
  annualRatePercent: number
}

export interface LeasingResult {
  downPayment: number
  principal: number
  monthlyPayment: number
  totalPayment: number
  overpayment: number
}

export function calculateLeasing(input: LeasingInput): LeasingResult {
  const downPayment = Math.round((input.price * input.downPaymentPercent) / 100)
  const principal = input.price - downPayment
  const monthlyPayment = Math.round(calcMonthlyPayment(principal, input.annualRatePercent, input.termMonths))
  const totalPayment = downPayment + monthlyPayment * input.termMonths
  const overpayment = totalPayment - input.price

  return { downPayment, principal, monthlyPayment, totalPayment, overpayment }
}

function calcMonthlyPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0) return 0
  if (annualRate === 0) return principal / months

  const r = annualRate / 100 / 12
  const factor = Math.pow(1 + r, months)
  return (principal * r * factor) / (factor - 1)
}
