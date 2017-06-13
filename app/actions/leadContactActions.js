import * as leadContactActionsConstants from '../actions/leadContactActionsConstants';

export function leadContactSelected(data) {
    return (dispatch) => {
        dispatch({type: leadContactActionsConstants.LEAD_CONTACT_SELECTED, payload: data});
    };
}

export function contactCtChanged(data) {
    return (dispatch) => {
        dispatch({type: leadContactActionsConstants.CONTACT_CT_CHANGED, payload: data});
    };
}

export function contactIdChanged(data) {
    return (dispatch) => {
        dispatch({type: leadContactActionsConstants.CONTACT_ID_CHANGED, payload: data});
    };
}

export function clearLeadContactSuggestion() {
    return (dispatch) => {
        dispatch({type: leadContactActionsConstants.CLEAR_LEAD_CONTACT_SUGGESTION});
    };
}
