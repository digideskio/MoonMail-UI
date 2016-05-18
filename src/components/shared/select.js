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
    return (
      <div className={cx('field', {error: this.props.dirty && this.props.invalid})}>
        <div>
          <label>{this.props.label || this.props.name}</label>
          <select ref="select" className={cx('ui fluid dropdown')}{...this.props}>
            {this.props.children}
          </select>
        </div>
        {this.props.dirty && this.props.invalid && <div className="ui basic red pointing prompt label">{this.props.error}</div>}
      </div>
    );
  }
}

export default Select;
