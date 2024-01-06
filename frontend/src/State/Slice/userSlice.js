import { createSlice } from "@reduxjs/toolkit";

const initialState=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state,action){
            state=action.payload;
            return state;
        }
    }
})

export default userSlice.reducer;

export const {setUser}=userSlice.actions;