import React, { useState } from 'react'
import EmailSubscribe from './EmailSubscribe'
import PageHeaderButton from './PageHeaderButton'

const EmailSubscribeButton: React.FC = () => {
  const [showEmailSubscribeInput, setShowEmailSubscribeInput] = useState(false)

  return (
    <>
      {!showEmailSubscribeInput && (
        <PageHeaderButton
          color="gray"
          hasArrowIcon
          size="middle"
          onClick={() => setShowEmailSubscribeInput(true)}
        >
          Subscribe our crowdloan news
        </PageHeaderButton>
      )}
      <div style={{ display: showEmailSubscribeInput ? 'block' : 'none' }}>
        <EmailSubscribe></EmailSubscribe>
      </div>
    </>
  )
}

export default EmailSubscribeButton
