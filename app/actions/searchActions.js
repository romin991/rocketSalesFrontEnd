import * as searchActionsConstants from './searchActionsConstants';

export function toogleSearchTab(index) {
    return (dispatch) => {
        dispatch({type: searchActionsConstants.TOGGLE_SEARCH_TAB, index: index});
    };
}
