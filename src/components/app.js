import React, {PropTypes} from 'react';
import Header from './shared/header';
import Message from './shared/message';

const App = ({children}) => (
  <div>
    <Header/>
    <section className="ui main text container" >
      <Message/>
      {children}
    </section>
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
