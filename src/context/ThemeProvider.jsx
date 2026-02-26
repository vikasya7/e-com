/* eslint-disable react-refresh/only-export-components */
import React, { useState ,createContext } from 'react'


export const ThemeContext = createContext();
function ThemeProvider({children}) {

    const [theme,setTheme]=useState('light')
   
    const toggleTheme = () => {
        setTheme(prev => (prev==='light' ? 'dark' : 'light'))
    }
    
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider 