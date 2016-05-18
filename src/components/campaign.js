import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from './../actions';
import Input from './shared/input';
import Select from './shared/select';

const fields = ['subject', 'listIds', 'body'];

class Campaign extends Component {
  submit(formProps) {
    this.props.sendCampaign(formProps);
    this.props.reset();
  }

  componentWillMount() {
    this.props.fetchLists();
  }

  render() {
    const {handleSubmit, invalid, lists} = this.props;
    return (
      <section>
        <h1 className="ui centered align header">Campaign</h1>
        <form className="ui form" onSubmit={handleSubmit(this.submit.bind(this))}>
          <Field name="subject" component={Input} type="text"/>
          <Field name="listIds" label="Lists" defaultValue={[]} component={(props) =>
            <Select {...props} multiple>
              {lists.map((list, i) => <option key={i} value={list.id}>{list.listName}</option>)}
            </Select>
          }/>
          <Field name="body" component={Input} inputTag="textarea"/>
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
  fields.forEach((field) => {
    const val = values[field];
    if (!val || val.length === 0) errors[field] = `${field} is required`;
  });
  return errors;
}

Campaign = reduxForm({
  form: 'campaign',
  validate
})(Campaign);

Campaign = connect(mapStateToProps, actions)(Campaign);

export default Campaign;
