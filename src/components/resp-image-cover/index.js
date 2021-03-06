import React, {PureComponent} from 'react'
import css from '../../lib/css'
import RespImage from '../resp-image'
import './_resp-image-cover.sass'

export default class RespImageCover extends PureComponent {

  /*
   * User Experience Notes:
   * Wordpress automatically creates a very small 20px width preview image.
   * We initially use this to display as a 'placeholder'.
   * We also include an img with srcset with 3 or more images for the browser to choose.
   * When the browser has picked this image and that image has loaded, the main
   * bgimage div has it's background set to that image and it's opacity faded in.
  */

  constructor() {
    super()
    this.getPreviewBgStyle = this.getPreviewBgStyle.bind(this)
    this.getBgStyle = this.getBgStyle.bind(this)
    this.swapImages = this.swapImages.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.handleMount = this.handleMount.bind(this)
    this.state = {
      fullBgSrc: null,
      loadedClass: ''
    }
  }

  getPreviewBgStyle() {
    var imageBlob
    if (this.props.image && this.props.image.description) {
      imageBlob = this.props.image.description
      return {
        backgroundImage: 'url(data:image/jpeg;base64,' + imageBlob + ')'
      }
    } else {
      return null
    }
  }

  getBgStyle(imageSrc) {
    return {
      backgroundImage: 'url(' + imageSrc + ')'
    }
  }

  swapImages(el) {
    // Grab the browser-calculated source of the img and set the state
    // so the background of the hero matches (also fires on resize).
    // Also checks if currentSrc is supported
    var imgSrc = el.currentSrc || el.src
    this.setState({fullBgSrc: imgSrc, loadedClass: css.loaded})
  }

  handleLoad(ev) {
    // Swap the images on load
    this.swapImages(ev.target)
  }

  handleMount(el) {
    // When server rendering, the image loads before the JS takes over to when the
    // image component mounts, we check if it's already been loaded and then swap the images
    el !== null && el.complete && this.swapImages(el);
  }

  render() {
    var fullBgStyle,
      tagClass
    const {avatar, image} = this.props

    if (!image && !avatar)
      // Only return if there is no image and this is NOT an avatar
      return null

    avatar
      ? tagClass = css.avatar
      : tagClass = '_bgimg'

    const fullBgClass = '_bgimgfull' + this.state.loadedClass
    const previewBgClass = '_bgimgpreview' + this.state.loadedClass
    const previewBgStyle = this.getPreviewBgStyle()
    const noJsImgUrl = image.sizes
      ? image.sizes.large
      : image

    this.state.fullBgSrc && (fullBgStyle = this.getBgStyle(this.state.fullBgSrc))

    return (
      <div className={tagClass}>
        <RespImage {...this.props} onLoadCb={this.handleLoad} onMountCb={this.handleMount}/>
        <div className={previewBgClass} style={previewBgStyle}></div>
        <div className={fullBgClass} style={fullBgStyle}></div>
        {!process.browser && <noscript>
          <div className="_bgimgfull -loaded" style={this.getBgStyle(noJsImgUrl)}></div>
        </noscript>}
      </div>
    )
  }
}
