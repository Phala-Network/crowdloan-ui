// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function main() {
  const url = ''
  const response = await fetch(
    url
    // 'https://sentry.io/organizations/phala-network/issues/?cursor=1624421115000%3A0%3A0&page=11&project=5805680&query=stake+success&statsPeriod=30d'
    // 'https://sentry.io/api/0/organizations/phala-network/issues/?collapse=stats&cursor=1624757141000%3A0%3A0&expand=owners&expand=inbox&limit=100&project=5805680&query=stake%20success&shortIdLookup=1&statsPeriod=14d'
    // 'https://sentry.io/api/0/organizations/phala-network/issues/?collapse=stats&cursor=1624963626000%3A0%3A1&expand=owners&expand=inbox&limit=100&project=5805680&query=stake%20success&shortIdLookup=1&statsPeriod=14d'
    // 'https://sentry.io/api/0/organizations/phala-network/issues/?collapse=stats&expand=owners&expand=inbox&limit=100&project=5805680&query=stake%20success&shortIdLookup=1&statsPeriod=14d'
  )

  const finallyResult = []

  const data = await response.json()

  await Promise.all(
    data.map(async (item) => {
      const response = await fetch(
        `https://sentry.io/api/0/issues/${item.id}/events/latest/`
      )

      const result = await response.json()

      try {
        const report = JSON.parse(result.message.split('stake success ')[1])

        finallyResult.push({
          dateCreated: result?.dateCreated,
          culprit: result?.culprit,
          ...report,
        })
      } catch (e) {
        console.error(e)
      }
    })
  )

  // console.log(JSON.stringify(finallyResult))
}
