import React from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

import "../App.css"

export default function Error404() {
  return (
    <motion.section className='app-container bg-danger'>
        <motion.div className='card shadow' style={{ padding: "3rem" }}>
          <motion.div className='d-flex flex-row' 
            initial={{y: -20}} 
            animate={
              {
                y: 0, 
                transition: { 
                  delayChildren: 0.5
                }
              }
            } 
            style={{fontSize: "3rem"}}>
            <motion.div 
              initial={{y: 0}} 
              animate={{y: -10, transition: {delay: 1., repeat: Infinity, repeatType: "reverse", duration: 2.5, type: "tween"}}} >
              <motion.i className='bi bi-asterisk text-danger'></motion.i>
            </motion.div>
            
            <span className='ms-2'>404</span>
          </motion.div>
          <p>There's nothing here!</p>
          <motion.div 
            whileHover={{x: 2}} 
            initial={{x: 0}}>
            <Link to="/" className='link-dark'>
              <i className='bi bi-arrow-left me-1'></i>
              Back
            </Link>
          </motion.div>         
        </motion.div>
    </motion.section>
  )
}
