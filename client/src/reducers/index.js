// import libraries from redux
import { combineReducers } from 'redux';
// import posts and auth file
import posts from './posts';
import auth from './auth';

export const reducers = combineReducers({ posts, auth });
