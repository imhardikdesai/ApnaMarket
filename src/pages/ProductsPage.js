import { useContext, useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';
import Loader from '../components/common/Loader';
import { AddToCartFirebase, GetAllProductDetails } from '../utils/product'
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [fetchedData, setFetchedData] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const total = useSelector(state => state.cart.total)
  const cart = useSelector(state => state.cart)

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  useEffect(() => {
    GetAllProductDetails().then((res) => {
      setFetchedData(res)
    })
  }, []);
  useEffect(() => {
    AddToCartFirebase(cart, currentUser.uid)
  }, [total, currentUser.uid, cart]);
  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {
          fetchedData ? <ProductList products={fetchedData} /> : <Loader />
        }
        <ProductCartWidget />
      </Container>
    </>
  );
}
