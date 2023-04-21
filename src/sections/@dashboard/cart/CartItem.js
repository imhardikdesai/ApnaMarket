import { Grid, IconButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions';
import { AuthContext } from '../../../context/AuthContext';
import { AddToCartFirebase } from '../../../utils/product';

const CartItem = ({ item }) => {

    const dispatch = useDispatch()
    const total = useSelector(state => state.cart.total)
    const cart = useSelector(state => state.cart)
    const { currentUser } = useContext(AuthContext)
    const [currentProduct, setCurrentProduct] = useState(item)
    // const { id, cover, basePrice, name, price, quantity } = item
    const { id, cover, basePrice, name, price, quantity } = currentProduct
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({
            id,
            basePrice,
        }))
    }
    const handleAddToCart = () => {
        dispatch(addToCart({
            id,
            name,
            cover,
            price,
            basePrice,
            quantity: 1
        }))
    }

    useEffect(() => {
        setCurrentProduct(item)
    }, [total, item, currentProduct])

    useEffect(() => {
        AddToCartFirebase(cart, currentUser.uid)
    }, [currentUser.uid, cart, total])

    return (
        <>
            <Grid item xs={12} className="flex items-center border-b-2 pb-4">
                <img
                    src={cover}
                    alt="Product"
                    className="mr-4 h-[100px] rounded-md"
                />
                <div className="flex-grow flex justify-between">
                    <div>
                        <Typography variant="h6" className="font-bold">
                            {name}
                        </Typography>
                        <Typography variant="body1">Quantity: {quantity}</Typography>
                        <Typography variant="body1" className="font-bold">
                            ${price.toFixed(2)}
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        <IconButton onClick={handleRemoveFromCart} className="bg-red-500 hover:bg-red-400 text-white mr-2">
                            <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={handleAddToCart} className="bg-green-500 hover:bg-green-400 text-white mr-2">
                            <AddIcon />
                        </IconButton>
                        <IconButton className="bg-gray-500 hover:bg-gray-400 text-white mr-2">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </Grid>
        </>
    )

}

export default CartItem