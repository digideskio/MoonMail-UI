import React from 'react';
import cx from 'classnames';

const Input = (props) => {
  const InputTag = props.inputTag || 'input';
  return (
    <div className={cx('field', {error: props.touched && props.invalid})}>
      <label>{props.label || props.name}</label>
      <InputTag {...props}/>
      {props.touched && props.invalid && <div className="ui basic red pointing prompt label">{props.error}</div>}
    </div>

  );
};

export default Input;
