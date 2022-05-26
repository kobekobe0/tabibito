import React, { useCallback, useState, useEffect } from 'react'

function PreviewCard({ image, index, deletePreview }) {
    const [file, setFile] = useState(image)
    const [imagePrev, setImagePrev] = useState('')
    const [trigger, setTrigger] = useState(false)

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            if (file) {
                reader.readAsDataURL(file)
                reader.onload = () => {
                    resolve(reader.result)
                }
            }
        })
    }

    const handleCreateBase64 = useCallback(async (e) => {
        const fileToConvert = file
        const base64 = await convertToBase64(fileToConvert)
        setImagePrev(base64)
        console.log(imagePrev)
    }, [])

    useEffect(() => {
        handleCreateBase64()
    }, [])
    useEffect(() => {
        handleCreateBase64()
    }, [trigger])

    useEffect(() => {
        setFile(image)
    }, [image, trigger])

    const deleteCard = () => {
        setImagePrev('')
        setTrigger(!trigger)
        deletePreview(image.name)
    }
    return (
        <div key={index} className="preview-card">
            <p>{image.name}</p>
            <button onClick={deleteCard}>Delete</button>
            <img src={imagePrev} alt="" id="imagePreviewCard" />
        </div>
    )
}

export default PreviewCard
