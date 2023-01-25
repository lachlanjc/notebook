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
                gap: [4, 5],
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
          <a
            href="https://mastodon.social/@lachlanjc"
            title="Mastodon"
            target="_blank"
            rel="me"
            style={{ lineHeight: 0 }}
          >
            {/* <Icon glyph="mastodon" size={36} /> */}
            <svg
              width={36}
              height={36}
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.9273 8.35987C21.7016 8.61799 23.1984 9.95007 23.4295 11.6404C23.5301 12.6459 23.4803 14.1568 23.4561 14.8909C23.45 15.0735 23.4456 15.208 23.4455 15.2748C23.4455 15.3735 23.4309 16.2744 23.4251 16.3695C23.2696 18.7848 21.7394 19.7387 20.1315 20.0425C20.1139 20.0477 20.094 20.0515 20.0737 20.0554C20.0687 20.0563 20.0638 20.0573 20.0588 20.0583C19.0394 20.2542 17.9473 20.3064 16.9112 20.335C16.6634 20.3414 16.4164 20.3414 16.1686 20.3414C15.1384 20.3417 14.1118 20.2217 13.1104 19.9839C13.1051 19.9826 13.0995 19.9824 13.0942 19.9836C13.0888 19.9848 13.0838 19.9871 13.0796 19.9905C13.0753 19.994 13.0719 19.9983 13.0697 20.0032C13.0675 20.0082 13.0665 20.0136 13.0668 20.0189C13.0951 20.3398 13.166 20.6557 13.2775 20.9585C13.4163 21.3088 13.9009 22.1504 15.7029 22.1504C16.7499 22.1523 17.7936 22.0323 18.812 21.7929C18.8171 21.7917 18.8225 21.7917 18.8277 21.7928C18.8329 21.794 18.8377 21.7962 18.8419 21.7995C18.8461 21.8027 18.8495 21.8068 18.8518 21.8115C18.8534 21.8145 18.8544 21.8176 18.855 21.8209L18.8556 21.8265V23.012C18.8554 23.0176 18.8539 23.0231 18.8513 23.028C18.8486 23.033 18.8449 23.0373 18.8403 23.0406C18.5225 23.2673 18.0953 23.4008 17.7214 23.5176C17.7039 23.5231 17.6864 23.5285 17.669 23.534C17.4981 23.5869 17.3251 23.6333 17.1503 23.6734C15.5607 24.0297 13.9017 23.9435 12.3591 23.4246C10.9183 22.9269 9.44764 21.7071 9.08434 20.2413C8.89033 19.4477 8.75363 18.6415 8.67527 17.8289C8.59294 16.9402 8.56543 16.05 8.53788 15.1586C8.5275 14.8228 8.51712 14.4869 8.5038 14.1508C8.46965 13.2942 8.48926 12.3604 8.67309 11.5181C9.05528 9.80778 10.6305 8.61084 12.3555 8.35987C12.3909 8.35471 12.4301 8.34793 12.4759 8.33999C12.8173 8.28089 13.5299 8.15752 15.8467 8.15752H15.8664C18.4937 8.15752 19.6279 8.31626 19.9273 8.35987ZM19.2639 17.6673H20.9547L20.9561 13.4679C20.9561 12.6095 20.7336 11.9278 20.2884 11.423C19.8277 10.9189 19.2254 10.6601 18.4785 10.6601C17.6146 10.6601 16.9606 10.9876 16.5247 11.6418L16.1032 12.3368L15.6825 11.6418C15.2466 10.9876 14.5926 10.6601 13.7273 10.6601C12.9796 10.6601 12.3773 10.9189 11.9181 11.423C11.4729 11.9283 11.2503 12.6099 11.2503 13.4679V17.6673H12.9396V13.5917C12.9404 12.7336 13.3073 12.296 14.0419 12.296C14.8542 12.296 15.2618 12.8137 15.2618 13.8362V16.067H16.9425V13.8362C16.9425 12.8137 17.3493 12.296 18.1617 12.296C18.9006 12.296 19.2639 12.7336 19.2639 13.5917V17.6673Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C26 4 28 6 28 16C28 26 26 28 16 28C6 28 4 26 4 16C4 6 6 4 16 4ZM24.336 7.665C23.247 6.576 21.1 6 16 6C10.9 6 8.753 6.576 7.664 7.665C6.575 8.753 6 10.9 6 16C6 21.1 6.575 23.247 7.664 24.336C8.753 25.425 10.9 26 16 26C21.1 26 23.247 25.425 24.336 24.336C25.425 23.247 26 21.1 26 16C26 10.9 25.425 8.754 24.336 7.665Z"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/lachlanjc"
            title="Twitter"
            target="_blank"
            rel="me"
          >
            <Icon glyph="twitter" size={36} />
          </a>
          <a
            href="https://github.com/lachlanjc/notebook"
            title="GitHub"
            target="_blank"
          >
            <Icon glyph="github" size={36} />
          </a>
          <a
            href="https://instagram.com/lachlan.jc"
            title="Instagram"
            target="_blank"
            rel="me"
          >
            <Icon glyph="instagram" size={36} />
          </a>
          <a href="mailto:lachlanjc@hey.com" title="Email">
            <Icon glyph="email" size={36} />
          </a>
          <a href="/feed.xml" title="RSS">
            <Icon glyph="rss" size={36} />
          </a>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Layout
