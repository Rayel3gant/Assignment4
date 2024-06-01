import { combineReducers } from "@reduxjs/toolkit";
import listReducer from "./slices/lists"

const rootReducer=combineReducers({
    lists:listReducer
})

export default rootReducer