import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from './../actions';

class Settings extends Component {
  submit(formProps) {
    this.props.saveSettings(formProps);
  }

  render() {
    const {fields: {baseUrl}, handleSubmit} = this.props;
    return (
      <section className="ui two column centered stackable grid">
        <div className="ui column">
          <h1 className="ui centered align header">Settings</h1>
          <form className="ui form " onSubmit={handleSubmit(this.submit.bind(this))}>
            <div className="field">
              <label>Your api root </label>
              <input type="url" placeholder="http://api.com" {...baseUrl} required/>
            </div>
            <button className="ui button primary" type="submit">Save</button>
          </form>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.settings
  }
}

Settings = reduxForm({
  form: 'settings',
  fields: ['baseUrl']
}, mapStateToProps, actions)(Settings);


export default Settings;
