import * as firebase from 'firebase';
import { actions } from './index';

export const signInWithGoogle = () => {
    return (dispatch) => {

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token, user);

            dispatch(actions.SET_TOKEN(token));
            dispatch(actions.SET_USER(user));
        });
    }
};
