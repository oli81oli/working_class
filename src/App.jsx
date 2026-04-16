import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './Home'
import Form from './Form'
import ListEmploye from './ListEmploye'


function App() {

  const [selectedItem, setSelectedItem] = useState([])
  const [showToast, setShowToast] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home setSelectedItem={setSelectedItem} showToast={showToast} setShowToast={setShowToast} />} />
        <Route path='/form' element={<Form setShowToast={setShowToast} />} />
        <Route path='/list' element={<ListEmploye selectedItem={selectedItem} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
