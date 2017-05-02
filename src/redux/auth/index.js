import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';
import * as asyncActions from './asyncActions';

export const constants = constantsHelper('auth', [
    'SET_TOKEN',
    'SET_USER',
]);

export const actions = { ...actionsHelper(constants), ...asyncActions };

const initState = {
    token: null,
    user: null
};

export default reducerHelper(initState, {
    [constants.SET_TOKEN]: (state, action) => {
        return {...state, token: action.payload}
    },

    [constants.SET_USER]: (state, action) => {
        return {...state, user: action.payload}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
