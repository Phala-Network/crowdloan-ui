import React, { useState } from 'react'
import EmailSubscribe from './EmailSubscribe'
import PageHeaderButton from './PageHeaderButton'

const EmailSubscribeButton: React.FC = () => {
  const [showEmailSubscribeInput, setShowEmailSubscribeInput] = useState(false)

  if (!showEmailSubscribeInput) {
    return (
      <PageHeaderButton
        color="gray"
        hasArrowIcon
        size="middle"
        onClick={() => setShowEmailSubscribeInput(true)}
      >
        Subscribe our crowdloan news
      </PageHeaderButton>
    )
  } else {
    return <EmailSubscribe></EmailSubscribe>
  }
}

export default EmailSubscribeButton
