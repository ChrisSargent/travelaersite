import React from 'react'
import css from '../../lib/css'
import './_image.sass'

const RespImage = ({
  image,
  alt,
  onLoadCb,
  srcVersion = 'large',
  respSizes = '100vw'
}) => {
  var altText,
    srcsetString = '',
    srcImage

  if (!image)
    return null

  if (alt) {
    altText = alt
  } else if (image.alt) {
    altText = image.alt
  } else {
    altText = image.title
  }

  altText.rendered && (altText = altText.rendered)

  if (image.sizes) {
    image.sizes['medium'] && (srcsetString += image.sizes['medium'] + ' ' + image.sizes['medium-width'] + 'w, ')
    image.sizes['medium_large'] && (srcsetString += image.sizes['medium_large'] + ' ' + image.sizes['medium_large-width'] + 'w, ')
    image.sizes['post-thumbnail'] && (srcsetString += image.sizes['post-thumbnail'] + ' ' + image.sizes['post-thumbnail-width'] + 'w, ')
    image.sizes['large'] && (srcsetString += image.sizes['large'] + ' ' + image.sizes['large-width'] + 'w')

    srcImage = {
      src: image.sizes[srcVersion],
      alt: altText,
      width: image.sizes[srcVersion + '-width'],
      height: image.sizes[srcVersion + '-height']
    }
  } else {
    srcImage = {
      src: image,
      alt: altText
    }
  }

  return (<img width={srcImage.width} height={srcImage.height} src={srcImage.src} alt={srcImage.alt} srcSet={srcsetString} sizes={respSizes} className={css.image} onLoad={onLoadCb}/>)
}

export default RespImage
