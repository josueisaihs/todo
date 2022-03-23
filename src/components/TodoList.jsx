import React from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import TodoItem from './TodoItem'

export default function TodoList({tasks, setTasks, deleteTask, completedTask }) {
    return (
        <div className='mt-4'>
             <AnimateSharedLayout>  
                <motion.ul layout className='container'>
                    { 
                        tasks.map((task, index) => (
                            <TodoItem 
                                key={ task.id } 
                                task = { task } 
                                deleteTask = { deleteTask } 
                                completedTask = { completedTask } 
                                index = { index }/>           
                        ))
                    }
                </motion.ul>           
            </AnimateSharedLayout>
        </div>       
    )
}
