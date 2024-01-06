import React, { useEffect, useState } from 'react'
import { getComments, postComments } from '../../Api/CommentsApi'
import { useSelector } from 'react-redux'
import { RiAccountCircleFill } from "react-icons/ri"
import {toast} from "react-toastify"

import "./Comments.css"

const Comments = ({ Blogid }) => {
    const [comments, setComments] = useState([])
    const User = useSelector(state => state.User);
    const [comment, setComment] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (localStorage.getItem('authToken')) {
            const req = await postComments(Blogid, comment);
            if (req.success) {
                setComments([...comments, req.comment]);
                setComment("");
                console.log(comment);
            }
            else {
                console.log("Error", req.error);
                toast.error(req.error);
            }

        }
        else {
            console.log("You need to be logged in inorder to comment");
            toast.error("You need to be logged in inorder to comment");
        }


    }
    useEffect(() => {
        const getcomments = async () => {
            console.log("Blog Id", Blogid)
            const comment = await getComments(Blogid);
            if (comment.success) {
                setComments(comment.comment);
                console.log(comments);
            }
            else {
                console.log("Error:", comment.error);
                toast.error(comment.error);
            }
        }
        getcomments();
    }, [])
    return (
        <div id="comments">
            <div className='comments_heading'>
                <h1>Comments ({comments.length}) </h1>
                <p>Start a discussion, not a fire. Post with kindness.</p>
            </div>
            <div className='postComment'>
                {User ? <img src={User?.profileImg?.imgUrl} alt="userimg" /> : <RiAccountCircleFill />}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={comment} placeholder='Add a comment...' onChange={(e) => setComment(e.target.value)} />
                    <button >Post Comment</button>
                </form>

            </div>
            <div className='commmentList'>
                {
                    comments.map((comm) => {
                        return <div key={comm._id} className='comm'>
                            <img src={comm?.user?.profileImg?.imgUrl} alt="commetorimg" />
                            <div>
                                <p className='username_time'>
                                    <label className='comment_username'>
                                        {comm?.user?.username}
                                    </label>
                                    <label className='comment_time'> {new Date(comm?.date).toDateString()}</label>
                                </p>
                                <p className='commentr'>{comm.comment}</p>
                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Comments