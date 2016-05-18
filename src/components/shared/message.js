import React, { Component } from 'react';
import { connect } from 'react-redux'
import cx from 'classnames';
import * as actions from './../../actions';

class Message extends Component {

  onCloseClick(e) {
    this.props.cleanMessage();
  }

  render() {
    const {text, style} = this.props;
    if (!text) return null;
    return (
      <div className={cx('ui small message', style)} ref="message">
        {text} <i className="close icon" onClick={this.onCloseClick.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    text: state.message.text,
    style: state.message.style
  }
}

Message = connect(mapStateToProps, actions)(Message);
export default Message;
