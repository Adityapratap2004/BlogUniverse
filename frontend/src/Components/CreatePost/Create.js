import React, { useEffect, useState } from 'react'
import "./create.css"
import createpost from "../../Images/createpost.jpeg"
import { IoAddCircleOutline } from "react-icons/io5"
import { getcategory } from '../../Api/CategoryApi'
import { addBlogs } from '../../Api/BlogsApi'
import {useDispatch} from "react-redux"
import { setLoader } from '../../State/Slice/loaderSlice'
import { addBlog } from '../../State/Slice/blogsSlice'
import { toast } from 'react-toastify'

const Create = () => {
  const initialState = { title: "", content: "", category: "", img: "" };
  const [postdetails, setPostdetails] = useState(initialState);
  const [img, setImg] = useState();
  const [category, setCategory] = useState([]);
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setPostdetails({ ...postdetails, [e.target.name]: e.target.value })
  }

  const handleImg = (e) => {
    setPostdetails({ ...postdetails, img: e.target.files[0] });
    if (e.target.files.length !== 0) {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
    else {
      setImg(null);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    const res = await addBlogs(postdetails);
    if (res.success) {
      setPostdetails(initialState);
      setImg(null);
      dispatch(addBlog(res.blog));
    }
    else {
      console.log("Error", res.error);
      toast.success(res.error);
    }
    dispatch(setLoader(false));
  }
  useEffect(() => {
    const getCategory = async () => {
      const res = await getcategory();
      if (res.success) {
        setCategory(res.category);
        console.log(res.category);

      }
      else {
        console.log("Some error have occured");
        toast.error("Some error have occured" );
      }
    }
    getCategory();
  }, []);
  console.log(postdetails);
  return (
    <div className='createpost'>
      <form onSubmit={handleSubmit}>
        <div className='postdetails'>
          <div>
           {img ?<img src={img} alt="createpost"/> : <><img src={createpost} alt="createpost" />
            <p className='addphototext'>Add photo related to your blog</p>
            </>}
          </div>
          <div className='blogtitle'>
            <label htmlFor='img' className='addImg'><IoAddCircleOutline /></label>
            <input id="img" type="file" onChange={handleImg} />
            <input required type="text" name="title" value={postdetails.title} placeholder='Title of your Blog' onChange={handleChange} />
            <select required name="category" value={postdetails.category} onChange={handleChange} >
              {category.map((cat) => {
                return <option value={cat._id}>{cat.category}</option>
              })}
            </select>
            <button className='publish'>Publish</button>
          </div>
          <textarea required name="content" value={postdetails.content} placeholder='Tell your story' onChange={handleChange} />
        </div>
      </form>
    </div>
  )
}

export default Create