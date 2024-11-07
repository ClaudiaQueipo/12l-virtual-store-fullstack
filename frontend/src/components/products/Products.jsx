import React, { useState, useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography, Button } from '@mui/material'
import SkeletonProduct from './components/skeleton_products/SkeletonProduct'
import useProduct from '../../hooks/useProduct'
import productService from '../../services/product.service'
import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useSearchParams } from 'react-router-dom'
import ProductCard from './components/product_card/ProductCard'
import FilterContainer from './components/filter_container/FilterContainer'
import AddProductModal from './components/add_product_modal/AddProductModal'
import EditDialog from './components/edit_dialog/EditDialog'
import DeleteDialog from './components/delete_dialog/DeleteDialog'
import { editProductSchema } from './components/edit_dialog/schema/editProductSchema'

const ProductList = memo(({ products, onEdit, onDelete }) => (
  <Stack
    display={'grid'}
    gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
    minWidth={{ xs: '300px', md: '600px' }}
    minHeight={{ xs: '60dvh', lg: '50dvh' }}
    gap={2}
  >
    {products.map((product) => (
      <Stack key={product.code}>
        <ProductCard
          key={product.code}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Stack>
    ))}
  </Stack>
))

ProductList.displayName = 'ProductList'

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

ProductList.displayName = 'ProductList'

export default function Products() {
  const [openAddProduct, setOpenAddProduct] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [type, setType] = useState('')
  const [page, setPage] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortCriteria, setSortCriteria] = useState('code')
  const [isAscending, setIsAscending] = useState(true)

  const {
    products = [],
    loading,
    error,
    fetchProducts
  } = useProduct({
    search: searchTerm,
    page,
    type,
    sort: sortCriteria,
    order: isAscending ? 'asc' : 'desc'
  })

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page')) || 0
    setPage(currentPage)
  }, [searchParams])

  const handleEdit = useCallback((product) => {
    setProductToEdit(product)
    setOpenEditDialog(true)
  }, [])

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
    setProductToEdit(null)
  }

  const handleDelete = useCallback((product) => {
    setProductToDelete(product)
    setOpenDeleteDialog(true)
  }, [])

  const handleSortChange = useCallback((newSortCriteria) => {
    setSortCriteria(newSortCriteria)
  }, [])

  const toggleSortOrder = useCallback(() => {
    setIsAscending((prevIsAscending) => !prevIsAscending)
  }, [])
  const handleConfirmEdit = async (editedProduct, onClose, setErrors) => {
    const result = editProductSchema.safeParse(editedProduct)

    if (result.success) {
      try {
        await productService.updateProduct(editedProduct.id, result.data)
        await fetchProducts()
        onClose()
        setErrors({})
      } catch (error) {
        console.error('Error updating the product:', error)
      }
    } else {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
    }
  }

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await productService.deleteProduct(productToDelete.id)
        await fetchProducts()
        setOpenDeleteDialog(false)
        setProductToDelete(null)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false)
    setProductToDelete(null)
  }, [])

  const handleProductChange = useCallback(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleSearch = useCallback((searchTerm) => {
    setSearchTerm(searchTerm)
    setPage(0)
  }, [])

  const handleSearchByType = useCallback((selectedType) => {
    setType(selectedType)
    setPage(0)
  }, [])

  const handlePageChange = useCallback(
    (newPage) => {
      setPage(newPage)
      setSearchParams({ page: newPage })
    },
    [setSearchParams]
  )

  return (
    <Stack
      display={'flex'}
      flexDirection={'column'}
      sx={{ width: '100vw', height: '100vh' }}
      paddingTop="0px"
      alignItems={'center'}
      flex={1}
    >
      <Stack
        display={'flex'}
        flexDirection={'column'}
        gap={'30px'}
        padding={{ md: '20px', xs: '30px' }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h2">Products</Typography>
          <Button
            variant="contained"
            onClick={() => setOpenAddProduct(true)}
            sx={{
              width: { xs: '60px', md: '200px' },
              height: { xs: '60px', md: '50px' },
              borderRadius: { xs: '50%', md: '50px' }
            }}
          >
            <AddIcon />
            <Typography
              variant="button"
              sx={{ display: { xs: 'none', md: 'inline' } }}
            >
              New Product
            </Typography>
          </Button>
        </Stack>

        <FilterContainer
          onSearch={handleSearch}
          onChangeType={handleSearchByType}
          onSortChange={handleSortChange}
          onToggleSortOrder={toggleSortOrder}
        />

        {loading ? (
          <Stack
            display={'grid'}
            gridTemplateColumns={{
              xs: '1fr',
              md: '1fr 1fr',
              lg: '1fr 1fr 1fr'
            }}
            minWidth={{ xs: '300px', md: '600px' }}
            minHeight={{ xs: '60dvh', lg: '50dvh' }}
            gap={2}
          >
            <SkeletonProduct></SkeletonProduct>
            <SkeletonProduct></SkeletonProduct>
            <SkeletonProduct></SkeletonProduct>
          </Stack>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <Button
            disabled={page === 0}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Typography>Page {page + 1}</Typography>
          <Button
            disabled={products.length < 6}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </Stack>
      </Stack>

      <AddProductModal
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
        onProductAdded={handleProductChange}
      />
      <EditDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        product={productToEdit}
        onConfirm={handleConfirmEdit}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Stack>
  )
}
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
