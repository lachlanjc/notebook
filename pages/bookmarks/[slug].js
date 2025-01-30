import { Themed } from 'theme-ui'
import Layout from '../../components/layout'
import CraftBlocks from '../../components/craft'
import { bookmarkPages, cityPages, getDocBlocks } from '../../lib/bookmarks'

export default function Bookmarks({ slug, title, blocks }) {
  return (
    <Layout>
      <Themed.h1>{title}</Themed.h1>
      <CraftBlocks blocks={blocks} showLinkIcons />
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(bookmarkPages)
      .concat(Object.keys(cityPages))
      .map(slug => ({
        params: { slug },
      })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const { title, id } = bookmarkPages[slug] ?? cityPages[slug]
  const blocks = await getDocBlocks(id)
  return { props: { slug, title, blocks }, revalidate: 20 }
}
