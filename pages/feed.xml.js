import RSS from 'rss'
import { allSheets } from 'contentlayer/generated'
import { remark } from 'remark'
import mdx from 'remark-mdx'
import strip from 'remark-mdx-to-plain-text'

export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: '@lachlanjc/notebook',
    site_url: 'https://notebook.lachlanjc.com',
    feed_url: 'https://notebook.lachlanjc.com/feed.xml',
    image_url: 'https://github.com/lachlanjc.png',
    language: 'en_US',
  })

  const capitalLetter = /^[A-Z]/

  await Promise.all(
    allSheets
      .filter(sheet => sheet.date != null)
      .map(async sheet => {
        feed.item({
          title: sheet.name,
          url: `https://notebook.lachlanjc.com/${sheet.slug}`,
          guid: sheet.slug,
          date: sheet.date,
          description: await remark()
            .use(mdx)
            .use(strip)
            .process(
              sheet.body.raw
                .split('\n\n')
                .filter(text => text.match(capitalLetter))?.[0],
            )
            .then(file => String(file).trim()),
        })
      }),
  )

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  )
  res.write(feed.xml({ indent: true }))
  res.end()

  return {
    props: {},
  }
}

export default function RSSFeed() {
  return null
}
