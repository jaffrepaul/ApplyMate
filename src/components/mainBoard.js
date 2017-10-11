import React from 'react';
import { browserHistory, Route, Switch } from 'react-router-dom';

// import Dashboard from './dashboard.js';
import Resume from './resume.js';
// import Resources from './resources.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <main>
        <Switch>
          <Route path="/resume" component={Resume} />
        </Switch>
      </main>);
  }
}

export default Main;