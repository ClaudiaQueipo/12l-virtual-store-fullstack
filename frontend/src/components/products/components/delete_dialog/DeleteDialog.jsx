import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material'
import PropTypes from 'prop-types'

const DeleteDialog = ({ open, onClose, onConfirm }) => {
  console.log(`On Confirm ${onConfirm}`)
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ marginTop: '20px', marginX: '40px' }}>
        Confirm Deletion
      </DialogTitle>
      <DialogContentText sx={{ marginX: '20px' }}>
        Are you sure to download this product?
      </DialogContentText>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default DeleteDialog
