import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '../utils/auth.js'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn()
      setIsAuthenticated(loggedIn)
    }
    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}
