import React, {Component} from 'react';
import cx from 'classnames';

class Select extends Component {

  componentDidMount() {
    $(this.refs.select).dropdown();
  }

  componentDidUpdate() {
    $(this.refs.select).dropdown('refresh');
  }

  render() {
    let {multiple, value, dirty, invalid, label, name, error} = this.props;
    if (multiple) value = value || [];
    return (
      <div className={cx('field', {error: dirty && invalid})} >
        <div>
          <label>{label || name}</label>
          <select ref="select" className="ui fluid dropdown" {...this.props} value={value} />
        </div>
        {dirty && invalid && <div className="ui basic red pointing prompt label" >{error}</div>}
      </div>
    );
  }
}

export default Select;
