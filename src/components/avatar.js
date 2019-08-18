import React from 'react'
import { Image } from 'rebass'

export default ({ size = 32, ...props }) => (
  <Image
    {...props}
    src="https://cdn.glitch.com/4d99d0f7-c364-44a5-b1b9-2c3c3f5cb333%2FIMG_2040-2.jpeg?v=1565688136581"
    alt="Lachlan's avatar"
    width={size}
    height={size}
    sx={{ borderRadius: '50%', overflow: 'hidden', mr: 3, ...props.sx }}
  />
)
