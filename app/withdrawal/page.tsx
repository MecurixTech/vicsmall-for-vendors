'use client'

import Link from 'next/link';
import { useState } from 'react'
import { 
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'

type WithdrawMethod = 'bank' | 'paypal' 

export default function WithdrawMethod() {
  const [method, setMethod] = useState<WithdrawMethod | ''>('')

  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value as WithdrawMethod)
  }

  return (
    <Box sx={{ 
      bgcolor: '#F9FAFB',
      p: 3,
      borderRadius: 1
    }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          mb: 2
        }}
      >
        Withdraw method
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="withdraw-method-label">Select Method</InputLabel>
        <Select
          labelId="withdraw-method-label"
          id="withdraw-method"
          value={method}
          label="Select Method"
          onChange={handleChange}
          sx={{
            bgcolor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
         <Link href="/withdraw-to-bank" className="w-full no-underline text-inherit">
  <MenuItem>Bank Transfer</MenuItem>
</Link>

<Link href="/withdrawal-to-paypal" className="w-full no-underline text-inherit">
  <MenuItem>PayPal</MenuItem>
</Link>
        </Select>
      </FormControl>
    </Box>
  )
}

