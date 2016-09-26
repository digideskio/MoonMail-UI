import React, {Component, PropTypes} from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SettingsView = ({
  fields: {baseUrl, token},
  handleSubmit,
  invalid,
  saveSettings
}) => (
  <section>
    <h1 className="ui centered align header">Settings</h1>
    <form className="ui form" onSubmit={handleSubmit(saveSettings)}>
      <Input
        {...baseUrl}
        placeholder="https://api.moonmail.io"
        hint="url of your API Gateway without trailing slash"
        label="Base url"/>
      <Input
        {...token}
        hint="if you are using JSON Web Tokens in your api as we do"
        label="JWT Token"
        component="textarea" />
      <Button primary type="submit" disabled={invalid}>
        Save
      </Button>
    </form>
  </section>
);

SettingsView.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

export default SettingsView;
