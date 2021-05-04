// import React from 'react'
import {
  Themes,
  GeistProvider,
  CssBaseline,
  GeistUIThemesBreakpoints,
} from '@geist-ui/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

const breakpoints: GeistUIThemesBreakpoints = {
  xs: { min: '0', max: '640px' },
  sm: { min: '640px', max: '800px' },
  md: { min: '800px', max: '1280px' },
  lg: { min: '1280px', max: '1600px' },
  xl: { min: '1600px', max: '10000px' },
}

const _palette = {
  yg01: '#D1FF52',
  gr01: '#64EEAC',
  re01: '#EB5757',
  bl01: 'rgba(0, 0, 0, .9)',
  bl02: 'rgba(0, 0, 0, .5)',
  bl03: 'rgba(0, 0, 0, .2)',
  bl04: '#222222',
  wh01: 'rgba(255, 255, 255, .9)',
  wh02: 'rgba(255, 255, 255, .5)',
  wh03: 'rgba(255, 255, 255, .2)',
  background: '#222222',
}

const phalaTheme = Themes.createFromDark({
  type: 'phala',
  palette: _palette,
  breakpoints,
})

const themeType = 'phala'
const themes = [phalaTheme]

export const palette = {
  ...phalaTheme.palette,
  ..._palette,
}

export const WithTheme: React.FC = ({ children }) => (
  <>
    <GeistProvider themeType={themeType} themes={themes}>
      <ThemeProvider theme={palette}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </GeistProvider>
  </>
)

export default phalaTheme
