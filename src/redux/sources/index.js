import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';
import * as asyncActions from './asyncActions';

export const constants = constantsHelper('sources', [
    'SET_SOURCES',
    'SET_ACTIVE_SOURCE',
    'CLEAR',
]);

export const actions = { ...actionsHelper(constants), ...asyncActions };

const initState = {
    sources: {},
    activeSourceId: null,
};

export default reducerHelper(initState, {
    [constants.SET_SOURCES]: (state, action) => {
        return {...state, sources: action.payload}
    },

    [constants.SET_ACTIVE_SOURCE]: (state, action) => {
        return {...state, activeSourceId: action.payload}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
