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
  pink: '#ffeaeb',
  red: '#ff2467',
  yellow: '#ffaf26',
  blue: '#3b47a8'
}

export default merge(base, {
  fonts: {
    body:
      'Whyte, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading:
      'WhyteInktrap, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [14, 18, 24, 28, 36, 48, 64, 72, 96, 128],
  fontWeights: {
    heading: 800,
    body: 400
  },
  lineHeights: {
    title: 1.25,
    body: 1.625
  },
  sizes: {
    container: 680,
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
    background: palette.pink,
    sunken: palette.snow,
    primary: palette.blue,
    secondary: palette.muted,
    muted: palette.smoke,
    accent: palette.red,
    modes: {
      dark: {
        text: palette.white,
        background: palette.darker,
        sunken: palette.dark,
        primary: palette.blue,
        secondary: palette.muted,
        muted: palette.darkless
      }
    }
  },
  buttons: {
    primary: {
      borderRadius: 'circle',
      transition: 'text-shadow 0.125s ease-in, background-color 0.5s ease-in-out',
      color: 'white !important', // prevent child a selector from overwriting
      ':hover,:focus': {
        bg: 'accent',
        textShadow: '0 0 6px currentColor'
      }
    }
  },
  cards: {
    secondary: {
      borderRadius: 'extra',
      color: 'secondary',
      border: '1px solid',
      borderColor: 'border',
      p: 3,
      my: 0,
      lineHeight: 'caption',
      strong: {
        display: 'block',
        fontSize: 2
      },
      a: {
        display: 'block',
        textDecoration: 'none'
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
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontSize: 2,
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '.25s'
    },
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
