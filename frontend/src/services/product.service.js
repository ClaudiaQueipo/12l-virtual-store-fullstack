import axios from 'axios'
import { getToken } from '../utils/auth'

class ProductService {
  static instance
  API_URL = `${import.meta.env.VITE_API_URL}/products`

  constructor() {
    if (ProductService.instance) {
      return ProductService.instance
    }
    ProductService.instance = this
  }

  #getAuthHeaders() {
    const token = getToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  async getAllProducts({
    search = '',
    type = '',
    page = 0,
    size = 10,
    sort = 'code',
    order = 'asc'
  }) {
    try {
      const response = await axios.get(this.API_URL, {
        ...this.#getAuthHeaders(),
        params: { search, type, page, size, sort, order }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  async getProductById(id) {
    try {
      const response = await axios.get(
        `${this.API_URL}/${id}`,
        this.#getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error)
      throw error
    }
  }

  async createProduct(product, type) {
    try {
      const endpoint = type === 'digital' ? 'digital' : 'physical'
      const response = await axios.post(
        `${this.API_URL}/${endpoint}`,
        product,
        this.#getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error(`Error creating ${type} product:`, error)
      throw error
    }
  }

  async updateProduct(id, product) {
    try {
      const response = await axios.put(
        `${this.API_URL}/${id}`,
        product,
        this.#getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error)
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      await axios.delete(`${this.API_URL}/${id}`, this.#getAuthHeaders())
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error)
      throw error
    }
  }
}

const productService = new ProductService()
export default productService
