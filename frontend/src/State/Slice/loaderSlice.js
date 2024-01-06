import { createSlice } from "@reduxjs/toolkit";

const loaderSlice=createSlice({
    name:"loader",
    initialState:false,
    reducers:{
        setLoader(state,action){
            state=action.payload;
            return state;
        }
    }
})

export default loaderSlice.reducer;

export const {setLoader} =loaderSlice.actions;