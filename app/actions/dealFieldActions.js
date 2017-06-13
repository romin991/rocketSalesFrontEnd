import * as dealFieldActionsConstants from '../actions/dealFieldActionsConstants';


export function dealSelected(data) {
    return (dispatch) => {
        dispatch({type: dealFieldActionsConstants.DEAL_SELECTED, payload: data});
    };
}

export function clearDealSuggestion() {
    return (dispatch) => {
        dispatch({type: dealFieldActionsConstants.CLEAR_DEAL_SUGGESTION});
    };
}
