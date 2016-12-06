import React from 'react';
import imageSize from '../../lib/image-size';

require('./_image.sass');

function Image(props) {
  const {image, alt, srcVersion, className, onLoadCb, refCb} = props;

  if(!image || !image.sizes)
    return null;

  var sizes = props.sizes || '100vw';
  const desiredImage = imageSize(image, srcVersion);
  const spc = ' ';
  const srcsetString =  image.sizes.medium + spc + image.sizes['medium-width'] + 'w, ' +
                        image.sizes.medium_large + spc + image.sizes['medium_large-width'] + 'w, ' +
                        image.sizes['post-thumbnail'] + spc + image.sizes['post-thumbnail-width'] + 'w, ' +
                        image.sizes.large + spc + image.sizes['large-width'] + 'w';

  return (
    <img width={desiredImage.width} height={desiredImage.height}
      src={desiredImage.src}
      alt={alt || desiredImage.alt}
      srcSet={srcsetString}
      sizes={sizes}
      className={className}
      onLoad={onLoadCb}
      ref={refCb}
      />
  );
};

export default Image;
