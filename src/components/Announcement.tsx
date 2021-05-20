import { useIntl } from 'gatsby-plugin-intl'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { useMeta } from '../utils/meta'
import { GetAnnouncementsResponse } from '../utils/request/types'
import Section from './Section'
import { useLocalStorage } from 'react-use'

type Props = any

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.bl01};
`

const Content = styled.div`
  word-break: break-all;
  flex: 1;
  font-size: 12px;
`

const NotificationIcon = styled.div`
  width: 24px;
  height: 25px;
  background-image: url('/notification.svg');
  background-size: 100% 100%;
  margin-left: 6px;
  margin-right: 16px;
`

const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url('/x.svg');
  background-size: 14px 14px;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 10px;
  margin-right: 6px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`

const Announcement: React.FC<Props> = () => {
  const { locale } = useIntl()

  const { campaignId } = useMeta()
  const { data, isLoading, isError } = useQuery<GetAnnouncementsResponse>([
    'getAnnouncements',
    { campaignId, locale },
  ])
  const [closed, setClosed] = useState(false)

  const [announcementClosedValue, setAnnouncementClosedValue] = useLocalStorage(
    'announcementClosed',
    []
  )

  if (closed) return null

  if (isLoading || isError) {
    return null
  }

  const { announcements } = data
  const firstAnnouncement = announcements?.[0]

  if (!firstAnnouncement) {
    return null
  }

  const { body: text, id: announcementId } = firstAnnouncement

  function close() {
    setClosed(true)
    setAnnouncementClosedValue([...announcementClosedValue, announcementId])
  }

  return (
    <Section xs={24} className="Announcement">
      <Container>
        <NotificationIcon></NotificationIcon>
        <Content>{text}</Content>
        <CloseIcon onClick={close}></CloseIcon>
      </Container>
    </Section>
  )
}

export default Announcement
