import React from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../assets/lupa.png'
import heartIcon from '../assets/me-gusta.png'
import cartIcon from '../assets/carro-de-la-carretilla.png'

const Header = ({ cantidad }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 font-sans">
      
      {/* Logotipo — al hacer clic regresa al Home */}
      <div className="header-logo">
        <Link to="/" className="text-xl font-bold text-emerald-800 tracking-wide cursor-pointer">
          D' Calucho
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex items-center gap-4">
        {/* Enlace al Login */}
        <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors">
          Mi Cuenta
        </Link>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <img src={searchIcon} alt="Buscar" className="w-6 h-6 object-contain" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <img src={heartIcon} alt="Mis Favoritos" className="w-6 h-6 object-contain" />
        </button>

        {/* Contenedor relativo para el carrito */}
        <div className="relative cursor-pointer">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <img src={cartIcon} alt="Carrito" className="w-6 h-6 object-contain" />
          </button>
          {/* Badge dinámico con la cantidad real */}
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
            {cantidad}
          </span>
        </div>
      </nav>
    </header>
  )
}

export default Header