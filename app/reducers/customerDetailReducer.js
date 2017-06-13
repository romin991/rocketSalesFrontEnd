import * as customerDetailActionsConstants from '../actions/customerDetailActionsConstants';

const initialState = {
    customerDetail: {},
    customerDetailTasks: [],
    customerDetailMeetings: [],
    customerDetailDeals: [],

    customerDetailLoading: false,
    customerDetailSuccess: false,
    customerDetailError: false,

    updateCustomerLoading: false,
    updateCustomerSuccess: false,
    updateCustomerError: false,

    convertLeadLoading: false,
    convertLeadSuccess: false,
    convertLeadError: false,

    customerDetailTasksLoading: false,
    customerDetailTasksSuccess: false,
    customerDetailTasksError: false,
    currentCustomerDetailTasksType: 'open',

    customerDetailMeetingsLoading: false,
    customerDetailMeetingsSuccess: false,
    customerDetailMeetingsError: false,
    currentCustomerDetailMeetingsType: 'open',

    customerDetailDealsLoading: false,
    customerDetailDealsSuccess: false,
    customerDetailDealsError: false,
    currentCustomerDetailDealsType: 'open'
};

const customerDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL:
            return {
                ...state,
                customerDetailLoading: true,
                customerDetailSuccess: false,
                customerDetailError: false
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_SUCCESS:
            return {
                ...state,
                customerDetailLoading: false,
                customerDetailSuccess: true,
                customerDetailError: false,
                customerDetail: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_ERROR:
            return {
                ...state,
                customerDetailLoading: false,
                customerDetailSuccess: false,
                customerDetailError: true,
                customerDetail: action.payload
            };

        case customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL:
            return {
                ...state,
                updateCustomerLoading: true,
                updateCustomerSuccess: false,
                updateCustomerError: false,
            };
        case customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_SUCCESS:
            return {
                ...state,
                updateCustomerLoading: false,
                updateCustomerSuccess: true,
                updateCustomerError: false,
                customerDetail: action.payload
            };
        case customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_ERROR:
            return {
                ...state,
                updateCustomerLoading: false,
                updateCustomerSuccess: false,
                updateCustomerError: true,
                customerDetail: action.payload
            };

        case customerDetailActionsConstants.CONVERT_LEAD_DETAIL:
            return {
                ...state,
                convertLeadLoading: true,
                convertLeadSuccess: false,
                convertLeadError: false,
            };
        case customerDetailActionsConstants.CONVERT_LEAD_DETAIL_SUCCESS:
            return {
                ...state,
                convertLeadLoading: false,
                convertLeadSuccess: true,
                convertLeadError: false,
                customerDetail: action.payload
            };
        case customerDetailActionsConstants.CONVERT_LEAD_DETAIL_ERROR:
            return {
                ...state,
                convertLeadLoading: false,
                convertLeadSuccess: false,
                convertLeadError: true,
                customerDetail: action.payload
            };

        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS:
            return {
                ...state,
                customerDetailTasksLoading: true,
                customerDetailTasksSuccess: false,
                customerDetailTasksError: false
            };
        case customerDetailActionsConstants.SET_CUSTOMER_DETAIL_TASKS_TYPE:
            return {
                ...state,
                currentCustomerDetailTasksType: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_SUCCESS:
            return {
                ...state,
                customerDetailTasksLoading: false,
                customerDetailTasksSuccess: true,
                customerDetailTasksError: false,
                customerDetailTasks: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_ERROR:
            return {
                ...state,
                customerDetailTasksLoading: false,
                customerDetailTasksSuccess: false,
                customerDetailTasksError: true,
                customerDetailTasks: action.payload
            };

        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS:
            return {
                ...state,
                customerDetailMeetingsLoading: true,
                customerDetailMeetingsSuccess: false,
                customerDetailMeetingsError: false
            };
        case customerDetailActionsConstants.SET_CUSTOMER_DETAIL_MEETINGS_TYPE:
            return {
                ...state,
                currentCustomerDetailMeetingsType: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_SUCCESS:
            return {
                ...state,
                customerDetailMeetingsLoading: false,
                customerDetailMeetingsSuccess: true,
                customerDetailMeetingsError: false,
                customerDetailMeetings: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_ERROR:
            return {
                ...state,
                customerDetailMeetingsLoading: false,
                customerDetailMeetingsSuccess: false,
                customerDetailMeetingsError: true,
                customerDetailMeetings: action.payload
            };

        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS:
            return {
                ...state,
                customerDetailDealsLoading: true,
                customerDetailDealsSuccess: false,
                customerDetailDealsError: false
            };
        case customerDetailActionsConstants.SET_CUSTOMER_DETAIL_DEALS_TYPE:
            return {
                ...state,
                currentCustomerDetailDealsType: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS_SUCCESS:
            return {
                ...state,
                customerDetailDealsLoading: false,
                customerDetailDealsSuccess: true,
                customerDetailDealsError: false,
                customerDetailDeals: action.payload
            };
        case customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS_ERROR:
            return {
                ...state,
                customerDetailDealsLoading: false,
                customerDetailDealsSuccess: false,
                customerDetailDealsError: true,
                customerDetailDeals: action.payload
            };

        default:
            return state;
    }
};

export default customerDetailReducer;
