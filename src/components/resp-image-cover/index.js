import React, {Component} from 'react';
import css from '../../lib/css';
import * as SiteActions from '../../actions/SiteActions';

import RespImage from '../resp-image';

require('./_resp-image-cover.sass');

export default class ImageCover extends Component {

  /*
   * If requested in Wordpress the resp-image-cover component will ask the spinner to
   * display until the image has loaded.
   * It does this by not setting the background image style until the equivalent
   * img in the html has loaded and its currentSrc calculated.
  */

  constructor(props) {
    super(props);
    this.state = {
      bgSrc: null
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  componentWillReceiveProps(newProps) {
    !newProps.image && this.setState({bgSrc: null});
  }

  handleRef(el) {
    el != null && this.props.wait && SiteActions.loading(el);
  }

  handleLoad(ev) {
    // Grab the browser-calculated source of the img and set the state
    // so the background of the hero matches (also fires on resize).
    // Also checks if currentSrc is supported
    const el = ev.target;
    var imgSrc = el.currentSrc || el.src;
    this.setState({bgSrc: imgSrc});

    // Tell the Loader we've finished.
    this.props.wait && SiteActions.finished(el);
  }

  render() {
    var bgSrc,
      tagClass,
      refCb;
    const {className, modifier, image} = this.props;

    if (!image && className !== css.avatar)
      // Only return if there is no image and this is NOT an avatar
      return null

    className
      ? tagClass = className
      : tagClass = css.replImg;

    modifier && (tagClass += ' -' + modifier)

    this.props.wait
      ? refCb = this.handleRef
      : refCb = null;

    if (this.state.bgSrc) {
      bgSrc = {
        backgroundImage: 'url(' + this.state.bgSrc + ')'
      }
    }

    return (
      <div className={tagClass} style={bgSrc}>
        <RespImage {...this.props} refCb={refCb} onLoadCb={this.handleLoad}/>
      </div>
    );
  }
}
