import { useEffect, useState } from 'react'
import productService from '../services/product.service'

const useProduct = ({
  search = '',
  type = '',
  page = 0,
  size = 6,
  sort = 'code',
  order = 'asc'
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await productService.getAllProducts({
        search,
        type,
        page,
        size,
        sort,
        order
      })
      setProducts(response)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search, type, page, size, sort, order])

  return { products, loading, error, fetchProducts }
}

export default useProduct
