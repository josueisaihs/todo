import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import TodoItemDetail from './components/TodoItemDetail'

const KEY = "todosapp.tasks"


export default function Main() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <App KEY = { KEY } />} />
            <Route path='task/:taskId' element={ <TodoItemDetail KEY = { KEY } />}/>            
            <Route
                path="*"
                element={
                    <div style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </div>
                }
            />
        </Routes>   
    </BrowserRouter>
  )
}
