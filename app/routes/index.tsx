import { Link, useLoaderData } from 'remix'
import { getPosts } from '~/post'
import type { Post } from '~/post'

export const loader = async () => {
  const posts = await getPosts()
  return { posts }
}

export default function Index() {
  const { posts } = useLoaderData<{ posts: Array<Post> }>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Notebook</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
