import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';

import AddSourceContainer       from '../add-source/containers/add-source-container';
import AddSourceFloatingButton  from '../add-source/containers/add-source-floating-button';

class Overlay extends PureComponent {

    render() {
        return (
            <div>
                <Choose>
                    <When condition={this.props.user}>
                        <AddSourceContainer />
                        <AddSourceFloatingButton />
                    </When>
                    <Otherwise>

                    </Otherwise>
                </Choose>
            </div>
        );
    }
}

Overlay.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToPros = state => ({
    user: state.auth.user,
});

export default connect(mapStateToPros)(Overlay);
