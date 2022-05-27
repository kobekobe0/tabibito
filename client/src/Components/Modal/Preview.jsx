import React, { useEffect, useState } from 'react'
import PreviewCard from './PreviewCard'

function Preview({ images, deletePreview, handleDelete, selectedImages }) {
    const reader = new FileReader()
    const [imagePrev, setImagePrev] = useState([])

    return (
        <div className="preview-wrapper">
            {images != null
                ? images.map((image, index) => {
                      return (
                          <PreviewCard
                              image={image}
                              index={index}
                              key={index}
                              deletePreview={deletePreview}
                              selectedImages={selectedImages[index]}
                              handleDelete={handleDelete}
                          />
                      )
                  })
                : null}
        </div>
    )
}

export default Preview
