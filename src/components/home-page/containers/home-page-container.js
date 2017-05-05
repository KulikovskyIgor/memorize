import React, { Component }        from 'react';
import PropTypes                   from 'prop-types';
import { connect }                 from 'react-redux';

import { actions as appActions }   from '../../../redux/app';

import AppBarView from '../../shared/app-bar';
import { Grid, Row, Col } from 'react-flexbox-grid';

import SourcesContainer from '../sources';

let yeomanImage = require('../../../images/yeoman.png');

class HomePageContainer extends Component {

    componentWillMount() {
        this.props.SET_TEST('demo text');
    }

    componentWillUnmount() {
        this.props.CLEAR();
    }

    render() {
        return (
            <div>
                <AppBarView />
                <Row>
                    <Col xs={12} md={4}>
                        <SourcesContainer />
                    </Col>
                    <Col xs={12} md={8}>
                        cvbnm,
                    </Col>
                </Row>
            </div>
        );
    }
}

HomePageContainer.propTypes = {
    test: PropTypes.any,
    SET_TEST: PropTypes.func.isRequired,
    CLEAR: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    test: state.app.test,
});

const mapDispatchToProps = dispatch => ({
    SET_TEST: data => dispatch(appActions.SET_TEST(data)),
    CLEAR: () => dispatch(appActions.CLEAR()),
});

export default connect(mapStateToPros, mapDispatchToProps)(HomePageContainer);
