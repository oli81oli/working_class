import './App.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const Home = ({ setSelectedItem, showToast, setShowToast }) => {
    console.log(showToast)
    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    const goToForm = () => navigate('/form')
    const showSelect = () => show ? setShow(false) : setShow(true)

    const [opcion, setOpcion] = useState('')

    const handleChange = (e) => setOpcion(e.target.value)

    if (showToast) {
        setTimeout(() => {
            setShowToast(false)
        }, 1500)
    }

    useEffect(() => {
        if (opcion !== '') {
            setSelectedItem(opcion)
            navigate('/list')
        }
    }, [opcion])

    return (
        <div className='body-main'>
            <div className='main'>
                <button className='button' onClick={goToForm}>crear ficha</button>
                <button className='button' onClick={showSelect}>ver listado</button>

                <div>
                    {show &&
                        <select id='base-selected' name='base-selected' className='crear-select' value={opcion} onChange={handleChange}>
                            <option value=''>-- elegir --</option>
                            <option value='Miravete'>Miravete</option>
                            <option value='San Epi'>San Epi</option>
                            <option value='Ventas'>Ventas</option>
                            <option value='Vaguada'>Vaguada</option>
                            <option value='Vistalegre'>Vistalegre</option>
                            <option value='Madrid Rio'>Madrid Rio</option>
                        </select>
                    }
                </div>
            </div>
            {/* Toast */}
            {showToast && <div className='send-toast'>Ficha guardada</div>}
        </div>
    )
}
export default Home
