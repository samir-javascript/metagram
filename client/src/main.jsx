import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import {BrowserRouter } from 'react-router-dom'
import { store } from './store.js'
import { ThemeProvider} from "./context/ThemeProvider.jsx"
import { Toaster } from "@/components/ui/toaster"
import { SocketContextProvider } from './context/socketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  
    <Provider store={store}>
    <ThemeProvider>
      <SocketContextProvider>
          <App />
      </SocketContextProvider>
      </ThemeProvider>
      </Provider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
)
