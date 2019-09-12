/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'

export const Container = ({ wide, ...props }) => (
  <div
    {...props}
    sx={{
      maxWidth: wide ? 'wide' : 'container'
    }}
  />
)

export const Tiles = props => (
  <div
    {...props}
    sx={{
      ul: {
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gridGap: 4,
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))'
      },
      h2: {
        fontSize: 2
      },
      img: {
        display: 'block',
        width: 128,
        maxWidth: '100%',
        height: 'auto',
        m: 'auto'
      },
      ...props.sx
    }}
  />
)

export const Embed = ({ src, sx, ...props }) => (
  <div variant="sheet" {...props} sx={{ p: 0, maxHeight: 512, width: '100%', mt: [3, 4], ...sx }}>
    <iframe
      src={src}
      frameBorder="0"
      onMouseWheel=""
      width="100%"
      height="512"
      style={{ display: 'block', maxWidth: '100%' }}
    />
  </div>
)

export const List = props => (
  <div
    {...props}
    sx={{
      ul: {
        p: 0,
        m: 0,
        lineHeight: 1,
        listStyle: 'none',
        columnWidth: 256,
        columnGap: 4
      },
      li: {
        mb: 4
      },
      a: {
        fontWeight: 'bold'
      },
      ...props.sx
    }}
  />
)

export const LinkList = props => (
  <div
    {...props}
    sx={{
      mb: 4,
      ul: {
        p: 0,
        m: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        gridGap: 3,
        mb: 4
      },
      li: { mb: 0 },
      p: { my: 0 },
      a: {
        bg: 'primary',
        color: 'background',
        p: 3,
        borderRadius: 6,
        fontWeight: 'bold',
        lineHeight: 'heading',
        textDecoration: 'none',
        display: 'block'
      },
      ...props.sx
    }}
  />
)


const rainbow = {
  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',
  purple: '#8067c3'
}

const rainbowKids = {}
Object.entries(rainbow).map(([name, bg], i) => {
  rainbowKids[`&:nth-child(${Object.keys(rainbow).length}n + ${i + 1}) a`] = { bg }
})

export const ShortcutsList = props => (
  <LinkList
    {...props}
    sx={{
      li: {
        mb: 0,
        display: 'flex',
        ...rainbowKids,
        p: { my: 0 },
      },
      a: {
        bg: 'primary',
        px: 3,
        py: [3, null, 4],
        borderRadius: 6,
        fontWeight: 'bold',
        lineHeight: 'heading',
        color: 'white',
        textDecoration: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        svg: {
          m: '-6px',
          mr: 2
        }
      },
      ...props.sx
    }}
  />
)
