import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Item = ({filter, changeFilter, index}) => {
    const variants = {
        initial: {opacity: 0, x: -5, scale: 0.9},
        animate: (delay) => (
            {
                opacity: 1, 
                x: 0, 
                scale: 1, 
                transition: {
                    delay,
                    type: "tween"
                }
            }
        )
    }
    const onClick = () => {
        changeFilter(filter.name)
    }

    return (
        <motion.button 
            layout
            layoutId = { filter.name }
            variants = { variants }
            initial = "initial"
            animate = "animate"
            custom={{delay: (index + 1) * .1}} 
            whileHover={{scale: 1.03}}
            whileTap={{scale: 1.1}}
            className={`btn btn-outline-${ filter.active ? "primary" : "dark"} px-3 py-1 rounded rounded-lg mx-1`} 
            onClick = { onClick }>
            { filter.name }
        </motion.button>
    )
}

export default function Filter({changeFilterEvent}) {
    const [filters, setFilters] = useState([
        {
            name: "ALL",
            active: true
        },
        {
            name: "COMPLETED",
            active: false
        },
        {
            name: "UNCOMPLETED",
            active: false
        }
    ])

    const changeFilter = (filterName) => {
        setFilters((oldFilters) => (
            oldFilters.map(
                filter => {
                    filter.active = filter.name === filterName
                    return filter
            })
        ))

        changeFilterEvent(filterName)
    }

    return (
        <motion.div layout initial={{opacity: 0}} animate={{opacity: 1, transitionDelay: 1.}} className='d-flex flex-row my-4 justify-content-center'>
            {
                filters.map(
                    (filter, index) => (
                        <Item key={ filter.name } filter = { filter } changeFilter = { changeFilter } index = { index } />
                    )
                )
            }
        </motion.div>
    )
}
