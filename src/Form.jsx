import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './assets/supabaseClient'

const BASES = [
  'Miravete',
  'San Epi',
  'Ventas',
  'Madrid Rio',
  'Vaguada',
  'Vistalegre'
]

const Form = () => {
  const [showToast, setShowToast] = useState(false)
  const [errors, setErrors] = useState({})
  const [supabaseError, setSupabaseError] = useState('') // <-- Para mostrar error de Supabase
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    base: '',
    turno: '',
    delegado: '',
    ayudaSolicitada: '',
    solucionado: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const validate = () => {
    const newErrors = {}
    const requiredFields = [
      'nombre',
      'apellidos',
      'telefono',
      'base',
      'turno',
      'delegado',
      'ayudaSolicitada'
    ]

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = 'Rellena este campo'
      }
    })

    // Validar teléfono solo números
    if (formData.telefono && !/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe contener solo números'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSupabaseError('') // resetear error al enviar

    if (!validate()) return

    try {
      const { error } = await supabase
        .from('employe')
        .insert([
          {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            telefono: formData.telefono,
            base: formData.base,
            turno: formData.turno,
            delegado: formData.delegado,
            ayuda: formData.ayudaSolicitada,
            solucionado: formData.solucionado
          }
        ])

      if (error) {
        console.log('Error Supabase:', error)
        setSupabaseError('No se pudo guardar la ficha. Intenta de nuevo.')
      } else {
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          navigate('/')
        }, 1500)

        // Resetear formulario solo si no hay error
        setFormData({
          nombre: '',
          apellidos: '',
          telefono: '',
          base: '',
          turno: '',
          delegado: '',
          ayudaSolicitada: '',
          solucionado: false
        })
        setErrors({})
      }
    } catch (err) {
      console.log('Error inesperado:', err)
      setSupabaseError('Ocurrió un error inesperado. Intenta más tarde.')
    }
  }

  const goBack = () => navigate('/')

  return (
    <div className='form-container'>
      <form className='formulario' onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className='campo'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            id='nombre'
            type='text'
            name='nombre'
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className='error-text'>{errors.nombre}</span>}
        </div>

        {/* Apellidos */}
        <div className='campo'>
          <label htmlFor='apellidos'>Apellidos</label>
          <input
            id='apellidos'
            type='text'
            name='apellidos'
            value={formData.apellidos}
            onChange={handleChange}
          />
          {errors.apellidos && <span className='error-text'>{errors.apellidos}</span>}
        </div>

        {/* Teléfono */}
        <div className='campo'>
          <label htmlFor='telefono'>Teléfono</label>
          <input
            id='telefono'
            type='tel'
            name='telefono'
            value={formData.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <span className='error-text'>{errors.telefono}</span>}
        </div>

        {/* Base */}
        <div className='campo'>
          <label htmlFor='base'>Base</label>
          <select
            id='base'
            name='base'
            value={formData.base}
            onChange={handleChange}
          >
            <option value=''>Selecciona base</option>
            {BASES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.base && <span className='error-text'>{errors.base}</span>}
        </div>

        {/* Turno */}
        <div className='campo'>
          <label htmlFor='turno'>Turno</label>
          <input
            id='turno'
            type='text'
            name='turno'
            value={formData.turno}
            onChange={handleChange}
          />
          {errors.turno && <span className='error-text'>{errors.turno}</span>}
        </div>

        {/* Delegado */}
        <div className='campo'>
          <label htmlFor='delegado'>Delegado</label>
          <input
            id='delegado'
            type='text'
            name='delegado'
            value={formData.delegado}
            onChange={handleChange}
          />
          {errors.delegado && <span className='error-text'>{errors.delegado}</span>}
        </div>

        {/* Ayuda */}
        <div className='campo'>
          <label htmlFor='ayudaSolicitada'>Ayuda solicitada</label>
          <textarea
            id='ayudaSolicitada'
            name='ayudaSolicitada'
            value={formData.ayudaSolicitada}
            onChange={handleChange}
          />
          {errors.ayudaSolicitada && (
            <span className='error-text'>{errors.ayudaSolicitada}</span>
          )}
        </div>

        {/* Checkbox solucionado */}
        <div className='campo-checkbox'>
          <label htmlFor='solucionado'>Solucionado</label>
          <input
            id='solucionado'
            type='checkbox'
            name='solucionado'
            checked={formData.solucionado}
            onChange={handleChange}
          />
        </div>

        {/* Botones */}
        <div>
          <button className='send-button' type='submit'>Guardar</button>
          <button className='send-button' type='button' onClick={goBack}>Atras</button>
        </div>

        {/* Mensaje de error de Supabase */}
        {supabaseError && <div className='error-text' style={{ marginTop: '10px' }}>{supabaseError}</div>}
      </form>

      {/* Toast */}
      {showToast && <div className='send-toast'>Ficha guardada</div>}
    </div>
  )
}

export default Form