import base from '@theme-ui/preset-base'
// import nightOwl from '@theme-ui/prism/presets/vs-dark.json'
import { merge } from 'theme-ui'
import { makeTheme } from '@theme-ui/css/utils'

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
  blue: '#3b47a8',
  lilac: '#849de1',
  rose: '#ff707a',
}

const theme = merge(base, {
  fonts: {
    body: 'Whyte, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading:
      'WhyteInktrap, ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  fontSizes: [14, 18, 24, 28, 36, 48, 64, 72, 96, 128],
  fontWeights: {
    heading: 'bold',
    body: 400,
  },
  lineHeights: {
    title: 1.25,
    body: 1.625,
  },
  sizes: {
    container: 680,
    xl: 1024,
  },
  radii: {
    base: 6,
    extra: 9,
    circle: 9999,
  },
  initialColorModeName: 'light',
  printColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  colors: {
    ...palette,
    text: palette.black,
    background: palette.pink,
    sunken: palette.snow,
    primary: palette.blue,
    secondary: palette.lilac,
    muted: palette.smoke,
    accent: palette.red,
    modes: {
      dark: {
        text: palette.pink,
        background: palette.darker,
        sunken: palette.dark,
        primary: palette.yellow,
        secondary: palette.muted,
        muted: palette.darkless,
      },
    },
  },
  buttons: {
    primary: {
      borderRadius: 'circle',
      transition:
        'text-shadow 0.125s ease-in, background-color 0.5s ease-in-out',
      color: 'white !important', // prevent child a selector from overwriting
      ':hover,:focus': {
        bg: 'accent',
        textShadow: '0 0 6px currentColor',
      },
    },
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
        fontSize: 2,
      },
      a: {
        display: 'block',
        textDecoration: 'none',
      },
    },
  },
  variants: {
    sheet: {
      bg: 'sunken',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.0625)',
      overflow: 'hidden',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'text',
      fontSize: 2,
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '.25s',
    },
    h2: {
      fontSize: [3, 4],
      mt: [3, 4],
      mb: 2,
    },
    hr: {
      border: 0,
      height: 4,
      maxWidth: 256,
      bg: 'accent',
      borderRadius: 2,
      mx: 'auto',
      my: [3, 4],
    },
    pre: {
      p: 3,
      mx: [null, -3],
      bg: 'sunken',
      color: 'white',
      borderRadius: 'base',
      lineHeight: 1.375,
      fontSize: 0,
      '.plain, .parameter, .imports, .maybe-class-name, .interpolation': {
        color: 'accent',
      },
      '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
        color: 'secondary',
      },
      '.comment': {
        fontStyle: 'italic',
      },
      '.property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable':
        {
          color: 'yellow',
        },
      '.atrule, .attr-value, .keyword': {
        color: 'primary',
      },
      '.selector, .attr-name, .string, .char, .builtin, .inserted': {
        color: 'lilac',
      },
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'accent',
    },
    'p > code, li > code': {
      fontSize: '0.875em',
      ':before,:after': { content: '"`"' },
    },
    kbd: {
      fontFamily: 'monospace',
      color: 'accent',
      fontSize: '0.875em',
    },
    mark: {
      color: 'dark',
      bg: 'yellow',
      px: 2,
      mr: -1,
      borderRadius: '1em 0.5em',
    },
    blockquote: {
      borderLeft: '5px dotted',
      borderLeftColor: 'rose',
      ml: [0, -3],
      pl: 3,
      p: { color: 'rose' },
    },
    a: {
      color: 'primary',
      transition: 'color 0.125s ease-in-out',
      ':hover,:focus': {
        color: 'accent',
      },
    },
    'p > img:first-of-type:last-of-type, p > a:first-child:last-child > img': {
      display: 'block',
      transform: ['translateX(-0.5rem)', null, 'translateX(-1.5rem)'],
      width: ['calc(100% + 1rem)', null, 'calc(100% + 3rem)'],
      maxWidth: 'unset',
      maxHeight: '75vh',
      objectPosition: 'center',
      objectFit: 'contain',
      mx: 'auto',
      borderRadius: 'extra',
    },
    ul: {
      listStyleType: 'disc',
      pl: '1.375rem',
      '&.contains-task-list': {
        listStyle: 'none',
        pl: 3,
      },
    },
    li: {
      my: 2,
      '::marker': {
        fontSize: 'inherit',
        color: 'secondary',
      },
      li: {
        mt: 1,
        mb: 1,
        '&:last-of-type': {
          mb: 2,
        },
      },
      '&.task-list-item': {
        my: 1,
        input: {
          mr: 2,
        },
      },
    },
  },
})

export default makeTheme(theme)
