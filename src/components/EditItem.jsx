import React , { useRef, useState , useEffect} from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditItem({ KEY }) {
    const [tasks, setTasks] = useState([])
    const params = useParams()
    const name = useRef()
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    useEffect(
        ()=>{
            const storedTasks = JSON.parse(localStorage.getItem(KEY))
            if (storedTasks) setTasks(storedTasks)
        }, [KEY]
    )
    
    // useEffect(
    //     ()=>{
    //         localStorage.setItem(KEY, JSON.stringify(tasks))
    //     }, [KEY, tasks]
    // )

    useEffect(
        ()=>{
            const taskId = params.taskId

            const validateTaskId = (id) => {
                console.log(tasks, tasks.find(task => task.id === id))
                if (tasks.find(task => task.id === id)) return true
                return false
            }
            
            if (!validateTaskId(taskId)) navigate('/404')
        }, [params, tasks, navigate]
    )

    

    const save = () => {
        console.log(name.current.value, description)
        navigate("/")
    }

    const task = {
        id: params.taskId,
        name: "New Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quidem maxime, voluptatem error beatae quae rerum quia, blanditiis corporis commodi corrupti fugiat nulla recusandae ipsam, vitae nobis ducimus. Dolore, maxime.",
        created: new Date().toLocaleString()
    }

    useEffect(() => {
        setDescription(task.description)
    }, [task.description])

    const descriptionChange = (event) => {
        setDescription(event.target.value)
    }

    return (
        <section className='app-container bg-dark'>
            <motion.div
                className='card p-4'
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}>
                    <motion.h1
                        initial={{opacity: 0, y: 5}}
                        animate={{opacity: 1, y: 0, transitionDelay: 1.}}
                        style={{fontSize: "3rem"}}>
                        <Link to="/" className='link-dark me-2'>
                            <i className='bi bi-arrow-left'></i>
                        </Link>
                        Edit Task
                    </motion.h1>
                    <motion.div className='card-body'>
                        <motion.input 
                            className='form-control' 
                            ref={ name } 
                            defaultValue = { task.name } />

                        <textarea 
                            rel={ description } 
                            className='form-control mt-2' 
                            rows="10"
                            onChange = { descriptionChange }
                            defaultValue={ description } />

                        <div>{ task.created }</div>

                        <motion.button 
                            onClick={ save } 
                            className='btn btn-outline-primary mt-2'>
                            Save
                        </motion.button>
                    </motion.div>
            </motion.div>
        </section>
    )
}
