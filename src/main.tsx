import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/global.css'
import theme from './assets/css/theme'
import { AuthContextProvider } from './context/authContext'
import { ListContextProvider } from './context/listContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <ListContextProvider>
          <CssBaseline />
          <App />
        </ListContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
