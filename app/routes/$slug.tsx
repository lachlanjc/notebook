import { useMemo } from 'react'
import {
  type MetaFunction,
  type LoaderFunction,
  type LinksFunction,
  type RouteHandle,
  json,
  useLoaderData,
} from 'remix'
import { notFound } from 'remix-utils'

import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import { bundleMDX, getContentPath, readFile } from '~/post/compile-mdx.server'
import { getPost, postsPath, type Post } from '~/post/util'

interface LoaderData {
  post: Post
  code: string
}
export const loader: LoaderFunction = async ({ params: { slug = '' } }) => {
  const post = getPost(slug)
  const filePath = getContentPath(slug)
  const source = await readFile(filePath, { encoding: 'utf-8' }).catch(() => {
    // throw notFound({ message: "This post doesn't exist." })
    throw new Response('Not Found', {
      status: 404,
    })
  })
  const { code } = await bundleMDX({
    cwd: postsPath,
    file: filePath,
    source,
  })

  // const canonical =
  //   frontmatter.canonical ||
  //   `${rootUrl}/${frontmatter?.lang}${frontmatter?.slug}`
  return json({ post, code })
}

export default function PostSlug() {
  const { code } = useLoaderData<LoaderData>()
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <article>
      <Component />
    </article>
  )
}
