import * as dealFieldActionsConstants from '../actions/dealFieldActionsConstants';

const initialState = {
    dealSuggestion: '',
    dealId: ''
};

const dealFieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case dealFieldActionsConstants.DEAL_SELECTED:
            return {
                ...state,
                dealSuggestion: action.payload,
                dealId: action.payload.id
            };
        case dealFieldActionsConstants.CLEAR_DEAL_SUGGESTION:
            return {
                ...state,
                dealSuggestion: '',
                dealId: ''
            };
        default:
            return state;
    }
};

export default dealFieldReducer;
