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

export const CREATE_NEW_TAG = (tag) => {
    return (dispatch) => {
        firebase.database()
            .ref('tags')
            .push(tag)
            .then((item) => {
                dispatch(actions.ADD_SELECTED_TAG({value: item.key, label: tag}));
            });
    }
};

export const CREATE_NEW_SOURCE = ({userId, tagIds, sourceUrl, description}) => {
    return (dispatch) => {
        firebase.database().ref('sources').push({
            userId,
            tagIds,
            sourceUrl,
            description,
            createdAt: (new Date()).toISOString()
        }).then(() => {
            dispatch(actions.CLEAR());
        });
    }
};
