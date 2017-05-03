import React, { PureComponent }   from 'react';
import PropTypes                  from 'prop-types';
import { connect }                  from 'react-redux';
import lodashGet                  from 'lodash/get';
import AppBar                     from 'material-ui/AppBar';
import FlatButton                 from 'material-ui/FlatButton';
import List                   from 'material-ui/List';
import ListItem                   from 'material-ui/List/ListItem';
import Avatar                     from 'material-ui/Avatar';

import { actions as authActions } from '../../../redux/auth';

class AppBarComponent extends PureComponent {

    render() {
        const {user} = this.props.auth;
        const userPhotoUrl = lodashGet(this.props.auth.user, 'photoURL');
        const userDisplayName = lodashGet(this.props.auth.user, 'displayName');

        return (
            <div className="app-bar-header">
                <AppBar
                    title="Memorize"
                    iconElementLeft={null}
                    iconElementRight={
                        <If condition={!user}>
                            <FlatButton
                                label="Sign In"
                                onTouchTap={this.props.signInWithGoogle}
                            />
                        </If>
                    }
                >
                    <div className="content-wrapper">
                        <If condition={!!user}>
                            <List className="user-container">
                                <ListItem
                                    primaryText={userDisplayName}
                                    leftAvatar={ <Avatar src={userPhotoUrl}/>}
                                />
                            </List>
                        </If>
                    </div>
                </AppBar>
            </div>

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
