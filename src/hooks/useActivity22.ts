import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function useActivity22(): boolean {
  const date = dayjs.tz('2021-06-22 12:00', 'Africa/Accra')
  const now = dayjs(new Date())
  const activity22Active = now.isBefore(date)

  return activity22Active
}
