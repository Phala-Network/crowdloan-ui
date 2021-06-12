export default function toFixed(value: number, fractionDigits = 0): number {
  return parseFloat(value.toFixed(fractionDigits))
}
