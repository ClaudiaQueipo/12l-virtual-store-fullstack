import {
  Autocomplete,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import useDebounce from '../../../../hooks/useDebounce'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function FilterContainer({
  onSearch,
  onChangeType,
  onSortChange,
  onToggleSortOrder
}) {
  const [searchValue, setSearchValue] = useState('')
  const [sortCriteria, setSortCriteria] = useState('code')
  const [isAscending, setIsAscending] = useState(true)
  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    onSearch(debouncedSearchValue, sortCriteria, isAscending ? 'asc' : 'desc')
  }, [debouncedSearchValue, sortCriteria, isAscending, onSearch])

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSortChange = (event) => {
    const newSortCriteria = event.target.value
    setSortCriteria(newSortCriteria)
    onSortChange(newSortCriteria)
  }

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev)
    onToggleSortOrder()
  }

  const TYPE_OPTIONS = ['DIGITAL', 'PHYSICAL']

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label="Search products"
        variant="outlined"
        onChange={handleSearchChange}
        fullWidth
        sx={{ minWidth: { xs: '50dvw', md: '60dvw', lg: '40dvw' } }}
      />
      <Autocomplete
        options={TYPE_OPTIONS}
        onChange={(event, newValue) => {
          onChangeType(newValue)
        }}
        fullWidth
        sx={{ minWidth: { xs: '120px', md: '190px', lg: '190px' } }}
        renderInput={(params) => (
          <TextField {...params} label="Type" variant="outlined" />
        )}
      />
      <FormControl
        fullWidth
        sx={{ minWidth: { xs: '120px', md: '190px', lg: '190px' } }}
      >
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortCriteria}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="code">Code</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="shippingcost">Shipping Cost</MenuItem>
          <MenuItem value="downloadlink">Download Link</MenuItem>
        </Select>
      </FormControl>
      <IconButton
        onClick={toggleSortOrder}
        aria-label={`Sort ${isAscending ? 'descending' : 'ascending'}`}
      >
        {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </Stack>
  )
}

FilterContainer.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChangeType: PropTypes.func.isRequired
}
