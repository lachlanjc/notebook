import React from 'react'
import { Avatar } from 'theme-ui'

export default ({ size = 48, ...props }) => (
  <Avatar
    {...props}
    size={size}
    src="https://cloud-btbmmnt8b.vercel.app/2020-07-30_2uyaqbjft934eee46qc616x333r5w5h0.jpeg"
    alt="Lachlan's avatar"
    mr={3}
  />
)
