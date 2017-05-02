import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import {connect}                  from 'react-redux';
import lodashGet                  from 'lodash/get';
import AppBar                     from 'material-ui/AppBar';
import FlatButton                 from 'material-ui/FlatButton';
import ListItem                   from 'material-ui/List/ListItem';
import Avatar                     from 'material-ui/Avatar';

import { actions as authActions } from '../../../redux/auth';

class AppBarComponent extends PureComponent {

    render() {
        const { user } = this.props.auth;
        const userPhotoUrl = lodashGet(this.props.auth.user, 'photoURL');
        const userDisplayName = lodashGet(this.props.auth.user, 'displayName');

        return (
            <AppBar
                title="Memorize"
                iconElementLeft={null}
            >
                <If condition={!!user}>
                    <Avatar src={userPhotoUrl}/>
                    <ListItem>
                        {userDisplayName}
                    </ListItem>
                </If>
                <If condition={!user}>
                    <FlatButton
                        label="Sign In"
                        onTouchTap={this.props.signInWithGoogle}
                    />
                </If>
            </AppBar>
        );
    }
}

AppBarComponent.propTypes = {
    auth: PropTypes.any,
    signInWithGoogle: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    signInWithGoogle: () => dispatch(authActions.signInWithGoogle()),
});

export default connect(mapStateToPros, mapDispatchToProps)(AppBarComponent);
