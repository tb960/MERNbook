import React, { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/ContactPage";
import ChangeProfile from "./pages/ChangeProfile";
import UserProfile from "./pages/UserProfile.js";
import TopicPage from "./pages/TopicPage";
import Topics from "./pages/Topics.js";
import Users from "./pages/Users";
import Account from "./pages/Account";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import setAuthenticationToken from "./middleware/setAuthenticationToken";
import { userLoaded } from "./actions/authActions/userLoaded";
import IsLoggedInRoute from "./routes/IsLoggedInRoute";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";
import ChangePassword from "./pages/ChangePassword";

if (localStorage.getItem("token")) {
  setAuthenticationToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(userLoaded());
  }, []);
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/contact-us" exact component={ContactPage} />
          <Route path="/users" exact component={Users} />
          <Route path="/topics" exact component={Topics} />
          <Route path="/users/user/:user_id" exact component={UserProfile} />
          <Route path="/topics/topic/:topic_id" exact component={TopicPage} />
          <IsLoggedInRoute path="/register" exact component={RegisterPage} />
          <IsLoggedInRoute path="/login" exact component={LoginPage} />
          <PrivateRoute
            path="/change-password"
            exact
            component={ChangePassword}
          />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/add-post" exact component={AddPost} />
          <PrivateRoute
            path="/change-profile"
            exact
            component={ChangeProfile}
          />
          <PrivateRoute path="/account" exact component={Account} />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
