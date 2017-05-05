import * as firebase from 'firebase';
import {actions} from './index';

export const FETCH_TAGS = () => {
    return (dispatch) => {
        firebase.database()
            .ref('tags')
            .on('value', (snapshot) => {
                dispatch(actions.SET_TAGS(snapshot.val()));
            });
    }
};

export const CREATE_NEW_TAG = (tag, callback) => {
    return () => {
        firebase.database()
            .ref('tags')
            .push(tag)
            .then((item) => {
                if (callback) callback({value: item.key, label: tag});
            });
    }
};