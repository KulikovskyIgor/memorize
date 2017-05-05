import * as firebase from 'firebase';
import {actions} from './index';

export const FETCH_SOURCES = () => {
    return (dispatch) => {
        firebase.database()
            .ref('sources')
            .on('value', (snapshot) => {
                dispatch(actions.SET_SOURCES(snapshot.val()));
            });
    }
};