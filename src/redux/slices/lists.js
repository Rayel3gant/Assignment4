import { createSlice } from "@reduxjs/toolkit"

let initialState={
    pendingList:localStorage.getItem("pendingList")? JSON.parse(localStorage.getItem("pendingList")):[],
    progressList:localStorage.getItem("progressList")? JSON.parse(localStorage.getItem("progressList")):[],
    completeList:localStorage.getItem("completeList")? JSON.parse(localStorage.getItem("completeList")):[]
}

const listSlice=createSlice({
    name:"lists",
    initialState,
    reducers:{
        addToPending:(state,action)=> {
            const newTask=action.payload;
            console.log(newTask)
            state.pendingList.push(newTask)
            localStorage.setItem("pendingList",JSON.stringify(state.pendingList))
        },
        removeFromPending:(state,action)=>{
            const removedTask=action.payload;
            const index=state.pendingList.findIndex((item)=>item.id===removedTask.id)

            if(index>=0){
                state.pendingList.splice(index,1)
            }

            localStorage.setItem("pendingList",JSON.stringify(state.pendingList))

            
        },
        addToProgress: (state,action)=>{
            const progressTask=action.payload;
            state.progressList.push(progressTask)
            localStorage.setItem("progressList",JSON.stringify(state.progressList))
        },
        removeFromProgress:(state,action)=>{
            const removedTask=action.payload;
            const index=state.progressList.findIndex((item)=>item.id===removedTask.id)
            
            if(index>=0){
                state.progressList.splice(index,1)
            }
            localStorage.setItem("progressList",JSON.stringify(state.progressList))
            
        },
        addToComplete: (state,action)=>  {
            const completedTask=action.payload
            state.completeList.push(completedTask)

            localStorage.setItem("completeList",JSON.stringify(state.completeList))
        },
        removeFromComplete:(state,action)=>{
            const removedTask=action.payload;
            const index=state.completeList.findIndex((item)=>item.id===removedTask.id)
            
            if(index>=0){
                state.completeList.splice(index,1)
            }

            localStorage.setItem("completeList",JSON.stringify(state.completeList))

        },
        updatePending:(state,action)=>{
            const data=action.payload
            console.log(data)
            state.pendingList.splice(data.position,0,data.newTask )

            localStorage.setItem("pendingList",JSON.stringify(state.pendingList))

        },
        updateProgress:(state,action)=>{
            const data=action.payload
            console.log(data)
            state.progressList.splice(data.position,0,data.newTask)

            localStorage.setItem("progressList",JSON.stringify(state.progressList))


        },
        updateComplete:(state,action)=>{
            const data=action.payload
            console.log(data)
            state.completeList.splice(data.position,0,data.newTask)

            localStorage.setItem("completeList",JSON.stringify(state.completeList))

        }

       
    }
})

export const { addToPending , removeFromPending , addToProgress , removeFromProgress ,addToComplete  ,removeFromComplete ,updatePending,updateProgress,updateComplete}= listSlice.actions
export default listSlice.reducer