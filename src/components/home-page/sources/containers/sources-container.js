import React, {Component}          from 'react';
import PropTypes                   from 'prop-types';
import {connect}                   from 'react-redux';
import lodashMap                   from 'lodash/map'

import {actions as sourcesActions}   from '../../../../redux/sources';
import {actions as usersActions}     from '../../../../redux/users';
import {actions as addSourceActions} from '../../../../redux/add-source';

import SourceView from '../components/source-view';

class SourcesContainer extends Component {

    componentWillMount() {
        this.props.FETCH_SOURCES();
    }

    componentWillReceiveProps(nextProps) {
        this._manageFetchSources(nextProps);
        this._manageFetchUsersMetadata(nextProps);
    }

    handleClickSourceItem = (id) => {
        this.props.SET_ACTIVE_SOURCE(id);
    };

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

    handleEditSource = (id) => {
        const source = this.props.sources[id];
        this.props.TOGGLE_DIALOG_EDIT_MODE({
            sourceId: id,
            sourceUrl: source.sourceUrl,
            description: source.description,
            selectedTags: source.tagIds,
        });
    };

    handleDeleteSource = (id) => {
        this.props.DELETE_SOURCE(id);
    };

    render() {
        const {sources, activeSourceId, users, tags, isLoggedUser} = this.props;

        return (
            <div className="source-container">
                {lodashMap(sources, (source, key) => (
                    <SourceView key={key} {...{
                        ...source,
                        tags,
                        id: key,
                        isLoggedUser,
                        user: users[source.userId],
                        isActive: activeSourceId === key,
                        onClick: this.handleClickSourceItem,
                        onEdit: this.handleEditSource,
                        onDelete: this.handleDeleteSource,
                    }}
                    />
                ))}
            </div>
        );
    }
}

SourcesContainer.propTypes = {
    sources: PropTypes.any,
    activeSourceId: PropTypes.string,
    tags: PropTypes.object,
    user: PropTypes.object,
    isLoggedUser: PropTypes.bool,
    FETCH_SOURCES: PropTypes.func.isRequired,
    SET_ACTIVE_SOURCE: PropTypes.func.isRequired,
    FETCH_USER: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    sources: state.sources.sources,
    activeSourceId: state.sources.activeSourceId,
    tags: state.tags.tags,
    user: state.auth.user,
    users: state.users.users,
    isLoggedUser: (!!state.auth.token && !!state.auth.user),
});

const mapDispatchToProps = dispatch => ({
    FETCH_SOURCES: () => dispatch(sourcesActions.FETCH_SOURCES()),
    DELETE_SOURCE: (id) => dispatch(sourcesActions.DELETE_SOURCE(id)),
    SET_ACTIVE_SOURCE: (id) => dispatch(sourcesActions.SET_ACTIVE_SOURCE(id)),
    FETCH_USER: (userId) => dispatch(usersActions.FETCH_USER(userId)),
    TOGGLE_DIALOG_EDIT_MODE: (payload) => dispatch(addSourceActions.TOGGLE_DIALOG_EDIT_MODE(payload)),
});

export default connect(mapStateToPros, mapDispatchToProps)(SourcesContainer);
