import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './Home'
import Form from './Form'
import ListEmploye from './ListEmploye'


function App() {

  const [selectedItem, setSelectedItem] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home setSelectedItem={setSelectedItem} />} />
        <Route path='/form' element={<Form />} />
        <Route path='/list' element={<ListEmploye selectedItem={selectedItem} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
