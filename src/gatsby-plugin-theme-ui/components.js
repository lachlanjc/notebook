/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Prism from '@theme-ui/prism'
import { kebabCase } from 'lodash'

const wavy = {
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  WebkitTextUnderlinePosition: 'under',
  textDecorationStyle: 'wavy',
  WebkitTextDecorationStyle: 'wavy'
}
const headingLink = {
  color: 'inherit',
  textDecoration: 'none',
  ':hover, :focus': wavy
}

export default {
  pre: props => props.children,
  code: Prism,
  h2: props => (
    <h2 {...props}>
      <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
        {props.children}
      </a>
    </h2>
  ),
  h3: props => (
    <h3 {...props}>
      <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
        {props.children}
      </a>
    </h3>
  ),
  a: props => <a sx={wavy} {...props} />
}
