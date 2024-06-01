import React, { useState } from 'react'

const DropArea = (props) => {
    const [dropAreaVisibility,setVisibility]=useState(false)
    const onDrop=props.onDrop;
    const target=props.target
    const index=props.index

    const dragEnterHandler=()=>{
        setVisibility(true)
    }

    const dragLeaveHandler=()=>{
        setVisibility(false)
    }

    const dropHandler=()=>{
      onDrop(target,index)
      setVisibility(false)
    }

    const dragOverHandler=(e)=>{
      e.preventDefault()
    }
  return (
    <div className={`${ (dropAreaVisibility===true) ? "dropArea" :"hideDropArea" }`} 
      onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDragOver={dragOverHandler} >
        Drop here
    </div>
  )
}

export default DropArea