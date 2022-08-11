import { BaseStyles } from 'theme-ui'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../lib/components'
import Layout from '../components/layout'
import { allSheets } from 'contentlayer/generated'
// import type { Sheet } from 'contentlayer/generated';

export default function Sheet({ sheet }) {
  const Content = useMDXComponent(sheet.body.code)

  return (
    <Layout>
      <BaseStyles>
        <Content components={components} />
      </BaseStyles>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allSheets.map(({ slug }) => ({ params: { sheet: slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const sheet = allSheets.find(sheet => sheet.slug === params?.sheet)
  return { props: { sheet } }
}
