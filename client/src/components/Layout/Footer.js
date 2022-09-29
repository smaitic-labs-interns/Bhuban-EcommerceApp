import { Grid, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function Footer() {
  return (
    <>
    <Box>
      <Box sx={{display:"flex", justifyContent:"center",background:"#1B5693",padding:"5px 0", color:"white"}}>
          <Box>
            <Typography>
              All Right Reserved &copy;
            </Typography>
            <Typography>
                Developed By <Link underline='none' color={"white"}> Bhuban</Link>
            </Typography>
          </Box>
        </Box>
    </Box>
    </>
  )
}
