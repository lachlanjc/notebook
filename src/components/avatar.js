import React from 'react'
import { Image } from 'rebass'

export default ({ size = 32, ...props }) => (
  <Image
    {...props}
    src="https://cloud-8xnn7u7df.vercel.app/2020-07-19_gz5xxab9k2n21xzghx8k60vu9rx6ejmc.jpeg"
    alt="Lachlan's avatar"
    width={size}
    height={size}
    sx={{ borderRadius: '50%', overflow: 'hidden', mr: 3, ...props.sx }}
  />
)
