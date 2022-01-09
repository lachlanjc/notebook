import { Link, useLoaderData } from 'remix'
import { getPosts } from '~/post'
import type { Post } from '~/post'
import { Container, Heading, Paragraph } from 'theme-ui'

export const loader = async () => {
  const posts = await getPosts()
  return { posts }
}

export default function Index() {
  const { posts } = useLoaderData<{ posts: Array<Post> }>()

  return (
    <Container as="main" sx={{ py: 4 }}>
      <Heading as="h1" sx={{ mb: 0 }}>
        Notebook
      </Heading>
      <Paragraph
        sx={{
          color: 'secondary',
          mt: 1,
          a: { color: 'inherit' },
        }}
      >
        (where <a href="https://lachlanjc.com">@lachlanjc</a> publishes whatever
        they&nbsp;want)
      </Paragraph>
      <ol>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.name}</Link>
          </li>
        ))}
      </ol>
    </Container>
  )
}
