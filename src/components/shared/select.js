import React, { Component } from 'react';
import cx from 'classnames';

class Select extends Component {

  componentDidMount() {
    $(this.refs.select).dropdown();
  }

  componentDidUpdate() {
    $(this.refs.select).dropdown('refresh');
  }

  render() {
    let { multiple, value } = this.props;
    if (multiple) value = value || [];
    return (
      <div className={cx('field', {error: this.props.dirty && this.props.invalid})}>
        <div>
          <label>{this.props.label || this.props.name}</label>
          <select ref="select" className="ui fluid dropdown" {...this.props} value={value}/>
        </div>
        {this.props.dirty && this.props.invalid && <div className="ui basic red pointing prompt label">{this.props.error}</div>}
      </div>
    );
  }
}

export default Select;
