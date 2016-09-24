import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

class DropDownMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
  };

  componentDidMount() {
    this.element.dropdown();
  }

  render() {
    const {className, children} = this.props;
    return (
      <div
        className={cx('ui dropdown', className)}
        ref={(n) => {
          this.element = $(n);
        }}>
        {children}
      </div>
    );
  }
}

export default DropDownMenu;
