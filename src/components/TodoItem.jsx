import React, { Fragment } from 'react'

export default function TodoItem({task, deleteTask, completedTask}) {
    const closeBtn = (event) => {
        deleteTask(task.id)
    }

    const onCompleted = (event) => {
        const status = event.target.checked
        completedTask(task.id, status)
    }

    return (
        <Fragment>
            <div className='border rounded px-2 py-1 mb-1'>
                <div className="d-flex flex-row justify-content-between">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={ onCompleted } checked = { task.completed }/>
                        <h4 className={ task.completed ? "text-decoration-line-through text-secondary" : ""}>{ task.name }</h4>
                    </div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={ closeBtn }></button>       
                </div>
            </div>
        </Fragment>
    )
}
