import * as leadContactActionsConstants from '../actions/leadContactActionsConstants';

const initialState = {
    contactCt: '',
    contactId: '',
    leadContactSuggestion: '',
    accountValue: ''
};

const leadContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case leadContactActionsConstants.LEAD_CONTACT_SELECTED:
            return {
                ...state,
                leadContactSuggestion: action.payload,
                accountValue: action.payload.company_name ? action.payload.company_name : ''
            };
        case leadContactActionsConstants.CONTACT_CT_CHANGED:
            return {
                ...state,
                contactCt: action.payload
            };
        case leadContactActionsConstants.CONTACT_ID_CHANGED:
            return {
                ...state,
                contactId: action.payload
            };
        case leadContactActionsConstants.CLEAR_LEAD_CONTACT_SUGGESTION:
            return {
                ...state,
                contactCt: '',
                contactId: '',
                leadContactSuggestion: '',
                accountValue: ''
            };
        default:
            return state;
    }
};

export default leadContactReducer;
