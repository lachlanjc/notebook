import title from 'title'
import { isEmpty, startCase } from 'lodash'
import { format } from 'date-fns'

export const getName = path => {
  let name = startCase(
    path
      .replace(/(\d{4}-\d{2}-\d{2})/, '')
      .replace('-', ' ')
      .replace('/', '')
  )
  name = title(name, {
    special: ['iPhone', 'iPad', 'MacBook', 'iOS', 'iPadOS', 'MDX', 'UI']
  })
  if (hasDate(path) && name === '') {
    name = format(new Date(getDate(path)), 'MMMM d, yyyy')
  }
  return name
}

export const hasDate = path =>
  !isEmpty(path.toString().match(/\d{4}-\d{2}-\d{2}/))

export const getDate = path => {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/)
  return match ? match[0] : ''
}

export const getDescription = path => {
  if (path === '/') {
    return 'Lachlan Campbell’s daily blog, Notebook.'
  }
  let date = ''
  if (hasDate(path)) {
    date = new Date(getDate(path))
    date = ` on ${format(date, 'MMMM d, yyyy')}`
  }
  return `Post by Lachlan Campbell${date} on their daily blog, Notebook.`
}

export const getImage = path => {
  if (path === '/') {
    return 'https://notebook-cards.lachlanjc.now.sh/Notebook.png?fontSize=400px'
  }
  let name = getName(path.toString())
  let caption
  let params = ''
  let theme = 'light'
  if (hasDate(path)) {
    let date = getDate(path)
    if (path.replace(/\//g, '') !== date) {
      caption = format(new Date(date), 'MMM d, yyyy')
    }
  } else {
    theme = 'dark'
    params += '&fontSize=275px'
  }
  name = encodeURIComponent(name)
  caption = encodeURIComponent(caption)
  return `https://notebook-cards.lachlanjc.now.sh/${name}.png?caption=${caption}&theme=${theme}${params}`
}
