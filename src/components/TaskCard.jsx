import React from 'react'
import TASK_TYPE from '../utils/Constant'

const TaskCard = (props) => {
    const data=props.data
    const type=props.type
    const handler1=props.handler1
    const handler2=props.handler2
    const setActiveCard=props.setActiveCard


    const description=data.description || "No description found"

    const dragStartHandler=()=>{
      setActiveCard(data)
    }


    const dragEndHandler=()=>{
      setActiveCard(null)
    }

  return (
    <div className='w-[400px] h-[120px] cursor-grab  bg-[#1e90ff] px-6 flex justify-between items-start py-4 rounded-md' draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}   >
       <div className='w-[200px] flex flex-col items-start '>
            <div className='text-xl'>{data.title}</div>
            <textarea className='h-[75px] text-sm bg-inherit mt-1  textarea' disabled readOnly>{description}</textarea>
       </div>


        <>
        {
         (type===TASK_TYPE.PENDING) && (
          <button onClick={()=>handler1(data)} className='w-[100px] flex items-center justify-center gap-x-3 bg-[#84fa84] border-2 rounded-md border-white  py-3  font-semibold'>
            Start
          </button>
         )
       }


       {
        (type===TASK_TYPE.PROGRESS) && (
          <button onClick={()=>handler2(data)} className='flex items-center justify-center gap-x-3 bg-[#84fa84] border-2 rounded-md border-white  py-3 w-[100px] font-semibold'>
            Complete
          </button>
        )
       }

       {

        (type===TASK_TYPE.COMPLETE) && (
          <div className='flex flex-col justify-start'>
            <div className='text-left text-sm'>Completed at :</div>
            <div>{data.time}</div>
          </div>
        )
       }

        </>
       

       
    </div>
  )
}

export default TaskCard