import React from 'react'
import { motion } from 'framer-motion'

const variants = {
    hidden: {
        opacity: 0
    },
    visible: ({delay}) => ({
        opacity: 1,
        transition: {
            delay,
            duration: 1,
            type: "tween"
        }
    })
}

export default function TodoItem({task, deleteTask, completedTask, index}) {
    const closeBtn = (event) => {
        deleteTask(task.id)
    }

    const onCompleted = (event) => {
        const status = event.target.checked
        completedTask(task.id, status)
    }

    return (
        <motion.li 
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={{delay: (index + 1) * .1}}  
            layoutId={ task.id }

            className='border rounded px-2 py-1 mb-1 bg-light'>
            <div className="d-flex flex-row justify-content-between">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={ onCompleted } checked = { task.completed }/>
                    <h4 className={ task.completed ? "text-decoration-line-through text-secondary" : ""}>{ task.name }</h4>
                </div>
                <motion.button 
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: .9}}
                    type="button" 
                    className="btn-close" 
                    aria-label="Close" 
                    onClick={ closeBtn }>
                </motion.button>       
            </div>
        </motion.li>
    )
}
