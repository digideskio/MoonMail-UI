# [MoonMail](https://github.com/microapps/MoonMail) UI

[![Build Status](https://travis-ci.org/microapps/MoonMail.svg?branch=master)](https://travis-ci.org/microapps/MoonMail)
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/microapps/MoonMail.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fmicroapps%2FMoonMail%2F)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/microapps/MoonMail/master/LICENSE)
[![Gitter](https://badges.gitter.im/microapps/MoonMail.svg)](https://gitter.im/microapps/MoonMail?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


Send email marketing campaigns with [Amazon SES](https://aws.amazon.com/ses/). Let [Amazon Lambda](https://aws.amazon.com/lambda/) compose email by email and literaly scale it to infinite.  With this client you'll have the ability to send an email campaign. We're assuming that:

  -  You've set up the [Serverless](https://serverless.com/) project as described in the [documentation](https://github.com/microapps/MoonMail#getting-started)
  - You're using a SES endpoint that has production access (not sandbox mode)
  - You've created an email list and some recipients through the API

## Technological stack

  - app architecture: `react`, `react-redux`, `react-router` `react-router-redux`, `redux-thunk`
  - styling: `sass`, `postcss`, `css-modules`
  - testing: `karma`, `chai`, `sinon`, `enzyme`
  - development and building: `webpack`, `babel`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
