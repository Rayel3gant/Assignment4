import { createSlice } from "@reduxjs/toolkit"

let initialState={
    pendingList:[],
    progressList:[],
    completeList:[]
}


const listSlice=createSlice({
    name:"lists",
    initialState,
    reducers:{
        addToPending:(state,action)=> {
            const newTask=action.payload;
            console.log(newTask)
            state.pendingList.push(newTask)
        },
        removeFromPending:(state,action)=>{
            const removedTask=action.payload;
            const index=state.pendingList.findIndex((item)=>item.id===removedTask.id)

            if(index>=0){
                state.pendingList.splice(index,1)
            }
        },
        addToProgress: (state,action)=>{
            const progressTask=action.payload;
            state.progressList.push(progressTask)
        },
        removeFromProgress:(state,action)=>{
            const removedTask=action.payload;
            const index=state.progressList.findIndex((item)=>item.id===removedTask.id)
            
            if(index>=0){
                state.progressList.splice(index,1)
            }
            
        },
        addToComplete: (state,action)=>  {
            const completedTask=action.payload
            state.completeList.push(completedTask)
        },
        removeFromComplete:(state,action)=>{
            const removedTask=action.payload;
            const index=state.completeList.findIndex((item)=>item.id===removedTask.id)
            
            if(index>=0){
                state.completeList.splice(index,1)
            }
        },
        updatePending:(state,action)=>{
            const data=action.payload
            console.log(data)
            state.pendingList.splice(data.position,0,data.newTask )
        },
        updateProgress:(state,action)=>{
            const data=action.payload
            console.log(data)
            state.progressList.splice(data.position,0,data.newTask)

        },
        updateComplete:(state,action)=>{
            const data=action.payload
            console.log(data)
            state.completeList.splice(data.position,0,data.newTask)
        }

       
    }
})

export const { addToPending , removeFromPending , addToProgress , removeFromProgress ,addToComplete  ,removeFromComplete ,updatePending,updateProgress,updateComplete}= listSlice.actions
export default listSlice.reducer