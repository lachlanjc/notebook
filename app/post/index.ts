import fs from 'fs/promises'
import { orderBy } from 'lodash'
import { postsPath, getPost, type Post } from './util'

export async function getPosts() {
  const nodes = await fs.readdir(postsPath)
  const posts = orderBy(nodes.map(getPost), ['date', 'name'], ['desc', 'desc'])
  return posts
}
