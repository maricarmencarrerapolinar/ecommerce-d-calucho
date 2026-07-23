import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [errorValidacion, setErrorValidacion] = useState('') // Estado para mensaje de error visual
  const [procesando, setProcesando] = useState(false)        // Estado de carga (Loader)
  const navigate = useNavigate()

  const registrarUsuario = async (e) => {
    e.preventDefault()

    // 1. VALIDACIÓN PREVENTIVA (FRONTEND)
    setErrorValidacion('') // Limpiamos errores previos

    if (!correo.trim()) {
      setErrorValidacion("El campo no puede estar vacío.")
      return // Detiene la función aquí, NO llama a Firebase
    }

    // Expresión regular básica para verificar que parezca un correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      setErrorValidacion("Por favor, ingresa un correo electrónico válido.")
      return
    }

    // 2. INICIO DE ESTADO DE CARGA
    setProcesando(true)

    const urlApi = "https://firestore.googleapis.com/v1/projects/lacteos-d-calucho/databases/(default)/documents/usuarios"
    const payload = {
      fields: {
        correo: { stringValue: correo },
        fecha: { stringValue: new Date().toISOString() }
      }
    }

    // 3. BLOQUE DE SEGURIDAD (TRY / CATCH / FINALLY)
    try {
      const respuesta = await fetch(urlApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!respuesta.ok) throw new Error("Fallo en el servidor de base de datos")

      // NOTIFICACIÓN TOAST DE ÉXITO (En lugar del feo alert)
      toast.success("¡Bienvenido a D' Calucho!")
      navigate('/')

    } catch (error) {
      // NOTIFICACIÓN TOAST DE ERROR
      toast.error(error.message)
    } finally {
      // Esto siempre se ejecuta, apagando el botón de carga
      setProcesando(false)
      setCorreo('')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-10 text-center">
      <h2 className="text-xl font-lora font-bold text-emerald-800 mb-4">Registro de Clientes</h2>

      <form onSubmit={registrarUsuario} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value)
              setErrorValidacion('') // Limpia el error al escribir
            }}
            className={`w-full p-2 border rounded-xl outline-none text-sm transition-colors ${errorValidacion
              ? 'border-red-400 focus:border-red-400'
              : 'border-gray-200 focus:border-emerald-600'}`}
            disabled={procesando} // Se bloquea el input si está cargando
          />
          {/* RENDERIZADO CONDICIONAL DEL ERROR */}
          {errorValidacion && (
            <p className="text-red-500 text-xs mt-1 font-sans">{errorValidacion}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={procesando}
          className={`w-full text-white text-sm font-semibold py-2 rounded-xl transition-colors flex justify-center items-center gap-2
            ${procesando ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
        >
          {procesando ? (
            <>
              {/* SPINNER SVG ANIMADO */}
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Conectando...
            </>
          ) : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  )
}

export default Login