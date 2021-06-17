export default function sliceAddress(address = '', start = 6, end = 4): string {
  if (!address || !address.slice) {
    return address
  }

  return `${address.slice(0, start)}...${address.slice(-end)}`
}
