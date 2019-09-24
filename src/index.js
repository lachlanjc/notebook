/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link } from 'gatsby'
import theme from './gatsby-plugin-theme-ui'
import Layout from './layout'
import { filter, startCase, includes, isEmpty, orderBy } from 'lodash'
import { format } from 'date-fns'

export const wrapPageElement = ({ element, props }) =>
  <Layout {...props}>
    {element}
  </Layout>

export const Banner = props => (
  <div
    sx={{
      display: 'flex',
      flexDirection: ['column', 'row'],
      alignItems: ['flex-start', 'center'],
      mb: [4, 5],
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
    <img src={`https://contrast.now.sh/fff/${theme.colors.primary.replace('#', '')}?text=%F0%9F%93%9D&radius=999&size=512&fontSize=2&baseline=1`} width={72} />
    <div>
      {props.children}
    </div>
  </div>
)

export const Nav = props => {
  const data = useStaticQuery(pages)
  const nodes = filter(data.allSitePage.nodes, n => !includes(['/', '/dev-404-page/'], n.path))
  
  const getName = path => startCase(
    path.replace(/(\d{4}-\d{2}-\d{2})/, '').replace('-', ' ').replace('/', '')
  ).replace('Ipad', 'iPad').replace('Iphone', 'iPhone').replace('Macbook', 'MacBook').replace('Ios', 'iOS').replace('iPados', 'iPadOS')
   .replace('Mdx', 'MDX').replace('Ui', 'UI')
   .replace('A ', 'a ').replace('In ', 'in ').replace('Via', 'via')
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
