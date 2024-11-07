import { Typography, Tooltip, Box } from '@mui/material';
import PropTypes from 'prop-types';

const ProductDetails = ({ product }) => (
  <Box>
    <Tooltip title={product.code} arrow placement='right'>
      <Typography 
        variant="h6" 
        color="textSecondary" 
        gutterBottom 
        sx={{
          display: 'inline-block', 
          maxWidth: '20ch', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap' 
        }}
      >
        Code: {product.code}
      </Typography>
    </Tooltip>

    {product.downloadLink && (
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Download: <a href={product.downloadLink}>Here</a>
      </Typography>
    )}

    {product.shippingCost !== undefined && (
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Shipping Cost: ${product.shippingCost.toFixed(2)}
      </Typography>
    )}

  </Box>
);

ProductDetails.propTypes = {
  product: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    downloadLink: PropTypes.string,
    shippingCost: PropTypes.number,
  }).isRequired
};

export default ProductDetails;