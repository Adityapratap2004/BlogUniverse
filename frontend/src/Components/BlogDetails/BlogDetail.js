import React, { useEffect, useState } from 'react'
import "./BlogDetails.css"
import { LiaEditSolid } from "react-icons/lia"
import { MdOutlineDeleteOutline, MdFavoriteBorder } from "react-icons/md"
import { HiOutlineShare } from "react-icons/hi"
import { useNavigate, useParams } from "react-router-dom"
import { delBlog, editblog, getBlogById } from '../../Api/BlogsApi'
import { useDispatch, useSelector } from "react-redux"
import { deleteBlogSlice } from '../../State/Slice/blogsSlice'
import { setLoader } from '../../State/Slice/loaderSlice'
import { IoAddCircleOutline } from "react-icons/io5"
// import { AiFillFastBackward } from "react-icons/ai"
import { addFavourite } from "../../Api/userApi"


import createpost from "../../Images/createpost.jpeg"
import { setUser } from '../../State/Slice/userSlice'
import Comments from '../Comments/Comments'
import {toast} from "react-toastify"
let BlogDetail = () => {
  let blogdate = new Date("2023-09-01T06:38:56.959Z");
  const [blog, setblog] = useState();
  const [edit, openEdit] = useState(false);
  const { id } = useParams();
  const login = useSelector(state => state.Login);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [editDetails, setEditDetails] = useState({ title: "", content: "", img: "" });
  const [img, setImg] = useState();
  const handleEdit = () => {
    const d = { title: blog.title, content: blog.content, img: blog.img };
    setEditDetails(d);
    openEdit(true);
  }

  const editBlog = async (e, id) => {
    e.preventDefault();
    console.log("Data is send to edit");
    
    if (localStorage.getItem('authToken')) {
      const res = await editblog(id, editDetails);
      if (res.success) {
        console.log(res.updateBlog);
        setblog(res.updateBlog);
        openEdit(false);
        toast.success("Blog is editted successfully")
      }
      else {
        console.log("ERROR:", res.error);
        toast.error(res.error);
      }
    }
    else {
      console.log("You need to be login to perform this uncionality");
      toast.error("You need to be login to perform this uncionality")
      nav("/login");
    }

  }

  const handleChange = (e) => {
    setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
    console.log(editDetails)
  }

  const addToFavourite = async (id) => {
   
    if (localStorage.getItem('authToken')) {
      //call the api 
      const res = await addFavourite(id);
      if (res.success) {
        //set user
        console.log("Blog has been added successfully");
        toast.success("Blog has been added successfully");
        dispatch(setUser(res.updatedUser));
      }
      else {
        console.log(res.error);
        toast.error(res.error);
      }
    }
    else {
      console.log("You need to be logged to add blog to favourite");
      toast.error("You need to be logged to add blog to favourite");
    }

  }


  const handleImg = (e) => {
    setEditDetails({ ...editDetails, img: e.target.files[0] });
    if (e.target.files.length !== 0) {
      console.log("imsge is changed")
      setImg(URL.createObjectURL(e.target.files[0]));
    }
    else {
      setImg(blog.blogImg.imageUrl);
    }

  }



  const deleteBlog = async () => {
    console.log("delete blog is called")
    dispatch(setLoader(true));
    const res = await delBlog(id);
    if (res.success) {
      console.log("Blog delete successfully");
      dispatch(deleteBlogSlice(res.deletedBlog._id));
      nav("/");
    }
    else {
      console.log("Error", res.error);
    }
    dispatch(setLoader(false));
  }

  useEffect(() => {
    const getDetails = async () => {
      dispatch(setLoader(true));
      const res = await getBlogById(id);
      if (res.success) {
        setblog(res.blogs);
        console.log(res.blogs);
        // eslint-disable-next-line
        blogdate = new Date(res.blogs.date);
        setImg(res.blogs.blogImg.imageUrl);

        console.log(editDetails);
      }
      else {
        console.log("Error", res.error);
      }
      dispatch(setLoader(false));
    }
    getDetails();
  }, [id]);
  return (
    <>
      {
        (!edit && blog) && <div className='blogdetail'>
          <div className='blogimg'>
            <img src={blog.blogImg.imageUrl} alt="blogImage" />
          </div>
          <div className='blogcontent'>
            <div className='blogheading'>
              <div >
                <h1>{blog.title}</h1>
              </div>
              <div className='edit'>
                <p onClick={() => { addToFavourite(blog._id) }}><MdFavoriteBorder /></p>
                <p><HiOutlineShare onClick={() => { navigator.clipboard.writeText(window.location.href) }} /></p>
                {(login.creater_id === blog.user.creater_id) && <><p onClick={handleEdit}><LiaEditSolid /></p>
                  <p onClick={deleteBlog}><MdOutlineDeleteOutline /></p>
                </>}

              </div>
            </div>
            <div className='author'>
              <div>
                <span>Author: </span>
                <span>{blog.user.username}</span>
              </div>
              <div>
                <span>Published on:</span>
                <span>{(blogdate).toDateString()}</span>
              </div>
            </div>
            <pre className='content'>
              {blog.content}
            </pre>
          </div>
          <Comments Blogid={id} />

        </div>}
      {
        edit &&
        <div className='createpost editpost '>
          <form onSubmit={(e) => { editBlog(e, blog._id) }}>
            <div className='postdetails'>
              <div>
                {img ? <img src={img} alt="createpost" /> : <><img src={createpost} alt="createpost" />
                  <p className='addphototext'>Add another photo related to your blog</p>
                </>}
              </div>
              <div className='blogtitle'>
                <label htmlFor='img' className='addImg'><IoAddCircleOutline /></label>
                <input id="img" type="file" onChange={handleImg} />
                <input required type="text" name="title" value={editDetails.title} placeholder='Title of your Blog' onChange={handleChange} />
                {/* <select required name="category" value={blog.category} onChange={handleChange} >
                  {category.map((cat) => {
                    return <option value={cat._id}>{cat.category}</option>
                  })}
                </select> */}
                <button className='back' onClick={(e) => {
                  e.preventDefault();
                  openEdit(false)
                }} >Back</button>

                <button className='publish'>Update</button>
              </div>
              <textarea required name="content" value={editDetails.content} placeholder='Tell your story' onChange={handleChange} />
            </div>
          </form>
        </div>


      }
    </>
  )
}

export default BlogDetail
