/** @jsxImportSource theme-ui */
import { Text, Button, Themed } from 'theme-ui'
import Prism from '@theme-ui/prism'
import Link from 'next/link'
import { kebabCase } from 'lodash-es'

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

const Code = ({ children, filename, ...props }) => {
  if (typeof children === 'string' && !children.includes('\n')) {
    return <code>{children}</code>
  }
  return <Prism children={children} {...props} />
}
Code.defaultProps = { className: '' }

export default {
  pre: ({ children }) => <>{children}</>,
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
  a: ({ href, ...props }) =>
    href.startsWith('/') ? (
      <Link href={href} passHref>
        <a sx={wavy} {...props} />
      </Link>
    ) : (
      <a sx={wavy} href={href} {...props} />
    ),
  Button,
}
