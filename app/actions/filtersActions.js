import * as filtersActionsConstants from './filtersActionsConstants';

export function toggleFilters() {
    return (dispatch) => {
        dispatch({type: filtersActionsConstants.TOGGLE_FILTERS});
    };
}

export function changeFilterValue(data) {
    return (dispatch) => {
        dispatch({type: filtersActionsConstants.CHANGE_VALUE, payload: data});
    };
}
