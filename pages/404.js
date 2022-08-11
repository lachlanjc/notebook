import Layout from '../components/layout'
import { Themed, Button } from 'theme-ui'
import Embed from 'react-song-embed'
import Link from 'next/link'

export default function FourOhFour() {
  return (
    <Layout>
      <Themed.h1>404</Themed.h1>
      <Embed url="https://song.link/us/i/407227946" height={400} />
      <Link href="/" passHref>
        <Button as="a" sx={{ mt: 4 }}>
          View all posts →
        </Button>
      </Link>
    </Layout>
  )
}
