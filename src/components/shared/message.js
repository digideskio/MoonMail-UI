import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import * as actions from 'actions';

import CSSTransitionGroup from 'react-addons-css-transition-group';

let Message = ({text, style, cleanMessage}) => {
  return (
    <CSSTransitionGroup
      className="notification"
      transitionName="fade"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
      transitionAppearTimeout={200}
      transitionAppear
      component="div">
      {text && <div className={cx('ui small message', style)}>
        {text.toString()} <i className="close icon" onClick={() => cleanMessage()} />
      </div>}
    </CSSTransitionGroup>
  );
};

Message.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  style: PropTypes.string,
  cleanMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  text: state.message.text,
  style: state.message.style
});
export default connect(mapStateToProps, actions)(Message);
