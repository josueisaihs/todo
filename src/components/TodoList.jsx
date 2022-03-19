import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({tasks, deleteTask, completedTask }) {
    return (
        <ul className='mt-3 container'>
            { tasks.map(task => {
                return <TodoItem key={ task.id } task = { task } deleteTask = { deleteTask } completedTask = { completedTask } />
            })}
        </ul>
    )
}
