import React, { useCallback, useState, useEffect } from 'react'

function PreviewCard({
    image,
    index,
    deletePreview,
    selectedImages,
    handleDelete,
}) {
    const [file, setFile] = useState(image)
    const [imagePrev, setImagePrev] = useState('')
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        setFile(image)
    }, [image])

    const deleteCard = () => {
        handleDelete(selectedImages)
        deletePreview(image.name)
    }
    return (
        <div key={index} className="preview-card">
            <p>{image.name}</p>
            <button onClick={deleteCard}>Delete</button>
            <img src={selectedImages} alt="" id="imagePreviewCard" />
        </div>
    )
}

export default PreviewCard
