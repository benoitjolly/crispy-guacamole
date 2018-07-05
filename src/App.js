import React, { Component } from 'react';

import StatsForm from './StatsForm';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="navbar">
          <h2 className="center ">Stats Board</h2>
        </div>

        <Router>
          <div>
            <Route exact path="/" component={StatsForm} />
          </div>
        </Router>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authed: state.authed
})

export default connect(mapStateToProps)(App);
