export default function gtag(event = 'click', data = {}): void {
  window?.['gtag']?.('event', event, { ...data })
}
