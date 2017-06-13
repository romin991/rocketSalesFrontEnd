import * as algoliaSearchActionsConstants from '../actions/algoliaSearchActionsConstants';

const initialState = {
    keyword: '',

    algoliaLeadsList: [],
    algoliaContactsList: [],
    algoliaAccountsList: [],
    algoliaTasksList: [],
    algoliaEventsList: [],
    algoliaDealsList: [],

    algoliaLeadsListLoading: false,
    algoliaLeadsListSuccess: false,
    algoliaLeadsListError: false,

    algoliaContactsListLoading: false,
    algoliaContactsListSuccess: false,
    algoliaContactsListError: false,

    algoliaAccountsListLoading: false,
    algoliaAccountsListSuccess: false,
    algoliaAccountsListError: false,

    algoliaTasksListLoading: false,
    algoliaTasksListSuccess: false,
    algoliaTasksListError: false,

    algoliaEventsListLoading: false,
    algoliaEventsListSuccess: false,
    algoliaEventsListError: false,

    algoliaDealsListLoading: false,
    algoliaDealsListSuccess: false,
    algoliaDealsListError: false
};


const algoliaSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case algoliaSearchActionsConstants.RECORD_SEARCH_KEYWORD:
            return {
                ...state,
                keyword: action.keyword
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_LEAD:
            return {
                ...state,
                algoliaLeadsListLoading: true,
                algoliaLeadsListSuccess: false,
                algoliaLeadsListError: false
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_LEAD_SUCCESS:
            return {
                ...state,
                algoliaLeadsListLoading: false,
                algoliaLeadsListSuccess: true,
                algoliaLeadsListError: false,
                algoliaLeadsList: action.payload
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_LEAD_ERROR:
            return {
                ...state,
                algoliaLeadsListLoading: false,
                algoliaLeadsListSuccess: false,
                algoliaLeadsListError: true
            };
        case algoliaSearchActionsConstants.CLEAR_ALGOLIA_LEAD:
            return {
                ...state,
                algoliaLeadsListLoading: false,
                algoliaLeadsListSuccess: false,
                algoliaLeadsListError: false,
                algoliaLeadsList: []
            };

        case algoliaSearchActionsConstants.GET_ALGOLIA_CONTACT:
            return {
                ...state,
                algoliaContactsListLoading: true,
                algoliaContactsListSuccess: false,
                algoliaContactsListError: false
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_CONTACT_SUCCESS:
            return {
                ...state,
                algoliaContactsListLoading: false,
                algoliaContactsListSuccess: true,
                algoliaContactsListError: false,
                algoliaContactsList: action.payload
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_CONTACT_ERROR:
            return {
                ...state,
                algoliaContactsListLoading: false,
                algoliaContactsListSuccess: false,
                algoliaContactsListError: true
            };
        case algoliaSearchActionsConstants.CLEAR_ALGOLIA_CONTACT:
            return {
                ...state,
                algoliaContactsListLoading: false,
                algoliaContactsListSuccess: false,
                algoliaContactsListError: false,
                algoliaContactsList: []
            };

        case algoliaSearchActionsConstants.GET_ALGOLIA_ACCOUNT:
            return {
                ...state,
                algoliaAccountsListLoading: true,
                algoliaAccountsListSuccess: false,
                algoliaAccountsListError: false
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_ACCOUNT_SUCCESS:
            return {
                ...state,
                algoliaAccountsListLoading: false,
                algoliaAccountsListSuccess: true,
                algoliaAccountsListError: false,
                algoliaAccountsList: action.payload
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_ACCOUNT_ERROR:
            return {
                ...state,
                algoliaAccountsListLoading: false,
                algoliaAccountsListSuccess: false,
                algoliaAccountsListError: true,
            };
        case algoliaSearchActionsConstants.CLEAR_ALGOLIA_ACCOUNT:
            return {
                ...state,
                algoliaAccountsListLoading: false,
                algoliaAccountsListSuccess: false,
                algoliaAccountsListError: false,
                algoliaAccountsList: []
            };

        case algoliaSearchActionsConstants.GET_ALGOLIA_TASK:
            return {
                ...state,
                algoliaTasksListLoading: true,
                algoliaTasksListSuccess: false,
                algoliaTasksListError: false
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_TASK_SUCCESS:
            return {
                ...state,
                algoliaTasksListLoading: false,
                algoliaTasksListSuccess: true,
                algoliaTasksListError: false,
                algoliaTasksList: action.payload
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_TASK_ERROR:
            return {
                ...state,
                algoliaTasksListLoading: false,
                algoliaTasksListSuccess: false,
                algoliaTasksListError: true
            };
        case algoliaSearchActionsConstants.CLEAR_ALGOLIA_TASK:
            return {
                ...state,
                algoliaTasksListLoading: false,
                algoliaTasksListSuccess: false,
                algoliaTasksListError: false,
                algoliaTasksList: []
            };

        case algoliaSearchActionsConstants.GET_ALGOLIA_EVENT:
            return {
                ...state,
                algoliaEventsListLoading: true,
                algoliaEventsListSuccess: false,
                algoliaEventsListError: false
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_EVENT_SUCCESS:
            return {
                ...state,
                algoliaEventsListLoading: false,
                algoliaEventsListSuccess: true,
                algoliaEventsListError: false,
                algoliaEventsList: action.payload
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_EVENT_ERROR:
            return {
                ...state,
                algoliaEventsListLoading: false,
                algoliaEventsListSuccess: false,
                algoliaEventsListError: true
            };
        case algoliaSearchActionsConstants.CLEAR_ALGOLIA_EVENT:
            return {
                ...state,
                algoliaEventsListLoading: false,
                algoliaEventsListSuccess: false,
                algoliaEventsListError: false,
                algoliaEventsList: []
            };

        case algoliaSearchActionsConstants.GET_ALGOLIA_DEAL:
            return {
                ...state,
                algoliaDealsListLoading: true,
                algoliaDealsListSuccess: false,
                algoliaDealsListError: false
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_DEAL_SUCCESS:
            return {
                ...state,
                algoliaDealsListLoading: false,
                algoliaDealsListSuccess: true,
                algoliaDealsListError: false,
                algoliaDealsList: action.payload
            };
        case algoliaSearchActionsConstants.GET_ALGOLIA_DEAL_ERROR:
            return {
                ...state,
                algoliaDealsListLoading: false,
                algoliaDealsListSuccess: false,
                algoliaDealsListError: true
            };
        case algoliaSearchActionsConstants.CLEAR_ALGOLIA_DEAL:
            return {
                ...state,
                algoliaDealsListLoading: false,
                algoliaDealsListSuccess: false,
                algoliaDealsListError: false,
                algoliaDealsList: []
            };

        default:
            return state;
    }
};

export default algoliaSearchReducer;
