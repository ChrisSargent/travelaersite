import React, {Component} from 'react';
import css from '../../lib/css';

import RespImage from '../resp-image';

import './_resp-image-cover.sass';

export default class RespImageCover extends Component {

  /*
   * User Experience Notes:
   * Wordpress automatically creates a very small 20px width preview image.
   * We initially use this to display as a 'placeholder'.
   * We also include an img with srcset with 3 or more images for the browser to choose.
   * When the browser has picked this image and that image has loaded, the main
   * bgimage div has it's background set to that image and it's opacity faded in.
  */

  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.getPreviewBgStyle = this.getPreviewBgStyle.bind(this);
    this.getBgStyle = this.getBgStyle.bind(this);
    this.state = {
      fullBgSrc: null,
    };
  }

  componentWillReceiveProps(newProps) {
    (newProps.image !== this.props.image) && this.setState({fullBgSrc: null});
  }

  getPreviewBgStyle() {
    var imageBlob;
    if(this.props.image && this.props.image.description) {
      imageBlob = this.props.image.description
      return {backgroundImage: 'url(data:image/jpeg;base64,' + imageBlob + ')'};
    } else {
      return null;
    }
  }

  getBgStyle(imageSrc) {
    return {backgroundImage: 'url(' + imageSrc + ')'};
  }


  handleLoad(ev) {
    // Grab the browser-calculated source of the img and set the state
    // so the background of the hero matches (also fires on resize).
    // Also checks if currentSrc is supported
    const el = ev.target;
    var imgSrc = el.currentSrc || el.src;
    this.setState({fullBgSrc: imgSrc});
  }

  render() {
    var fullBgStyle,
      fullBgClass,
      previewBgClass,
      tagClass;
    const {avatar, image} = this.props;

    if (!image && !avatar)
      // Only return if there is no image and this is NOT an avatar
      return null

    avatar
      ? tagClass = css.avatar
      : tagClass = '_bgimg';

    fullBgClass = '_bgimgfull';
    previewBgClass = '_bgimgpreview';

    const previewBgStyle = this.getPreviewBgStyle();

    if (this.state.fullBgSrc) {
      fullBgStyle = this.getBgStyle(this.state.fullBgSrc);
      fullBgClass += ' -loaded';
      previewBgClass += ' -loaded';
    }

    return (
      <div className={tagClass}>
        <RespImage {...this.props} onLoadCb={this.handleLoad}/>
        <div className={previewBgClass} style={previewBgStyle}></div>
        <div className={fullBgClass} style={fullBgStyle}></div>
      </div>
    );
  }
}
