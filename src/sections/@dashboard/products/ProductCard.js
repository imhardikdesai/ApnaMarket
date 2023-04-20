import PropTypes from 'prop-types';
// @mui
import { Card, Link, Typography, Stack, Divider, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions';
import { useEffect, useState } from 'react';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  item: PropTypes.object,
};

export default function ShopProductCard({ item }) {
  const { id, name, cover, price, colors, status, priceSale } = item;
  const product = useSelector(state => state.cart.product)
  const total = useSelector(state => state.cart.total)
  const current = product.find(data => data.id === id)
  const [currentProduct, setCurrentProduct] = useState(current)
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addToCart({
      ...item,
      basePrice: price,
      quantity: 1
    }))
  }
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({
      ...item,
      basePrice: price,
    }))
  }
  useEffect(() => {
    setCurrentProduct(current)
  }, [total, current])

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <Divider />
        <Stack display='flex'>
          <div className='flex justify-between my-2 items-center'>
            <Button onClick={handleAddToCart}>
              <AddCircleOutlineOutlinedIcon />
            </Button>
            <Typography variant="subtitle1">
              {currentProduct ? (currentProduct.quantity ? currentProduct.quantity : 0) : 0}
            </Typography>
            <Button disabled={(currentProduct ? (currentProduct.quantity ? (currentProduct.quantity === 0 ? true : false) : false) : true)} onClick={handleRemoveFromCart}>
              <RemoveCircleOutlineOutlinedIcon />
            </Button>
          </div>
          <Button onClick={handleAddToCart} variant="outlined">Add to Cart</Button>
        </Stack>
      </Stack>
    </Card >
  );
}
