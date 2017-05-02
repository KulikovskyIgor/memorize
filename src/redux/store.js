import { createStore, applyMiddleware } from 'redux';
import thunk                            from 'redux-thunk';
import { browserHistory }               from 'react-router';
import { routerMiddleware }             from 'react-router-redux';
import reducers                         from './reducers';
import { save, load }                   from 'redux-localstorage-simple';

export default () => {

    const routingMiddleware = routerMiddleware(browserHistory);
    const middlewares = [thunk, routingMiddleware, save({namespace: 'app-memorize', states: ['auth']})];

    if (process.env.NODE_ENV === 'development') {
        const createLogger = require('redux-logger');
        const logger = createLogger();
        middlewares.push(logger);
    }

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    const store = createStoreWithMiddleware(...[
        reducers,
        load({namespace: 'app-memorize', states: ['auth']}),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ]);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};
