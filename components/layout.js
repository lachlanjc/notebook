/** @jsxImportSource theme-ui */
import { Box, BaseStyles, Flex, useColorMode } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Avatar from './avatar'
import Icon from './icon'
import Meta from './meta'
import { getName, getDescription, getImage } from '../lib/util'
import theme from '../lib/theme'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <button
      {...props}
      onClick={() => {
        // https://paco.me/writing/disable-theme-transitions
        const css = document.createElement('style')
        css.setAttribute('type', 'text/css')
        css.appendChild(
          document.createTextNode(
            `* {
              -webkit-transition: none !important;
              -moz-transition: none !important;
              -o-transition: none !important;
              -ms-transition: none !important;
              transition: none !important;
            }`,
          ),
        )
        document.head.appendChild(css)
        setMode(mode === 'dark' ? 'light' : 'dark')
        setTimeout(() => {
          // Calling getComputedStyle forces the browser to redraw
          // const _ = window.getComputedStyle(css).opacity
          document.head.removeChild(css)
        }, 50)
      }}
      title="Switch color theme"
      sx={{
        display: 'inline-block',
        appearance: 'none',
        bg: 'transparent',
        color: 'primary',
        p: 1,
        m: 0,
        lineHeight: 0,
        border: 0,
        borderRadius: 9999,
        transition: '.125s ease-in-out',
        transitionProperty: 'box-shadow, color',
        ':hover,:focus': {
          color: 'accent',
          boxShadow: '0 0 0 3px',
          outline: 'none',
        },
      }}
    >
      <svg viewBox="0 0 32 32" width={24} height={24}>
        <circle
          cx={16}
          cy={16}
          r={14}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
        />
        <path d="M 16 0 A 16 16 0 0 0 16 32 z" fill="currentColor" />
      </svg>
    </button>
  )
}

const Layout = ({ xl, sx, ...props }) => {
  const { asPath: path } = useRouter()
  const home = path === '/'
  const base = '@lachlanjc/notebook'
  const name = home ? base : getName(path)
  const counterColor = theme.colors.secondary.replace('#', '%23')

  return (
    <Box
      as="main"
      sx={{
        p: 3,
        fontSize: 1,
        maxWidth: xl ? 'xl' : 'container',
        lineHeight: 'body',
        mx: 'auto',
      }}
    >
      <Meta
        title={home ? base : `${name} – ${base}`}
        name={name}
        description={getDescription(path)}
        image={getImage(path)}
      />
      <header
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Avatar />
        <Link href="/" passHref>
          <a
            sx={{
              fontWeight: 'bold',
              color: 'inherit',
              textDecoration: 'none',
              mr: 'auto',
            }}
          >
            @lachlanjc
            {!home && '/notebook'}
          </a>
        </Link>
        <ColorSwitcher />
      </header>
      <Box
        as="article"
        sx={
          xl
            ? {
                display: 'grid',
                gridTemplateColumns: [null, '1fr 256px'],
                gap: [3, 4],
                columnGap: [null, 4, 5],
              }
            : sx
        }
      >
        {props.children}
      </Box>
      <Flex
        as="footer"
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 4,
          gap: 3,
        }}
      >
        <Flex
          as="p"
          sx={{
            alignItems: 'center',
            color: 'secondary',
            mt: 0,
            mb: 3,
            img: { verticalAlign: 'bottom' },
          }}
        >
          <Icon glyph="view" sx={{ mr: 2 }} />
          Site views:
          <img
            src={`https://lachlanjc-analytics.glitch.me/counter.png?fallback=notebook.lachlanjc.com&color=${counterColor}`}
            alt="View counter"
          />
        </Flex>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            a: { color: 'primary', mx: 2 },
          }}
        >
          <a href="https://twitter.com/lachlanjc" title="Twitter">
            <Icon glyph="twitter" size={36} />
          </a>
          <a href="https://github.com/lachlanjc/notebook" title="GitHub">
            <Icon glyph="github" size={36} />
          </a>
          <a href="mailto:lachlanjc@hey.com" title="Email">
            <Icon glyph="email" size={36} />
          </a>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Layout
