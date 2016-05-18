import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from './../actions';
import Input from './shared/input';

const fields = ['baseUrl', 'emailAddress', 'apiKey', 'apiSecret', 'region'];

class Settings extends Component {
  submit(formProps) {
    this.props.saveSettings(formProps);
    this.props.showMessage({
      text: 'Settings were saved to localStorage',
      style: 'positive'
    })
  }

  render() {
    const {handleSubmit, invalid} = this.props;
    return (
      <section>
        <h1 className="ui centered align header">Settings</h1>
        <form className="ui form" onSubmit={handleSubmit(this.submit.bind(this))}>
          {fields.map(name =>
            <Field key={name} name={name} component={Input} type="text"/>
          )}
          <button className="ui button primary" type="submit" disabled={invalid}>Save</button>
        </form>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.settings
  }
}

function validate(values) {
  const errors = {};
  fields.forEach((field) => {
    if (!values[field]) errors[field] = `${field} is required`;
  });
  return errors;
}

Settings = reduxForm({
  form: 'settings',
  validate
})(Settings);

Settings = connect(mapStateToProps, actions)(Settings);

export default Settings;
