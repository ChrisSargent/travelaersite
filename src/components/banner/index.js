import React, {Component} from 'react';

export default class Banner extends Component {

  render() {
    const {acf_fc_layout, logos} = this.props;
    const logoMap = logos.map((logo, index) => {
      const classList = 'i--' + logo.iconClass;

      return (
        <li key={index}>
          <i className={classList} aria-hidden="true"></i>
          <span className="i__text">{logo.iconText}</span>
        </li>
      );
    });

    return (
      <section className={acf_fc_layout}>
        <ul>
          {logoMap}
        </ul>
      </section>
    );
  }
}
