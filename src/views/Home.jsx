import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'

const Home = ({ setCantidad }) => {
  const [productos, setProductos] = useState([])
  const [cantidadCarrito, setCantidadCarrito] = useState(0)
  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [errorNet, setErrorNet] = useState(null)
  const [correoBoletin, setCorreoBoletin] = useState('')
  const [usuarioReg, setUsuarioReg] = useState('')
  const [claveReg, setClaveReg] = useState('')

  // EFECTO DE MONTAJE PARA EL CONSUMO DE DATOS
  useEffect(() => {
    const obtenerDatosDeFirebase = async () => {
      try {
        setCargando(true)
        const urlFirebase = "https://firestore.googleapis.com/v1/projects/lacteos-d-calucho/databases/(default)/documents/productos"
        const respuesta = await fetch(urlFirebase)
        const datosRaw = await respuesta.json()

        const productosLimpios = datosRaw.documents.map((doc) => {
          return {
            id: Number(doc.fields.id.integerValue || doc.fields.id.doubleValue),
            nombre: doc.fields.nombre.stringValue,
            precio: Number(doc.fields.precio.doubleValue || doc.fields.precio.integerValue),
            precioAntiguo: Number(doc.fields.precioAntiguo.doubleValue || doc.fields.precioAntiguo.integerValue),
            descuento: doc.fields.descuento ? doc.fields.descuento.stringValue : "",
            imagen: doc.fields.imagen.stringValue
          }
        })

        setProductos(productosLimpios)

      } catch (err) {
        console.error("Error al conectar con Firebase:", err.message)
        setErrorNet("Error de conexión con el servidor de Google")
      } finally {
        setCargando(false)
      }
    }

    obtenerDatosDeFirebase()
  }, [])

  const incrementarCarrito = () => {
    const nueva = cantidadCarrito + 1
    setCantidadCarrito(nueva)
    setCantidad(nueva) // Sube el contador al App para que Header lo vea
  }

  const manejarBoletin = (e) => {
    e.preventDefault()
    alert(`¡Suscripción exitosa! Enviaremos ofertas a: ${correoBoletin}`)
    setCorreoBoletin('')
  }

  const manejarRegistro = (e) => {
    e.preventDefault()
    alert(`¡Cuenta creada con éxito!\nBienvenido: ${usuarioReg}`)
    setUsuarioReg('')
    setClaveReg('')
  }

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  )

  return (
    <div className="flex flex-col">

      {/* BANNER */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-sm mb-8 text-left">
        <h2 className="text-2xl font-bold mb-1">Sabores auténticos de Oxapampa</h2>
        <p className="text-sm text-emerald-100 mb-4">Directo del productor artesanal a tu mesa de manera sostenible.</p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm">
          Explorar Colección
        </button>
      </section>

      {/* BARRA DE BÚSQUEDA */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar del catálogo real en la nube..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-200 rounded-xl font-sans text-sm outline-none focus:border-emerald-600 shadow-sm"
          disabled={cargando}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-12">

        {/* SECCIÓN CATÁLOGO DINÁMICO */}
        <section className="text-left lg:col-span-3">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-800">Catálogo en Tiempo Real</h3>
            {!cargando && (
              <span className="text-xs text-gray-400">{productosFiltrados.length} disponibles</span>
            )}
          </div>

          {cargando && (
            <div className="text-center py-12 font-sans text-gray-400 animate-pulse">
              <p className="text-base font-semibold">Conectando con la base de datos en la nube...</p>
              <p className="text-xs mt-1">Por favor espere un momento.</p>
            </div>
          )}

          {errorNet && !cargando && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl font-sans text-sm">
              <p className="font-bold">Error de conexión:</p>
              <p className="text-xs">{errorNet}. Intenta recargar la página más tarde.</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {!cargando && !errorNet && (
              productosFiltrados.length === 0 ? (
                <p className="col-span-full text-gray-400 font-sans text-sm py-8">
                  No hay coincidencias en la base de datos para "{terminoBusqueda}".
                </p>
              ) : (
                productosFiltrados.map((item) => (
                  <Card
                    key={item.id}
                    producto={item}
                    alAgregar={incrementarCarrito}
                  />
                ))
              )
            )}
          </div>
        </section>

        {/* PANEL LATERAL */}
        <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-left">

          {/* ESTADO DEL SERVIDOR */}
          <h3 className="font-bold text-gray-800 text-base mb-2">Estado del Servidor</h3>
          <div className="flex items-center gap-2 mb-4 font-sans text-xs">
            <span className={`w-3 h-3 rounded-full ${errorNet ? 'bg-red-500' : cargando ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
            <span className="text-gray-400">
              {errorNet ? 'Desconectado' : cargando ? 'Sincronizando...' : 'Online (Firebase/Cloud)'}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-2 font-sans text-sm">
            <span>Canasta:</span>
            <span className="font-bold text-emerald-700">{cantidadCarrito} uds</span>
          </div>
          <button className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-3 rounded-xl transition-colors shadow-sm">
            Procesar Orden
          </button>

          {/* FORMULARIO DE REGISTRO */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <h3 className="font-bold text-gray-800 text-base mb-1">Crear Cuenta</h3>
            <p className="text-xs text-gray-400 mb-4">Únete para comprar rápido y seguro.</p>
            <form onSubmit={manejarRegistro} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Usuario / Correo</label>
                <input
                  type="text"
                  placeholder="ejemplo@correo.com"
                  value={usuarioReg}
                  onChange={(e) => setUsuarioReg(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-600"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Contraseña</label>
                <input
                  type="password"
                  placeholder="********"
                  value={claveReg}
                  onChange={(e) => setClaveReg(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-emerald-600"
                  required
                />
              </div>
              <button type="submit" className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm">
                Registrarme
              </button>
            </form>
          </div>
        </section>

      </div>

      {/* BOLETÍN */}
      <section className="bg-gray-100 p-6 rounded-2xl max-w-md mx-auto border border-gray-200 mb-8">

        <h3 className="text-center font-bold text-gray-800 mb-2">Boletín D'Calucho</h3>
        <form onSubmit={manejarBoletin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Ingresa tu correo para novedades..."
            value={correoBoletin}
            onChange={(e) => setCorreoBoletin(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-600"
            required
          />
          <button type="submit" className="bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Suscribirme
          </button>
        </form>
      </section>
    </div>
  )
}

export default Home