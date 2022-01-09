/** @jsxImportSource theme-ui */
import { Link, useLoaderData } from 'remix'
import { getPosts } from '~/post'
import type { Post } from '~/post'
import { Container, Heading, Paragraph, Box } from 'theme-ui'

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
      <Box
        as="ol"
        sx={{
          listStyle: 'none',
          p: 0,
          ml: 0,
        }}
      >
        {posts.map(({ name, date, slug }) => (
          <Box
            as="li"
            key={slug}
            sx={date ? { my: 1 } : { display: 'inline-block', mr: 3, mb: 4 }}
          >
            <Box
              as={Link}
              // @ts-expect-error to is required
              to={slug}
              sx={{
                display: 'flex',
                flexDirection: ['column-reverse', 'row'],
                color: 'primary',
                textDecoration: 'none',
                ...(date
                  ? {}
                  : {
                      px: 3,
                      py: 1,
                      border: '2px solid currentColor',
                      borderRadius: 'circle',
                      fontSize: 2,
                      transform: 'rotate(-2deg)',
                    }),
              }}
            >
              {date && (
                <small
                  sx={{
                    mt: [1, 0],
                    mr: [null, 3],
                    fontVariantNumeric: 'tabular-nums',
                    color: 'secondary',
                  }}
                >
                  {date}
                </small>
              )}
              <strong sx={{ lineHeight: 'title' }}>{name}</strong>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  )
}
