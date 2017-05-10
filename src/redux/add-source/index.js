import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';
import * as asyncActions from './asyncActions';

export const constants = constantsHelper('add-source', [
    'TOGGLE_DIALOG',
    'TOGGLE_DIALOG_EDIT_MODE',
    'SET_SOURCE_ID',
    'SET_SOURCE_URL',
    'SET_DESCRIPTION',
    'SET_SOURCE_URL_VALIDATION_ERROR',
    'SET_TAGS',
    'SET_SELECTED_TAGS',
    'ADD_SELECTED_TAG',
    'CLEAR',
]);

export const actions = { ...actionsHelper(constants), ...asyncActions };

const initState = {
    isShowDialog: false,
    isEditMode: false,
    sourceId: '',
    sourceUrl: '',
    description: '',
    sourceUrlValidationError: '',
    tags: [],
    selectedTags: []
};

export default reducerHelper(initState, {
    [constants.TOGGLE_DIALOG]: (state, action) => {
        return {...state, isShowDialog: action.payload}
    },

    [constants.TOGGLE_DIALOG_EDIT_MODE]: (state, action) => {
        return {...state,
            isShowDialog: true,
            isEditMode: true,
            sourceId: action.payload.sourceId,
            sourceUrl: action.payload.sourceUrl,
            description: action.payload.description,
            selectedTags: action.payload.selectedTags,
        }
    },

    [constants.SET_SOURCE_ID]: (state, action) => {
        return {...state, sourceId: action.payload}
    },

    [constants.SET_SOURCE_URL]: (state, action) => {
        return {...state, sourceUrl: action.payload}
    },

    [constants.SET_DESCRIPTION]: (state, action) => {
        return {...state, description: action.payload}
    },

    [constants.SET_SOURCE_URL_VALIDATION_ERROR]: (state, action) => {
        return {...state, sourceUrlValidationError: action.payload}
    },

    [constants.SET_TAGS]: (state, action) => {
        return {...state, tags: action.payload}
    },

    [constants.SET_SELECTED_TAGS]: (state, action) => {
        return {...state, selectedTags: action.payload}
    },

    [constants.ADD_SELECTED_TAG]: (state, action) => {
        return {...state, selectedTags: [...state.selectedTags, action.payload]}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
