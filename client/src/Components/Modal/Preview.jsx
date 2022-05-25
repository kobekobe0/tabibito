import React from 'react'

function Preview({ images, deletePreview }) {
    return (
        <div>
            {images != null
                ? images.map((image, index) => {
                      return (
                          <div key={index}>
                              <p>{image.name}</p>
                              <button onClick={() => deletePreview(index)}>
                                  Delete
                              </button>
                          </div>
                      )
                  })
                : null}
        </div>
    )
}

export default Preview
