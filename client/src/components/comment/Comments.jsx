import React from 'react'
import { useState, useEffect, useContext } from 'react'
import moment from "moment";
import DeleteComment from '../delete/DeleteComment';
import userContext from '../../context/userContext';


const PostItem = (props) => {
    const [showComment, setshowComment] = useState(false);
    const [showDelete, setShowDelete] = useState("");
    const [posts, setPost] = useState([]);
    // const [polling, setPolling] = useState();
    const [reply, setReply] = useState(false);
    const user = useContext(userContext);
    const getComments = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                `https://capstone-project-server-side.herokuapp.com/comment/${props.id}`,
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
    
            setPost(parseRes);
    
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        var polling
        const updatePosts= async () => {
            await getComments()
            polling = setTimeout(updatePosts, 1000)
        }
        polling = setTimeout(updatePosts, 1000)

        return () => {
            clearTimeout(polling)
        }
    },[])

    // const onDeleteComment = async (comment_id) => {
    //     const response = await fetch(
    //         `http://localhost:8000/comment/${comment_id}`,
    //         {
    //             method: "DELETE",
    //             headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    //         })
    //         if (!response.ok){
    //             return alert("Invalid Action")
    //         }
    // }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const message = e.target.message.value
            const post_id = props.id
            console.log(message, post_id)

            const response = await fetch(
                "https://capstone-project-server-side.herokuapp.com/comment",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem('token')
                       
                    },
                    body: JSON.stringify({
                        message: message,
                        post_id: post_id
                    })
                }
            )
            setshowComment(true)
            e.target.reset()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="wrapper">

        <div className="input-box">
                <h4 className="user"><img className='nf-pic' src={`https://capstone-project-server-side.herokuapp.com/img/${props.picture}`}></img>@{props.username}</h4><p className='message'>{props.message} </p>
                <p className="card-text"><small>{props.time_stamp } {props.privacy?
            <>  
                <i class="fa fa-lock" aria-hidden="true"></i>
                <span>Private</span>
            </>:
            <>
                <i className="fas fa-globe-asia"></i>
                <span>Public</span>
            </> }</small></p>
            <button onClick={()=> setReply(prev => !prev)} className="reply">Reply</button>
            <button onClick={()=> setshowComment(prev => !prev)} className="show-comments">Comments</button>
            <div className="comment-area">
            {reply?
                <form onSubmit={onSubmitForm}>
                    <textarea className="input editable"
                        name='message' 
                        placeholder="Write your comment here" 
                        >
                    </textarea>
                    <button className='comment'>Post Comment</button>
                </form>: <></>}
    
            </div>      
        </div>
        <div>
            {showComment&& posts.map(comment => {
                return <div className="wrapper" key={comment.comment_id}>

                <div className="input-box">
                    <h4 className="user"><img className='nf-pic' src={`http://localhost:8000/img/${comment.filename}`}></img>@{comment.username}</h4><p className='message'>{comment.message}</p>
                    <p className="card-text"> <small>{comment.time_stamp = moment(comment.time_stamp).format("llll")} </small></p>
                    {(comment.uuid === user.uuid)&& <DeleteComment comment={comment}/>}
                    {/* <button onClick={e => onDeleteComment(comment.comment_id)} className="delete">Delete</button> */}
                </div>
            </div>
            })}
        </div>
    </div>
  )
}

export default PostItem