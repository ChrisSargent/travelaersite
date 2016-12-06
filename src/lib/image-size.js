function imageSize(image, size) {

  if(!image.sizes) return;
  const imageObj = {
    alt: image.alt || image.title,
    width: image.sizes[size + '-width'],
    height: image.sizes[size + '-height'],
    src: image.sizes[size]
  }
  return imageObj.src ? imageObj : false;
}

export default imageSize;
