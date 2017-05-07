import React, {Component}       from 'react';
import PropTypes                from 'prop-types';
import {connect}                from 'react-redux';

import {actions as appActions}  from '../../../redux/app';
import {actions as tagsActions} from '../../../redux/tags';

import AppBarView               from '../../shared/app-bar';
import {Grid, Row, Col}         from 'react-flexbox-grid';

import SourcesContainer         from '../sources';
import SourceFrameContainer     from '../source-frame';

class HomePageContainer extends Component {

    componentWillMount() {
        this.props.FETCH_TAGS();
    }

    componentWillUnmount() {
        this.props.CLEAR();
    }

    render() {
        return (
            <div className="home-page">
                <AppBarView />
                <div className="content-container">
                    <SourcesContainer />
                    <SourceFrameContainer />
                </div>
            </div>
        );
    }
}

HomePageContainer.propTypes = {
    FETCH_TAGS: PropTypes.func.isRequired,
    CLEAR: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    FETCH_TAGS: data => dispatch(tagsActions.FETCH_TAGS()),
    CLEAR: () => dispatch(appActions.CLEAR()),
});

export default connect(null, mapDispatchToProps)(HomePageContainer);
