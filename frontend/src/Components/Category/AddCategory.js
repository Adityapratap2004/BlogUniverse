import React, { useEffect, useState } from 'react'
import createCategory from "../../Images/createpost.jpeg"
import { IoAddCircleOutline } from "react-icons/io5"
import "./addcategory.css"
import { setcategory } from '../../Api/CategoryApi'
import { useDispatch } from 'react-redux'
import {addCategory} from "../../State/Slice/categorySlice"
import { setLoader } from '../../State/Slice/loaderSlice'

import { useNavigate } from 'react-router-dom'
import { setLogin } from '../../State/Slice/authSlice'
import {toast} from "react-toastify"

const AddCategory = () => {
    const dispatch=useDispatch();
    const initialState={ category: "", title: "", img: "" }
    const [category, setCategory] = useState(initialState);
    const [img, setImg] = useState(null);
    const nav=useNavigate();

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }


    const handleImg = (e) => {
        setCategory({ ...category, img: e.target.files[0] })
        if (e.target.files.length !== 0) {
            setImg(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setImg(null);
        }

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        dispatch(setLoader(true));
        console.log("handlesubmit")
        const res=await setcategory(category);
        if(res.success){
            setCategory(initialState);
            setImg(null);
            dispatch(addCategory(res.category));            
        }
        else{
            console.log("Error",res.error);
            toast.error(res.error);
        }
        dispatch(setLoader(false));      

    }
    useEffect(()=>{
        if(!localStorage.getItem('authToken')){
            dispatch(setLogin(false));
            nav("/");
        }
    })
    console.log(category)
    return (
        <div className='addcategory'>
            <form onSubmit={handleSubmit}>
                <div className='cat'>
                    <div>
                        {img ? <><img src={img} alt="category img"  /></> : <><img src={createCategory} alt="" /><p className='addphototext'>Add photo related to the category</p></>}

                    </div>
                    <div className='categoryDetails'>
                        <label className='addImg' htmlFor='img'><IoAddCircleOutline /></label>
                        <input type="file" id="img" name="img" className="hiddeninput" onChange={handleImg} />

                        <input type="text" name="category" placeholder='Category Name' value={category.category} onChange={handleChange} />
                        <button className='uploadcategory' >Add Category</button>
                    </div>
                    <div className='categorytitle'>
                        <input type="text" name="title" placeholder='Title of the category' value={category.title} onChange={handleChange} />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default AddCategory