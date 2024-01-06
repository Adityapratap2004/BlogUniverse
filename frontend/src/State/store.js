import {configureStore} from "@reduxjs/toolkit"
import category from "./Slice/categorySlice"
import authSlice from "./Slice/authSlice";
import loaderSlice from "./Slice/loaderSlice";
import blogsSlice from "./Slice/blogsSlice";
import userSlice from "./Slice/userSlice";


const store=configureStore({
    reducer:{
        Category:category,
        Login:authSlice,
        Loader:loaderSlice,
        Blogs:blogsSlice,
        User:userSlice,
       
        
    }
    
})

export default store;