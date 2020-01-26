import base from '@theme-ui/preset-base'
import nightOwl from '@theme-ui/prism/presets/night-owl.json'
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
    monospace: 'Menlo, monospace'
  },
  fontSizes: [14, 18, 24, 28, 36, 48, 64, 72, 96, 128],
  fontWeights: {
    heading: 900,
    body: 400
  },
  lineHeights: {
    title: 1.5,
    body: 1.625
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
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  colors: {
    ...palette,
    text: palette.black,
    background: palette.white,
    sunken: palette.snow,
    primary: palette.blue,
    secondary: palette.muted,
    muted: palette.smoke,
    accent: palette.pink,
    modes: {
      dark: {
        text: palette.white,
        background: palette.darker,
        sunken: palette.darkless,
        primary: palette.cyan,
        secondary: palette.muted,
        accent: palette.pink,
        muted: palette.darkless
      }
    }
  },
  variants: {
    sheet: {
      bg: 'sunken',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.0625)',
      overflow: 'hidden'
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
      borderRadius: 6,
      ...nightOwl
    },
    inlineCode: {
      fontFamily: 'monospace',
      px: 1,
      bg: 'muted',
      borderRadius: 3
    },
    blockquote: {
      borderRadius: 'base',
      borderLeft: '4px solid',
      borderLeftColor: 'muted',
      bg: 'sunken',
      ml: 0,
      pl: 3,
      py: 2
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
      mb: 3,
      li: {
        mt: 1,
        mb: 1,
        '&:last-of-type': {
          mb: 3
        }
      },
      '&.task-list-item': {
        my: 1,
        input: {
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
