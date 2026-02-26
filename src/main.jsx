
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppThemeProvider from './context/ThemeProvider.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'



createRoot(document.getElementById('root')).render(

  <AppThemeProvider>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
  </AppThemeProvider>

)
