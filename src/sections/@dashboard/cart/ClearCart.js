import { ShoppingCart } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../../redux/actions/cartActions'
import { AddToCartFirebase } from '../../../utils/product'
import { AuthContext } from '../../../context/AuthContext'

const ClearCart = () => {
    const dispatch = useDispatch()
    const { currentUser } = useContext(AuthContext)
    const handleClearCart = () => {
        dispatch(clearCart())
        AddToCartFirebase({
            totalPrice: 0,
            total: 0,
            product: []
        }, currentUser.uid)
    }
    return (
        <>
            <Button
                onClick={handleClearCart}
                variant="contained"
                size="large"
                className="bg-red-500 text-white px-10 py-3 m-1 rounded-full"
                startIcon={<ShoppingCart />}
            >
                Clear Cart
            </Button>
        </>
    )
}

export default ClearCart