import React, {PureComponent}      from 'react';
import PropTypes                   from 'prop-types';
import {connect}                   from 'react-redux';
import lodashMap                   from 'lodash/map'

import {actions as sourcesActions} from '../../../../redux/sources';
import {actions as usersActions}   from '../../../../redux/users';

import SourceView from '../components/source-view';

class SourcesContainer extends PureComponent {

    componentWillMount() {
        this.props.FETCH_SOURCES();
    }

    componentWillReceiveProps(nextProps) {
        this._manageFetchSources(nextProps);
        this._manageFetchUsersMetadata(nextProps);
    }

    _manageFetchSources = (nextProps) => {
        const nextUserId = nextProps.user ? nextProps.user.uid : null;
        const prevUserId = this.props.user ? this.props.user.uid : null;

        if (nextUserId !== prevUserId) {
            this.props.FETCH_SOURCES();
        }
    };

    _manageFetchUsersMetadata = (nextProps) => {
        if (nextProps.sources !== this.props.sources) {
            lodashMap(nextProps.sources, (source) => {
                this.props.FETCH_USER(source.userId);
            });
        }
    };

    render() {
        const {sources, users, tags} = this.props;
        return (
            <div className="source-container">
                {lodashMap(sources, (source, key) => {
                    console.log('users[source.userId]',users, users[source.userId]);
                    return (
                        <SourceView key={key} {...{...source, tags, user: users[source.userId]}} />
                    )
                })}
            </div>
        );
    }
}

SourcesContainer.propTypes = {
    sources: PropTypes.any,
    tags: PropTypes.object,
    user: PropTypes.object,
    FETCH_SOURCES: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    sources: state.sources.sources,
    tags: state.tags.tags,
    user: state.auth.user,
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    FETCH_SOURCES: () => dispatch(sourcesActions.FETCH_SOURCES()),
    FETCH_USER: (userId) => dispatch(usersActions.FETCH_USER(userId)),
});

export default connect(mapStateToPros, mapDispatchToProps)(SourcesContainer);
