import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import EmailInput from './EmailInput'

const EmailSubscribe: React.FC = () => {
  return (
    <MailchimpSubscribe
      url={
        'https://network.us19.list-manage.com/subscribe/post?u=af3fc86df5d49999a90140756&amp;id=5b9fbb1db9'
      }
      render={({ subscribe, status, message }) => (
        <EmailInput status={status} message={message} onValidated={subscribe} />
      )}
    />
  )
}

export default EmailSubscribe
