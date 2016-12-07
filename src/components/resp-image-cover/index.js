import React, {Component} from 'react';
import css from '../../lib/css';
import * as LoadingActions from '../../actions/LoadingActions';

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

  componentWillReceiveProps(nextProps) {
    !nextProps.image && this.setState({bgSrc: null});
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
    var bgSrc,
      tagClass,
      refCb;
    const {className, modifier} = this.props;

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
        <RespImage {...this.props} className='' refCb={refCb} onLoadCb={this.handleLoad}/>
      </div>
    );
  }
}