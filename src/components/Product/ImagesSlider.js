import React from 'react'
import Slider from 'react-slick'

class SimpleSlider extends React.Component {
  renderImages = () => {
    const { images, title } = this.props
    if (images.length === 1) {
      return (
        <div>
          <img src={images[0].fullUrl} alt={title} />
        </div>
      )
    } else {
      var settings = {
        customPaging: function(i) {
          return (
            <a href="/#">
              <img
                width="48"
                height="48"
                src={images[i].fullUrl}
                alt={`thumbnail-${title}-${i}`}
              />
            </a>
          )
        },
        dots: true,
        dotsClass: 'simple-slider',
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
      return (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={image.fullUrl}>
              <img src={image.fullUrl} alt={`${title}-${index}`} />
            </div>
          ))}
        </Slider>
      )
    }
  }
  render() {
    return this.renderImages()
  }
}

export default SimpleSlider
