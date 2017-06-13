import * as modalActionsConstants from '../actions/modalsActionsConstants';

const initialState = {
    initialModalData: {
        initialModalData: {},

        showCreateMeetingModal: false,
        showCreateTaskModal: false,
        showCreateAccountModal: false,
        showCreateContactModal: false,
        showCreateLeadModal: false,
        showCreateUserModal: false,
        showCreateDealModal: false,
        showUpdateLeadModal: false,
        showUpdateAccountModal: false,
        showUpdateContactModal: false,
        showUpdateTaskModal: false,
        showUpdateMeetingModal: false,
        showSubscriptionCheckoutModal: false,
        showCloseDealModal: false
    }
};

const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalActionsConstants.SHOW_CREATE_MEETING_MODAL:
            return {
                ...state,
                showCreateMeetingModal: true
            };
        case modalActionsConstants.HIDE_CREATE_MEETING_MODAL:
            return {
                ...state,
                showCreateMeetingModal: false
            };
        case modalActionsConstants.SHOW_CREATE_TASK_MODAL:
            return {
                ...state,
                showCreateTaskModal: true
            };
        case modalActionsConstants.HIDE_CREATE_TASK_MODAL:
            return {
                ...state,
                showCreateTaskModal: false
            };
        case modalActionsConstants.SHOW_CREATE_ACCOUNT_MODAL:
            return {
                ...state,
                showCreateAccountModal: true
            };
        case modalActionsConstants.HIDE_CREATE_ACCOUNT_MODAL:
            return {
                ...state,
                showCreateAccountModal: false
            };
        case modalActionsConstants.SHOW_CREATE_CONTACT_MODAL:
            return {
                ...state,
                showCreateContactModal: true
            };
        case modalActionsConstants.HIDE_CREATE_CONTACT_MODAL:
            return {
                ...state,
                showCreateContactModal: false
            };
        case modalActionsConstants.SHOW_CREATE_LEAD_MODAL:
            return {
                ...state,
                showCreateLeadModal: true
            };
        case modalActionsConstants.HIDE_CREATE_LEAD_MODAL:
            return {
                ...state,
                showCreateLeadModal: false
            };
        case modalActionsConstants.SHOW_CREATE_USER_MODAL:
            return {
                ...state,
                showCreateUserModal: true
            };
        case modalActionsConstants.HIDE_CREATE_USER_MODAL:
            return {
                ...state,
                showCreateUserModal: false
            };
        case modalActionsConstants.SHOW_CREATE_DEAL_MODAL:
            return {
                ...state,
                showCreateDealModal: true
            };
        case modalActionsConstants.HIDE_CREATE_DEAL_MODAL:
            return {
                ...state,
                showCreateDealModal: false
            };
        case modalActionsConstants.SHOW_UPDATE_LEAD_MODAL:
            return {
                ...state,
                showUpdateLeadModal: true
            };
        case modalActionsConstants.HIDE_UPDATE_LEAD_MODAL:
            return {
                ...state,
                showUpdateLeadModal: false
            };
        case modalActionsConstants.SHOW_UPDATE_ACCOUNT_MODAL:
            return {
                ...state,
                showUpdateAccountModal: true
            };
        case modalActionsConstants.HIDE_UPDATE_ACCOUNT_MODAL:
            return {
                ...state,
                showUpdateAccountModal: false
            };
        case modalActionsConstants.SHOW_UPDATE_CONTACT_MODAL:
            return {
                ...state,
                showUpdateContactModal: true
            };
        case modalActionsConstants.HIDE_UPDATE_CONTACT_MODAL:
            return {
                ...state,
                showUpdateContactModal: false
            };
        case modalActionsConstants.SHOW_UPDATE_TASK_MODAL:
            return {
                ...state,
                showUpdateTaskModal: true
            };
        case modalActionsConstants.HIDE_UPDATE_TASK_MODAL:
            return {
                ...state,
                showUpdateTaskModal: false
            };
        case modalActionsConstants.SHOW_UPDATE_MEETING_MODAL:
            return {
                ...state,
                showUpdateMeetingModal: true
            };
        case modalActionsConstants.HIDE_UPDATE_MEETING_MODAL:
            return {
                ...state,
                showUpdateMeetingModal: false
            };
        case modalActionsConstants.SHOW_UPDATE_DEAL_MODAL:
            return {
                ...state,
                showUpdateDealModal: true
            };
        case modalActionsConstants.HIDE_UPDATE_DEAL_MODAL:
            return {
                ...state,
                showUpdateDealModal: false
            };
        case modalActionsConstants.INIT_INITIAL_MODAL_DATA:
            return {
                ...state,
                initialModalData: action.data
            };
        case modalActionsConstants.DEL_INITIAL_MODAL_DATA:
            return {
                ...state,
                initialModalData: {}
            };
        case modalActionsConstants.SHOW_SUBSCRIPTION_CHECKOUT_MODAL:
            return {
                ...state,
                showSubscriptionCheckoutModal: true
            };
        case modalActionsConstants.HIDE_SUBSCRIPTION_CHECKOUT_MODAL:
            return {
                ...state,
                showSubscriptionCheckoutModal: false
            };
        case modalActionsConstants.SHOW_CLOSE_DEAL_MODAL:
            return {
                ...state,
                showCloseDealModal: true
            };
        case modalActionsConstants.HIDE_CLOSE_DEAL_MODAL:
            return {
                ...state,
                showCloseDealModal: false
            };
        default:
            return state;
    }
};

export default modalsReducer;
