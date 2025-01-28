'use client'

import { useState } from 'react'
import { 
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment
} from '@mui/material'

export default function WithdrawForm() {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [quickAmount, setQuickAmount] = useState<string | null>(null)

  const handleQuickAmount = (
    _event: React.MouseEvent<HTMLElement>,
    newAmount: string | null,
  ) => {
    setQuickAmount(newAmount)
    if (newAmount) {
      setAmount(newAmount.replace('$', ''))
    }
  }

  const handleCustomAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^\d*$/.test(value)) {
      setAmount(value)
      setQuickAmount(null)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const amountNum = Number(amount)
    if (email && amountNum >= 10 && amountNum <= 1000) {
      console.log('Withdrawing:', { email, amount: amountNum })
    }
  }

  const isValidAmount = amount === '' || (Number(amount) >= 10 && Number(amount) <= 1000)

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        maxWidth: 'sm',
        
        p: 3
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 4,
          fontWeight: 'bold',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            width: '40px',
            height: '2px',
         
          }
        }}
      >
        Withdraw to Paypal
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography 
          component="label" 
          htmlFor="pay-id"
          sx={{ 
            display: 'block',
            mb: 1,
            fontWeight: 500
          }}
        >
          Pay ID
        </Typography>
        <TextField
          id="pay-id"
          fullWidth
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography 
          component="label"
          sx={{ 
            display: 'block',
            mb: 2,
            fontWeight: 500
          }}
        >
          Amount
        </Typography>
        <ToggleButtonGroup
          value={quickAmount}
          exclusive
          onChange={handleQuickAmount}
          sx={{ 
            mb: 3,
            gap: 1,
            '& .MuiToggleButton-root': {
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '8px !important',
              px: 3,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }
            }
          }}
        >
          <ToggleButton value="$10">$10</ToggleButton>
          <ToggleButton value="$50">$50</ToggleButton>
          <ToggleButton value="$100">$100</ToggleButton>
          <ToggleButton value="$500">$500</ToggleButton>
        </ToggleButtonGroup>

        <Typography 
          component="label" 
          htmlFor="custom-amount"
          sx={{ 
            display: 'block',
            mb: 1,
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          Min $10 - Max $1000
        </Typography>
        <TextField
          id="custom-amount"
          fullWidth
          value={amount}
          onChange={handleCustomAmount}
          error={!isValidAmount}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!email || !amount || !isValidAmount}
        sx={{
          mt: 2,
          py: 1.5,
          bgcolor: '#FF7A45',
          '&:hover': {
            bgcolor: '#F76631',
          },
        }}
      >
        Withdraw
      </Button>
    </Box>
  )
}

