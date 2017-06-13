import * as accountsActionsConstants from '../actions/accountsActionsConstants';

const initialState = {
    accountsList: [],

    accountsListPage: 1,

    accountsListLoading: false,
    accountsListLoadingSuccess: false,
    accountsListError: null,

    createNewAccountLoading: false,
    createNewAccountSuccess: false,
    createNewAccountError: null,
    currentAccountsListType: 'all',

    accountSuggestion: {}
};

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case accountsActionsConstants.GET_ACCOUNTS_LIST:
            return {
                ...state,
                accountsListLoading: true,
                accountsListLoadingSuccess: false,
                accountsListError: null
            };
        case accountsActionsConstants.SET_CURRENT_ACCOUNTS_LIST_TYPE:
            return {
                ...state,
                currentAccountsListType: action.payload
            };
        case accountsActionsConstants.SET_CURRENT_ACCOUNTS_PAGE:
            return {
                ...state,
                accountsListPage: action.payload
            };
        case accountsActionsConstants.GET_ACCOUNTS_LIST_SUCCESS:
            return {
                ...state,
                accountsListLoading: false,
                accountsListLoadingSuccess: true,
                accountsList: action.payload
            };
        case accountsActionsConstants.GET_ACCOUNTS_LIST_ERROR:
            return {
                ...state,
                accountsListLoading: false,
                accountsListLoadingSuccess: false,
                accountsListError: action.payload
            };
        case accountsActionsConstants.CREATE_NEW_ACCOUNT:
            return {
                ...state,
                createNewAccountLoading: true,
                createNewAccountSuccess: false,
                createNewAccountError: null
            };
        case accountsActionsConstants.CREATE_NEW_ACCOUNT_SUCCESS:
            return {
                ...state,
                createNewAccountLoading: false,
                createNewAccountSuccess: true,
            };
        case accountsActionsConstants.CREATE_NEW_ACCOUNT_ERROR:
            return {
                ...state,
                createNewAccountLoading: false,
                createNewAccountSuccess: false,
                createNewAccountError: action.payload
            };
        case accountsActionsConstants.ACCOUNT_SUGGESTION_SELECTED:
            return {
                ...state,
                accountSuggestion: action.payload
            };
        case accountsActionsConstants.CLEAR_ACCOUNT_SUGGESTION:
            return {
                ...state,
                accountSuggestion: {}
            };
        default:
            return state;
    }
};

export default accountsReducer;
