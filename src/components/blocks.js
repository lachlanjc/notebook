import React from 'react'
import { Box, Flex, Grid, Text, useColorMode } from 'theme-ui'
import ReactPlayer from 'react-player/lazy'
import { initial } from 'lodash'

export const Container = ({ wide, ...props }) => (
  <Box
    {...props}
    sx={{
      maxWidth: wide ? 'wide' : 'container',
    }}
  />
)

export const Tiles = props => (
  <Box
    {...props}
    sx={{
      ul: {
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gridGap: 4,
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
      },
      h2: {
        fontSize: 2,
      },
      img: {
        display: 'block',
        width: 128,
        maxWidth: '100%',
        height: 'auto',
        m: 'auto',
      },
      ...props.sx,
    }}
  />
)

export const Embed = ({ src, sx, title, ...props }) => (
  <Box
    variant="sheet"
    {...props}
    sx={{ p: 0, maxHeight: 512, width: '100%', mt: [3, 4], ...sx }}
  >
    <iframe
      src={src}
      frameBorder="0"
      onMouseWheel=""
      width="100%"
      height={512}
      title={title}
      style={{ display: 'block', maxWidth: '100%' }}
    />
  </Box>
)

export const CodeSandbox = ({ id, file, ...props }) => {
  const colorMode = useColorMode()
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?fontsize=14&codemirror=1${
        colorMode === 'light' ? '&theme=light' : ''
      }${file ? `&file=${file}` : ''}`}
      style={{
        width: '100%',
        height: 512,
        border: 0,
        borderRadius: 6,
        overflow: 'hidden',
      }}
      title={`${initial(id.split('-'))} on CodeSandbox`}
      allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      {...props}
    />
  )
}

export const YouTube = props => (
  <ReactPlayer
    width="100%"
    height={400}
    controls
    config={{ youtube: { playerVars: { showinfo: 1 } } }}
    {...props}
  />
)

export const Player = props => (
  <ReactPlayer width="100%" height={400} controls {...props} />
)

export const Handwriting = props => (
  <Box
    as="figure"
    {...props}
    sx={{
      borderRadius: 8,
      bg: 'smoke',
      p: 1,
      mx: -3,
    }}
  />
)

export const Columns = props => (
  <Box
    {...props}
    sx={{
      columnWidth: 256,
      columnGap: 16,
      overflow: 'visible',
      p: {
        my: 0,
      },
      'h2:first-of-type': {
        mt: 0,
      },
      ...props.sx,
    }}
  />
)

export const List = props => (
  <Box
    {...props}
    sx={{
      ul: {
        p: 0,
        m: 0,
        lineHeight: 1,
        listStyle: 'none',
        columnWidth: 256,
        columnGap: 4,
      },
      li: {
        mb: 4,
      },
      a: {
        fontWeight: 'bold',
      },
      ...props.sx,
    }}
  />
)

export const LinkList = props => (
  <Box
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
        mb: 4,
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
        display: 'block',
      },
      ...props.sx,
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
  purple: '#8067c3',
}

const rainbowKids = {}
Object.entries(rainbow).map(([name, bg], i) => {
  rainbowKids[`&:nth-child(${Object.keys(rainbow).length}n + ${i + 1}) a`] = {
    bg,
  }
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
          mr: 2,
        },
      },
      ...props.sx,
    }}
  />
)

export const AppList = props => (
  <Grid
    {...props}
    as="section"
    columns="64px 1fr"
    gap={3}
    sx={{
      p: {
        my: 0,
        ':nth-of-type(odd)': {
          lineHeight: 0,
          '> a': {
            display: 'inline-block',
            border: '1px solid rgba(0,0,0,0.125)',
            overflow: 'hidden',
            transition:
              '0.125s ease-in-out box-shadow, 0.2s ease-out transform',
            borderRadius: 14,
            img: {
              width: 64,
              height: 64,
            },
            ':hover,:focus': {
              boxShadow: '0 2px 6px rgba(0,0,0,0.125)',
              transform: 'scale(1.25) rotate(-3deg)',
            },
          },
        },
      },
    }}
  />
)

export const AppGrid = props => (
  <Box
    {...props}
    as="section"
    sx={{
      ul: {
        listStyle: 'none',
        pl: 0,
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
        justifyContent: 'center',
        textAlign: 'center',
      },
      li: {
        my: 0,
        a: {
          color: 'text',
          fontSize: 1,
          lineHeight: 'title',
          transition: '0.125se ease-in-out color',
          img: {
            display: 'inline-block',
            border: '1px solid rgba(0,0,0,0.125)',
            overflow: 'hidden',
            transition:
              '0.125s ease-in-out box-shadow, 0.2s ease-out transform',
            transformOrigin: 'center bottom',
            width: 96,
            height: 96,
            borderRadius: 20,
            mx: 'auto',
            mb: 2,
          },
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
          ':hover,:focus': {
            color: 'accent',
            img: {
              boxShadow: '0 2px 8px rgba(0,0,0,0.125)',
              transform: 'scale(1.25)',
            },
          },
        },
      },
    }}
  />
)

export const AppSpotlight = ({
  icon,
  name,
  desc,
  url,
  sx = { my: 4 },
  ...props
}) => (
  <Flex
    as="a"
    href={url}
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      textDecoration: 'none',
      textAlign: 'center',
      fontSize: 1,
      lineHeight: 'title',
      transition: '0.125se ease-in-out color',
      ...sx,
      ':hover,:focus': {
        color: 'accent',
        img: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.125)',
          transform: 'scale(1.25)',
        },
      },
    }}
    {...props}
  >
    <Box
      as="img"
      src={icon}
      alt={`${name} icon`}
      sx={{
        display: 'inline-block',
        border: '1px solid rgba(0,0,0,0.125)',
        overflow: 'hidden',
        transition: '0.125s ease-in-out box-shadow, 0.2s ease-out transform',
        transformOrigin: 'center bottom',
        width: 256,
        height: 256,
        borderRadius: 54,
        mx: 'auto',
        mb: 2,
      }}
    />
    <Box>
      <Text as="strong" color="text">
        {name}
      </Text>
      {desc && (
        <Text as="span" color="secondary">
          {' – '}
          {desc}
        </Text>
      )}
    </Box>
  </Flex>
)
