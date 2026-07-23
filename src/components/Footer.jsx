import React from 'react'

const Footer = () => {
  const anio = 2026

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm p-6 mt-12 text-center font-sans">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#ayuda" className="hover:text-white transition-colors">Centro de Ayuda</a>
        <a href="#terminos" className="hover:text-white transition-colors">Términos y Condiciones</a>
      </div>
      <div className="border-t border-gray-800 pt-4 text-xs text-gray-500">
        <p>&copy; {anio} D' Calucho. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer