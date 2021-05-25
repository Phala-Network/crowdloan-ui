import { Container, Spacer } from '@geist-ui/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMeta } from '@/utils/meta'
import { useWeb3 } from '@/utils/web3'
import PageHeaderButton from '@/components/LandingPage/PageHeaderButton'
import queryString from 'query-string'

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
  const { currentContributorQuery } = useMeta()
  const [invitor, setInvitor] = useState('')
  const referrer = currentContributorQuery?.data?.contributor?.referrer
  const { currentAccount } = useWeb3()

  useEffect(() => {
    const { invitor } = queryString.parse(location.search)

    if (invitor) {
      setInvitor(invitor as string)
    }
  }, [currentAccount])

  return (
    <div>
      <div>Your Invitor’s Kusama Address {referrer ? `: ${referrer}` : ''}</div>
      {!referrer && (
        <Container>
          <Input
            onChange={(e) => setInvitor(e.target.value)}
            value={invitor}
            placeholder="Your Invitor’s Kusama Address"
          ></Input>

          <Spacer x={1}></Spacer>

          <div>
            <PageHeaderButton color="sp1" size="middle">
              Bond
            </PageHeaderButton>
            <div>Fee: 0.0023 KSM</div>
          </div>
        </Container>
      )}
    </div>
  )
}

export default InvitorContent
