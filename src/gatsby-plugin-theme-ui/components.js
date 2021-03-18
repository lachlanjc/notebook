/** @jsx jsx */
import { jsx, Text, Themed } from 'theme-ui'
import React from 'react'
import Prism from '@theme-ui/prism'
import { kebabCase } from 'lodash'

const wavy = {
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  WebkitTextUnderlinePosition: 'under',
  textDecorationStyle: 'wavy',
  WebkitTextDecorationStyle: 'wavy',
}
const headingLink = {
  color: 'inherit',
  textDecoration: 'none',
}

const Code = props => {
  if (props.filename) {
    return (
      <section>
        <Text
          as="span"
          sx={{
            display: 'inline-block',
            bg: 'accent',
            color: 'background',
            textAlign: 'center',
            borderTopLeftRadius: 'base',
            borderTopRightRadius: 'base',
            px: 3,
            py: 2,
          }}
        >
          {props.filename}
        </Text>
        <Prism {...props} sx={{ mt: 0 }} />
      </section>
    )
  }
  return <Prism {...props} />
}

export default {
  pre: ({ children }) => children,
  code: Code,
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
  a: props => <a sx={wavy} {...props} />,
}
