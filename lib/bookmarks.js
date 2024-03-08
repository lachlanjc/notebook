export const bookmarkPages = {
  albums: { id: 'mu8xXeQJC7LF4a', title: 'Best Albums' },
  articles: { id: 'yvvpIjHfKAJIlT', title: 'Recent Reads' },
  shortcuts: { id: '1FqzgGgJElnwWw', title: 'Shortcuts' },
  'great-personal-sites': {
    id: 'YMr06bjrAwdVUk',
    title: 'Great Personal Websites',
  },
  'great-marketing-sites': {
    id: 'BGuGxEXXO1EwRR',
    title: 'Great Marketing Websites',
  },
  'css-techniques': { id: 'vou8uLPLvPG2qU', title: 'CSS Techniques' },
  'good-google-fonts': { id: '5gPxL3EgCwWMMR', title: 'The Good Google Fonts' },
  'type-foundries': { id: 'GW5YB93X3b6j3Y', title: 'Nice Type Foundries' },
  // 'open-source-fonts': { id: 'tvYJuotm2B052K', title: 'Open Source Fonts' },
  'icon-libraries': { id: 'E4pL5sowxPFWe1', title: 'React Icon Libraries' },
}

function processBlocks(blocks) {
  return blocks
    .map(({ id, content, type, rawProperties, style: rawStyle }) => {
      const properties =
        typeof rawProperties === 'string' && rawProperties.startsWith('{')
          ? JSON.parse(rawProperties)
          : {}
      const style =
        typeof rawStyle === 'string' && rawStyle.startsWith('{')
          ? JSON.parse(rawStyle)
          : {}
      if (style.textStyle === 'pageRegular') {
        return null
      }
      return {
        id,
        content,
        type,
        properties,
        style,
      }
    })
    .filter(Boolean)
}

export async function getDocBlocks(id) {
  const doc = await fetch(
    `https://www.craft.do/api/share/${id}?enablePagination=false`,
  ).then(res => res.json())
  const blocks = processBlocks(
    doc.blocks[0].blocks.map(id => doc.blocks.find(block => block.id === id)),
  )
  return blocks
}
