import * as searchActionsConstants from '../actions/searchActionsConstants';
const initialState = {
    index: 0
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case searchActionsConstants.TOGGLE_SEARCH_TAB:
            return {
                ...state,
                index: action.index
            };
        default:
            return state;
    }
};

export default searchReducer;
