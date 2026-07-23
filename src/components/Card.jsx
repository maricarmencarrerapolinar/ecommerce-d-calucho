import React from 'react'

const Card = ({ producto, alAgregar }) => {
  const { nombre, precio, precioAntiguo, descuento, imagen } = producto;

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:scale-[1.02] transition-all duration-300 font-sans p-3 max-w-[163px] md:max-w-xs">
      
      <div className="w-full bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center relative">
        <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
        {descuento && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
            -{descuento}%
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-col flex-grow text-left">
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {nombre}
        </h4>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-2">
          <span className="text-base font-bold text-emerald-700">S/ {precio.toFixed(2)}</span>
          <span className="text-xs text-gray-400 line-through">S/ {precioAntiguo.toFixed(2)}</span>
        </div>

        <button
          onClick={alAgregar}
          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm"
        >
          Añadir
        </button>
      </div>

    </div>
  )
}

export default Card