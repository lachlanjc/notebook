import { Box } from 'theme-ui'
import Supercon from 'supercons'

const Icon = ({ sx, ...props }) => (
  <Box as="span" sx={{ lineHeight: 0, ...sx }}>
    <Supercon {...props} />
  </Box>
)

export default Icon
