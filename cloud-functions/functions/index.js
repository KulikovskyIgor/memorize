var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.handleCreatingOfNewUser = functions.auth.user().onCreate(event => {
    const user = event.data;

    admin.database()
        .ref('users')
        .push({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
        });
});
