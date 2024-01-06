import { createSlice } from "@reduxjs/toolkit";



const initialState={
    authtoken:(localStorage.getItem('authToken')?(localStorage.getItem('authToken')):false),
    creater_id:(localStorage.getItem('creater_id')?(localStorage.getItem('creater_id')):""),
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin(state,action){
            state.authtoken=action.payload.authtoken;
            state.creater_id=action.payload.creater_id;
            return state;
        }
    }
})

export default authSlice.reducer;

export const {setLogin}=authSlice.actions;