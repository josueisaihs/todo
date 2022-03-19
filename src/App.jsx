import React, { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion'
import TodoList from "./components/TodoList";

const tasks_ = [
  {
    id: uuid(),
    name: "Hello",
    completed: true,
    created: new Date()
  },
  {
    id: uuid(),
    name: "Hello",
    completed: true,
    created: new Date()
  },
  {
    id: uuid(),
    name: "Hello",
    completed: true,
    created: new Date()
  },
  {
    id: uuid(),
    name: "Hello",
    completed: false,
    created: new Date()
  },
]

const App = () => {
  const newTask = useRef()
  const [tasks, setTasks] = useState(tasks_.sort((a, b) => {return new Date(b.created) - new Date(a.created)}))

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const completedTask = (taskId, status) => {
    const newTasks = [...tasks]
    const indexTask = tasks.findIndex(task => task.id === taskId)
    newTasks[indexTask].completed = status
    
    setTasks(newTasks)
  }

  const createTask = (event) => {
    if (event.keyCode === 13 | event.code === "Enter" | event.key === "Enter"){
      const task = newTask.current.value
      setTasks(tasks => {
        const newTasks = [...tasks]
        newTasks.push({
          id: uuid(),
          name: task,
          completed: false,
          created: new Date()
        })

        return newTasks.sort((a, b) => {return new Date(b.created) - new Date(a.created)})
      })

      newTask.current.value = ""
    }
  }

  return (
    <>
      <section className="container-fluid text-dark bg-light hv-100">
        <motion.h1 
          className='text-center my-4'
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{type: "spring"}}
        >
          TODO
        </motion.h1>
        <div className=''>        
          <motion.input 
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{type: "tween", delay: .2}} 
            type="text" 
            placeholder='Crear tarea' 
            className='form-control' 
            ref={ newTask } 
            onKeyDown={ createTask }  />

          <TodoList tasks={ tasks } deleteTask = { deleteTask } completedTask = { completedTask } />
        </div>      
      </section>
      <footer className="text-center border border-bottom-0">
        <p className="text-secondary">
          { tasks.length } { tasks.length > 1 ? "Tareas" : "Tarea" }
        </p>
      </footer>
    </>    
  );
}

export default App;
