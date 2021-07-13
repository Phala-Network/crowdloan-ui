import React from 'react'
import styled from 'styled-components'
import { useI18n } from '../../i18n'

const NoMoreRewardStyle = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const NoMoreReward: React.FC = () => {
  const { t } = useI18n()

  return (
    <NoMoreRewardStyle>
      <img
        draggable={false}
        src="/calculator-placeholder.svg"
        alt="calculator-placeholder"
      />
      <p>{t('The campaign has ended')}</p>
    </NoMoreRewardStyle>
  )
}

export default NoMoreReward
