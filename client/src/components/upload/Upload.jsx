import React, { useState, useEffect } from 'react'

const UploadPhoto = ( ) => {
    const [image, setImage] = useState({})

    const fileOnChange = (e) => {
        setImage(e.target.files[0])
        console.log(image)
    }

    const sendImage = async () => {
        try {

            let formData = new FormData()

            formData.append("my-image", image)

            const newImage = await fetch(`http://localhost:8000/upload`, {
                method: "POST",
                headers: { Authorization: "Bearer " + localStorage.getItem('token') },
                body: formData
            })

            
            
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        var polling
        const updatePosts= async () => {
            await sendImage()
            polling = setTimeout(updatePosts, 1000)
        }
        polling = setTimeout(updatePosts, 1000)

        return () => {
            clearTimeout(polling)
        }
    },[])
    

    return (
        <div>
            <input type="file" onChange={fileOnChange}></input>
            <button onClick={sendImage}>Upload</button>
        </div>
    )
}

export default UploadPhoto