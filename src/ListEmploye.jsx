import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './assets/supabaseClient'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

//  BASES reutilizable
const BASES = [
    'Miravete',
    'San Epi',
    'Ventas',
    'Madrid Rio',
    'Vaguada',
    'Vistalegre'
]

const ListEmploye = ({ selectedItem }) => {

    const [loading, setLoading] = useState(true)
    const [datos, setDatos] = useState([])
    const [editandoId, setEditandoId] = useState(null)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        obtenerDatos()
    }, [])

    async function obtenerDatos() {
        setLoading(true)
        const { data, error } = await supabase
            .from('employe')
            .select('*')

        if (error) {
            console.error(error)
        } else {
            setDatos(data)
        }
        setLoading(false)
    }

    const formatNumber = (phone) => {
        if (typeof phone !== 'string' && typeof phone !== 'number') {
            return ''
        }

        let clean = phone.toString().replace(/\s+/g, '')

        if (clean.startsWith('+34')) return clean
        if (clean.startsWith('34')) return `+${clean}`

        return `+34${clean}`
    }

    async function eliminarItem(id) {
        const { error } = await supabase
            .from('employe')
            .delete()
            .eq('id', id)

        if (!error) {
            setDatos(datos.filter(item => item.id !== id))
        }
    }

    function empezarEditar(item) {
        setEditandoId(item.id)
        setFormData({
            ...item,
            solucionado: item.solucionado ?? false
        })
    }

    function handleChange(e) {
        const { name, type, value, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    async function guardarCambios() {
        const { error } = await supabase
            .from('employe')
            .update(formData)
            .eq('id', editandoId)

        if (!error) {
            setEditandoId(null)
            obtenerDatos()
        }
    }

    const goBack = () => navigate('/')

    return (
        <>
            <div>
                <h2>Listado</h2>
                <button onClick={goBack} className='back'>Atras</button>

                <div className='tabla-container'>
                    {
                        loading ? (<Loader />) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Telefono</th>
                                        <th>Base</th>
                                        <th>Turno</th>
                                        <th>Delegado</th>
                                        <th>Ayuda</th>
                                        <th>Solucionado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {datos.filter((item) => item.base === selectedItem).length === 0 ? (
                                        <tr>
                                            <td colSpan='9' className='text-data'>
                                                No hay datos todavia
                                            </td>
                                        </tr>
                                    ) : (
                                        datos
                                            .filter((item) => item.base === selectedItem)
                                            .map((item) => (
                                                <tr key={item.id}>
                                                    {editandoId === item.id ? (
                                                        <>
                                                            <td><input name='nombre' value={formData.nombre} onChange={handleChange} /></td>
                                                            <td><input name='apellidos' value={formData.apellidos} onChange={handleChange} /></td>
                                                            <td><input name='telefono' value={formData.telefono} onChange={handleChange} /></td>

                                                            {/* 🔥 SELECT BASE */}
                                                            <td>
                                                                <select
                                                                    name="base"
                                                                    value={formData.base || ''}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="">Selecciona base</option>
                                                                    {BASES.map((base) => (
                                                                        <option key={base} value={base}>
                                                                            {base}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>

                                                            <td><input name='turno' value={formData.turno} onChange={handleChange} /></td>
                                                            <td><input name='delegado' value={formData.delegado} onChange={handleChange} /></td>
                                                            <td><input name='ayuda' value={formData.ayuda} onChange={handleChange} /></td>

                                                            <td>
                                                                <input
                                                                    type='checkbox'
                                                                    name='solucionado'
                                                                    checked={formData.solucionado || false}
                                                                    onChange={handleChange}
                                                                />
                                                                {formData.solucionado ? ' Si' : ' No'}
                                                            </td>

                                                            <td>
                                                                <button className='save' onClick={guardarCambios}>
                                                                    Guardar
                                                                </button>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.apellidos}</td>

                                                            <td>
                                                                <a
                                                                    className='phone-number'
                                                                    href={`tel:${formatNumber(item.telefono)}`}
                                                                >
                                                                    {item.telefono}
                                                                </a>
                                                            </td>

                                                            <td>{item.base}</td>
                                                            <td>{item.turno}</td>
                                                            <td>{item.delegado}</td>
                                                            <td>{item.ayuda}</td>
                                                            <td>{item.solucionado ? 'Si' : 'No'}</td>

                                                            <td>
                                                                <button
                                                                    className='edit-button'
                                                                    onClick={() => empezarEditar(item)}
                                                                >
                                                                    Actualizar
                                                                </button>

                                                                <button
                                                                    className='edit-button'
                                                                    onClick={() => eliminarItem(item.id)}
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ListEmploye