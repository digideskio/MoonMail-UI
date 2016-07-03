import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import * as actions from 'actions';

let Message = ({text, style, cleanMessage}) => {
  if (!text) return null;
  return (
    <div className={cx('ui small notification message', style)}>
      {text} <i className="close icon" onClick={() => cleanMessage()} />
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
  cleanMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  text: state.message.text,
  style: state.message.style
});
export default connect(mapStateToProps, actions)(Message);
