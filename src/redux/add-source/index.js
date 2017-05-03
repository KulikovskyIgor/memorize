import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';

export const constants = constantsHelper('add-source', [
    'TOGGLE_DIALOG',
    'SET_SOURCE_URL',
    'SET_TAGS',
    'CLEAR',
]);

export const actions = actionsHelper(constants);

const initState = {
    isShowDialog: false,
    sourceUrl: '',
    tags: [],
};

export default reducerHelper(initState, {
    [constants.TOGGLE_DIALOG]: (state, action) => {
        return {...state, isShowDialog: action.payload}
    },

    [constants.SET_SOURCE_URL]: (state, action) => {
        return {...state, sourceUrl: action.payload}
    },

    [constants.SET_TAGS]: (state, action) => {
        return {...state, tags: action.payload}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
