import React, { useEffect, useState } from "react";
import moment from "moment";
import DisplayPhoto from '../display/Display';

const Post = ({ setAuth }) => {
    const [posts, setPost] = useState([]);
    const [inputs, setInputs] = useState("");
    const [counter, setCounter] = useState(1000);
    const [show, setShow] = useState("");
    const [active, setActive] = useState("");
    // const [polling, setPolling] = useState();
    const [privacy, setPrivacy] = useState(false);

    //setting the inputs
    const onChange = e => {      
        setInputs(e.target.value) 
        setCounter(1000-e.target.value.length)
        if (e.target.value){
            setActive("active")
            setShow("show")
        } else {
            setActive("")
            setShow("")
        }
    }   

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of username and password
            const body = inputs
            console.log(body)

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/post",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem('token')
                       
                    },
                    body: JSON.stringify({
                        message:inputs,
                        privacy: privacy
                    })
                }
            )
            
            const parseRes = await response.json()

            if(response.ok){
                setInputs("")
            }

            if(parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
            } else {
                setAuth(false)
                console.log("Something wrong")
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const getPost = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/post",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();

            setPost(parseRes)

        } catch (error) {
            console.log(error.message)
        }
    }

    
        useEffect(() => {
            var polling
            const updatePosts= async () => {
                await getPost()
                polling = setTimeout(updatePosts, 1000)
            }
            polling = setTimeout(updatePosts, 1000)
    
            return () => {
                clearTimeout(polling)
            }
        },[])

        const onDeletePost =  (id) => {
            console.log(id)
            fetch(
                `http://localhost:8000/post/${id}`,
                {
                    method: "DELETE",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
        }

    return (

        <>
                <h1>Express</h1>
            <form onSubmit={onSubmitForm}>
            <div className="wrapper">
                <div className="input-box">
                    <div className="express-area">
                        <textarea className="input editable" 
                            placeholder="Write anything" 
                            maxLength={1000}
                            value={inputs} 
                            onChange={onChange}>
                        </textarea>
                    </div>
                    <div className="privacy">{
                        privacy?
                        <>  
                            <i class="fa fa-lock" aria-hidden="true"></i>
                            <span onClick={()=> setPrivacy(prev => !prev)}>Private</span>
                        </>:
                        <>
                            <i className="fas fa-globe-asia"></i>
                            <span onClick={()=> setPrivacy(prev => !prev)}>Public</span>
                        </>
                    }
                    </div>
                </div>
                <div className="bottom">
                    {/* <ul className="icons">
                        <li><i className="uil uil-capture"></i></li>
                        <li><i className="far fa-file-image"></i></li>
                        <li><i className="fas fa-map-marker-alt"></i></li>
                        <li><i className="far fa-grin"></i></li>
                        <li><i className="far fa-user"></i></li>
                    </ul> */}
                    <div className="content">
                        <span className={`counter ${show}`}>{counter}</span>
                        <button type="submit" className={`post ${active}`}>Express</button>
                    </div>
                </div>
            </div>
            </form>
            {posts.map(post => {
                return <div className="wrapper" key={post.id}>

                            <div className="input-box">
                                <h4 className="user" ><DisplayPhoto />@{post.username}</h4>
                                <p>{post.message}</p>
                                <br/>
                                <p className="card-text"> <small>{post.time_stamp = moment(post.time_stamp).format("llll")} {post.privacy?
                                <>  
                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                    <span onClick={()=> setPrivacy(prev => !prev)}>Private</span>
                                </>:
                                <>
                                    <i className="fas fa-globe-asia"></i>
                                    <span onClick={()=> setPrivacy(prev => !prev)}>Public</span>
                                </> }</small></p>
                                <button onClick={e => onDeletePost(post.id)} className="delete">Delete</button>
                            </div>
                        </div>
            })}
        </>


    )
}
export default Post;