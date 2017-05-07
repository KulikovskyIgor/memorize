import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import {connect}              from 'react-redux';
import lodashMap              from 'lodash/map'

import {actions as sourcesActions} from '../../../../redux/sources';

import SourceView from '../components/source-view';

class SourcesContainer extends PureComponent {

    componentWillMount() {
        this.props.FETCH_SOURCES();
    }

    componentWillReceiveProps(nextProps) {
        this._manageFetchSources(nextProps);
    }

    _manageFetchSources = (nextProps) => {
        const nextUserId = nextProps.user ? nextProps.user.uid : null;
        const prevUserId = this.props.user ? this.props.user.uid : null;

        if (nextUserId !== prevUserId) {
            this.props.FETCH_SOURCES();
        }
    };

    render() {
        const {sources, tags} = this.props;
        return (
            <div className="source-container">
                {lodashMap(sources, (source, key) => {
                    return (
                        <SourceView key={key} {...{...source, tags}} />
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
});

const mapDispatchToProps = dispatch => ({
    FETCH_SOURCES: () => dispatch(sourcesActions.FETCH_SOURCES()),
});

export default connect(mapStateToPros, mapDispatchToProps)(SourcesContainer);
