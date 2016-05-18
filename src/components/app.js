import React, { Component } from 'react';
import Header from './shared/header';
import Message from './shared/message';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="ui main text container">
          <Message/>
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default App;
