import * as contactFieldActionsConstants from '../actions/contactFieldActionsConstants';


export function contactSelected(data) {
    return (dispatch) => {
        dispatch({type: contactFieldActionsConstants.CONTACT_SELECTED, payload: data});
    };
}

export function clearContactSuggestion() {
    return (dispatch) => {
        dispatch({type: contactFieldActionsConstants.CLEAR_CONTACT_SUGGESTION});
    };
}
