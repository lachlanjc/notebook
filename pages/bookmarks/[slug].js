import { Themed } from 'theme-ui'
import Layout from '../../components/layout'
import CraftBlocks from '../../components/craft'
import { bookmarkPages, getDocBlocks } from '../../lib/bookmarks'

export default function Bookmarks({ title, blocks }) {
  return (
    <Layout>
      <Themed.h1>{title}</Themed.h1>
      <CraftBlocks blocks={blocks} />
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(bookmarkPages).map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const { title, id } = bookmarkPages[slug]
  const blocks = await getDocBlocks(id)
  return { props: { title, blocks }, revalidate: 20 }
}
