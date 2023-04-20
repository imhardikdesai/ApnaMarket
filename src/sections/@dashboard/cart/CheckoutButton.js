import { ShoppingCart } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import React from 'react'

const CheckoutButton = () => {
    return (
        <>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    size="large"
                    className="bg-black text-white px-10 py-3 rounded-full"
                    startIcon={<ShoppingCart />}
                >
                    Checkout
                </Button>
            </Grid>

        </>
    )
}

export default CheckoutButton