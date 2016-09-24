import React, {PropTypes} from 'react';
import cx from 'classnames';

const Message = ({text, onClose, onRetry, className, style}) => {
  const handleRetry = (e) => {
    e.preventDefault();
    onRetry();
  };
  return (
    <div className={cx('ui small message', style, className)}>
      {style === 'error' && <b>Oops! </b>}
      {text && text.toString() || 'Something went wrong'} {onRetry && <a href="" onClick={handleRetry}>Retry</a>}
      <i className="close icon" onClick={() => onClose()} />
    </div>
  );
};

Message.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRetry: PropTypes.func,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  className: PropTypes.string,
  style: PropTypes.string
};

export default Message;
