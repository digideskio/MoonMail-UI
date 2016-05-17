import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <div className="ui two column centered stackable grid">
        <form className="ui form column">
          <div className="field">
            <label>Your api root </label>
            <input type="url" name="first-name" placeholder="http://api.com" required/>
          </div>
          <button className="ui button primary" type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default Settings;
