/** @jsx jsx */
import { jsx, Box, BaseStyles, useColorMode } from 'theme-ui'
import { Link } from 'gatsby'
import Avatar from './components/avatar'
import Icon from './components/icon'
import Meta from './components/meta'
import { getName, getDescription, getImage } from './util'
import theme from './gatsby-plugin-theme-ui'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <button
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
      sx={{
        display: 'inline-block',
        appearance: 'none',
        bg: 'transparent',
        color: 'inherit',
        p: 1,
        m: 0,
        border: 0,
        borderRadius: 9999,
        transition: 'box-shadow .125s ease-in-out',
        ':hover,:focus': {
          color: 'primary',
          boxShadow: '0 0 0 3px',
          outline: 'none'
        }
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="currentcolor"
        sx={{
          display: 'block'
        }}
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentcolor"
          strokeWidth="4"
        />
        <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
      </svg>
    </button>
  )
}

export default ({ xl, ...props }) => {
  const path = props.location.pathname
  const home = path === '/'
  if (home) xl = true
  const base = '@lachlanjc/notebook'
  const name = home ? base : getName(path)

  return (
    <Box
      as="main"
      sx={{
        p: 3,
        fontSize: 1,
        maxWidth: home ? 'xl' : 'container',
        lineHeight: 'body',
        mx: 'auto'
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
          mb: [4, 5]
        }}
      >
        <Avatar />
        <Link
          to="/"
          sx={{
            fontWeight: 'bold',
            color: 'inherit',
            textDecoration: 'none',
            mr: 'auto'
          }}
        >
          @lachlanjc
          {!home && '/notebook'}
        </Link>
        <ColorSwitcher />
      </header>
      <p
        variant="container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'secondary',
          mt: 0,
          mb: [3, 4]
        }}
      >
        <Icon glyph="view" sx={{ mr: 2 }} />
        Page views:
        <img
          src={`https://lachlanjc-analytics.glitch.me/counter.png?fallback=notebook.lachlanjc.me&color=${theme.colors.secondary.replace(
            '#',
            '%23'
          )}`}
          alt="View counter"
          style={{ verticalAlign: 'bottom' }}
        />
      </p>
      <BaseStyles as="article">{props.children}</BaseStyles>
      <footer
        sx={{
          py: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar />
        <a
          href="https://twitter.com/lachlanjc"
          title="Twitter"
          variant="styles.navitem"
          sx={{ color: 'primary', mx: 2 }}
        >
          <Icon glyph="twitter" size={36} />
        </a>
        <a
          href="https://github.com/lachlanjc/notebook"
          title="GitHub"
          variant="styles.navitem"
          sx={{ color: 'primary', mx: 2 }}
        >
          <Icon glyph="github" size={36} />
        </a>
        <a
          href="mailto:lachlan@hackclub.com"
          title="Email"
          variant="styles.navitem"
          sx={{ color: 'primary', mx: 2 }}
        >
          <Icon glyph="email-fill" size={36} />
        </a>
      </footer>
    </Box>
  )
}
