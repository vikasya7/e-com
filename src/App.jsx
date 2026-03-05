

import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* Global Toast System */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#3B2A1A",
            fontWeight: "500",
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;
