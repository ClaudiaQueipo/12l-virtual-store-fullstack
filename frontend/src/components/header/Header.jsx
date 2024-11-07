import MenuIcon from '@mui/icons-material/Menu'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeSwitcher from './components/theme_switcher/ThemeSwitcher'

const drawerWidth = 240
const navItems = ['Login', 'Create Account']

function Header(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleNavigation = (path) => {
    navigate(path)
    handleDrawerToggle()
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', paddingX: '10px' }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <StorefrontIcon sx={{ mr: 1 }} />
        SHOP
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() =>
                handleNavigation(
                  item === 'Login' ? '/login' : '/create-account'
                )
              }
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ThemeSwitcher />
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ paddingY: '10px' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <StorefrontIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { sm: 'block' } }}
            >
              SHOP
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex', lg: 'flex' },
              gap: '10px'
            }}
          >
            <ThemeSwitcher />
            <Button
              sx={{ color: '#fff' }}
              onClick={() => handleNavigation('/login')}
            >
              Login
            </Button>
            <Button
              sx={{ color: '#fff' }}
              onClick={() => handleNavigation('/create-account')}
            >
              Create Account
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  )
}

Header.propTypes = {
  window: PropTypes.func
}

export default Header
