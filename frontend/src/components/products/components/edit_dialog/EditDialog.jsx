import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material'

const EditDialog = ({ open, onClose, product, onConfirm }) => {
  const [editedProduct, setEditedProduct] = useState({
    code: '',
    name: '',
    downloadLink: '',
    shippingCost: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open && product) {
      setEditedProduct(product)
      setErrors({})
    }
  }, [open, product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProduct({ ...editedProduct, [name]: value })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedProduct.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name ? errors.name[0] : ''}
        />
        <TextField
          margin="dense"
          name="code"
          label="Code"
          type="text"
          fullWidth
          variant="outlined"
          value={editedProduct.code}
          onChange={handleChange}
          error={!!errors.code}
          helperText={errors.code ? errors.code[0] : ''}
        />
        {editedProduct.downloadLink && (
          <TextField
            margin="dense"
            name="downloadLink"
            label="Download Link"
            type="url"
            fullWidth
            variant="outlined"
            value={editedProduct.downloadLink}
            onChange={handleChange}
            error={!!errors.downloadLink}
            helperText={errors.downloadLink ? errors.downloadLink[0] : ''}
          />
        )}
        {editedProduct.shippingCost !== undefined && (
          <TextField
            margin="dense"
            name="shippingCost"
            label="Shipping Cost"
            type="number"
            fullWidth
            variant="outlined"
            value={editedProduct.shippingCost || ''}
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
        <Button
          onClick={() => onConfirm(editedProduct, onClose, setErrors)}
          color="secondary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default EditDialog
