import React, {Component} from 'react';

export default class Legal extends Component {

  render() {
    const {legalName, append} = this.props;

    return (
      <div className="legal">
        {append ? <span className="legal__append">{append}</span> : false}
        <span className="copy">&copy; {legalName}. All rights reserved.</span>
      </div>
    );
  }
}
