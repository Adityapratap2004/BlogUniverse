import React, { useEffect, useState } from 'react'
import "./account.css"
import profile from "../../Images/profilephoto.jpg"
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
// import { Tooltip } from 'react-tooltip'
import { setLoader } from '../../State/Slice/loaderSlice'
import { editUserDetails } from '../../Api/userApi'
import { setUser } from '../../State/Slice/userSlice'
import {toast} from "react-toastify"



const Account = () => {
    const [details, setDetails] = useState({ email: "", username: "", img: "" });
    const user = useSelector(state => state.User);
    const [img, setImg] = useState(null);
    console.log("dedtails", details);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const handleImg = (e) => {
        setDetails({ ...details, img: e.target.files[0] });
        if (e.target.files.length !== 0) {
            setImg(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setImg(user.profileImg);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));
        if (localStorage.getItem('authToken')) {
            const res = await editUserDetails(details);
            if (res.success) {
                dispatch(setUser(res.updatedUser));
                localStorage.setItem('user', res.updatedUser);
                toast.success("Your details are successfully updated");
            }
            else {
                console.log(res.error);
                toast.success(res.error);
            }
        }
        else {
            console.log("You need to be logged in to perform this task");
            toast.success("You need to be logged in to perform this task");

        }
        dispatch(setLoader(false));
    }
    useEffect(() => {
        console.log("Render");
        setDetails(user);
        // setDetails({...details,img:user.profileImg});
        if (user.profileImg) {
            setImg(user.profileImg.imgUrl);
        }
        console.log(details);
        console.log("userDetailshave set")
    }, [])

    return (
        <div className='account'>
            <div >
                <h2>Account Information</h2>
                <div className='info'>
                    <div>
                        {img ? <img src={img} alt="profileImg" className='profileImg' /> : <img src={profile} alt="profileImg" className='profileImg' />}
                        <label htmlFor='img' className='addImg' data-tooltip-id="my-tooltip" data-tooltip-content="Change Photo"><IoAddCircleOutline /></label>
                    </div>

                    <div>
                        <form className='userdetailform' id="myform" onSubmit={handleSubmit}>
                            <input id="img" type="file" onChange={handleImg}></input>
                            <label htmlFor='username' >Username</label>
                            <input id="username" value={details.username} name="username" type="text" onChange={handleChange} />
                            <label htmlFor='email'>Email</label>
                            <input id="email" value={details.email} name="email" type='email' onChange={handleChange} />
                            <button type="submit">Update</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Account