import React, {Component}        from 'react';
import PropTypes                   from 'prop-types';
import {connect}                 from 'react-redux';

import {actions as appActions}   from '../../../redux/app';
import {actions as tagsActions}   from '../../../redux/tags';

import AppBarView from '../../shared/app-bar';
import {Grid, Row, Col} from 'react-flexbox-grid';

import SourcesContainer from '../sources';

class HomePageContainer extends Component {

    componentWillMount() {
        this.props.FETCH_TAGS();
    }

    componentWillUnmount() {
        this.props.CLEAR();
    }

    render() {
        return (
            <Grid fluid className="home-page">
                <AppBarView />
                <Row>
                    <Col xs={12} md={4}>
                        <SourcesContainer />
                    </Col>
                    <Col xs={12} md={8}>
                        cvbnm,
                    </Col>
                </Row>
            </Grid>
        );
    }
}

HomePageContainer.propTypes = {
    FETCH_TAGS: PropTypes.func.isRequired,
    CLEAR: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
});

const mapDispatchToProps = dispatch => ({
    FETCH_TAGS: data => dispatch(tagsActions.FETCH_TAGS()),
    CLEAR: () => dispatch(appActions.CLEAR()),
});

export default connect(mapStateToPros, mapDispatchToProps)(HomePageContainer);
