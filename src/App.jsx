import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion'
import TodoList from "./components/TodoList";
import { Fragment } from 'react/cjs/react.production.min';

const KEY = "todosapp.tasks"

const App = () => {
  const newTask = useRef()
  const [tasks, setTasks] = useState([])

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
      if (task !== "" && task.length > 4){
        setTasks(tasks => {
          const newTasks = [...tasks]
          newTasks.push({
            id: uuid(),
            name: task,
            completed: false,
            created: new Date()
          })
  
          return newTasks.sort((a, b) => (new Date(b.created) - new Date(a.created)))
        })
        newTask.current.value = ""
      }      
    }
  }

  useEffect(
    ()=>{
      const storedTasks = JSON.parse(localStorage.getItem(KEY))
      if (storedTasks) setTasks(storedTasks)
    }, []
  )

  useEffect(
    ()=>{
      localStorage.setItem(KEY, JSON.stringify(tasks))
    }, [tasks]
  )

  const footer = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const unfinished = total - completed

    if (total === 0){
      return (
        <div className='text-white border border-dark bg-dark px-2 py-1 rounded'>
            No Task
        </div>
      )
    }else if (total === completed) {
      return (
        <div className='text-primary border border-primary px-2 py-1 rounded'>
            All Tasks Finished
        </div>
      )
    }else if (total === unfinished) {
      return (
        <div className='text-danger border border-danger px-2 py-1 rounded'>
            No Task Finished
        </div>
      )
    }else{
      const finishedPC = (completed / total * 100).toFixed(1)
      const unfinishedPC = (unfinished / total * 100).toFixed(1)

      return (
        <Fragment>
          <div className='text-dark border border-dark px-2 py-1 rounded mx-1'>
            { total } Tasks
          </div>
          <div className='text-primary border border-primary px-2 py-1 rounded mx-1'>
            { finishedPC }% Finished
          </div>
          <div className='text-danger border border-danger px-2 py-1 rounded mx-1'>
            { unfinishedPC }% Unfinished
          </div>
        </Fragment>  
      )
    }
  }

  return (
    <div className='d-flex flex-column' style={{ height: "100vh"}}>
      <section className="container-fluid text-dark overflow-auto">
        <motion.h1 
          className='text-center my-4'
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{type: "spring"}}
          style={{fontSize: "3rem"}}
        >
          TODOS
        </motion.h1>
        <div className=''>        
          <motion.input 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{type: "tween", delay: .2}} 
            type="text" 
            placeholder='Crear tarea' 
            className='form-control' 
            ref={ newTask } 
            onKeyDown={ createTask }  />

          <TodoList tasks={ tasks } deleteTask = { deleteTask } completedTask = { completedTask } setTasks = { setTasks } />
        </div>      
      </section>
      <motion.footer
        initial={{opacity: 0}}
        animate={{opacity:1}}
        transition={{duration: 1, delay: .5}}
        className="d-flex justify-content-center mt-auto py-4 bg-light">
        { footer() }        
      </motion.footer>    
    </div>    
  );
}

export default App;
