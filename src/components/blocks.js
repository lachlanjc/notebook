/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box } from 'rebass'

export const Banner = props => (
  <div
    {...props}
    sx={{
      py: [4, 5, 6],
      fontWeight: 'bold',
      h1: {
        fontSize: [6, 7, 8, 9]
      },
      p: {},
      ul: {
        listStyle: 'none',
        display: 'flex',
        p: 0,
        m: 0
      },
      li: {
        mr: 3
      }
    }}
  />
)

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

export const List = props => (
  <div
    {...props}
    sx={{
      ul: {
        p: 0,
        m: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        gridGap: 4
      },
      a: {
        fontWeight: 'bold'
      },
      ...props.sx
    }}
  />
)

export const ShortcutsList = props => (
  <List
    {...props}
    sx={{
      ul: {
        gridGap: 3,
        mb: 4
      },
      li: {
        bg: 'primary',
        px: 3,
        py: 3,
        borderRadius: 6,
        fontWeight: 'bold'
      },
      a: {
        color: 'background',
        textDecoration: 'none'
      },
      ...props.sx
    }}
  />
)
