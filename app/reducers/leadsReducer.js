import * as leadsActionsConstants from '../actions/leadsActionsConstants';

const initialState = {
    leadsList: [],
    leadsSummary: [],

    leadsListPage: 1,

    leadsListLoading: false,
    leadsListLoadingSuccess: false,
    leadsListError: null,

    createNewLeadLoading: false,
    createNewLeadSuccess: false,
    createNewLeadError: null,
    currentLeadsListType: 'open',

    leadsSummaryLoading: false,
    leadsSummaryLoadingSuccess: false,
    leadsSummaryError: null,

};

const leadsReducer = (state = initialState, action) => {
    switch (action.type) {
        case leadsActionsConstants.GET_LEADS_LIST:
            return {
                ...state,
                leadsListLoading: true,
                leadsListLoadingSuccess: false,
                leadsListError: null
            };
        case leadsActionsConstants.SET_CURRENT_LEADS_LIST_TYPE:
            return {
                ...state,
                currentLeadsListType: action.payload
            };
        case leadsActionsConstants.SET_CURRENT_LEADS_PAGE:
            return {
                ...state,
                leadsListPage: action.payload
            };
        case leadsActionsConstants.GET_LEADS_LIST_SUCCESS:
            return {
                ...state,
                leadsListLoading: false,
                leadsListLoadingSuccess: true,
                leadsList: action.payload
            };
        case leadsActionsConstants.GET_LEADS_LIST_ERROR:
            return {
                ...state,
                leadsListLoading: false,
                leadsListLoadingSuccess: false,
                leedsListError: action.payload
            };

        case leadsActionsConstants.CREATE_NEW_LEAD:
            return {
                ...state,
                createNewLeadLoading: true,
                createNewLeadSuccess: false,
                createNewLeadError: null
            };
        case leadsActionsConstants.CREATE_NEW_LEAD_SUCCESS:
            return {
                ...state,
                createNewLeadLoading: false,
                createNewLeadSuccess: true
            };
        case leadsActionsConstants.CREATE_NEW_LEAD_ERROR:
            return {
                ...state,
                createNewLeadLoading: false,
                createNewLeadSuccess: false,
                createNewLeadError: action.payload
            };

        case leadsActionsConstants.GET_LEADS_SUMMARY:
            return {
                ...state,
                leadsSummaryLoading: true,
                leadsSummaryLoadingSuccess: false,
                leadsSummaryError: null
            };
        case leadsActionsConstants.GET_LEADS_SUMMARY_SUCCESS:
            const chartData = [];
            Object.getOwnPropertyNames(action.payload).forEach((key) => {
                chartData.push({
                    x: key,
                    y: action.payload[key]
                });
            });
            return {
                ...state,
                leadsSummaryLoading: false,
                leadsSummaryLoadingSuccess: true,
                leadsSummary: chartData
            };
        case leadsActionsConstants.GET_LEADS_SUMMARY_ERROR:
            return {
                ...state,
                leadsSummaryLoading: false,
                leadsSummaryLoadingSuccess: false,
                leadsSummaryError: action.payload
            };

        default:
            return state;
    }
};

export default leadsReducer;
