import React, {Component} from 'react';

export default class Social extends Component {

  render() {
    const socialNetworks = this.props.socialNetworks.map((network, index) => {
      var classList = 'i--' + network.iconClass;
      return (
        <li key={index}>
          <a href="{network.link}" target="_blank">
            <i className={classList} aria-hidden="true"></i>
            <span className="i__text">{network.iconText}</span>
          </a>
        </li>
      );
    });

    return (
      <div className="social">
        <h2>Follow Us</h2>
        <ul>
          {socialNetworks}
        </ul>
      </div>
    );
  }
}
