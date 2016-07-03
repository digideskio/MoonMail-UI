import React, {PropTypes} from 'react';
import cx from 'classnames';

const Input = (props) => {
  const Component = props.component || 'input';
  return (
    <div className={cx('field', {error: props.touched && props.invalid})}>
      <label>{props.label || props.name}</label>
      <Component {...props} />
      {props.touched && props.invalid && <div className="ui basic red pointing prompt label">{props.error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  invalid: PropTypes.bool
};

export default Input;
