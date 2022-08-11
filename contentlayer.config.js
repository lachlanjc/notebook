import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { hasDate, getDate, getName } from './lib/util'
import remarkGfm from 'remark-gfm'
import rehypeAccessibleEmojis from 'rehype-accessible-emojis'

export const Sheet = defineDocumentType(() => ({
  name: 'Sheet',
  filePathPattern: '*.mdx',
  contentType: 'mdx',
  fields: {},
  computedFields: {
    slug: {
      type: 'string',
      resolve: ({ _raw: doc }) => doc.sourceFileName.replace(/\.mdx$/, ''),
    },
    name: {
      type: 'string',
      resolve: ({ _raw: doc }) =>
        getName(doc.sourceFileName.replace(/\.mdx$/, '')),
    },
    date: {
      type: 'string',
      resolve: ({ _raw: { sourceFileName } }) =>
        hasDate(sourceFileName) ? getDate(sourceFileName) : null,
    },
  },
}))

export default makeSource({
  contentDirPath: 'sheets',
  documentTypes: [Sheet],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeAccessibleEmojis],
  },
})
