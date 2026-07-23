import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Home from './views/Home'
import Login from './views/Login'
import Footer from './components/Footer'

const App = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header cantidad={cantidadCarrito} />

      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home setCantidad={setCantidadCarrito} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />

      {/* Proveedor de notificaciones flotantes */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

export default App