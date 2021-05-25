import React, { useState } from 'react'
import { useI18n } from '@/i18n'
import EmailSubscribe from './EmailSubscribe'
import PageHeaderButton from './PageHeaderButton'

const EmailSubscribeButton: React.FC = () => {
  const [showEmailSubscribeInput, setShowEmailSubscribeInput] = useState(false)
  const { t } = useI18n()

  return (
    <>
      {!showEmailSubscribeInput && (
        <PageHeaderButton
          color="gray"
          hasArrowIcon
          size="middle"
          onClick={() => setShowEmailSubscribeInput(true)}
        >
          {t('subscribeToOurCrowdloanNews')}
        </PageHeaderButton>
      )}
      <div style={{ display: showEmailSubscribeInput ? 'block' : 'none' }}>
        <EmailSubscribe></EmailSubscribe>
      </div>
    </>
  )
}

export default EmailSubscribeButton
