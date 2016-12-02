import React, {Component} from 'react';
import css from '../../lib/css';
import * as LoadingActions from '../../actions/LoadingActions';

import SVG from '../svg';
import Wysiwyg from '../wysiwyg';

require('./_hero.sass');

function HeroHeadline(props) {
  const {headlinePre, headline, headlinePost, headlineImage} = props;

  if (!headlinePre && !headline && !headlinePost && !headlineImage)
    return null;

  return (
    <h1 className={css.title}>
      {headlinePre}
      {headline && <strong>{headline}</strong>}
      {headlineImage && <SVG type={headlineImage}/>}
      {headlinePost}
    </h1>
  );
};

export default class Hero extends Component {
  /*
   * If requested in Wordpress the hero component will ask the spinner to
   * display until the hero image has loaded.
   * It does this by not setting the background image style until its heroLoading
   * state changes to false. This state is initially set by a property from WP.
  */

  constructor(props) {
    super(props);
    this.state = {
      heroLoading: props.waitForHeroLoad
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(el) {
    this.state.heroLoading && (LoadingActions.loading(el));
  }

  handleLoad(e) {
    // Tell the Loader we've finished.
    LoadingActions.finished(e.target);
    this.setState({heroLoading: false});
  }

  render() {
    var sectionStyle,
      modifier = '',
      onHeroLoad = '';

    const {content, image, fullscreen, paragraphWidth, contentImage, waitForHeroLoad} = this.props;
    const compName = 'hero';

    fullscreen && (modifier = ' -fullscreen');
    contentImage && (modifier = ' -fullwidth');
    waitForHeroLoad && (onHeroLoad = this.handleLoad);

    if (!this.state.heroLoading && image) {
      sectionStyle = {
        backgroundImage: 'url(' + image + ')'
      }
    }


    return (
      <section className={css.section + compName} style={sectionStyle}>
        <div className={css.content + compName + modifier}>
          <HeroHeadline {...this.props}/>
          <Wysiwyg content={content} size={paragraphWidth}/> {contentImage && <SVG type={contentImage}/>}
        </div>
        {image && <img src={image} className={css.replImg} ref={this.handleRef} onLoad={onHeroLoad} onError={onHeroLoad}/>}
      </section>
    );

  }
}
