// @ts-check
import { useState } from 'react'
import { Text, Link, Image as Img, Themed, useColorMode } from 'theme-ui'
import { getName } from '../lib/util'
import Image from 'next/future/image'

function ShortcutBlock({ url, title, iconUrl }) {
  return (
    <Link
      href={url}
      target="_blank"
      sx={{
        bg: 'sunken',
        borderRadius: 'extra',
        color: 'primary',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        gap: 3,
        mt: 3,
        p: 2,
        img: { borderRadius: 6 },
      }}
    >
      <Image src={iconUrl} alt="" width={48} height={48} quality={100} />
      {title.replaceAll('&amp;#x2F;', '/')}
    </Link>
  )
}

function GoogleFontBlock({ url, title }) {
  const [failed, setFailed] = useState(false)
  const [colorMode] = useColorMode()
  return (
    <Link
      href={url}
      target="_blank"
      sx={{
        bg: 'sunken',
        borderRadius: 'extra',
        color: 'primary',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        gap: 3,
        mt: 3,
        p: 3,
        img: {
          filter: colorMode === 'dark' ? 'invert()' : null,
        }
      }}
    >
      {failed ?
        title
      ) : (
        <img
          src={`https://raw.githubusercontent.com/getstencil/GoogleWebFonts-FontFamilyPreviewImages/master/48px/original/${title
            .split(/\s+/)
            .join('')}-400.v${title === 'Recursive' ? 21 : 1}.png`}
          height={24}
          alt={title}
          onError={() => setFailed(true)}
        />
      )}
    </Link>
  )
}

// type=url
function URLBlock({ content, properties, options: { showLinkIcons } }) {
  if (properties.url == null && content == null) {
    return null
  }
  let url = properties.url || content
  if (url.includes('fonts.google.com/specimen')) {
    return <GoogleFontBlock {...properties} />
  }
  if (url.includes('icloud.com/shortcuts')) {
    return <ShortcutBlock {...properties} />
  }
  try {
    url = new URL(url)
  } catch (e) {
    url = { hostname: '', pathname: '' }
  }
  if (!properties.title) {
    properties.title = getName(url.pathname)
  }
  return (
    <Link
      href={properties.url || content}
      target="_blank"
      sx={{
        textDecoration: 'none',
        lineHeight: 1.375,
        ...(showLinkIcons
          ? {
              display: 'grid',
              gridTemplateColumns: '1fr 96px',
              alignItems: 'start',
              gap: 3,
              py: 2,
            }
          : {
              display: 'block',
              my: 2,
              'h3 + &': {
                mt: -3,
              },
            }),
      }}
    >
      <span>
        <Text
          as="strong"
          sx={{
            lineHeight: 1.375,
            display: 'block',
          }}
        >
          {properties.title}
        </Text>
        {url.hostname && url.hostname !== 'fonts.google.com' && (
          <Text as="small" sx={{ color: 'secondary', fontSize: 0 }}>
            {url.hostname.replace('www.', '')}
          </Text>
        )}
      </span>
      {showLinkIcons && properties.iconUrl && (
        <Img
          src={properties.iconUrl}
          loading="lazy"
          width={96}
          height={48}
          alt=""
          sx={{
            borderRadius: 6,
            width: 'auto',
            maxHeight: 48,
            margin: 'auto 0 auto auto',
          }}
        />
      )}
    </Link>
  )
}

// type=text
function TextBlock({ content, style = { textStyle: undefined } }) {
  const Component =
    {
      subtitle: Themed.h2,
      heading: Themed.h3,
    }[style?.textStyle] ?? Text
  return <Component>{content}</Component>
}

const components = {
  url: URLBlock,
  text: TextBlock,
}

export default function CraftBlocks({ blocks }) {
  const showLinkIcons = blocks.every(block => block.type === 'url')
  return (
    <>
      {blocks.map(block => {
        const Component = components[block.type]
        return (
          <Component {...block} key={block.id} options={{ showLinkIcons }} />
        )
      })}
    </>
  )
}
