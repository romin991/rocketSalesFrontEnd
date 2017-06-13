import * as modalsActionsConstants from '../actions/modalsActionsConstants';

export function showCreateMeetingModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_MEETING_MODAL});
    };
}

export function hideCreateMeetingModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_MEETING_MODAL});
    };
}

export function showCreateTaskModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_TASK_MODAL});
    };
}

export function hideCreateTaskModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_TASK_MODAL});
    };
}

export function showCreateAccountModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_ACCOUNT_MODAL});
    };
}

export function hideCreateAccountModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_ACCOUNT_MODAL});
    };
}

export function showCreateContactModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_CONTACT_MODAL});
    };
}

export function hideCreateContactModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_CONTACT_MODAL});
    };
}

export function showCreateLeadModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_LEAD_MODAL});
    };
}

export function hideCreateLeadModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_LEAD_MODAL});
    };
}

export function showCreateUserModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_USER_MODAL});
    };
}

export function hideCreateUserModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_USER_MODAL});
    };
}

export function showCreateDealModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CREATE_DEAL_MODAL});
    };
}

export function hideCreateDealModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CREATE_DEAL_MODAL});
    };
}

export function showUpdateLeadModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_UPDATE_LEAD_MODAL});
    };
}

export function hideUpdateLeadModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_UPDATE_LEAD_MODAL});
    };
}

export function showUpdateAccountModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_UPDATE_ACCOUNT_MODAL});
    };
}

export function hideUpdateAccountModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_UPDATE_ACCOUNT_MODAL});
    };
}

export function showUpdateContactModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_UPDATE_CONTACT_MODAL});
    };
}

export function hideUpdateContactModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_UPDATE_CONTACT_MODAL});
    };
}

export function showUpdateTaskModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_UPDATE_TASK_MODAL});
    };
}

export function hideUpdateTaskModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_UPDATE_TASK_MODAL});
    };
}

export function showUpdateMeetingModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_UPDATE_MEETING_MODAL});
    };
}

export function hideUpdateMeetingModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_UPDATE_MEETING_MODAL});
    };
}

export function showUpdateDealModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_UPDATE_DEAL_MODAL});
    };
}

export function hideUpdateDealModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_UPDATE_DEAL_MODAL});
    };
}

export function initInitialModalData(data) {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.INIT_INITIAL_MODAL_DATA, data: data});
    };
}

export function delInitialModalData() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.DEL_INITIAL_MODAL_DATA});
    };
}

export function showSubscriptionCheckoutModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_SUBSCRIPTION_CHECKOUT_MODAL});
    };
}

export function hideSubscriptionCheckoutModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_SUBSCRIPTION_CHECKOUT_MODAL});
    };
}

export function showCloseDealModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.SHOW_CLOSE_DEAL_MODAL});
    };
}

export function hideCloseDealModal() {
    return (dispatch) => {
        dispatch({type: modalsActionsConstants.HIDE_CLOSE_DEAL_MODAL});
    };
}
