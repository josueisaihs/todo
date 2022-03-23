import React from 'react'
import { motion } from 'framer-motion'

import '../App.css'

export default function TodoItemDetail({task}) {
    return (
        <motion.div layout initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0, transitionDelay: 1.5}} exit={{ opacity: 0, y: -5}}>
            { new Date(task.created).toDateString() }
        </motion.div>
    )
}
