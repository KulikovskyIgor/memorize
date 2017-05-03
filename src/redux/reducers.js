import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import app                 from './app';
import home                from './home';
import auth                from './auth';
import addSource           from './add-source';

export default (state, action) => ({
    ...combineReducers({
        routing: routerReducer,
        app,
        home,
        auth,
        addSource,
    }).call(null, state, action),
});
