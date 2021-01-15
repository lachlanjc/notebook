/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'
import theme from './gatsby-plugin-theme-ui'
import Layout from './layout'
import { hasDate, getDate, getName } from './util'
import { filter, includes, isEmpty, orderBy } from 'lodash'
import { format } from 'date-fns'

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

export const Banner = props => (
  <div
    sx={{
      display: 'flex',
      flexDirection: ['column', 'row'],
      alignItems: ['flex-start', 'center'],
      mb: 4,
      img: {
        width: [72, 96],
        maxWidth: '100%',
        mr: [0, 3, 4],
        mb: [3, 0]
      },
      h1: {
        mt: 0,
        mb: 0,
        lineHeight: 'heading'
      },
      p: {
        mt: 1,
        mb: 0,
        fontSize: [2, 3],
        lineHeight: 'heading',
        color: 'secondary'
      },
      a: {
        color: 'primary'
      }
    }}
  >
    <img
      alt="Logo"
      src={`https://contrast.now.sh/fff/${theme.colors.primary.replace(
        '#',
        ''
      )}?text=%F0%9F%93%9D&radius=999&size=512&fontSize=2&baseline=1`}
      width={72}
    />
    <div>{props.children}</div>
  </div>
)

export const Nav = props => {
  const data = useStaticQuery(pages)
  const nodes = filter(
    data.allSitePage.nodes,
    n => !includes(['/', '/dev-404-page/'], n.path)
  )

  const links = orderBy(
    nodes.map(node => {
      const { path } = node
      node.name = getName(path)
      node.date = hasDate(path) ? getDate(path) : null
      if (hasDate(path) && node.name === '') {
        const date = new Date(node.date)
        date.setDate(date.getDate() + 1) // I hate everything & everything hates me
        node.name = format(date, 'MMMM dd, yyyy')
      }
      return node
    }),
    ['date', 'name'],
    ['desc', 'desc']
  )

  return (
    <ol
      sx={{
        listStyle: 'none',
        p: 0,
        ml: 0,
        mt: -3
      }}
    >
      {links.map(({ name, date, path }) => (
        <li
          key={path}
          sx={
            isEmpty(date)
              ? { display: 'inline-block', mr: 3, mb: 4 }
              : { mb: 1 }
          }
        >
          <Link
            to={path}
            sx={{
              display: 'flex',
              flexDirection: ['column-reverse', 'row'],
              color: 'primary',
              textDecoration: 'none',
              ...(isEmpty(date)
                ? {
                    px: 2,
                    border: '2px solid currentColor',
                    borderRadius: 'base'
                  }
                : {})
            }}
          >
            {!isEmpty(date) && (
              <small
                sx={{
                  mt: [1, 0],
                  mr: [null, 3],
                  fontVariantNumeric: 'tabular-nums',
                  color: 'secondary'
                }}
              >
                {date}
              </small>
            )}
            <strong sx={{ lineHeight: 'title' }}>{name}</strong>
          </Link>
        </li>
      ))}
    </ol>
  )
}

const pages = graphql`
  query Pages {
    allSitePage {
      nodes {
        path
      }
    }
  }
`
