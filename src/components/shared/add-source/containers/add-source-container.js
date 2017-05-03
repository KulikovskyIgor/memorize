import React, { PureComponent }        from 'react';
import PropTypes                       from 'prop-types';
import { connect }                     from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton                      from 'material-ui/FlatButton';
import Dialog                          from 'material-ui/Dialog';
import TextField                          from 'material-ui/TextField';
import Select from 'react-select';

import { actions as addSourceActions } from '../../../../redux/add-source';

import 'react-select/dist/react-select.css';

class AddSourceContainer extends PureComponent {

    componentWillUnmount() {
        // this.props.CLEAR();
    }

    handleClose = () => {
        this.props.TOGGLE_DIALOG(false);
        this.props.CLEAR();
    };

    handleChangeSourceUrl = (e) => {
        this.props.SET_SOURCE_URL(e.target.value)
    };

    handleChangeTags = (e) => {
        this.props.SET_TAGS(e);
    };

    render() {
        const {sourceUrl, tags, isShowDialog} = this.props;
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

        var options = [
            {value: 112345, label: 'One'},
            {value: 345678, label: 'Two'}
        ];

        return (
            <Dialog
                title="Add source"
                actions={actions}
                modal={false}
                open={isShowDialog}
                onRequestClose={this.handleClose}
            >
                <TextField
                    hintText="Source URL"
                    fullWidth={true}
                    value={sourceUrl}
                    onChange={this.handleChangeSourceUrl}
                />
                <br />
                <br />
                <Select.Creatable
                    name="form-field-name"
                    promptTextCreator={(label) => `Add new tag "${label}"?`}
                    placeholder="Add tags ..."
                    options={options}
                    multi={true}
                    value={tags}
                    onChange={this.handleChangeTags}
                />
                <br />
            </Dialog>
        );
    }
}

AddSourceContainer.propTypes = {
    isShowDialog: PropTypes.bool,
    sourceUrl: PropTypes.string,
    tags: PropTypes.any,
    TOGGLE_DIALOG: PropTypes.func.isRequired,
    SET_SOURCE_URL: PropTypes.func.isRequired,
    SET_TAGS: PropTypes.func.isRequired,
    CLEAR: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    isShowDialog: state.addSource.isShowDialog,
    sourceUrl: state.addSource.sourceUrl,
    tags: state.addSource.tags,
});

const mapDispatchToProps = dispatch => ({
    TOGGLE_DIALOG: (isShow) => dispatch(addSourceActions.TOGGLE_DIALOG(isShow)),
    SET_SOURCE_URL: (sourceUrl) => dispatch(addSourceActions.SET_SOURCE_URL(sourceUrl)),
    SET_TAGS: (tags) => dispatch(addSourceActions.SET_TAGS(tags)),
    CLEAR: () => dispatch(addSourceActions.CLEAR()),
});

export default connect(mapStateToPros, mapDispatchToProps)(AddSourceContainer);
