import { Grid } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import ContentCard from './ContentCard'

const Item = styled.div`
  background-color: white;
  width: 100%;
  padding: 30px 20px;
`

const ItemTitle = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 40px;
  color: #070707;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`

const ItemContent = styled.div`
  margin-top: 30px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: rgba(6, 6, 6, 0.75);
  mix-blend-mode: normal;
  opacity: 0.75;

  p {
    margin: 1rem 0 0 0;
  }
`

const CardQA: React.FC = () => {
  const { t } = useI18n()

  return (
    <ContentCard type="vertical" name={['FAQ']} index={5}>
      <Grid.Container gap={3}>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q1: {t('q1')}</ItemTitle>
            <ItemContent>
              <p>{t('a1-1')}</p>
              <p>{t('a1-2')}</p>
              <p>{t('a1-3')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q2: {t('q2')}</ItemTitle>
            <ItemContent>
              <p>{t('a2')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q3: {t('q3')}</ItemTitle>
            <ItemContent>
              <p>{t('a3')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q4: {t('q4')}</ItemTitle>
            <ItemContent>
              <p>{t('a4')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q5: {t('q5')}</ItemTitle>
            <ItemContent>
              <p>{t('a5-1')}</p>
              <p>{t('a5-2')}</p>
              <p>{t('a5-3')}</p>
              <p>{t('a5-4')}</p>
              <p>{t('a5-5')}</p>
              <p>{t('a5-6')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q6: {t('q6')}</ItemTitle>
            <ItemContent>
              <p>{t('a6')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q7: {t('q7')}</ItemTitle>
            <ItemContent>
              <p>{t('a7-1')}</p>
              <p>{t('a7-2')}</p>
              <p>{t('a7-3')}</p>
              <p>{t('a7-4')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q8: {t('q8')}</ItemTitle>
            <ItemContent>
              <p>{t('a8')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q9: {t('q9')}</ItemTitle>
            <ItemContent>
              <p>{t('a9')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q10: {t('q10')}</ItemTitle>
            <ItemContent>
              <p>{t('a10')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q11: {t('q11')}</ItemTitle>
            <ItemContent>
              <p>{t('a11-1')}</p>
              <p>{t('a11-2')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q12: {t('q12')}</ItemTitle>
            <ItemContent>
              <p>{t('a12')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q13: {t('q13')}</ItemTitle>
            <ItemContent>
              <p>{t('a13')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q14: {t('q14')}</ItemTitle>
            <ItemContent>
              <p>{t('a14')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q15: {t('q15')}</ItemTitle>
            <ItemContent>
              <p>{t('a15')}</p>
            </ItemContent>
          </Item>
        </Grid>
        <Grid sm={24}>
          <Item>
            <ItemTitle>Q16: {t('q16')}</ItemTitle>
            <ItemContent>
              <p>{t('a16')}</p>
            </ItemContent>
          </Item>
        </Grid>
      </Grid.Container>
    </ContentCard>
  )
}

export default CardQA
