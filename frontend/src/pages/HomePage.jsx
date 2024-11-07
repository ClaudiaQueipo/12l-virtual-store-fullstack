import { Box } from '@mui/material'
import Header from '../components/header/Header'
import Products from '../components/products/Products'

export default function Home() {
  return (
    <>
      <Header></Header>
      <Box display={'flex'}>
        <Products />
      </Box>
    </>
  )
}
