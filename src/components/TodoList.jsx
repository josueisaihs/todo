import React, { useState, useEffect } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import TodoItem from './TodoItem'

const variants = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible: ({delay}) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay,
            type: "tween"
        }
    })
}

export default function TodoList({tasks, deleteTask, completedTask, filter }) {
    const [tasksFilter, setTasksFilter] = useState(tasks)    

    useEffect(()=>{
        const onFilter = () => {
            let tasksFilter_ = []
            switch (filter) {
                case "COMPLETED":   
                    tasksFilter_ = tasks.filter(task => task.completed )             
                    break;            
                case "UNCOMPLETED":
                    tasksFilter_ = tasks.filter(task => !task.completed )
                    break;        
                default:
                    tasksFilter_ = tasks
                    break;
            }
    
            setTasksFilter(tasksFilter_)
        }

        onFilter()

    }, [filter, tasks])

    const getTasks = () => {
        const msg = () => {
            if (filter === "ALL") {
                return (
                    <>
                        <h1 className=''>Your list is clear !</h1>
                        <p>You do not have tasks</p>
                    </>
                )
            } else {
                return (
                    <>
                        <h1 className=''>No Matches !</h1>
                        <p>We have not found any matches for { filter.toLowerCase() } tasks</p>
                    </>
                )
            }
        }

        if (tasksFilter.length === 0) { 
            return (
                <motion.div
                    layout
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={{delay: (1) * .1}}  
                    layoutId={ "error" }
                    className='border px-2 py-1 mb-1 shadow text-danger text-center'>
                        { msg() }
                    </motion.div>
            )
        }
        return (
            tasksFilter.map((task, index) => (
                <TodoItem 
                    key={ task.id } 
                    task = { task } 
                    deleteTask = { deleteTask } 
                    completedTask = { completedTask } 
                    index = { index }/>           
            ))
        )
    }

    return (
        <div className='mt-4'>
             <AnimateSharedLayout>  
                <motion.ul layout className='container'>
                    { getTasks() }
                </motion.ul>           
            </AnimateSharedLayout>
        </div>       
    )
}
