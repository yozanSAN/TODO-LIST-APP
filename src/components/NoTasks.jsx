import React from 'react'
import { MdChecklist } from "react-icons/md";

export default function NoTasks() {
    return (
        <div className='flex flex-col justify-center items-center gap-3 my-3'>
            <MdChecklist className='text-5xl font-bold text-secondary'/>
            <p className='text-xl'>YOUR LIST IS EMPTY</p>
            <p className='text-secondary'>Add task to get started</p>
        </div>
    )
}
