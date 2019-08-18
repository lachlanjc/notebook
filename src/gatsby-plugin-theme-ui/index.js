import base from '@theme-ui/preset-base'
import { merge } from 'lodash'

export const palette = {
  darker: '#121217',
  dark: '#17171d',
  darkless: '#252429',
  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  muted: '#8492a6',
  smoke: '#e0e6ed',
  snow: '#f9fafc',
  white: '#ffffff',
  pink: '#FF0080',
  red: '#EE0000',
  yellow: '#F5A623',
  cyan: '#79FFE1',
  blue: '#0070F3'
}

export default merge(base, {
  fonts: {
    body: 'system-ui, Roboto, sans-serif',
    heading: 'system-ui, Roboto, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [14, 18, 24, 28, 36, 48, 64, 72, 96, 128],
  fontWeights: {
    heading: 900,
    body: 400
  },
  sizes: {
    container: 768,
    xl: 1024
  },
  radii: {
    base: 6,
    extra: 9,
    circle: 9999
  },
  initialColorMode: 'light',
  useCustomProperties: true,
  colors: {
    ...palette,
    text: palette.black,
    background: palette.white,
    elevated: palette.white,
    primary: palette.blue,
    secondary: palette.muted,
    muted: palette.smoke,
    accent: palette.pink,
    modes: {
      dark: {
        text: palette.white,
        background: palette.darker,
        elevated: palette.darkless,
        primary: palette.cyan,
        secondary: palette.muted,
        accent: palette.pink,
        muted: palette.darkless
      }
    }
  },
  styles: {
    hr: {
      border: 0,
      height: 4,
      bg: 'muted',
      borderRadius: 2,
      my: [3, 4]
    },
    pre: {
      p: 3,
      bg: 'muted',
      borderRadius: 6
    },
    inlineCode: {
      fontFamily: 'monospace',
      px: 1,
      bg: 'muted',
      borderRadius: 3
    },
    a: {
      color: 'primary'
    },
    ul: {
      '&.contains-task-list': {
        listStyle: 'none',
        pl: 3
      }
    },
    li: {
      '&.task-list-item': {
        my: 1,
        'input': {
          mr: 2
        }
      }
    },
    navitem: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      ':hover,:focus': {
        color: 'primary'
      }
    }
  }
})
