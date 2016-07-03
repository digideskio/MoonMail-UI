import React, {PropTypes} from 'react';
import cx from 'classnames';

const SelectItem = ({value, children, disabled}) => (
  <div className={cx('item', {disabled})} data-value={value}>
    {children}
  </div>
);

SelectItem.propTypes = {
  value: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool
};

export default SelectItem;
