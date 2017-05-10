import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import {connect}              from 'react-redux';
import Drawer                 from 'material-ui/Drawer';
import SourcesContainer       from '../../home-page/sources';

class MobileNavigationComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <Drawer open={this.state.open}>
                <SourcesContainer />
            </Drawer>
        );
    }
}

MobileNavigationComponent.propTypes = {

};

const mapStateToPros = state => ({

});

const mapDispatchToProps = dispatch => ({

    // CLEAR: () => dispatch(addSourceActions.CLEAR()),
});

export default connect(mapStateToPros, mapDispatchToProps)(MobileNavigationComponent);
