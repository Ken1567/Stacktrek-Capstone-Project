import React, { useState } from 'react'
import { useEffect } from 'react'

const DisplayPhoto = () => {
    const [pics, setPics] = useState([]);
    // const [polling, setPolling] = useState();
    const getPictures = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/photos`, {
                method: "GET",
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            }
            )

            const parseRes = await response.json()
            setPics(parseRes)
        } catch (error) {

        }
    }

    useEffect(() => {
        var polling
        const updatePosts= async () => {
            await getPictures()
            polling = setTimeout(updatePosts, 1000)
        }
       polling = setTimeout(updatePosts, 1000)

        return () => {
            clearTimeout(polling)
        }
    },[])
    
    return (
        <div>
            {pics.map( pic => {
                let url = `http://localhost:8000/img/${pic.filename}`
                return <div key={pic.pic_id}>
                    <img src={url} className="img-thumbnail" alt="..."></img>
                     </div>
            })}
        </div>
    )
}

export default DisplayPhoto