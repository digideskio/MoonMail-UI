import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from './../actions';
import Input from './shared/input';

class Settings extends Component {

  submit(formProps) {
    this.props.saveSettings(formProps);
    this.props.showMessage({
      text: 'Settings have been saved to localStorage',
      style: 'positive'
    })
  }

  render() {
    const {fields, handleSubmit, invalid} = this.props;
    return (
      <section>
        <h1 className="ui centered align header" >Settings</h1>
        <form className="ui form" onSubmit={handleSubmit(this.submit.bind(this))} >
          {Object.keys(fields).map(key =>
            <Input key={key} type="text" {...fields[key]}/>
          )}
          <button className="ui button primary" type="submit" disabled={invalid} >Save</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: state.settings
});

const validate = (values) => {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const val = values[key];
    if (!val || val.length === 0) errors[key] = `this field is required`;
  });
  return errors;
};

Settings = reduxForm({
  form: 'settings',
  fields: ['baseUrl', 'emailAddress', 'apiKey', 'apiSecret', 'region'],
  validate
}, mapStateToProps, actions)(Settings);

export default Settings;
