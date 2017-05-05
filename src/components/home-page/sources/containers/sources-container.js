import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import lodashMap from 'lodash/map'

import { actions as sourcesActions } from '../../../../redux/sources';

import SourceView from '../components/source-view';

class SourcesContainer extends PureComponent {

    componentWillMount() {
        this.props.FETCH_SOURCES();
    }

    render() {
        return (
            <div>
                {lodashMap(this.props.sources, (source, key) => {
                    return (
                        <SourceView key={key} { ...source } />
                    )
                })}
            </div>
        );
    }
}

SourcesContainer.propTypes = {
    sources: PropTypes.any,
    FETCH_SOURCES: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    sources: state.sources.sources,
});

const mapDispatchToProps = dispatch => ({
    FETCH_SOURCES: () => dispatch(sourcesActions.FETCH_SOURCES()),
});

export default connect(mapStateToPros, mapDispatchToProps)(SourcesContainer);
