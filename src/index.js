/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Layout from './layout'
import { filter, startCase, includes, isEmpty, orderBy } from 'lodash'
import { format } from 'date-fns'

export const wrapPageElement = ({ element, props }) =>
  <Layout {...props}>
    {element}
  </Layout>

export const Nav = props => {
  const data = useStaticQuery(pages)
  const nodes = filter(data.allSitePage.nodes, n => !includes(['/', '/dev-404-page/'], n.path))
  
  const getName = path => startCase(path.replace(/(\d{4}-\d{2}-\d{2})/, '').replace('-', ' ').replace('/', ''))
  const hasDate = path => !isEmpty(path.match(/^\/\d{4}-/))
  const getDate = path => path.match(/(\d{4}-\d{2}-\d{2})/)[0]
  
  const links = orderBy(nodes.map(node => {
    const { path } = node
    node.name = getName(path)
    node.date = hasDate(path) ? getDate(path) : null
    if (hasDate(path) && node.name === '') {
      const date = new Date(node.date)
      date.setDate(date.getDate() + 1) // I hate everything & everything hates me
      node.name = format(date, 'MMMM dd, yyyy')
    }
    return node
  }), ['date', 'name'], ['desc', 'asc'])

  return (
    <ul
      sx={{
        listStyle: 'none',
        display: 'grid',
        p: 0,
        m: 0,
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
      }}>
      {links.map(({ name, date, path }) => (
        <li key={path}>
          <Link to={path} sx={{ color: 'primary', textDecoration: 'none' }}>
            <span sx={{ display: 'block', fontWeight: 600 }}>{name}</span>
            {!isEmpty(date) &&
              <small sx={{ display: 'block', color: 'secondary' }}>{date}</small>
            }
          </Link>
        </li>
      ))}
    </ul>
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
