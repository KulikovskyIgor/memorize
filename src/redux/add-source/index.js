import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';

export const constants = constantsHelper('add-source', [
    'TOGGLE_DIALOG',
    'CLEAR',
]);

export const actions = actionsHelper(constants);

const initState = {
    isShowDialog: false,
};

export default reducerHelper(initState, {
    [constants.TOGGLE_DIALOG]: (state, action) => {
        return {...state, isShowDialog: action.payload}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
