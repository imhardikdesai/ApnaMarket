import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "../sections/@dashboard/cart/CartItem";
import CheckoutButton from "../sections/@dashboard/cart/CheckoutButton";
import TotalPrice from "../sections/@dashboard/cart/TotalPrice";
import { useSelector } from "react-redux";
import LottieBucket from "../components/common/LottieBucket";
import EmptyCart from '../animations/empty-cart.json'
import Loader from "../components/common/Loader";
import ClearCart from "../sections/@dashboard/cart/ClearCart";
function CartPage() {
    const total = useSelector(state => state.cart.total)
    const product = useSelector(state => state.cart.product)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    }, [total]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])
    // useEffect(() => {
    //     if (product.length === 1) {
    //         if (product[0].quantity === 1) {
    //             AddToCartFirebase(cart, userDetails.uid)
    //         }
    //     }
    // }, [product, cart, userDetails.uid])
    return (
        <div className="container mx-auto my-10">
            <Grid justifyContent={'center'} container spacing={2}>
                {
                    loading ? <Loader /> :
                        ((product.length > 0) ?
                            <>
                                {product.map((item) => {
                                    return <CartItem key={item.id} item={item} />
                                })}
                                <TotalPrice />
                                <Stack className="sm:flex-row" display={'flex'} mx={5} flexDirection='column' width='100%' justifyContent='space-between'>
                                    <CheckoutButton />
                                    <ClearCart />
                                </Stack>
                            </>
                            :
                            <LottieBucket path={EmptyCart} />)
                }
            </Grid>
        </div>
    );
}

export default CartPage;
