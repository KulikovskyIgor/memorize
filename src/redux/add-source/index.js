import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';
import * as asyncActions from './asyncActions';

export const constants = constantsHelper('add-source', [
    'TOGGLE_DIALOG',
    'SET_SOURCE_URL',
    'SET_SOURCE_URL_VALIDATION_ERROR',
    'SET_TAGS',
    'SET_SELECTED_TAGS',
    'ADD_SELECTED_TAG',
    'CLEAR',
]);

export const actions = { ...actionsHelper(constants), ...asyncActions };

const initState = {
    isShowDialog: false,
    sourceUrl: '',
    sourceUrlValidationError: '',
    tags: [],
    selectedTags: []
};

export default reducerHelper(initState, {
    [constants.TOGGLE_DIALOG]: (state, action) => {
        return {...state, isShowDialog: action.payload}
    },

    [constants.SET_SOURCE_URL]: (state, action) => {
        return {...state, sourceUrl: action.payload}
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
