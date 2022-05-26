import React, { useEffect, useState } from 'react'
import PreviewCard from './PreviewCard'

function Preview({ images, deletePreview }) {
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
                          />
                      )
                  })
                : null}
        </div>
    )
}

export default Preview
