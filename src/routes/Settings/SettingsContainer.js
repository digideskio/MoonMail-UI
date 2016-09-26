import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
import Validator from 'validatorjs';
import SettingsView from './SettingsView';

const rules = {
  baseUrl: 'required|url',
  emailAddress: 'required|email',
  fromName: 'required',
  apiKey: 'required',
  apiSecret: 'required',
  region: 'required'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state) => ({
  initialValues: state.settings
});

export default reduxForm({
  form: 'settings',
  fields: ['baseUrl', 'emailAddress', 'apiKey', 'apiSecret', 'region', 'token'],
  validate
}, mapStateToProps, actions)(SettingsView);