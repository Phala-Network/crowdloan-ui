import { IntlShape, useIntl } from 'gatsby-plugin-intl'

const _useI18n = (): IntlShape & { t: (id: string) => string } => {
  const intl = useIntl()
  return {
    t: (id) => intl.formatMessage({ id }),
    ...intl,
  }
}

export const localeNames = {
  zh: '中文',
  en: 'English',
}

export { _useI18n as useI18n }
