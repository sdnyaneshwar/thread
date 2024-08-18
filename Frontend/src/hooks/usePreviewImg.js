import { useState } from "react"
import useShowToast from "./useShowToast"

const usePreviewImg = () => {
    const [imgUrl , setImgUrl] = useState(null)
    const showToast =useShowToast()
    const handleImageChange =(e)=>{
        const file =  e.target.files[0];
        // if(file && file.type.startWith("image/"))
        if(file)
        {
            const reader = new FileReader()

            reader.onloadend =()=>{
                setImgUrl(reader.result)

            }

            reader.readAsDataURL(file)
        }
        else{
            showToast("Invalid file type" ,"please select an image file" ,"error")
            setImgUrl(null)

        }
    }
    return {
        handleImageChange ,
        imgUrl,
        setImgUrl,
        
    }
}

export default usePreviewImg