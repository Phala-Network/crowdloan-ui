import { useToasts } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import { useMeta } from '@/utils/meta'
import { useWeb3 } from '@/utils/web3'
import queryString from 'query-string'
import { usePolkadotApi } from '@/utils/polkadot'
import { decodeAddress } from '@polkadot/util-crypto'
import { ApiPromise } from '@polkadot/api'
import { useI18n } from '@/i18n'

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

export default function useInvitorAction(): {
  referrer: string
  tryInvite: () => Promise<void>
  txPaymentInfo: any
  isLoading: boolean
  setInvitor: React.Dispatch<React.SetStateAction<string>>
  invitor: string
  txWaiting: boolean
  referrerCheck: boolean
} {
  const [invitor, setInvitor] = useState('')
  const { currentAccount, currentInjector } = useWeb3()
  const [, setToast] = useToasts()
  const [txPaymentInfo, setTxPaymentInfo] = useState(null)
  const [tx, setTx] = useState(null)
  const [txWaiting, setTxWaiting] = useState(false)
  const [referrerCheck, setReferrerCheck] = useState(false)

  const { api, initialized } = usePolkadotApi()
  const {
    refetch,
    currentContributorQuery,
    campaignQuery: { data: campaign, isLoading },
  } = useMeta()
  const { t } = useI18n()

  const referrer = currentContributorQuery?.data?.contributor?.referrer

  // set invitor from url
  useEffect(() => {
    const { invitor: invitorQueryString } = queryString.parse(location.search)

    if (
      invitorQueryString &&
      typeof invitorQueryString === 'string' &&
      !invitor
    ) {
      setInvitor(invitorQueryString)
    }
  }, [currentAccount])

  // set referrer
  const tryInvite = async () => {
    if (txWaiting || !initialized || !tx) return

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

    try {
      await tx.signAndSend(
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
      const text = error.message.includes('1010')
        ? t('insufficientFee')
        : 'Invalid referrer.'
      setTxWaiting(false)
      setToast({
        text,
        type: 'error',
        delay: 6000,
      })
      return
    }
  }

  useEffect(() => {
    if (!(api && tx && currentAccount)) {
      setTxPaymentInfo(null)
      return
    }
    ;(async () => {
      setTxPaymentInfo(await tx.paymentInfo(currentAccount.address))
    })()
  }, [currentAccount, tx, api, setTxPaymentInfo])

  useEffect(() => {
    const invitorValue = invitor.trim()

    if (!initialized || !invitorValue || !currentAccount) {
      setReferrerCheck(false)
      return
    }

    const txs = []

    try {
      const referrer = decodeAddress(invitorValue)
      const paraId = parseInt(campaign.campaign.parachainId)

      txs.push(
        createReferrerRemarkTx({
          paraId,
          api,
          referrer,
        })
      )

      setTx(api.tx.utility.batch(txs))
      setReferrerCheck(true)
    } catch (error) {
      console.error(error)
      setReferrerCheck(false)
      setToast({
        text: 'Invalid referrer.',
        type: 'error',
      })
      return
    }
  }, [invitor, initialized, api, campaign, currentAccount])

  return {
    referrer,
    tryInvite,
    txPaymentInfo,
    isLoading,
    setInvitor,
    invitor,
    txWaiting,
    referrerCheck,
  }
}
