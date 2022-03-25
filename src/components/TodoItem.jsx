import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TodoItemDetail from './TodoItemDetail'

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

const ExpandBtn = ({isOpen, toggleOpen}) => {
    const variantsBtn = {
        initial: {opacity: 0, x: -5},
        enter: {opacity: 1, x: 0, transition: {delay: 1.1}},
        exit: {opacity: 0, x: -5, transition: {delay: 1.1}}
    }

    const onClick = () => {
        toggleOpen()
    }

    return (
        <motion.i 
            layout 
            initial="intial" 
            whileHover={{y: -2}}
            animate="enter" 
            exit="exit" 
            variants= {variantsBtn} 
            className={`bi bi-chevron-${isOpen ? "up" : "down"}`}
            onClick={ onClick }>
        </motion.i>
    )
}


export default function TodoItem({task, deleteTask, completedTask, index}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    const closeBtn = (event) => {
        deleteTask(task.id)
    }

    const onCompleted = (event) => {
        const status = event.target.checked
        completedTask(task.id, status)
    }

    return (
        <motion.div
            layout
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={{delay: (index + 1) * .1}}  
            layoutId={ task.id }
            className='border rounded px-2 py-1 mb-1 bg-light shadow my-4'>
            <motion.div layout className="d-flex flex-row justify-content-between">
                <motion.div
                    layout
                    className="d-flex flex-column">
                    <motion.div layout className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={ onCompleted } checked = { task.completed }/>                        
                        <h4 className={ task.completed ? "text-decoration-line-through text-secondary" : ""}>{ task.name }</h4>
                    </motion.div>
                </motion.div>
                
                <motion.div layout className='d-flex flex-column'>
                    <motion.button
                        layout
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: .9}}
                        type="button" 
                        className="btn-close" 
                        aria-label="Close" 
                        onClick={ closeBtn }>
                    </motion.button>
                </motion.div>                   
            </motion.div>

            <AnimatePresence>
                { isOpen && <TodoItemDetail task = { task } /> }
            </AnimatePresence>

            <AnimatePresence>
                <ExpandBtn isOpen={ isOpen } toggleOpen = { toggleOpen }/>
            </AnimatePresence>
        </motion.div>
    )
}
