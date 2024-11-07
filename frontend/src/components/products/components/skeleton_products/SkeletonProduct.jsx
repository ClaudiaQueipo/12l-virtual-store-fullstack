import React from 'react'
import { Skeleton} from '@mui/material'

const SkeletonProduct = () => {
  return (
      <Skeleton
        animation="wave"
        sx={{
          minHeight: '300px',
          minWidth: '350px',
          borderRadius: '8px',
          position: 'relative'
        }}
      />
  )
}

export default SkeletonProduct
