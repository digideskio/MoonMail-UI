import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

class Select extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    allowAdditions: PropTypes.bool,
    init: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.array,
    search: PropTypes.bool,
    loading: PropTypes.bool,
    children: PropTypes.any
  };

  componentDidMount() {
    const init = {
      onHide: this.props.onBlur,
      onChange: this.onChange,
      allowAdditions: this.props.allowAdditions
    };
    this.element.dropdown(init);
  }

  onChange = (value) => {
    if (this.props.multiple && typeof value === 'string') {
      value = value.split(',');
    }
    this.props.onChange(value);
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.element.dropdown('set selected', this.props.value);
    });
  }

  render() {
    const props = this.props;
    const labelText = props.label || props.name;
    const placeholder = props.placeholder || `Select ${labelText.toLowerCase()}`;
    const dropdownClass = cx('ui dropdown selection', {
      fluid: props.fluid,
      multiple: props.multiple,
      loading: props.loading,
      search: props.search | props.allowAdditions
    });
    return (
      <div className={cx('field', {error: props.touched && props.invalid})}>
        <label>{labelText}</label>
        <div
          className={dropdownClass}
          ref={(s) => { this.element = $(s); }}>
          <input name={props.name} type="hidden" />
          <i className="dropdown icon" />
          <div className="default text">{placeholder}</div>
          <div className="menu">
            {props.children}
          </div>
        </div>
        {props.touched && props.invalid &&
        <div className="ui basic red pointing prompt label">{props.error}</div>
        }
      </div>
    );
  }
}

export default Select;
