import React, {Component} from 'react';

export default class Hero extends Component {

  render() {
    const {acf_fc_layout, headlinePre, headline, headlinePost, content} = this.props;

    return (
      <section className={acf_fc_layout}>
        <h1>
          {headlinePre ? <small>{headlinePre}</small> : null}
          {headline}
          {headlinePost ? <small>{headlinePost}</small> : null}
        </h1>
        <p dangerouslySetInnerHTML={{
          __html: content
        }}></p>
      </section>
    );
  }
}
