/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { Link } from 'gatsby'
import Avatar from './components/avatar'
import Icon from './components/icon'

const ColorSwitcher = props => {
  const [ mode, setMode ] = useColorMode()
  return (
    <button
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title='Cycle Color Mode'
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
        outline: 'none',
      }
    }}>
    <svg
      viewBox='0 0 32 32'
      width='24'
      height='24'
      fill='currentcolor'
      sx={{
        display: 'block',
      }}>
      <circle
        cx='16'
        cy='16'
        r='14'
        fill='none'
        stroke='currentcolor'
        strokeWidth='4'
      />
      <path
        d={`
          M 16 0
          A 16 16 0 0 0 16 32
          z
        `}
      />
    </svg>
    </button>
  )
}


export default ({ xl, ...props }) => {
  const home = props.location.pathname === '/'
  if (home) xl = true

  return (
    <Styled.root
      sx={{
        p: 3,
        fontSize: 1,
        maxWidth: home ? 'xl' : 'container',
        mx: 'auto',
      }}>
      <header sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: [4, 5]
        }}>
        <Avatar />
        <Styled.a
          as={Link}
          to='/'
          sx={{
            fontWeight: 'bold',
            color: 'inherit',
            textDecoration: 'none',
          }}>
          @lachlanjc
          {!home && '/notebook'}
        </Styled.a>
        <ColorSwitcher />
      </header>
      {props.children}
      <div
        sx={{
          py: 4,
          display: 'flex',
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
            href="https://github.com/lachlanjc"
            title="GitHub"
            variant="styles.navitem"
            sx={{ color: 'primary', mx: 2 }}
          >
            <Icon glyph="github" size={36} />
          </a>
          <a
            href="mailto:lachlan@hackpenn.com"
            title="Email"
            variant="styles.navitem"
            sx={{ color: 'primary', mx: 2 }}
          >
            <Icon glyph="email-fill" size={36} />
          </a>
        </div>
    </Styled.root>
  )
}
