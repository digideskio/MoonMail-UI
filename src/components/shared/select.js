import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

class Select extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    onBlur: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    init: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    label: PropTypes.string,
    error: PropTypes.array,
    search: PropTypes.bool
  };

  static defaultProps = {
    init: {}
  };

  componentDidMount() {
    const init = {
      onHide: this.props.onBlur,
      ...this.props.init
    };
    $(this.refs.select).dropdown(init);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value) {
      $(this.refs.select).dropdown('clear');
    } else {
      $(this.refs.select).dropdown('set selected', nextProps.value);
    }
  }

  render() {
    let {multiple, value, touched, invalid, label, name, error, search} = this.props;
    if (multiple) value = value || [];
    return (
      <div className={cx('field', {error: touched && invalid})}>
        <div>
          <label>{label || name}</label>
          <select
            ref="select"
            className={cx('ui fluid dropdown', {'search selection': search})}
            {...this.props}
            value={value} />
        </div>
        {touched && invalid && <div className="ui basic red pointing prompt label">{error}</div>}
      </div>
    );
  }
}

export default Select;
