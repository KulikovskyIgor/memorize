import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import {connect}              from 'react-redux';
import lodashMap              from 'lodash/map';
import FlatButton             from 'material-ui/FlatButton';
import Dialog                 from 'material-ui/Dialog';
import TextField              from 'material-ui/TextField';
import Select                 from 'react-select';

import {SOURCE_URL_EMPTY}            from '../../../../constants/errors';
import {actions as addSourceActions} from '../../../../redux/add-source';

import 'react-select/dist/react-select.css';

class AddSourceContainer extends PureComponent {

    componentWillReceiveProps(nextProps) {
        if (!this.props.isShowDialog && nextProps.isShowDialog) {
            this.props.FETCH_TAGS();
        }
    }

    componentWillUnmount() {
        this.props.CLEAR();
    }

    handleClose = () => {
        this.props.TOGGLE_DIALOG(false);
        this.props.CLEAR();
    };

    handleChangeSourceUrl = (e) => {
        const {sourceUrlValidationError, SET_SOURCE_URL, SET_SOURCE_URL_VALIDATION_ERROR} = this.props;
        SET_SOURCE_URL(e.target.value);
        if (sourceUrlValidationError && e.target.value.length) {
            SET_SOURCE_URL_VALIDATION_ERROR(null);
        }
    };

    handleChangeDescription = (e) => {
        this.props.SET_DESCRIPTION(e.target.value);
    };

    handleChangeTags = (e) => {
        this.props.SET_SELECTED_TAGS(e);
    };

    handleAddNewSource = () => {
        if (this._validateSourceData()) return;

        const {user: {uid}, selectedTags, sourceUrl, description, CREATE_NEW_SOURCE} = this.props;
        const tagIds = selectedTags.map(tag => tag.value);
        CREATE_NEW_SOURCE({
            userId: uid,
            tagIds,
            sourceUrl,
            description
        });
    };

    handleUpdateSource = () => {
        if (this._validateSourceData()) return;

        const {sourceId, selectedTags, sourceUrl, description, UPDATE_SOURCE} = this.props;
        const tagIds = selectedTags.map(tag => tag.value);
        UPDATE_SOURCE({
            sourceId,
            tagIds,
            sourceUrl,
            description
        });
    };

    handleNewOptionClick = (tag) => {
        this.props.CREATE_NEW_TAG(tag.label);
    };

    _adaptTagsForSelect = () => {
        return lodashMap(this.props.tags, (val, key) => ({value: key, label: val}));
    };

    _validateSourceData = () => {
        if (!this.props.sourceUrl.length) {
            this.props.SET_SOURCE_URL_VALIDATION_ERROR(SOURCE_URL_EMPTY);
            return true;
        }
    };

    render() {
        const {sourceUrl, description, sourceUrlValidationError, selectedTags, isShowDialog, isEditMode} = this.props;
        const adaptedTags = this._adaptTagsForSelect();
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={isEditMode ? 'Update source' : 'Create new source'}
                primary={true}
                onTouchTap={isEditMode ? this.handleUpdateSource : this.handleAddNewSource}
            />,
        ];

        return (
            <Dialog
                title={isEditMode ? 'Update source' : 'Create new source'}
                actions={actions}
                autoScrollBodyContent={true}
                open={isShowDialog}
                onRequestClose={this.handleClose}
                className="add-source-container"
            >
                <div className="body-container">
                    <br />
                    <TextField
                        hintText="Source URL"
                        fullWidth={true}
                        value={sourceUrl}
                        errorText={sourceUrlValidationError}
                        onChange={this.handleChangeSourceUrl}
                    />
                    <TextField
                        hintText="Description"
                        fullWidth={true}
                        value={description}
                        onChange={this.handleChangeDescription}
                    />
                    <br />
                    <br />
                    <Select.Creatable
                        name="form-field-name"
                        promptTextCreator={(label) => `Add new tag "${label}"?`}
                        placeholder="Add tags ..."
                        options={adaptedTags}
                        multi={true}
                        value={selectedTags}
                        onChange={this.handleChangeTags}
                        onNewOptionClick={this.handleNewOptionClick}
                    />
                </div>
            </Dialog>
        );
    }
}

AddSourceContainer.propTypes = {
    isShowDialog: PropTypes.bool,
    isEditMode: PropTypes.bool,
    sourceId: PropTypes.string,
    sourceUrl: PropTypes.string,
    description: PropTypes.string,
    sourceUrlValidationError: PropTypes.string,
    tags: PropTypes.any,
    selectedTags: PropTypes.any,
    TOGGLE_DIALOG: PropTypes.func.isRequired,
    SET_SOURCE_URL: PropTypes.func.isRequired,
    SET_SOURCE_URL_VALIDATION_ERROR: PropTypes.func.isRequired,
    FETCH_TAGS: PropTypes.func.isRequired,
    SET_SELECTED_TAGS: PropTypes.func.isRequired,
    CREATE_NEW_TAG: PropTypes.func.isRequired,
    CREATE_NEW_SOURCE: PropTypes.func.isRequired,
    UPDATE_SOURCE: PropTypes.func.isRequired,
    CLEAR: PropTypes.func.isRequired,
};

const mapStateToPros = state => ({
    user: state.auth.user,
    isShowDialog: state.addSource.isShowDialog,
    isEditMode: state.addSource.isEditMode,
    sourceId: state.addSource.sourceId,
    sourceUrl: state.addSource.sourceUrl,
    description: state.addSource.description,
    sourceUrlValidationError: state.addSource.sourceUrlValidationError,
    tags: state.addSource.tags,
    selectedTags: state.addSource.selectedTags,
});

const mapDispatchToProps = dispatch => ({
    TOGGLE_DIALOG: (isShow) => dispatch(addSourceActions.TOGGLE_DIALOG(isShow)),
    SET_SOURCE_URL: (sourceUrl) => dispatch(addSourceActions.SET_SOURCE_URL(sourceUrl)),
    SET_SOURCE_URL_VALIDATION_ERROR: (sourceUrlValidationError) => dispatch(addSourceActions.SET_SOURCE_URL_VALIDATION_ERROR(sourceUrlValidationError)),
    SET_DESCRIPTION: (description) => dispatch(addSourceActions.SET_DESCRIPTION(description)),
    FETCH_TAGS: () => dispatch(addSourceActions.FETCH_TAGS()),
    SET_SELECTED_TAGS: (tags) => dispatch(addSourceActions.SET_SELECTED_TAGS(tags)),
    CREATE_NEW_TAG: (tag) => dispatch(addSourceActions.CREATE_NEW_TAG(tag)),
    CREATE_NEW_SOURCE: (data) => dispatch(addSourceActions.CREATE_NEW_SOURCE(data)),
    UPDATE_SOURCE: (data) => dispatch(addSourceActions.UPDATE_SOURCE(data)),
    CLEAR: () => dispatch(addSourceActions.CLEAR()),
});

export default connect(mapStateToPros, mapDispatchToProps)(AddSourceContainer);
