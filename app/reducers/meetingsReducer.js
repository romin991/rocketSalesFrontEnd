import * as meetingsActionsConstants from '../actions/meetingsActionsConstants';

const initialState = {
    meetingsList: [],
    meetingContacts: {},
    meetingAccounts: {},

    meetingsListPage: 1,

    meetingsListLoading: false,
    meetingsListLoadingSuccess: false,
    meetingsListError: null,
    createNewMeetingLoading: false,
    createNewMeetingSuccess: false,
    createNewMeetingError: null,
    currentMeetingsListType: 'open',
    meetingStartDate: '',
    meetingEndDate: '',
    venueInputValue: '',
    subjectInputValue: '',
    leadContactInputValue: '',
    descriptionInfoValue: '',
    duration: '',
    leadContactSuggestion: '',
    meetingContactsLoading: false,
    meetingContactsLoadingSuccess: false,
    meetingContactsError: null,
    meetingAccountsLoading: false,
    meetingAccountsLoadingSuccess: false,
    meetingAccountsError: null,
};

const meetingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case meetingsActionsConstants.GET_MEETINGS_LIST:
            return {
                ...state,
                meetingsListLoading: true,
                meetingsListLoadingSuccess: false,
                meetingsListError: null
            };
        case meetingsActionsConstants.SET_CURRENT_MEETINGS_LIST_TYPE:
            return {
                ...state,
                currentMeetingsListType: action.payload
            };
        case meetingsActionsConstants.SET_CURRENT_MEETINGS_PAGE:
            return {
                ...state,
                meetingsListPage: action.payload
            };
        case meetingsActionsConstants.GET_MEETINGS_LIST_SUCCESS:
            return {
                ...state,
                meetingsListLoading: false,
                meetingsListLoadingSuccess: true,
                meetingsList: action.payload
            };
        case meetingsActionsConstants.GET_MEETINGS_LIST_ERROR:
            return {
                ...state,
                meetingsListLoading: false,
                meetingsListLoadingSuccess: false,
                leedsListError: action.payload
            };
        case meetingsActionsConstants.CREATE_NEW_MEETING:
            return {
                ...state,
                createNewMeetingLoading: true,
                createNewMeetingSuccess: false,
                createNewMeetingError: null
            };
        case meetingsActionsConstants.CREATE_NEW_MEETING_SUCCESS:
            return {
                ...state,
                createNewMeetingLoading: false,
                createNewMeetingSuccess: true
            };
        case meetingsActionsConstants.CREATE_NEW_MEETING_ERROR:
            return {
                ...state,
                createNewMeetingLoading: false,
                createNewMeetingSuccess: false,
                createNewMeetingError: action.payload
            };
        case meetingsActionsConstants.CLEAR_FORM:
            return {
                ...state,
                subjectInputValue: '',
                meetingStartDate: '',
                venueInputValue: '',
                meetingEndDate: '',
                leadContactInputValue: '',
                descriptionInfoValue: '',
                duration: '',
                leadContactSuggestion: ''
            };
        case meetingsActionsConstants.GET_MEETING_CONTACTS:
            return {
                ...state,
                meetingContactsLoading: true,
                meetingContactsLoadingSuccess: false,
                meetingContactsError: null
            };
        case meetingsActionsConstants.GET_MEETING_CONTACTS_SUCCESS:
            return {
                ...state,
                meetingContactsLoading: false,
                meetingContactsLoadingSuccess: true,
                meetingContacts: action.payload
            };
        case meetingsActionsConstants.GET_MEETING_CONTACTS_ERROR:
            return {
                ...state,
                meetingContactsLoading: false,
                meetingContactsLoadingSuccess: false,
                meetingContactsError: action.payload
            };
        case meetingsActionsConstants.GET_MEETING_ACCOUNTS:
            return {
                ...state,
                meetingAccountsLoading: true,
                meetingAccountsLoadingSuccess: false,
                meetingAccountsError: null
            };
        case meetingsActionsConstants.GET_MEETING_ACCOUNTS_SUCCESS:
            return {
                ...state,
                meetingAccountsLoading: false,
                meetingAccountsLoadingSuccess: true,
                meetingAccounts: action.payload
            };
        case meetingsActionsConstants.GET_MEETING_ACCOUNTS_ERROR:
            return {
                ...state,
                meetingAccountsLoading: false,
                meetingAccountsLoadingSuccess: false,
                meetingAccountsError: action.payload
            };
        default:
            return state;
    }
};

export default meetingsReducer;
