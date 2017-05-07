import constantsHelper   from '../../utils/redux/constants-helper';
import actionsHelper     from '../../utils/redux/actions-helper';
import reducerHelper     from '../../utils/redux/reducer-helper';
import * as asyncActions from './asyncActions';

export const constants = constantsHelper('sources', [
    'SET_USERS',
    'ADD_USER',
    'CLEAR',
]);

export const actions = {...actionsHelper(constants), ...asyncActions};

const initState = {
    users: {},
};

export default reducerHelper(initState, {
    [constants.SET_USERS]: (state, action) => {
        return {...state, users: action.payload}
    },

    [constants.ADD_USER]: (state, action) => {
        return {...state, users: {...state.users, ...action.payload}}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
