import RSS from 'rss'
import { allSheets } from 'contentlayer/generated'

export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: '@lachlanjc/notebook',
    site_url: 'https://notebook.lachlanjc.com',
    feed_url: 'https://notebook.lachlanjc.com/feed.xml',
    image_url: 'https://github.com/lachlanjc.png',
    language: 'en_US',
  })

  allSheets
    .filter(sheet => sheet.date != null)
    .map(sheet => {
      feed.item({
        title: sheet.name,
        url: `https://notebook.lachlanjc.com/${sheet.slug}`,
        guid: sheet.slug,
        date: sheet.date,
        description: sheet.body.raw,
      })
    })

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
