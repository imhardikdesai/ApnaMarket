import { Typography, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const TotalPrice = () => {
    const totalPrice = useSelector(state => state.cart.totalPrice)
    return (
        <>
            {/* Total price */}
            <Grid item xs={12} className="flex items-center py-4">
                <div className="flex-grow text-right">
                    <Typography variant="h6" className="font-bold">
                        Total Price:
                    </Typography>
                </div>
                <div className="flex items-center">
                    <Typography mx={1} variant="body1" className="font-bold mr-2">
                        ${totalPrice.toFixed(2)}
                    </Typography>
                </div>
            </Grid>
        </>
    )
}

export default TotalPrice