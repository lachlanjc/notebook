/** @jsxImportSource theme-ui */
import Link from 'next/link'
import Layout from '../components/layout'
import { pick, isEmpty, orderBy } from 'lodash-es'
import { Themed, Paragraph, Link as A, Heading, Divider } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'
import { bookmarkPages } from 'lib/bookmarks'

export default function IndexPage({ sheets, now }) {
  return (
    <Layout xl>
      <div sx={{ gridColumn: [null, 'span 2'] }}>
        <Themed.h1 sx={{ m: 0 }}>Notebook</Themed.h1>
        <Paragraph sx={{ color: 'secondary', mt: 1, a: { color: 'inherit' } }}>
          (where <a href="https://lachlanjc.com">@lachlanjc</a> publishes
          whatever they&nbsp;want)
        </Paragraph>
      </div>

      <ol
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
        }}
      >
        {sheets.map(({ name, date, slug }) => (
          <li
            key={slug}
            sx={
              isEmpty(date)
                ? { display: 'inline-block', mr: 3, mb: 3 }
                : { my: 2 }
            }
          >
            <Link href={`/${slug}`} passHref>
              <A
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'row'],
                  color: 'primary',
                  textDecoration: 'none',
                  ...(isEmpty(date)
                    ? {
                        px: 3,
                        py: 1,
                        border: '2px solid currentColor',
                        borderRadius: 'circle',
                        transform: 'rotate(-2deg)',
                      }
                    : {}),
                }}
              >
                <strong sx={{ lineHeight: 'title' }}>{name}</strong>
                {!isEmpty(date) && (
                  <small
                    sx={{
                      mt: [1, 0],
                      pl: [null, 3],
                      ml: [null, 'auto'],
                      fontVariantNumeric: 'tabular-nums',
                      color: 'secondary',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {date}
                  </small>
                )}
              </A>
            </Link>
          </li>
        ))}
      </ol>
      <aside>
        <Heading as="h3">
          Now
          {/* <Link href="/now" passHref>
            <A
              sx={{
                ml: 'auto',
                aspectRatio: '1 / 1',
                bg: 'primary',
                color: 'background',
                px: 1,
                lineHeight: 1.25,
                fontFamily: 'body',
                fontWeight: 'normal',
                fontSize: 1,
                textDecoration: 'none',
                borderRadius: 999,
                display: 'inline-block',
              }}
            >
              →
            </A>
          </Link> */}
        </Heading>
        <Paragraph sx={{ mt: 3, mb: 4 }}>
          After leaving Watershed at the end of July, I’m at home in State
          College, PA, working on web side projects & learning to drive before I
          return to NYU in September.
        </Paragraph>
        <Divider sx={{ my: 4, display: ['none', 'block'] }} />
        <Heading as="h3">Collected web lists</Heading>
        <ul sx={{ listStyle: 'none', p: 0 }}>
          {Object.keys(bookmarkPages)
            .filter(slug => slug.includes('-'))
            .map(slug => (
              <li key={slug}>
                <Link href={`/bookmarks/${slug}`} passHref>
                  <A
                    sx={{
                      color: 'primary',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      mb: 1,
                      display: 'block',
                    }}
                  >
                    {bookmarkPages[slug].title}
                  </A>
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </Layout>
  )
}

export const getStaticProps = () => {
  const sheets = orderBy(
    allSheets
      .concat([
        { slug: 'shortcuts', name: 'Shortcuts' },
        { slug: 'bookmarks/articles', name: 'Recent Reads' },
      ])
      .map(sheet => pick(sheet, ['slug', 'name', 'date'])),
    ['date', 'name'],
    ['desc', 'desc'],
  )

  return { props: { sheets } }
}
