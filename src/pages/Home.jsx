import React, { act, useState } from 'react'
import NewTaskModal from '../components/NewTaskModal'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { MdAddTask } from 'react-icons/md'
import timestamp from 'time-stamp'
import TaskCard from '../components/TaskCard'
import TASK_TYPE from '../utils/Constant'
import { addToComplete, addToProgress, removeFromComplete, removeFromPending, removeFromProgress, updateComplete, updatePending, updateProgress } from '../redux/slices/lists'
import { MdOutlinePendingActions } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
import DropArea from '../components/DropArea'

const Home = () => {
    const [modalStatus,setModalStatus]=useState(false)
    let { pendingList , progressList , completeList   } =useSelector((state)=>state.lists)
    console.log(pendingList)
    console.log(progressList)
    console.log(completeList)
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const [activeCard,setActiveCard]=useState(null)
    console.log(activeCard)
    const addTaskHandler=()=>{
        setModalStatus(true)
    }

    const startTaskHandler=(data)=>{
        setLoading(true)
    
        setTimeout(()=>{
          setLoading(false)
        },1500)
        dispatch(removeFromPending(data))
        const newData={...data}
        newData.taskType=TASK_TYPE.PROGRESS
        dispatch(addToProgress(newData))
    }


    const getTimeStamp=()=>{
        return timestamp('DD/MM/YYYY,HH:mm')
    }
    
      
    
      const progressTaskHandler=(data)=>{
        console.log(data)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 1500);
    
        dispatch(removeFromProgress(data))
        const newData={...data}
        newData.taskType=TASK_TYPE.COMPLETE
        newData.time=getTimeStamp()
        console.log(newData)
        
        dispatch(addToComplete(newData))
    
      }

     


      const onDrop=(target,position)=>{
        console.log(` ${activeCard} is moving to ${target} at position ${position}`)

        let newTask={...activeCard}

        let replaceTask=false

        if(activeCard===null || activeCard===undefined) return
        
        if(target===TASK_TYPE.PENDING){
            if(activeCard.taskType===TASK_TYPE.PROGRESS){
                dispatch(removeFromProgress(activeCard))
            } else if(activeCard.taskType===TASK_TYPE.COMPLETE){
                dispatch(removeFromComplete(activeCard))
            } else{
                dispatch(removeFromPending(activeCard))
            }
             

            newTask.taskType=TASK_TYPE.PENDING
            dispatch(updatePending({position,newTask}))


        } else if(target===TASK_TYPE.PROGRESS){
            if(activeCard.taskType===TASK_TYPE.PENDING){
                dispatch(removeFromPending(activeCard))
            } else if(activeCard.taskType===TASK_TYPE.COMPLETE){
                dispatch(removeFromComplete(activeCard))
            } else{
                dispatch(removeFromProgress(activeCard))
            } 
            newTask.taskType=TASK_TYPE.PROGRESS
            dispatch(updateProgress({position,newTask}))
        } else {
            if(activeCard.taskType===TASK_TYPE.PENDING){
                dispatch(removeFromPending(activeCard))
            } else if(activeCard.taskType===TASK_TYPE.PROGRESS){
                dispatch(removeFromProgress(activeCard))
            } else{
                dispatch(removeFromComplete(activeCard))
            }

            newTask.taskType=TASK_TYPE.COMPLETE
            newTask.time=getTimeStamp()
            dispatch(updateComplete({position,newTask}))
        }
    }

  return (
    <div className='w-full py-8  min-h-screen  '>
        {
            (loading===true)? (
                <div className='w-full h-[calc(100vh-5rem)] flex justify-center items-center'>
                    <Loader/>
                </div>
            ) : 
            (
                
                <div className='w-full lg:w-[1400px]    mx-auto px-4 lg:px-8 flex flex-col      '>
                    
                    
                    <button onClick={addTaskHandler} className='flex items-center gap-x-3 bg-[#84fa84] border-2 rounded-md border-white px-3 py-3 w-fit font-semibold'>
                        <div>Create new Task</div>
                        <MdAddTask/>
                    </button>



                    <div className='w-full  flex  flex-col gap-y-8 lg:flex-row lg:justify-evenly mt-8'>

                        <div className='w-[450px] flex flex-col gap-y-4'>
                            <div className='flex gap-x-2 items-center font-bold text-white text-3xl'>
                                <div>Pending</div>
                                <MdOutlinePendingActions/>
                            </div>

                            <>
                            {
                                (pendingList.length===0)? (
                                <div className='w-full mt-5'>
                                    <div className='text-sm text-left '>No pending tasks , create a task now</div>
                                    <DropArea onDrop={onDrop} index={0} target={TASK_TYPE.PENDING}/>
                                </div>
                                ):(

                                    <div>
                                            <DropArea onDrop={onDrop} index={0} target={TASK_TYPE.PENDING}/>
                                            <div className='flex flex-col gap-y-2'>
                                            {
                                            pendingList.map((item,index)=>{
                                                return <>
                                                    <TaskCard key={item.id} data={item} handler1={startTaskHandler} type={TASK_TYPE.PENDING} setActiveCard={setActiveCard}/>
                                                    <DropArea onDrop={onDrop}  index={index+1} target={TASK_TYPE.PENDING} />
                                                </>
                                            })
                                            }
                                            </div>

                                    </div>


                                
                                )
                            }
                            </>
                        </div>


                        <div className='w-[450px] flex flex-col gap-y-4'>

                            <div className='flex gap-x-2 items-center font-bold text-white text-3xl'>
                                <div>Progress</div>
                                <TbProgressCheck/>
                            </div>

                           <>
                           {
                                (progressList.length===0)? (
                                <div className='w-full mt-5'>
                                    <div className='text-sm text-left'>No task in progress , start one now</div>
                                    <DropArea onDrop={onDrop} index={0} target={TASK_TYPE.PROGRESS}/>
                                </div>
                                ):(


                                    <div>
                                        <DropArea onDrop={onDrop} index={0} target={TASK_TYPE.PROGRESS}/>
                                        <div className='flex flex-col gap-y-2'>
                                        {
                                        progressList.map((item,index)=>{
                                            return <>
                                            <TaskCard key={item.id} data={item} handler2={progressTaskHandler} type={TASK_TYPE.PROGRESS} setActiveCard={setActiveCard}/>
                                            <DropArea onDrop={onDrop} index={index+1} target={TASK_TYPE.PROGRESS}/>
                                            </>
                                        })
                                        }
                                        </div>

                                    </div>
                                
                                )
                            }
                           </>
                        </div>


                        <div className='w-[450px] flex flex-col gap-y-4'>

                            <div className='flex gap-x-2 items-center font-bold text-white text-3xl'>
                                <div>Complete</div>
                                <MdOutlineTaskAlt/>
                            </div>
                            
                            <>
                            {
                                (completeList.length===0)? (
                                    <div className='w-full mt-5'>
                                        <div className='text-sm text-left'>No task completed , start one now</div>
                                        <DropArea onDrop={onDrop} index={0} target={TASK_TYPE.COMPLETE}/>
                                    </div>
                                    ):(
                                        <div>
                                            <DropArea onDrop={onDrop} index={0} target={TASK_TYPE.COMPLETE}/>
                                            <div className='flex flex-col gap-y-2'>
                                            {
                                            completeList.map((item,index)=>{
                                                return <>
                                                    <TaskCard key={item.id} data={item} type={TASK_TYPE.COMPLETE} setActiveCard={setActiveCard}/>
                                                    <DropArea onDrop={onDrop} index={index+1} target={TASK_TYPE.COMPLETE} />
                                                </>
                                            })
                                            }
                                            </div>
                                        </div>

                                    
                                    )
                            }
                            </>
                        </div>
                    </div>

                </div>




            )
        }



        { modalStatus && (<NewTaskModal setModalStatus={setModalStatus} />)}
    </div>
  )
}

export default Home