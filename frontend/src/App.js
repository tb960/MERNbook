import React from 'react';
import LandingPage from './pages/LandingPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Footer />
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
