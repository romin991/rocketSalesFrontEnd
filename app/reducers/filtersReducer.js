import * as filtersActionsConstants from '../actions/filtersActionsConstants';

const initialState = {
    showFilters: false,
    filterValues: {}
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case filtersActionsConstants.TOGGLE_FILTERS:
            return {
                ...state,
                showFilters: !state.showFilters
            };
        case filtersActionsConstants.CHANGE_VALUE:
            const editedFilters = {};
            Object.assign(editedFilters, state.filterValues);
            const editedKey = Object.keys(action.payload)[0];
            editedFilters[editedKey] = action.payload[editedKey];
            return {
                ...state,
                filterValues: editedFilters
            };
        default:
            return state;
    }
};

export default filtersReducer;
