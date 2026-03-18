import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './assets/supabaseClient'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const ListEmploye = ({ selectedItem }) => {


    const [datos, setDatos] = useState([])
    const [editandoId, setEditandoId] = useState(null)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        obtenerDatos()
    }, [])

    async function obtenerDatos() {
        const { data, error } = await supabase
            .from('employe')
            .select('*')

        if (error) {
            console.error(error)
        } else {
            setDatos(data)
        }
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
        setFormData(item)
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Teléfono</th>
                                <th>Base</th>
                                <th>Turno</th>
                                <th>Delegado</th>
                                <th>Ayuda</th>
                                <th>Solucionado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {datos.filter((item) => item.base === selectedItem).map((item) => (
                                <tr key={item.id}>

                                    {editandoId === item.id ? (
                                        <>
                                            <td><input name='nombre' value={formData.nombre} onChange={handleChange} /></td>
                                            <td><input name='apellidos' value={formData.apellidos} onChange={handleChange} /></td>
                                            <td><input name='telefono' value={formData.telefono} onChange={handleChange} /></td>
                                            <td><input name='base' value={formData.base} onChange={handleChange} /></td>
                                            <td><input name='turno' value={formData.turno} onChange={handleChange} /></td>
                                            <td><input name='delegado' value={formData.delegado} onChange={handleChange} /></td>
                                            <td><input name='ayuda' value={formData.ayuda} onChange={handleChange} /></td>
                                            <td><input name='solucionado' value={formData.solucionado} onChange={handleChange} /></td>

                                            <td>
                                                <button className='save' onClick={guardarCambios}>Guardar</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.nombre}</td>
                                            <td>{item.apellidos}</td>
                                            <td> <Link to={`+34${item.telefono}`}>
                                                {item.telefono}
                                            </Link></td>
                                            <td>{item.base}</td>
                                            <td>{item.turno}</td>
                                            <td>{item.delegado}</td>
                                            <td>{item.ayuda}</td>
                                            <td>{item.solucionado ? 'Si' : 'No'}</td>

                                            <td>
                                                <button className='edit-button' onClick={() => empezarEditar(item)}>Actualizar</button>
                                                <button className='edit-button' onClick={() => eliminarItem(item.id)}>Eliminar</button>
                                            </td>
                                        </>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListEmploye