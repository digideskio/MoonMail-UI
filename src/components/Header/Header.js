import React from 'react';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

const Header = () => (
  <header className="ui inverted blue fixed menu large">
    <div className="ui container">
      <IndexLink to="/" className="ui medium header item">MoonMail</IndexLink>
      <Link to="/campaign" className="item" activeClassName="active">Send campaign</Link>
      <Link to="/settings" className="item right" activeClassName="active">Settings</Link>
    </div>
  </header>
);

export default Header;