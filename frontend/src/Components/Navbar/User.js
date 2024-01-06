import React, { useEffect, useState } from 'react'
import { RiAccountCircleFill } from "react-icons/ri"
import { AiOutlineSetting, AiOutlineHeart, AiOutlineQuestionCircle, AiOutlineFolderAdd, AiOutlineAppstoreAdd } from "react-icons/ai"
import { IoLogOutOutline } from "react-icons/io5"
// import profileImg from "../../Images/profileImg.jpg"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { setLogin } from '../../State/Slice/authSlice'
import { getuser } from '../../Api/userApi'
import { setUser } from '../../State/Slice/userSlice'
import { logout } from '../../Api/AuthApi'

import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip' 
import {toast} from "react-toastify"


const User = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const login = useSelector(state => state.Login);
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();


    const profileClose = () => {
        setProfileOpen(false)
    }

    const handleLogout = () => {
        console.log("logout");
        toast.success("Successfully logged out");
       
        logout();
        localStorage.removeItem('authToken');
        localStorage.removeItem('creater_id');
        localStorage.removeItem('user')
        
        setProfileOpen(false);
        dispatch(setLogin({authtoken:false,creater_id:null}));
        dispatch(setUser(null))
    }
    useEffect(() => {
        const getUser=async()=>{
            console.log("getuser")
            const res=await getuser();
            if(res.success){
                dispatch(setUser(res.user));
            }
            else{
                console.log("Error",res.error);
                toast.error(res.error);
                
            }

        }
       

        if (localStorage.getItem('authToken')) {
            
            getUser();
           
            const authtoken=localStorage.getItem('authToken');
            const creater_id=localStorage.getItem('creater_id');
            dispatch(setLogin({authtoken,creater_id}));
        }

    }, [dispatch])

    return (
        <div className='user'>
        
            <Tooltip id="my-tooltip" />
            {!login.authtoken ? <div className='notloggedin' ><Link to="/login" data-tooltip-id="my-tooltip" data-tooltip-content="Login" place="bottom-end">
                <RiAccountCircleFill />
            </Link>
            </div> :
                <>
                    <div className='profileImg' onClick={() => { setProfileOpen(!profileOpen) }}>
                        {user.profileImg ? <img src={user.profileImg.imgUrl} alt="profileImg" /> : <div className='notloggedin'><RiAccountCircleFill /></div>}
                    </div>
                    {profileOpen && <div className='usermenu'>
                        <div className='userdetails'>

                            <div className='profileImg'>
                                {user.profileImg ? <img src={user.profileImg.imgUrl} alt="profileImg" /> : <div className='notloggedin'><RiAccountCircleFill /></div>}
                            </div>
                            <div>
                                <p><Link to="/account"><span className='username'>{user.username} </span> <br />
                                    New Delhi, India</Link></p>
                            </div>

                        </div>
                        <div className='accountactions'>
                            <ul>
                                <li onClick={profileClose}><AiOutlineFolderAdd className='icons' /> <p><Link to="/createpost">Create Post</Link></p></li>
                                <li onClick={profileClose}><AiOutlineSetting className='icons' /> <p><Link to="/account">My account</Link></p></li>
                                <li onClick={profileClose}><AiOutlineHeart className='icons' /> <p><Link to="/favouriteblogs">Favourite</Link></p></li>
                                <li onClick={profileClose}><AiOutlineAppstoreAdd className='icons' /><p><Link to="/addcategory">Add category</Link></p></li>
                                <li onClick={profileClose}><AiOutlineQuestionCircle className='icons' /><Link to="/"> <p>Help</p></Link></li>
                                <li onClick={handleLogout}><IoLogOutOutline className='icons' /> <Link to="/"><p>Log Out</p></Link></li>
                            </ul>

                        </div>


                    </div>}
                </>
            }
        </div>
    )
}

export default User
