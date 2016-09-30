import React, {Component} from 'react';

export default class Links extends Component {

  render() {
    const linkMap = this.props.externalLinks.map((link, index) => {
      var classList = 'i--' + link.iconClass;
      return (
        <li key={index}>
          <a href="{link.link}" target="_blank">
            <i className={classList} aria-hidden="true"></i>
            <span className="i__text">{link.iconText}</span>
          </a>
        </li>
      );
    });

    return (
      <div className="links--external">
        <h2>Awards</h2>
        <ul>
          {linkMap}
        </ul>
      </div>
    );
  }
}
