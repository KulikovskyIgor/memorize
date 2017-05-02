import React                                                 from 'react';
import ReactDOM                                              from 'react-dom';
import {Provider}                                            from 'react-redux';
import {Router, Route, IndexRoute, browserHistory}           from 'react-router';
import {syncHistoryWithStore}                              from 'react-router-redux';

import {APP_META_DATA}                                     from './constants/metadata';

import Helmet                                                from 'react-helmet';
import MuiThemeProvider                                      from 'material-ui/styles/MuiThemeProvider';

import App                                                   from './components/app';
import HomePage                                              from './components/home-page';
import NotFoundPage                                          from './components/not-found-page';

import configureStore                                        from './redux/store';
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

import * as OfflinePluginRuntime                             from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

import injectTapEventPlugin                                  from 'react-tap-event-plugin';
injectTapEventPlugin();

import * as firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyATkYJvfTAOuIetObTROUZebCnBouWwAFs",
    authDomain: "memorize-f707d.firebaseapp.com",
    databaseURL: "https://memorize-f707d.firebaseio.com",
    projectId: "memorize-f707d",
    storageBucket: "memorize-f707d.appspot.com",
    messagingSenderId: "536618566139"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <Helmet {...{...APP_META_DATA}} />
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={HomePage}/>
                        <Route path="home" component={HomePage}/>
                        <Route path="*" component={NotFoundPage}/>
                    </Route>
                </Router>
            </div>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('app'));
