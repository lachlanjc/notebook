import title from 'title'
import { isEmpty, startCase } from 'lodash-es'

export const getName = path => {
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
      'Plus',
      'MVP',
      'MDX',
      'UI',
      'COVID',
      'IRL',
      'CMS',
    ],
  })
    .replace(' and ', ' & ')
    .replace(' Im ', ' I’m ')
    .replace(' Cant', ' Can’t')
    .replace('Theyre', 'They’re')
    .replace('Apple Fitness', 'Apple Fitness+')
  if (hasDate(path) && name === '') {
    name = formatDate(new Date(getDate(path)))
  }
  return name
}

export const hasDate = path =>
  !isEmpty(path.toString().match(/\d{4}-\d{2}-\d{2}/))

export const getDate = path => {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/)
  return match ? match[0] : ''
}

const dateFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}
export const formatDate = date =>
  new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date)

export const getDescription = path => {
  if (path === '/') {
    return 'Lachlan Campbell’s personal blog, Notebook, with posts about whatever they want.'
  }
  let date = ''
  if (hasDate(path)) {
    date = new Date(getDate(path))
    date = ` on ${formatDate(date)}`
  }
  return `Post by Lachlan Campbell${date} on their personal Notebook blog.`
}

export const getImage = path => {
  if (path === '/') {
    return 'https://notebook-cards.lachlanjc.vercel.app/Notebook?fontSize=400px'
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
  return `https://notebook-cards.lachlanjc.vercel.app/${name}?caption=${caption}&theme=${theme}${params}`
}
