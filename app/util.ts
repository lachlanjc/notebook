import title from 'title'
import { isEmpty, startCase } from 'lodash'
import { format } from 'date-fns'

export const getName = (path: string) => {
  let name = startCase(
    path
      .replace(/(\d{4}-\d{2}-\d{2})/, '')
      .replace('/', '')
      .replace('nextjs', 'Next.js')
      .replace('priotize', 'Prioritize'),
  )
  name = title(name, {
    special: [
      'iPhone',
      'iPad',
      'MacBook',
      'iOS',
      'iPadOS',
      'macOS',
      'AirPods',
      'HomePod',
      'MVP',
      'MDX',
      'UI',
      'COVID',
      'IRL',
    ],
  })
    .replace(' and ', ' & ')
    .replace(' Im ', ' I’m ')
    .replace(' Cant', ' Can’t')
    .replace('Theyre', 'They’re')
    .replace('Apple Fitness', 'Apple Fitness+')
  if (hasDate(path) && name === '') {
    name = format(new Date(getDate(path)), 'MMMM d, yyyy')
  }
  return name
}

export const hasDate = (path: string) =>
  !isEmpty(path.toString().match(/\d{4}-\d{2}-\d{2}/))

export const getDate = (path: string) => {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/)
  return match ? match[0] : ''
}

export const formatDate = (date: Date) => format(date, 'MMMM dd, yyyy')

export const getDescription = (path: string) => {
  if (path === '/') {
    return 'Lachlan Campbell’s personal blog, Notebook, with posts about whatever they want.'
  }
  let date = ''
  if (hasDate(path)) {
    const dt = new Date(getDate(path))
    date = ` on ${formatDate(date)}`
  }
  return `Post by Lachlan Campbell${date} on their personal Notebook blog.`
}

export const getImage = (path: string) => {
  if (path === '/') {
    return 'https://notebook-cards.lachlanjc.vercel.app/Notebook.png?fontSize=400px'
  }
  let name = getName(path.toString())
  let caption = ''
  let params = ''
  let theme = 'light'
  if (hasDate(path)) {
    let date = getDate(path)
    if (path.replace(/\//g, '') !== date) {
      caption = formatDate(new Date(date))
    }
    if (name.length > 30) {
      params += '&fontSize=225px'
    }
  } else {
    theme = 'dark'
    params += '&fontSize=275px'
  }
  name = encodeURIComponent(name)
  caption = encodeURIComponent(caption)
  return `https://notebook-cards.lachlanjc.vercel.app/${name}.png?caption=${caption}&theme=${theme}${params}`
}
