/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Layout from './layout'
import { hasDate, getDate, getName } from './util'
import { filter, isEmpty, orderBy } from 'lodash'
import { format } from 'date-fns'

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

export const Nav = () => {
  const data = useStaticQuery(pages)
  const nodes = filter(
    data.allSitePage.nodes,
    ({ path }) => path !== '/' && !path.includes('404')
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
        ml: 0
      }}
    >
      {links.map(({ name, date, path }) => (
        <li
          key={path}
          sx={
            isEmpty(date)
              ? { display: 'inline-block', mr: 3, mb: 4 }
              : { my: 1 }
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
                  px: 3,
                  py: 1,
                  border: '2px solid currentColor',
                  borderRadius: 'circle',
                  fontSize: 2,
                  transform: 'rotate(-2deg)'
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
