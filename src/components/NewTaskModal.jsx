import React from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { addToPending } from '../redux/slices/lists';
import ShortUniqueId from 'short-unique-id';
import TASK_TYPE from '../utils/Constant';

const NewTaskModal = (props) => {
    const setModalStatus=props.setModalStatus
    const dispatch=useDispatch()

    const { 
        register,
        handleSubmit,
        formState:{errors}

    }=useForm()

    const submitHandler=(data)=>{
        console.log(data)
        const uid = new ShortUniqueId({ length: 10 })
        const id=uid.rnd()
        data.id=id
        data.taskType=TASK_TYPE.PENDING
        dispatch(addToPending(data))
        setModalStatus(false)
    }
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 w-full h-screen flex flex-col justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>

        <div className='min-w-[400px] md:w-[650px]  bg-white p-6 rounded-md'>
            <button onClick={()=>setModalStatus(false)} className=' flex  items-center gap-x-3  bg-[#84fa84] border-2 rounded-md border-white px-3 py-3 w-fit font-semibold'>
                <div>Close</div>
                <RxCross2/>
            </button>

            <div className='mt-8'>
                <form onSubmit={handleSubmit(submitHandler)}>

                    <div className='flex flex-col gap-y-1 '>
                        <label htmlFor='title' className='text-left text-sm'>Title<sup className='text-red-500 '> *</sup></label>
                        <input name='title' id='title' type='text' className='p-2 bg-blue-300 outline-none rounded-md border-b-2 border-blue-900 ' placeholder='' {...register('title',{required:true})} />
                        {
                            errors.title && <span className='text-sm'>Enter Title to create task</span>
                        }
                    </div>


                    <div className='flex flex-col gap-y-1 mt-8'>
                        <label htmlFor='description' className='text-left text-sm'>Description</label>
                        <input name='description' maxLength='50' id='description' type='text'  className='p-2 bg-blue-300 outline-none rounded-md border-b-2 border-blue-900 ' placeholder='' {...register('description')}/>
                    </div>


                    <button type='submit' className='mt-12 flex  items-center gap-x-3  bg-[#84fa84] border-2 rounded-md border-white px-3 py-3 w-fit font-semibold '>Create</button>

                </form>
            </div>

        </div>


        
    </div>
  )
}

export default NewTaskModal