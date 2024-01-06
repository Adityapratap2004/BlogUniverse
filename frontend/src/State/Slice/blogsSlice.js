import {createSlice} from "@reduxjs/toolkit"

const blogSlice=createSlice({
    name:'blog',
    initialState:[],
    reducers:{
        setBlogs(state,action){
            state=action.payload;
            return state;
        },
        addBlog(state,action){
            state=[...state,action];
            console.log(state);
            return state;
        },
        deleteBlogSlice(state,action){
            state=state.filter(blog=> blog._id!==action.payload);
            return state;
        },
        updateBlog(state,action){
            for(var i in state){
                if(state[i]._id===action.payload._id){
                    state[i]=action.payload;
                }
            }
            return state;
        }

    }
})

export default blogSlice.reducer;

export const {setBlogs,addBlog,deleteBlogSlice,updateBlog} = blogSlice.actions;