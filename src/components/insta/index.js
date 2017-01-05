import React, {Component} from 'react'
import css from '../../lib/css'
import InstaStore from '../../stores/InstaStore'
import OptionsStore from '../../stores/OptionsStore'
import RespImageCover from '../resp-image-cover'
import SVG from '../svg'

import './_insta.sass';

export default class Insta extends Component {
  constructor() {
    super();
    this.state = {};
    this.user = {};
    this.requestOptions = this.requestOptions.bind(this);
    this.requestInsta = this.requestInsta.bind(this);
  }

  componentWillMount() {
    this.requestOptions();
    OptionsStore.on('change', this.requestOptions);
    InstaStore.on('change', this.requestInsta);
  }

  componentWillUnmount() {
    OptionsStore.removeListener('change', this.requestOptions);
    InstaStore.removeListener('change', this.requestInsta);
  }

  requestOptions() {
    const options = OptionsStore.getOptions();
    if (!options.instUserNameID || !options.instAuthToken)
      return;

    this.user = {
      id: options.instUserNameID,
      auth: options.instAuthToken
    }
    this.requestInsta();
  }

  requestInsta() {
    // const insta = InstaStore.getInsta(this.user);
    // insta && (this.setState({insta: insta}));
  }

  imageAdaptor(images) {
    var image = {};

    image.sizes = {
      'large': images.standard_resolution.url,
      'large-width': images.standard_resolution.width,
      'large-height': images.standard_resolution.height,
      'medium': images.low_resolution.url,
      'medium-width': images.low_resolution.width,
      'medium-height': images.low_resolution.height,
      'thumbnail': images.thumbnail.url,
      'thumbnail-width': images.thumbnail.width,
      'thumbnail-height': images.thumbnail.height,
    }

    return image;
  }

  render() {
    const {insta} = this.state;
    const compName = 'insta';

    if(!insta)
      return null;

    const instaMap = insta.map((item) => {
      var image = this.imageAdaptor(item.images);

      item.caption
        ? image.alt = item.caption.text
        : image.alt = 'An instagram image by #' + item.user.username;

      return (
        <li key={item.id} className={css.item}>
          <a href={item.link} target="_blank" className={css.link + compName}>
            <SVG type="instagram"/>
            <RespImageCover image={image} />
          </a>
        </li>
      )
    })
    return (
      <ul className={css.list + compName}>
        {instaMap}
      </ul>
    )
  }
}
