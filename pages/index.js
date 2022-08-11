/** @jsxImportSource theme-ui */
import Link from 'next/link'
import Layout from '../components/layout'
import { pick, isEmpty, orderBy } from 'lodash-es'
import { Themed, Paragraph, Link as A } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'

export default function IndexPage({ sheets }) {
  return (
    <Layout>
      <Themed.h1 sx={{ mt: 4, mb: 0 }}>Notebook</Themed.h1>
      <Paragraph sx={{ color: 'secondary', mt: 1, a: { color: 'inherit' } }}>
        (where <a href="https://lachlanjc.com">@lachlanjc</a> publishes whatever
        they&nbsp;want)
      </Paragraph>

      <ol
        sx={{
          listStyle: 'none',
          p: 0,
          ml: 0,
          mt: 4,
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
                  flexDirection: ['column-reverse', 'row'],
                  color: 'primary',
                  textDecoration: 'none',
                  ...(isEmpty(date)
                    ? {
                        px: 3,
                        py: 1,
                        border: '2px solid currentColor',
                        borderRadius: 'circle',
                        fontSize: 2,
                        transform: 'rotate(-2deg)',
                      }
                    : {}),
                }}
              >
                {!isEmpty(date) && (
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
              </A>
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export const getStaticProps = () => {
  const sheets = orderBy(
    allSheets.map(sheet => pick(sheet, ['slug', 'name', 'date'])),
    ['date', 'name'],
    ['desc', 'desc'],
  )

  return { props: { sheets } }
}
