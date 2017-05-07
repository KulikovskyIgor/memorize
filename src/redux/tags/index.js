import constantsHelper from '../../utils/redux/constants-helper';
import actionsHelper   from '../../utils/redux/actions-helper';
import reducerHelper   from '../../utils/redux/reducer-helper';
import * as asyncActions from './asyncActions';

export const constants = constantsHelper('tags', [
    'SET_TAGS',
    'CLEAR',
]);

export const actions = { ...actionsHelper(constants), ...asyncActions };

const initState = {
    tags: {},
};

export default reducerHelper(initState, {
    [constants.SET_TAGS]: (state, action) => {
        return {...state, tags: action.payload}
    },

    [constants.CLEAR]: () => {
        return initState;
    },
});
