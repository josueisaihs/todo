import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import EditItem from './components/EditItem'
import Error404 from './components/Error404'

const KEY = "todosapp.tasks"


export default function Main() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <App KEY = { KEY } />} />
            <Route path='/task/:taskId' element={ <EditItem KEY = { KEY } /> } />        
            <Route
                path="*"
                element={ <Error404 /> }
            />
        </Routes>   
    </BrowserRouter>
  )
}
