import DarkIcon from '@mui/icons-material/Brightness2'
import LightIcon from '@mui/icons-material/Brightness5'
import SystemIcon from '@mui/icons-material/SettingsBrightness'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../../../store/themeSlice'

const ThemeSwitcher = () => {
  const dispatch = useDispatch()
  const currentTheme = useSelector((state) => state.theme.theme)

  const handleSelectTheme = (event) => {
    dispatch(setTheme(event.target.value))
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="theme-selector-label">Theme</InputLabel>
      <Select
        labelId="theme-selector-label"
        value={currentTheme}
        onChange={handleSelectTheme}
        label="Tema"
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        renderValue={(selected) => {
          let IconComponent
          let text
          switch (selected) {
            case 'system':
              IconComponent = SystemIcon
              text = 'system'
              break
            case 'light':
              IconComponent = LightIcon
              text = 'Claro'
              break
            case 'dark':
              IconComponent = DarkIcon
              text = 'Oscuro'
              break
            default:
              return null
          }
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconComponent />
              {text}
            </div>
          )
        }}
      >
        <MenuItem
          value="system"
          sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <SystemIcon />
          System
        </MenuItem>
        <MenuItem
          value="light"
          sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LightIcon />
          Light
        </MenuItem>
        <MenuItem
          value="dark"
          sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <DarkIcon />
          Dark
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ThemeSwitcher
