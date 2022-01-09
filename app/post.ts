import path from 'path'
import fs from 'fs/promises'
import { orderBy } from 'lodash'
import { getName, hasDate, getDate, formatDate } from '~/util'

export type Post = {
  name: string
  date: string | null
  slug: string
}

const postsPath = path.join(__dirname, '..', '..', 'src', 'pages')

export async function getPosts() {
  const nodes = await fs.readdir(postsPath)

  const posts = orderBy(
    nodes.map(path => {
      const filename = path.replace('.mdx', '')
      const post: Post = {
        name: getName(filename),
        date: hasDate(filename) ? getDate(filename) : null,
        slug: filename,
      }
      if (post.date && hasDate(filename) && post.name === '') {
        const dt = new Date(post.date)
        dt.setDate(dt.getDate() + 1) // I hate everything & everything hates me
        post.name = formatDate(dt)
      }
      return post
    }),
    ['date', 'name'],
    ['desc', 'desc'],
  )

  return posts
}
