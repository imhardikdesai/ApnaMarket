import { ShoppingCart } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const CheckoutButton = () => {
    return (
        <>
            <Button
                variant="contained"
                size="large"
                className="bg-black text-white px-10 py-3 m-1 rounded-full"
                startIcon={<ShoppingCart />}
            >
                Checkout
            </Button>

        </>
    )
}

export default CheckoutButton