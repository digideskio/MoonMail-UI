import React from 'react';

const WelcomeView = () => (
  <div className="ui text container">
    <h1 className="ui header centered">
      Welcome to <a href="https://github.com/microapps/MoonMail" target="_blank">MoonMail</a> sample client
    </h1>
    <p>Send email marketing campaigns with <a href="https://aws.amazon.com/ses/" target="_blank">Amazon SES</a>.
      {' '}
      Let <a href="https://aws.amazon.com/lambda/" target="_blank">Amazon Lambda</a> compose email by email and literaly scale it to infinite.</p>
    <h3 className="ui header">
      With this client you'll have the ability to send an email campaign. We're assuming that:
    </h3>
    <ul>
      <li>
        You've set up the <a href="https://serverless.com/" target="_blank">Serverless</a> project as described in the
        {' '}
        <a href="https://github.com/microapps/MoonMail#getting-started" target="_blank">documentation</a>
      </li>
      <li>You're using a SES endpoint that has production access (not sandbox mode)</li>
      <li>You've created an email list and some recipients through the API</li>
    </ul>
    <h3>
      If you like what we are doing please star MoonMail project to help it stay open source
    </h3>
    <iframe
      src="https://ghbtns.com/github-btn.html?user=microapps&repo=MoonMail&type=star&count=true&size=large"
      frameBorder="0"
      scrolling="0"
      width="160px"
      height="30px" />
    <iframe
      src="https://ghbtns.com/github-btn.html?user=microapps&repo=MoonMail&type=watch&count=true&size=large&v=2"
      frameBorder="0"
      scrolling="0"
      width="160px"
      height="30px" />
    <iframe
      src="https://ghbtns.com/github-btn.html?user=microapps&repo=MoonMail&type=fork&count=true&size=large"
      frameBorder="0"
      scrolling="0"
      width="160px"
      height="30px" />
  </div>
);
export default WelcomeView;