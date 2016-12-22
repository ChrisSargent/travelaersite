import React, {Component} from 'react';
import css from '../../lib/css';
import MessageStore from '../../stores/MessageStore'

require('./_message.sass');

export default class Message extends Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      messageObj: MessageStore.getMessageObj()
    }
  }

  componentWillMount() {
    MessageStore.on('change', this.handleUpdate);
    this.props.reset && MessageStore.resetMessage();
  }

  componentWillUnmount() {
    MessageStore.removeListener('change', this.handleUpdate);
  }

  handleUpdate() {
    this.setState({messageObj: MessageStore.getMessageObj()});
  }

  handleClose() {
    this.setState({messageObj: {}})
  }

  render() {
    const {message, messageType, error} = this.state.messageObj;
    if(!message)
      return null;

    const compName = 'message';
    var compClass = css.block + compName

    switch (messageType) {
      case 'error':
        compClass += ' ' + css.error;
        break;
      case 'warning':
        compClass += ' ' + css.warning;
        break;
      case 'success':
        compClass += ' ' + css.success;
        break;
      default:

    }

    return (
      <div className={compClass}>
        {message}
        {error && <span dangerouslySetInnerHTML={{__html: error}}></span>}
        <span className="close" onClick={this.handleClose}>&times;</span>
      </div>
    );
  }
}
