import queryString from 'query-string'

export default function getReferralAddressFromUrl(): string {
  const {
    referral: referralQueryString,
    invitor: invitorQueryString,
    referrer: referrerQueryString,
  } = queryString.parse(location.search)

  let value = ''

  if (referralQueryString && typeof referralQueryString === 'string') {
    value = referralQueryString
  } else if (referrerQueryString && typeof referrerQueryString === 'string') {
    value = referrerQueryString
  } else if (invitorQueryString && typeof invitorQueryString === 'string') {
    value = invitorQueryString
  }

  return value
}
