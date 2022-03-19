import React from 'react'
import { Reorder } from 'framer-motion'
import TodoItem from './TodoItem'

export default function TodoList({tasks, setTasks, deleteTask, completedTask }) {
    return (
        <Reorder.Group axis='y' values={ tasks } onReorder={ setTasks } className='mt-3 container' style={{ listStyle:"none"}} >
                { tasks.map((task, index) => (
                    <Reorder.Item key={task.id} value={task}>
                          <TodoItem key={ task.id } task = { task } deleteTask = { deleteTask } completedTask = { completedTask } index = { index }/>
                    </Reorder.Item>              
                ))}
        </Reorder.Group>
    )
}
