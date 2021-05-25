import IconArrow from './IconArrow'
import IconSuccessCircle from './IconSuccessCircle'
import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import isEmail from '@/utils/isEmail'
import { EmailFormFields } from 'react-mailchimp-subscribe'
import styled from 'styled-components'
import { useI18n } from '@/i18n'

const EmailInputWrap = styled.div`
  border: 1px solid white;
  padding: 16px;
  display: flex;
  align-items: center;

  @media (max-width: 8888px) {
    padding: 0 11px;
  }

  &.success input {
    color: rgba(white, 0.3);
  }

  input {
    flex: 1;
    display: block;
    outline: none;
    border-width: 0;
    color: ${(props) => props.theme.wh01};
    background-color: transparent;
    height: 29px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;

    &::placeholder {
      color: ${(props) => props.theme.wh01};
    }

    @media (max-width: 8888px) {
      font-size: 18px;
      width: 260px;
      height: 36px;
      line-height: 36px;
    }
  }

  .icon {
    margin-left: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active .iconArrow {
      transform: translate3d(2px, 0, 0);
    }

    &:hover .iconArrow {
      stroke: #03ffff;
    }

    .iconArrow {
      stroke: ${(props) => props.theme.wh01};
      transition: all 0.1s ease;
      width: 32px;
      height: 32px;

      @media (max-width: 8888px) {
        width: 23px;
        height: 23px;
      }
    }
  }
`

const TextInfo = styled.div`
  color: ${(props) => props.theme.wh01};
  font-size: 16px;
  line-height: 20px;
  height: 20px;
  margin-top: 10px;
  position: absolute;
  left: 0;
  bottom: -30px;

  &.warning {
    color: #03ffff;
  }
`

type Props = {
  status: 'error' | 'success' | 'sending'
  message: string | Error
  onValidated: (data: EmailFormFields) => void
}

enum STATUS {
  default = 'default',
  warning = 'warning',
  success = 'success',
}

const EmailInput: React.FC<Props> = (props) => {
  const [textValue, setTextValue] = useState<string>('')
  const [status, setStatus] = useState<STATUS>(STATUS.default)
  const { t } = useI18n()
  const { status: subscribeStatus, message } = props

  useEffect(() => {
    if (subscribeStatus === 'success') {
      setStatus(STATUS.success)
    }
  }, [subscribeStatus])

  function onChange(e) {
    setTextValue(e.target.value)
  }

  function checkEmail() {
    const isOk = isEmail(textValue)

    if (!isOk) {
      setStatus(STATUS.warning)
    }

    return isOk
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      sendEmail()
    }
  }

  async function sendEmail() {
    if (checkEmail()) {
      try {
        props.onValidated({
          EMAIL: textValue,
        })
      } catch (e) {
        console.error('sendEmail', e)
      }
    }
  }

  let statusInfo = null

  if (subscribeStatus === 'sending') {
    statusInfo = <TextInfo className={'warning'}>{t('sending...')}</TextInfo>
  } else if (subscribeStatus === 'error') {
    statusInfo = (
      <TextInfo className={'warning'}>
        {message.toString().includes('is already subscribed')
          ? t('isAlreadySubscribed')
          : t('subscribeFail')}
      </TextInfo>
    )
  } else if (status === STATUS.warning) {
    statusInfo = (
      <TextInfo className={'warning'}>
        {t('pleaseEnterTheRightEmailAddress')}
      </TextInfo>
    )
  } else if (status === STATUS.success) {
    statusInfo = <TextInfo>{t('thanksForSubscribing')}</TextInfo>
  }

  return (
    <div style={{ position: 'relative' }}>
      <EmailInputWrap className={classnames(['emailInput', status])}>
        <input
          onKeyPress={onKeyPress}
          onChange={onChange}
          value={textValue}
          placeholder={t('emailInputPlaceholder')}
          type="text"
        />

        <div className={'icon'}>
          {status === STATUS.success && <IconSuccessCircle></IconSuccessCircle>}
          {status !== STATUS.success && (
            <div onClick={sendEmail}>
              <IconArrow className={'iconArrow'}></IconArrow>
            </div>
          )}
        </div>
      </EmailInputWrap>
      {statusInfo}
    </div>
  )
}

export default EmailInput
