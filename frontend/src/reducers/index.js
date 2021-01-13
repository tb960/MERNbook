import { combineReducers } from 'redux';
import Users from './userReducer.js';
import Auth from './authReducer.js';
import Posts from './postsReducer.js';

export default combineReducers({
    Users,
    Posts,
    Auth
});

