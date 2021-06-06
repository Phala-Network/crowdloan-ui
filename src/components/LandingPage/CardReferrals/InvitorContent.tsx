import { Container, Spacer } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import PageHeaderButton from '@/components/LandingPage/PageHeaderButton'
import useInvitorAction from '@/hooks/useInvitorAction'
import { useI18n } from '@/i18n'
import gtag from '@/utils/gtag'

const Input = styled.input`
  flex: 1;
  display: block;
  outline: none;
  color: ${(props) => props.theme.bl01};
  border: 1px solid ${(props) => props.theme.bl01};
  background-color: transparent;
  font-family: Lato;
  padding: 0 12px;
  max-width: 436px;
  font-size: 18px;
  width: 260px;
  height: 38px;
  line-height: 38px;

  &::placeholder {
    color: ${(props) => props.theme.bl02};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 260px;
    height: 26px;
    line-height: 26px;
  }
`

const InvitorContent: React.FC = () => {
  const {
    referrer,
    tryInvite,
    txPaymentInfo,
    isLoading,
    setInvitor,
    invitor,
    referrerCheck,
  } = useInvitorAction()
  const { t } = useI18n()

  if (isLoading) return <div>...</div>

  return (
    <>
      <div>
        {t('yourReferralsKusamaAddress')}
        {referrer ? `: ${referrer}` : ''}
      </div>
      {!referrer && (
        <Container>
          <Input
            onClick={() => {
              gtag('click', {
                type: 'Input Invitor',
              })
            }}
            onChange={(e) => setInvitor(e.target.value)}
            value={invitor}
            placeholder="Your Invitor’s Kusama Address"
          ></Input>

          <Spacer x={1}></Spacer>

          {referrerCheck && (
            <div>
              <PageHeaderButton
                color="sp1"
                size="middle"
                onClick={() => {
                  tryInvite()
                  gtag('click', {
                    type: 'Bond',
                  })
                }}
              >
                {t('bond')}
              </PageHeaderButton>
              <div>
                {txPaymentInfo
                  ? `${t('Fee')}: ${txPaymentInfo.partialFee.toHuman()}`
                  : '...'}
              </div>
            </div>
          )}
        </Container>
      )}
    </>
  )
}

export default InvitorContent
