import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import FloatingActionButton     from 'material-ui/FloatingActionButton';
import ContentAdd               from 'material-ui/svg-icons/content/add';

import { actions }              from '../../../../redux/add-source';

const style = {
    marginRight: 20,
};

class AddSourceFloatingButton extends PureComponent {

    handleToggleDialog = () => {
        this.props.TOGGLE_DIALOG(true);
    };

    render() {
        return (
            <FloatingActionButton
                style={style}
                onTouchTap={this.handleToggleDialog}
                className="add-source-floating-button"
            >
                <ContentAdd />
            </FloatingActionButton>
        );
    }
}

AddSourceFloatingButton.propTypes = {
    TOGGLE_DIALOG: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    TOGGLE_DIALOG: (isShow) => dispatch(actions.TOGGLE_DIALOG(isShow)),
});

export default connect(null, mapDispatchToProps)(AddSourceFloatingButton);
