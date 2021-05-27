import { Container, Spacer, useToasts } from '@geist-ui/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMeta } from '@/utils/meta'
import { useWeb3 } from '@/utils/web3'
import PageHeaderButton from '@/components/LandingPage/PageHeaderButton'
import queryString from 'query-string'
import { usePolkadotApi } from '@/utils/polkadot'
import { decodeAddress } from '@polkadot/util-crypto'
import { ApiPromise } from '@polkadot/api'
import { useI18n } from '@/i18n'

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

const createReferrerRemark = ({ paraId, api, referrer }) => {
  const refAcc = api.createType('AccountId', referrer)
  const remark = api.createType('PhalaCrowdloanReferrerRemark', {
    magic: 'CR',
    paraId,
    referrer: refAcc,
    referrerHash: refAcc.hash.toHex(),
  })
  return api.createType('Bytes', remark.toHex())
}

const createReferrerRemarkTx = ({
  paraId,
  api,
  referrer,
}: {
  paraId: number
  api: ApiPromise
  referrer: Uint8Array
}) => {
  return api.tx.system.remarkWithEvent(
    createReferrerRemark({ paraId, api, referrer })
  )
}

const InvitorContent: React.FC = () => {
  const [invitor, setInvitor] = useState('')
  const { currentAccount, currentInjector } = useWeb3()
  const [, setToast] = useToasts()
  const [txWaiting, setTxWaiting] = useState(false)
  const { api, initialized } = usePolkadotApi()
  const {
    refetch,
    currentContributorQuery,
    campaignQuery: { data: campaign },
  } = useMeta()
  const { t } = useI18n()

  const referrer = currentContributorQuery?.data?.contributor?.referrer

  // set invitor from url
  useEffect(() => {
    const { invitor } = queryString.parse(location.search)

    if (invitor) {
      setInvitor(invitor as string)
    }
  }, [currentAccount])

  // set referrer
  const tryContribute = async () => {
    if (txWaiting || !initialized) return

    const invitorValue = invitor.trim()

    if (!invitorValue) return

    if (invitorValue === currentAccount.address) {
      setToast({
        text: t('yourReferrerCannotBeYourself'),
        type: 'error',
        delay: 3000,
      })
      return
    }

    setTxWaiting(true)
    const paraId = parseInt(campaign.campaign.parachainId)

    try {
      const referrer = decodeAddress(invitorValue)
      const referrerRemarkTx = createReferrerRemarkTx({
        paraId,
        api,
        referrer,
      })

      await referrerRemarkTx.signAndSend(
        currentAccount.address,
        { signer: currentInjector.signer },
        ({ status }) => {
          if (status.isInBlock) {
            setTimeout(() => {
              setTxWaiting(false)
              setToast({ text: 'Success', type: 'success', delay: 3000 })
              refetch()
            }, 6000)
          } else {
            console.warn(`Current status: ${status.type}`)
          }
        }
      )
    } catch (error) {
      console.warn(error)
      setTxWaiting(false)
      setToast({
        text: 'Invalid referrer.',
        type: 'error',
      })
      return
    }
  }

  return (
    <>
      <div>
        {t('yourReferralsKusamaAddress')}
        {referrer ? `: ${referrer}` : ''}
      </div>
      {!referrer && (
        <Container>
          <Input
            onChange={(e) => setInvitor(e.target.value)}
            value={invitor}
            placeholder="Your Invitor’s Kusama Address"
          ></Input>

          <Spacer x={1}></Spacer>

          <div>
            <PageHeaderButton color="sp1" size="middle" onClick={tryContribute}>
              {t('bond')}
            </PageHeaderButton>
            <div>Fee: 0.0023 KSM</div>
          </div>
        </Container>
      )}
    </>
  )
}

export default InvitorContent
