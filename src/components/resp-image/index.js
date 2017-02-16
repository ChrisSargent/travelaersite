import React, {PureComponent} from 'react'
import css from '../../lib/css'
import './_image.sass'

class RespImage extends PureComponent {
  constructor(props) {
    super(props)
    this.setupImage()
  }

  setupImage() {
    this.srcImage = ''
    this.srcsetString = ''
    const {
        image,
        alt,
        srcVersion = 'large',
        allowFullsize = false
      } = this.props

      var altText

      if (!image)
        return null

      if (alt) {
        altText = alt
      } else if (image.alt) {
        altText = image.alt
      } else {
        altText = image.title
      }

      allowFullsize && image.url && image.width && (this.srcsetString = image.url + ' ' + image.width + 'w, ')

      if (image.sizes) {
        image.sizes['medium'] && (this.srcsetString += image.sizes['medium'] + ' ' + image.sizes['medium-width'] + 'w, ')
        image.sizes['medium_large'] && (this.srcsetString += image.sizes['medium_large'] + ' ' + image.sizes['medium_large-width'] + 'w, ')
        image.sizes['post-thumbnail'] && (this.srcsetString += image.sizes['post-thumbnail'] + ' ' + image.sizes['post-thumbnail-width'] + 'w, ')
        image.sizes['large'] && (this.srcsetString += image.sizes['large'] + ' ' + image.sizes['large-width'] + 'w')

        this.srcImage = {
          src: image.sizes[srcVersion],
          alt: altText,
          width: image.sizes[srcVersion + '-width'],
          height: image.sizes[srcVersion + '-height']
        }
      } else {
        this.srcImage = {
          src: image,
          alt: altText
        }
      }
    }

    render() {
      const {onLoadCb, onMountCb, respSizes = '100vw'} = this.props
      const {srcImage, srcsetString} = this
      return (<img width={srcImage.width} height={srcImage.height} src={srcImage.src} alt={srcImage.alt} srcSet={srcsetString} sizes={respSizes} className={css.image} onLoad={onLoadCb} ref={onMountCb}/>)
    }
  }

  export default RespImage
