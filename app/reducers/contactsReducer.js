import * as contactsActionsConstants from '../actions/contactsActionsConstants';

const initialState = {
    contactsList: [],

    contactsListPage: 1,

    contactsListLoading: false,
    contactsListLoadingSuccess: false,
    contactsListError: null,

    createNewContactLoading: false,
    createNewContactSuccess: false,
    createNewContactError: null,
    currentContactsListType: 'all'
};

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case contactsActionsConstants.GET_CONTACTS_LIST:
            return {
                ...state,
                contactsListLoading: true,
                contactsListLoadingSuccess: false,
                contactsListError: null
            };
        case contactsActionsConstants.SET_CURRENT_CONTACTS_LIST_TYPE:
            return {
                ...state,
                currentContactsListType: action.payload
            };
        case contactsActionsConstants.SET_CURRENT_CONTACTS_PAGE:
            return {
                ...state,
                contactsListPage: action.payload
            };
        case contactsActionsConstants.GET_CONTACTS_LIST_SUCCESS:
            return {
                ...state,
                contactsListLoading: false,
                contactsListLoadingSuccess: true,
                contactsList: action.payload
            };
        case contactsActionsConstants.GET_CONTACTS_LIST_ERROR:
            return {
                ...state,
                contactsListLoading: false,
                contactsListLoadingSuccess: false,
                leedsListError: action.payload
            };
        case contactsActionsConstants.CREATE_NEW_CONTACT:
            return {
                ...state,
                createNewContactLoading: true,
                createNewContactSuccess: false,
                createNewContactError: null
            };
        case contactsActionsConstants.CREATE_NEW_CONTACT_SUCCESS:
            return {
                ...state,
                createNewContactLoading: false,
                createNewContactSuccess: true,
            };
        case contactsActionsConstants.CREATE_NEW_CONTACT_ERROR:
            return {
                ...state,
                createNewContactLoading: false,
                createNewContactSuccess: false,
                createNewContactError: action.payload
            };
        default:
            return state;
    }
};

export default contactsReducer;
