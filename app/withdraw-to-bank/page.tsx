'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Inter, Ubuntu } from 'next/font/google'
import { 
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment
} from '@mui/material'
import { useState } from 'react'

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] })

// Initialize Ubuntu font
const ubuntu = Ubuntu({ 
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

// Create theme with Inter font
const theme = createTheme({
  typography: {
    fontFamily: ubuntu.style.fontFamily,
    h5: {
      fontWeight: 700,
      fontFamily: inter.style.fontFamily,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontFamily: inter.style.fontFamily,
    },
  },
})

export default function WithdrawBankForm() {
  const [amount, setAmount] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const amountNum = Number(amount)
    if (bankName && accountNumber && amountNum >= 10 && amountNum <= 10000) {
      console.log('Withdrawing:', { amount: amountNum, bankName, accountNumber })
    }
  }

  const isValidAmount = amount === '' || (Number(amount) >= 10 && Number(amount) <= 10000)

  return (
    <ThemeProvider theme={theme}>
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
            fontWeight: 700,
          }}
        >
          Withdraw to Bank
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography 
            component="label" 
            htmlFor="amount"
            sx={{ 
              display: 'block',
              mb: 1,
              fontWeight: 500
            }}
          >
            Amount to Withdraw - Min $10 - Max $10000
          </Typography>
          <TextField
            id="amount"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
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

        <Box sx={{ mb: 4 }}>
          <Typography 
            component="label" 
            htmlFor="bank-name"
            sx={{ 
              display: 'block',
              mb: 1,
              fontWeight: 500
            }}
          >
            Bank Name
          </Typography>
          <TextField
            id="bank-name"
            fullWidth
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
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

        <Box sx={{ mb: 4 }}>
          <Typography 
            component="label" 
            htmlFor="account-number"
            sx={{ 
              display: 'block',
              mb: 1,
              fontWeight: 500
            }}
          >
            Account Number
          </Typography>
          <TextField
            id="account-number"
            fullWidth
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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
          disabled={!bankName || !accountNumber || !amount || !isValidAmount}
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
    </ThemeProvider>
  )
}

