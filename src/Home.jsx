import './App.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const Home = ({ setSelectedItem }) => {

    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    const goToForm = () => navigate('/form')
    // const goToList = () => navigate('/list')
    const showSelect = () => show ? setShow(false) : setShow(true)

    const [opcion, setOpcion] = useState('')

    const handleChange = (e) => setOpcion(e.target.value)

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
                        <select className='crear-select' value={opcion} onChange={handleChange}>
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
        </div>
    )
}
export default Home
