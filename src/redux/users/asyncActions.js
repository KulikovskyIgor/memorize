import * as firebase from 'firebase';
import lodashForEach from 'lodash/forEach';
import {actions}     from './index';

export const FETCH_USER = (userId) => {
    return (dispatch) => {
        firebase.database().ref('users')
            .orderByChild('uid')
            .equalTo(userId)
            .on('value', (snapshot) => {
                const data = snapshot.val();

                lodashForEach(data, (user) => {
                    dispatch(actions.ADD_USER({
                        [user.uid]: user,
                    }));
                })
            });
    }
};
