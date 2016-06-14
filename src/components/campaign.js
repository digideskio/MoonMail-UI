import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from './../actions';
import Input from './shared/input';
import Select from './shared/select';
import cx from 'classnames';

class CampaignView extends Component {

  static propTypes = {
    sendCampaign: PropTypes.func.isRequired,
    fetchLists: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    isSending: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired
  };

  reset = () => {
    this.props.resetForm();
  };

  submit = (formProps) => {
    this.props.sendCampaign(formProps).then(this.reset, this.reset);
  };

  componentWillMount() {
    this.props.fetchLists();
  }

  render() {
    const {fields: {subject, listIds, body}, handleSubmit, invalid, lists, isSending} = this.props;
    return (
      <section>
        <h1 className="ui centered align header">Campaign</h1>
        <form className="ui form" onSubmit={handleSubmit(this.submit)}>
          <Input type="text" {...subject} />
          <Select multiple label="Lists" {...listIds}>
            {lists.map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
          </Select>
          <Input component="textarea" {...body} />
          <button
            className={cx('ui button primary', {loading: isSending})}
            type="submit"
            disabled={invalid || isSending}>
            <i className="send icon" />
            Send
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  isSending: state.isSending
});

const validate = (values) => {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const val = values[key];
    if (!val || val.length === 0) errors[key] = 'this field is required';
  });
  return errors;
};

const Campaign = reduxForm({
  form: 'campaign',
  fields: ['subject', 'listIds', 'body'],
  validate
}, mapStateToProps, actions)(CampaignView);

export default Campaign;
