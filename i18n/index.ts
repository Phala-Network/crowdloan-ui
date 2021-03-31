import { RosettaExtended, useI18n } from 'next-rosetta'

export interface AppLocale {
  locale: string
}

const _useI18n = (): RosettaExtended<AppLocale> => useI18n<AppLocale>()

export { _useI18n as useI18n }
