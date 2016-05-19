import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './../actions';
import Input from './shared/input';
import Select from './shared/select';

const fields = ['subject', 'listIds', 'body'];

class Campaign extends Component {
  submit(formProps) {
    this.props.sendCampaign(formProps);
    this.props.resetForm();
  }

  componentWillMount() {
    this.props.fetchLists();
  }

  render() {
    const {fields: {subject, listIds, body}, handleSubmit, invalid, lists} = this.props;
    return (
      <section>
        <h1 className="ui centered align header">Campaign</h1>
        <form className="ui form" onSubmit={handleSubmit(this.submit.bind(this))}>
          <Input type="text" {...subject}/>
          <Select multiple {...listIds}>
            {lists.map((list, i) => <option key={i} value={list.id}>{list.listName}</option>)}
          </Select>
          <Input component="textarea" {...body}/>
          <button className="ui button primary" type="submit" disabled={invalid}>
            <i className="send icon"/>
            Send
          </button>
        </form>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists
  }
}

function validate(values) {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const val = values[key];
    if (!val || val.length === 0) errors[key] = `${key} is required`;
  });
  return errors;
}

Campaign = reduxForm({
  form: 'campaign',
  fields: ['subject', 'listIds', 'body'],
  validate
}, mapStateToProps, actions)(Campaign);

export default Campaign;
