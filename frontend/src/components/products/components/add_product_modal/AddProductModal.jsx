import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import { productSchema } from './schema/productSchema'
import productService from '../../../../services/product.service'

const AddProductModal = ({ open, onClose, onProductAdded }) => {
  const [newProductType, setNewProductType] = useState('digital')
  const [newProductDetails, setNewProductDetails] = useState({
    code: '',
    name: '',
    downloadLink: '',
    shippingCost: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'shippingCost') {
      setNewProductDetails({
        ...newProductDetails,
        [name]: value ? parseFloat(value) : ''
      })
    } else {
      setNewProductDetails({ ...newProductDetails, [name]: value })
    }
  }

  const handleTypeChange = (e) => {
    setNewProductType(e.target.value)
    setNewProductDetails({
      code: '',
      name: '',
      downloadLink: '',
      shippingCost: ''
    })
  }

  const handleCreateProduct = async () => {
    const productDetails =
      newProductType === 'digital'
        ? { ...newProductDetails, shippingCost: undefined }
        : { ...newProductDetails, downloadLink: undefined }

    const result = productSchema.safeParse(productDetails)

    if (result.success) {
      try {
        await productService.createProduct(result.data, newProductType)
        console.log('Producto creado con éxito')
        onClose()
        onProductAdded()  
        setErrors({})
      } catch (error) {
        console.error('Error al crear el producto:', error)
      }
      finally{
        setNewProductDetails({
          code: '',
          name: '',
          downloadLink: '',
          shippingCost: ''
        })
      }
    } else {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      console.error('Errores de validación:', fieldErrors)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          value={newProductType}
          onChange={handleTypeChange}
          sx={{ marginBottom: '16px' }}
        >
          <MenuItem value="digital">Digital</MenuItem>
          <MenuItem value="physical">Physical</MenuItem>
        </Select>

        <TextField
          autoFocus
          margin="dense"
          name="code"
          label="Code"
          type="text"
          fullWidth
          variant="outlined"
          value={newProductDetails.code}
          onChange={handleChange}
          error={!!errors.code}
          helperText={errors.code ? errors.code[0] : ''}
        />

        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newProductDetails.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name ? errors.name[0] : ''}
        />

        {newProductType === 'digital' && (
          <TextField
            margin="dense"
            name="downloadLink"
            label="Download URL"
            type="url"
            fullWidth
            variant="outlined"
            value={newProductDetails.downloadLink}
            onChange={handleChange}
            error={!!errors.downloadLink}
            helperText={errors.downloadLink ? errors.downloadLink[0] : ''}
          />
        )}

        {newProductType === 'physical' && (
          <TextField
            margin="dense"
            name="shippingCost"
            label="Shipping Cost"
            type="number"
            fullWidth
            variant="outlined"
            value={newProductDetails.shippingCost}
            onChange={handleChange}
            error={!!errors.shippingCost}
            helperText={errors.shippingCost ? errors.shippingCost[0] : ''}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateProduct} color="secondary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProductAdded: PropTypes.func.isRequired 
}

export default AddProductModal
