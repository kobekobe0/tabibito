import React from 'react'

function PreviewCard({
    image,
    index,
    deletePreview,
    selectedImages,
    handleDelete,
}) {
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
