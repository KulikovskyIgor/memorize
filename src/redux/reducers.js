import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import app                 from './app';
import home                from './home';
import auth                from './auth';
import addSource           from './add-source';
import sources             from './sources';
import tags                from './tags';

export default (state, action) => ({
    ...combineReducers({
        routing: routerReducer,
        app,
        home,
        auth,
        addSource,
        sources,
        tags,
    }).call(null, state, action),
});
