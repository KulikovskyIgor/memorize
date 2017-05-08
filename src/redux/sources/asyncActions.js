import * as firebase from 'firebase';
import { actions }   from './index';

export const FETCH_SOURCES = () => {
    return (dispatch, getStore) => {
        const user = getStore().auth.user;
        const userId = user ? user.uid : null;

        let sources = firebase.database().ref('sources');

        if (userId) {
            sources = sources
                .orderByChild('userId')
                .equalTo(userId);
        }

        sources
            .on('value', (snapshot) => {
                const sources = snapshot.val();
                if (sources) dispatch(actions.SET_SOURCES(sources));
            });
    }
};
