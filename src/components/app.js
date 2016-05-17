import React, { Component } from 'react';
import Header from './header';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="ui main container">
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default App;
