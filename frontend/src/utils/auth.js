import authService from '../services/auth.service'

export const setRole = (ga_role) => {
  localStorage.setItem('role', ga_role)
}

export const getRole = () => localStorage.getItem('role')

export const setToken = (tokenData) => {
  localStorage.setItem('access_token', tokenData)
}

export const getToken = () => {
  return localStorage.getItem('access_token')
}

export const setUser = (user) => {
  localStorage.setItem('user', user)
}

export const setUserId = (userId) => {
  localStorage.setItem('user_id', userId)
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? user : ''
}

export const getUserId = () => {
  const userId = localStorage.getItem('user_id')
  return userId ? userId : 0
}

export const isLoggedIn = async () => {
  const isTokenValid = await authService.verifyToken()
  if (!isTokenValid) {
    logout()
  }
  return isTokenValid
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}
