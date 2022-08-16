import React, { useEffect, useState } from 'react'
import './index.less'

const Boolean = [true, false]
const Carousel = ({
  imageList,
  imageClassName,
  id,
  onClick,
  className,
  autoplay,
  showArrows,
  overlayClassName,
  interval
}) => {
  const showArrowsStatus = Boolean.includes(showArrows) ? showArrows : Boolean[0]
  const autoplayStatus = Boolean.includes(autoplay) ? autoplay : Boolean[1]
  const [settings, setSettings] = useState({})
  const [images, setImages] = useState([])

  useEffect(() => {
    setSettings({
      middle: 0,
      left: 1,
      right: (imageList.length - 1)
    })
    const imagesTemp = []
    imageList.length && imageList.forEach((img, index) => {
      imagesTemp.push({
        index,
        url: img.url,
        title: img.title
      })
    })
    setImages(imagesTemp)
  }, [imageList])

  useEffect(() => {
    if (images.length) {
      setTimeout(() => {
        addCarouselItems()
        if (autoplayStatus) {
          if (interval == undefined) {
            interval = 2000
          }
          if (interval != '') { }
          setInterval(() => {
            handleCarouselLeftClick()
          }, interval);
        }
      }, 300)
    }
  }, [images])

  const addCarouselItems = () => {
    document.getElementById(`carousel_3d_id_${settings.right}`).classList.add('carousel____right')
    document.getElementById(`carousel_3d_id_${settings.left}`).classList.add('carousel____left')
    document.getElementById(`carousel_3d_id_${settings.middle}`).classList.add('carousel____middle')
    document.getElementById(`carousel_3d_id_${settings.middle}`).classList.add('carousel_____zIndex4')
    settings.title = ''
  }

  const removeCarouselItems = () => {
    document.getElementById(`carousel_3d_id_${settings.middle}`).classList.remove('carousel____middle')
    document.getElementById(`carousel_3d_id_${settings.left}`).classList.remove('carousel____left')
    document.getElementById(`carousel_3d_id_${settings.right}`).classList.remove('carousel____right')

    document.getElementById(`carousel_3d_id_${settings.left}`).classList.remove('carousel_____zIndex2')
    document.getElementById(`carousel_3d_id_${settings.right}`).classList.remove('carousel_____zIndex3')

    document.getElementById(`carousel_3d_id_${settings.right}`).classList.remove('carousel_____zIndex2')
    document.getElementById(`carousel_3d_id_${settings.left}`).classList.remove('carousel_____zIndex3')

    document.getElementById(`carousel_3d_id_${settings.middle}`).classList.remove('carousel_____zIndex4')

    handleMouseLeave()
  }

  const handleCarouselLeftClick = () => {
    removeCarouselItems()
    settings.left = settings.middle
    settings.middle = settings.right
    if (settings.right != 0) {
      settings.right = settings.right - 1
    }
    else {
      settings.right = imageList.length - 1
    }

    addCarouselItems()

    document.getElementById(`carousel_3d_id_${settings.right}`).classList.add('carousel_____zIndex2')
    document.getElementById(`carousel_3d_id_${settings.left}`).classList.add('carousel_____zIndex3')

  }

  const handleCarouselRightClick = () => {

    removeCarouselItems()

    settings.right = settings.middle
    settings.middle = settings.left
    if (settings.left == imageList.length - 1) {
      settings.left = 0
    }
    else {
      settings.left = settings.left + 1
    }

    addCarouselItems()

    document.getElementById(`carousel_3d_id_${settings.right}`).classList.add('carousel_____zIndex3')
    document.getElementById(`carousel_3d_id_${settings.left}`).classList.add('carousel_____zIndex2')
  }

  const handleMouseEnter = () => {
    document.getElementById('carousel_____image-overlay-' + settings.middle).classList.remove('carousel_____image-overlay-leave')
    document.getElementById('carousel_____image-overlay-' + settings.middle).classList.add('carousel_____image-overlay-enter')
  }

  const handleMouseLeave = () => {
    document.getElementById('carousel_____image-overlay-' + settings.middle).classList.remove('carousel_____image-overlay-enter')
    document.getElementById('carousel_____image-overlay-' + settings.middle).classList.add('carousel_____image-overlay-leave')
  }

  const imageClick = (image) => {
    handleMouseLeave()
    onClick(image)
  }

  return (
    <React.Fragment>
      {
        images.length ?
          <div className={`carousel_____container ${className}`} id={id} >
            {showArrowsStatus ? <div className="carousel_____indicators-wrapper">
              <div className="carousel_____arrow-indicators carousel_____arrow-indicators-prev" id="carousel_____left-arrow" onClick={() => handleCarouselLeftClick()} />
              <div className="carousel_____arrow-indicators carousel_____arrow-indicators-next" id="carousel_____right-arrow" onClick={() => handleCarouselRightClick()} />
            </div> : ''}

            {
              images.map(image => {
                return (
                  <div className="carousel_____image-container-wrapper" key={image.index} onClick={() => imageClick(image)} onMouseEnter={() => handleMouseEnter()}>
                    {
                      image.title != "" ?
                        <div id={"carousel_____image-overlay-" + image.index} className={`carousel_____image-overlay carousel_____image-overlay-leave ${overlayClassName}`} onMouseLeave={() => handleMouseLeave()}>
                          <h1 className="carousel_____overlay-title">{image.title}</h1>
                        </div> : <div id={"carousel_____image-overlay-" + image.index} className="carousel_____image-overlay-disabled"></div>
                    }
                    <img
                      src={image.url}
                      alt={image.title}
                      id={`carousel_3d_id_${image.index}`}
                      className={`carousel_____image  ${imageClassName}`}
                    />
                  </div>
                )
              })
            }
          </div>
          : null
      }
    </React.Fragment>
  )
}

export default Carousel