import React from 'react';
import css from '../../lib/css';

require('./_image.sass');

function RespImage(props) {
  var respSizes,
    altText,
    srcsetString,
    srcImage;

  const {image, alt, srcVersion, onLoadCb, refCb} = props;

  if (!image)
    return null;

  if (alt) {
    altText = alt;
  } else if (image.alt) {
    altText = image.alt;
  } else {
    altText = image.title;
  }
  altText.rendered && (altText = altText.rendered);

  if (image.sizes) {
    srcsetString =  image.sizes.medium + ' ' + image.sizes['medium-width'] + 'w, ' +
                    image.sizes.medium_large + ' ' + image.sizes['medium_large-width'] + 'w, ' +
                    image.sizes['post-thumbnail'] + ' ' + image.sizes['post-thumbnail-width'] + 'w, ' +
                    image.sizes.large + ' ' + image.sizes['large-width'] + 'w';
    srcImage = {
      alt: altText,
      width: image.sizes[srcVersion + '-width'],
      height: image.sizes[srcVersion + '-height'],
      src: image.sizes[srcVersion]
    };
    respSizes = props.respSizes || '100vw';
  } else {
    srcImage = {
      src: image,
      alt: altText
    }
  }

  return (
    <img width={srcImage.width}
      height={srcImage.height}
      src={srcImage.src}
      alt={srcImage.alt}
      srcSet={srcsetString}
      sizes={respSizes}
      className={css.image}
      onLoad={onLoadCb}
      ref={refCb}
      />
  );
};

export default RespImage;
