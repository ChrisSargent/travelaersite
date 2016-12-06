import React, {Component} from 'react';
import css from '../../lib/css';
import * as LoadingActions from '../../actions/LoadingActions';

import Image from '../image';

require('./_avatar.sass');

export default class ImageCover extends Component {

  /*
   * If requested in Wordpress the image-cover component will ask the spinner to
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

  handleRef(el) {
    el != null && this.props.wait && LoadingActions.loading(el);
  }

  handleLoad(e) {
    var imgSrc;
    const el = e.target;

    // Tell the Loader we've finished.
    this.props.wait && LoadingActions.finished(el);

    // Grab the browser-calculated source of the img and set the state
    // so the background of the hero matches (also fires on resize).
    // Also checks if currentSrc is supported
    typeof el.currentSrc === "undefined"
      ? imgSrc = el.src
      : imgSrc = el.currentSrc;
    this.setState({bgSrc: imgSrc});
  }

  render() {
    // IMAGE: image, alt, srcVersion, className, onLoadCb, refCb
    const {image, avatar} = this.props;

    var bgSrc,
      tagClass,
      sizes,
      srcVersion;

    if (avatar) {
      tagClass = 'avatar';
      sizes = '320px';
      srcVersion = 'medium';
    } else {
      tagClass = css.replImg;
      sizes = '100vw';
      srcVersion = 'large';
    }

    if (this.state.bgSrc) {
      bgSrc = {
        backgroundImage: 'url(' + this.state.bgSrc + ')'
      }
    }

    return (
      <div className={tagClass} style={bgSrc}>
        {this.props.children && <div className={css.container}>{this.props.children}</div>}
        <Image image={image} srcVersion={srcVersion} sizes={sizes} refCb={this.handleRef} onLoadCb={this.handleLoad} />
      </div>
    );
  }
}
