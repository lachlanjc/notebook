/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import React from 'react'
// import Prism from '@theme-ui/prism'
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
  textDecoration: 'none'
}

export default {
  // pre: props => props.children,
  // code: Prism, // commented out while Theme UI Prism has a bug
  h2: props => (
    <Themed.h2 id={kebabCase(props.children)} {...props}>
      <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
        {props.children}
      </a>
    </Themed.h2>
  ),
  h3: props => (
    <Themed.h3 id={kebabCase(props.children)} {...props}>
      <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
        {props.children}
      </a>
    </Themed.h3>
  ),
  a: props => <a sx={wavy} {...props} />
}
