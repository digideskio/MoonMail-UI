import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from 'actions';
import CampaignView from './CampaignView';
import Validator from 'validatorjs';

const rules = {
  subject: 'required',
  listIds: 'required',
  body: 'required'
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

  componentWillMount() {
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
  fields: ['subject', 'listIds', 'body']
}, mapStateToProps, actions)(Campaign);