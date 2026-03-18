import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './assets/supabaseClient'

const Form = () => {

  const [showToast, setShowToast] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
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
      console.log('Error:', error)
    } else {
      setShowToast(true)

      setTimeout(() => {
        setShowToast(false)
        navigate('/')
      }, 2500)

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
    }
  }
  const goBack = () => navigate('/')

  return (
    <div className='form-container'>
      <form className='formulario' onSubmit={handleSubmit}>

        <div className='campo'>
          <label for='nombre'>Nombre</label>
          <input
            id='nombre'
            type='text'
            name='nombre'
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label for='apellidos'>Apellidos</label>
          <input
            id='apellidos'
            type='text'
            name='apellidos'
            value={formData.apellidos}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label for='telefono'>Teléfono</label>
          <input
            id='telefono'
            type='tel'
            name='telefono'
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label for='base'>Base</label>
          <select
            id='base'
            name='base'
            value={formData.base}
            onChange={handleChange}
          >
            <option value=''>Selecciona base</option>
            <option value='Miravete'>Miravete</option>
            <option value='San Epi'>San Epi</option>
            <option value='Ventas'>Ventas</option>
            <option value='Madrid Rio'>Madrid Rio</option>
            <option value='Vaguada'>Vaguada</option>
            <option value='Vistalegre'>Vistalegre</option>
          </select>
        </div>

        <div className='campo'>
          <label for='turno'>Turno</label>
          <input
            id='turno'
            type='text'
            name='turno'
            value={formData.turno}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label for='delegado'>Delegado</label>
          <input
            id='delegado'
            type='text'
            name='delegado'
            value={formData.delegado}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label for='ayudaSolicitada'>Ayuda solicitada</label>
          <textarea
            id='ayudaSolicitada'
            name='ayudaSolicitada'
            value={formData.ayudaSolicitada}
            onChange={handleChange}
          />
        </div>

        <div className='campo-checkbox'>
          <label for='solucionado'>Solucionado</label>
          <input
            id='solucionado'
            type='checkbox'
            name='solucionado'
            checked={formData.solucionado}
            onChange={handleChange}
          />
        </div>

        <div>
          <button className='send-button' type='submit'>Enviar</button>
          <button className='send-button' onClick={goBack}>Atras</button>
        </div>

      </form>
      {showToast && (
        <div className='send-toast'>
          Ficha guardada
        </div>
      )}
    </div>
  )
}

export default Form