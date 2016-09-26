import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
import CampaignView from './CampaignView';
import Validator from 'validatorjs';

Validator.register(
  'emailBody',
  value => value.includes('{{unsubscribe_url}}'),
  'Please include {{unsubscribe_url}}'
);

const rules = {
  subject: 'required',
  listIds: 'required',
  body: 'required|emailBody'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

class Campaign extends Component {
  static propTypes = {
    fetchLists: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchLists();
  }

  render() {
    return (
      <CampaignView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  isSending: state.isSending
});

export default reduxForm({
  form: 'campaign',
  fields: ['subject', 'listIds', 'body'],
  validate
}, mapStateToProps, actions)(Campaign);