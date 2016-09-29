import React, {Component} from 'react';

export default class Banner extends Component {

  render() {
    const {acf_fc_layout, logos} = this.props;
    const logosMap = logos.map((logo, index) => {
      const classList = 'i--' + logo.iconClass;

      return (
        <span key={index}>
          <i className={classList} aria-hidden="true"></i>
          <span className="i__text">{logo.iconText}</span>
        </span>
      );
    });

    return (
      <section className={acf_fc_layout}>
        {logosMap}
      </section>
    );
  }
}
