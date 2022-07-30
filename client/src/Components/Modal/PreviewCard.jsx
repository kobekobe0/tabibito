import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

function PreviewCard({
    image,
    index,
    deletePreview,
    selectedImages,
    handleDelete,
}) {
    const deleteCard = () => {
        deletePreview(image.name)
        handleDelete(selectedImages)
    }
    return (
        <div key={index} className="preview-card">
            <img src={selectedImages?.URL} alt="" id="imagePreviewCard" />
            <div className="card-info">
                <p>
                    {image.name.length > 20
                        ? image.name.substring(0, 20) + '...'
                        : image.name}
                </p>
                <p id="button" onClick={deleteCard}>
                    <RiDeleteBin6Line color="red" size={20} />
                </p>
            </div>
        </div>
    )
}

export default PreviewCard
