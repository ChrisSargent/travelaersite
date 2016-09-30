import React from 'react';

function Hero(props) {
  const {acf_fc_layout, headlinePre, headline, headlinePost, content} = props;

  return (
    <section className={acf_fc_layout}>
      <h1>
        {headlinePre ? <small>{headlinePre} </small> : null}
        {headline}
        {headlinePost ? <small> {headlinePost}</small> : null}
      </h1>
      <div className="hero__content" dangerouslySetInnerHTML={{__html: content}}></div>
    </section>
  );
}

export default Hero;
