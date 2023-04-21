import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import CartItem from "../sections/@dashboard/cart/CartItem";
import CheckoutButton from "../sections/@dashboard/cart/CheckoutButton";
import TotalPrice from "../sections/@dashboard/cart/TotalPrice";
import { useSelector } from "react-redux";
import LottieBucket from "../components/common/LottieBucket";
import EmptyCart from '../animations/empty-cart.json'
import { AddToCartFirebase } from "../utils/product";
import { AuthContext } from "../context/AuthContext";
function CartPage() {
    const total = useSelector(state => state.cart.total)
    const product = useSelector(state => state.cart.product)
    const cart = useSelector(state => state.cart)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
    }, [total, product])
    useEffect(() => {
        AddToCartFirebase(cart, currentUser.uid)
    }, [total, currentUser.uid, cart]);
    return (
        <div className="container mx-auto my-10">
            <Grid justifyContent={'center'} container spacing={2}>
                {
                    (product.length > 0) ?
                        <>
                            {product.map((item) => {
                                return <CartItem key={item.id} item={item} />
                            })}
                            <TotalPrice />
                            <CheckoutButton />
                        </>
                        :
                        <LottieBucket path={EmptyCart} />
                }
            </Grid>
        </div>
    );
}

export default CartPage;
