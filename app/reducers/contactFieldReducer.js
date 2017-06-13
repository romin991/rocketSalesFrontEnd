import * as contactFieldActionsConstants from '../actions/contactFieldActionsConstants';

const initialState = {
    contactSuggestion: '',
    accountValue: '',
    contactId: ''
};

const contactFieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case contactFieldActionsConstants.CONTACT_SELECTED:
            return {
                ...state,
                contactSuggestion: action.payload,
                accountValue: action.payload.company_name ? action.payload.company_name : '',
                contactId: action.payload.id
            };
        case contactFieldActionsConstants.CLEAR_CONTACT_SUGGESTION:
            return {
                ...state,
                accountValue: '',
                contactSuggestion: '',
                contactId: ''
            };
        default:
            return state;
    }
};

export default contactFieldReducer;
