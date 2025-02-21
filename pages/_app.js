import * as React from 'react'

import theme from '../lib/theme'
import components from '../lib/components'
import { ThemeProvider } from 'theme-ui'
import { Analytics } from '@vercel/analytics/next'
import '../lib/fonts.css'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme} components={components}>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default App
