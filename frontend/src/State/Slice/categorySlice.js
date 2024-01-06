import { createSlice } from "@reduxjs/toolkit";

const category=createSlice({
    name:"category",
    initialState:[],
    reducers:{
        addCategory(state,action){
            state=[...state,action.payload]
            return state;
        },
        setCategory(state,action){
            state=action.payload
            return state;
        }
    }
})

export const {addCategory,setCategory} =category.actions;
export default category.reducer;