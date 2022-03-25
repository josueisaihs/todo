import React, { useState, useRef, useEffect, Fragment } from 'react'
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion'
import Typical from 'react-typical'

import TodoList from "./components/TodoList";

import './App.css'
import Filter from './components/Filter';

const transition = {
  duration: .5,
  ease: "easeInOut"
}

const mainVariants ={
  initial: {scale: 0.9,  opacity: 0},
  enter: {scale: 1, opacity: 1, transition},
  exit: {scale: 0.5, opacity: 0, transition: { duration: 1.5, ...transition}}
}

const App = ({KEY}) => {
  const newTask = useRef()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("ALL")
  const [typical, setTypical] = useState('')

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
            description: "",
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
    }, [KEY]
  )

  useEffect(
    ()=>{
      localStorage.setItem(KEY, JSON.stringify(tasks))
    }, [KEY, tasks]
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

  const changeFilterEvent = (filter) => {
    setFilter(filter)
  }

  useEffect(() => {
    setTypical("MY LIST")

    setTimeout(() => {
      setTypical(
        <Typical
          steps = {['MY LIST', 5000, 'TO DO', 1000]}
          loop = {1}
          />
        )
    }, 1000)
  }, [])

  return (
    <>    
      <div 
        className='d-flex flex-column' 
        style={{ height: "100vh"}}>
        <motion.section 
          className="container text-dark overflow-auto pb-4"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={mainVariants}>
          <motion.h1 
            className='text-center my-4'
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{type: "spring"}}
            style={{fontSize: "3rem"}}>
            { typical }
          </motion.h1>
          <div className=''>        
            <motion.input 
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{type: "tween", delay: .2}} 
              type="text" 
              placeholder='Create Task' 
              className='form-control shadow' 
              ref={ newTask } 
              onKeyDown={ createTask }  />
            
            <Filter changeFilterEvent={ changeFilterEvent }/>

            <TodoList 
              tasks={ tasks } 
              deleteTask = { deleteTask } 
              completedTask = { completedTask }
              filter = { filter } />
          </div>      
        </motion.section>
        <motion.footer
          initial={{opacity: 0, y: 20}}
          animate={{opacity:1, y: 0}}
          transition={{delay: .5}}
          className="d-flex justify-content-center mt-auto py-4 bg-light shadow-top">
          { footer() }        
        </motion.footer>    
      </div>
    </>
  );
}

export default App;
