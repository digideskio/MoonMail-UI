import React from 'react';
import { Link } from 'react-router';

const Header = () =>
  <header className="ui inverted fixed menu">
    <div className="ui container">
      <Link to="/" className="ui medium header item">MoonMail</Link>
      <Link to="/campaign" className="item">Send campaign</Link>
      <Link to="/settings" className="item right">Settings</Link>
    </div>
  </header>;


export default Header;
