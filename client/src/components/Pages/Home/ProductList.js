import { Box, Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList() {
  return (
    <Box sx={{margin:"30px 0"}}>
        <Box sx={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"10px"}}>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
        </Box>
    </Box>
  )
}
