import React from 'react';
import css from '../../lib/css';

function Hero(props) {
  const {acf_fc_layout, headlinePre, headline, headlinePost, content, image} = props;
  var sectionClass, sectionStyle , postClass = {};
  
  sectionClass = acf_fc_layout;
  postClass = css.post;

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
    sectionClass += css.hasbg;
  }

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="cont--m">
        <div className={postClass}>
          <h1>
            {headlinePre ? <small>{headlinePre} </small> : null}
            {headline}
            {headlinePost ? <small> {headlinePost}</small> : null}
          </h1>
          <div className={css.wys} dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
      </div>
      { image ? <img src={image} alt="" className="img--replace"/> : false }
    </section>
  );
}

export default Hero;
