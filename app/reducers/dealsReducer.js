import * as dealsActionsConstants from '../actions/dealsActionsConstants';

const initialState = {
    dealsList: [],
    dealsSummary: {},

    dealsListPage: 1,

    dealsListLoading: false,
    dealsListSuccess: false,
    dealsListError: false,
    currentDealsListType: 'open',

    createNewDealLoading: false,
    createNewDealSuccess: false,
    createNewDealError: false,

    dealsSummaryLoading: false,
    dealsSummarySuccess: false,
    dealsSummaryError: false,

    updateDealLoading: false,
    updateDealSuccess: false,
    updateDealError: false
};

const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case dealsActionsConstants.GET_DEALS_LIST:
            return {
                ...state,
                dealsListLoading: true,
                dealsListSuccess: false,
                dealsListError: false
            };
        case dealsActionsConstants.SET_CURRENT_DEALS_LIST_TYPE:
            return {
                ...state,
                currentDealsListType: action.payload
            };
        case dealsActionsConstants.SET_CURRENT_DEALS_PAGE:
            return {
                ...state,
                dealsListPage: action.payload
            };
        case dealsActionsConstants.GET_DEALS_LIST_SUCCESS:
            return {
                ...state,
                dealsListLoading: false,
                dealsListSuccess: true,
                dealsListError: false,
                dealsList: action.payload
            };
        case dealsActionsConstants.GET_DEALS_LIST_ERROR:
            return {
                ...state,
                dealsListLoading: false,
                dealsListSuccess: false,
                dealsListError: true,
                leedsListError: action.payload
            };

        case dealsActionsConstants.CREATE_NEW_DEAL:
            return {
                ...state,
                createNewDealLoading: true,
                createNewDealSuccess: false,
                createNewDealError: false
            };
        case dealsActionsConstants.CREATE_NEW_DEAL_SUCCESS:
            return {
                ...state,
                createNewDealLoading: false,
                createNewDealSuccess: true,
                createNewDealError: false
            };
        case dealsActionsConstants.CREATE_NEW_DEAL_ERROR:
            return {
                ...state,
                createNewDealLoading: false,
                createNewDealSuccess: false,
                createNewDealError: true
            };
        case dealsActionsConstants.GET_DEALS_SUMMARY:
            return {
                ...state,
                dealsSummaryLoading: true,
                dealsSummaryLoadingSuccess: false,
                dealsSummaryError: null
            };
        case dealsActionsConstants.GET_DEALS_SUMMARY_SUCCESS:
            return {
                ...state,
                dealsSummaryLoading: false,
                dealsSummaryLoadingSuccess: true,
                dealsSummary: action.payload
            };
        case dealsActionsConstants.GET_DEALS_SUMMARY_ERROR:
            return {
                ...state,
                dealsSummaryLoading: false,
                dealsSummaryLoadingSuccess: false,
                dealsSummaryError: action.payload
            };
        case dealsActionsConstants.UPDATE_DEAL:
            return {
                ...state,
                updateDealLoading: true,
                updateDealSuccess: false,
                updateDealError: null
            };
        case dealsActionsConstants.UPDATE_DEAL_SUCCESS:
            return {
                ...state,
                updateDealLoading: false,
                updateDealSuccess: true
            };
        case dealsActionsConstants.UPDATE_DEAL_ERROR:
            return {
                ...state,
                updateDealLoading: false,
                updateDealSuccess: false,
                updateDealError: action.payload
            };
        default:
            return state;
    }
};

export default dealsReducer;
