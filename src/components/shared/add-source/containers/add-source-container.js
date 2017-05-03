import React, { PureComponent }        from 'react';
import PropTypes                       from 'prop-types';
import { connect }                     from 'react-redux';
import FlatButton                      from 'material-ui/FlatButton';
import Dialog                          from 'material-ui/Dialog';

import { actions as addSourceActions } from '../../../../redux/add-source';

class AddSourceContainer extends PureComponent {

    handleClose = () => {
        this.props.TOGGLE_DIALOG(false);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.props.isShowDialog}
                onRequestClose={this.handleClose}
            >
                The actions in this window were passed in as an array of React objects.
            </Dialog>
        );
    }
}

AddSourceContainer.propTypes = {
    isShowDialog: PropTypes.bool.isRequired,
    TOGGLE_DIALOG: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    isShowDialog: state.addSource.isShowDialog,
});

const mapDispatchToProps = dispatch => ({
    TOGGLE_DIALOG: (isShow) => dispatch(addSourceActions.TOGGLE_DIALOG(isShow)),
});

export default connect(mapStateToPros, mapDispatchToProps)(AddSourceContainer);
