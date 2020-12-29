import { Avatar as Base } from 'theme-ui'

const Avatar = ({ size = 48, ...props }) => (
  <Base
    {...props}
    size={size}
    src="https://cloud-btbmmnt8b.vercel.app/2020-07-30_2uyaqbjft934eee46qc616x333r5w5h0.jpeg"
    alt="Lachlan's avatar"
    mr={3}
  />
)

export default Avatar
