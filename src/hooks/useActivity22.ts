import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function useActivity22(): boolean {
  // const date = dayjs('2021-06-22 12:00').tz('GMT+0')
  // const now = dayjs(new Date()).tz('GMT+0')
  // const activity22 = now.isBefore(date)

  // console.log('now', now)
  // console.log('date', date)

  return true
}
