export default function toFixed(value: number, fractionDigits = 4): number {
  return parseFloat(value.toFixed(fractionDigits))
}
