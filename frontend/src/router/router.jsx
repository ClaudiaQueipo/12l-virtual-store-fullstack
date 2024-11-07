import { createBrowserRouter, Outlet } from 'react-router-dom'
import { lazy } from 'react'
import ProtectedRoute from './ProtectedRouter'

const Root = lazy(() => import('../components/root/Root'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ErrorPage = lazy(() => import('../pages/Error'))
const HomePage = lazy(() => import('../pages/HomePage'))
const CreateAccountPage = lazy(() => import('../pages/CreateAccountPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />
          }
        ]
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'create-account',
        element: <CreateAccountPage />
      }
    ]
  }
])
