import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, IconButton, Chip, Box, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ProductDetails from '../product_detail/ProductDetail'

const ProductCard = ({ product, onEdit, onDelete }) => (
  <Card
    sx={{
      maxHeight: '160px',
      minWidth: '350px',
      padding: '16px',
      borderRadius: '8px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'space-between'
    }}
  >
    <CardContent sx={{position:'relative'}}>
      <Box display="flex" alignItems="center">
        <Tooltip title={product.name} arrow placement='right'>
        <Typography variant="h5"  sx={{
          mr: 1,
          mb:1,
          display: 'inline-block', 
          maxWidth: '20ch', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap' 
        }}>
          {product.name}
        </Typography>
        </Tooltip>
        <Chip
          label={product.type}
          color="primary"
          size="small"
          sx={{
            zIndex: 1
          }}
        />
      </Box>
      <ProductDetails product={product} />
      <Box sx={{ marginTop: 'auto' , position:'absolute', right:'10px', bottom:'25px'}}>
      <IconButton onClick={() => onEdit(product)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(product)}>
        <DeleteIcon />
      </IconButton>
    </Box>
    </CardContent>
   
  </Card>
)

ProductCard.propTypes = {
  product: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    downloadLink: PropTypes.string,
    shippingCost: PropTypes.number,
    price: PropTypes.number,
    description: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ProductCard