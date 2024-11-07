import axios from 'axios'
import { getToken, setToken } from '../utils/auth'

class AuthService {
  static instance

  API_URL = import.meta.env.VITE_API_URL + '/auth'

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance
    }
    AuthService.instance = this
  }

  async register(registerRequest) {
    try {
      const response = await axios.post(`${this.API_URL}/register`, registerRequest)
      setToken(response.data.access_token)
      if (response.data.error) return response.data
      return response.status
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }

  async authenticate(authRequest) {
    try {
      const response = await axios.post(`${this.API_URL}/authenticate`, authRequest)
      setToken(response.data.access_token)
      return response.status
    } catch (error) {
      console.error('Error during authentication:', error)
      throw error
    }
  }

  async refreshToken() {
    try {
      const response = await axios.post(`${this.API_URL}/refresh-token`, null, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      console.error('Error refreshing token:', error)
      throw error
    }
  }

  async verifyToken() {
    const token = getToken()
    if (!token) return false

    try {
      const response = await axios.post(
        `${this.API_URL}/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.status === 200
    } catch (error) {
      console.error('Error verifying token:', error)
      return false
    }
  }
}

const authService = new AuthService()

export const isLoggedIn = async () => {
  return await authService.verifyToken()
}

export default authService
