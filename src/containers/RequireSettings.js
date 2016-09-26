import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from '../lib/utils';

export default function(ComposedComponent) {
  class RequireAuth extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    static propTypes = {
      hasSettings: PropTypes.bool.isRequired
    };

    componentWillMount() {
      if (!this.props.hasSettings) {
        this.context.router.replace('/settings');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.hasSettings) {
        this.context.router.replace('/settings');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    hasSettings: !isEmpty(state.settings)
  });

  return connect(mapStateToProps)(RequireAuth);
}
