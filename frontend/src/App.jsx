import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import lightTheme from './themes/lightTheme'
import darkTheme from './themes/darkTheme'
import store from './store/store'
import { Provider, useSelector } from 'react-redux'

function AppContent() {
  const currentTheme = useSelector((state) => state.theme.theme)

  const getCurrentMuiTheme = () => {
    if (currentTheme === 'dark') return darkTheme
    if (currentTheme === 'light') return lightTheme
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkTheme
      : lightTheme
  }

  return (
    <MuiThemeProvider theme={getCurrentMuiTheme()}>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
