import RSS from 'rss'
import { allSheets } from '../.contentlayer/generated/Sheet/_index.mjs'
import { remark } from 'remark'
import strip from 'remark-mdx-to-plain-text'
import { writeFileSync } from 'fs'

async function generateFeed() {
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

  const body = feed.xml({ indent: true })
  writeFileSync('public/feed.xml', body)
}

generateFeed()
