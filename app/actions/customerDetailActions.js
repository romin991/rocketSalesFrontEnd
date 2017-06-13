import * as customerDetailActionsConstants from './customerDetailActionsConstants';
import * as customerDetailResource from '../resources/customerDetailResource';
import * as modalsActionsConstants from './modalsActionsConstants';

export function getLeadDetail(id) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL});
        customerDetailResource.getLeadDetail(id)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function updateLead(id, data) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL});
        customerDetailResource.updateLead(id, data)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
                dispatch({type: modalsActionsConstants.HIDE_UPDATE_LEAD_MODAL});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function convertLead(id) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.CONVERT_LEAD_DETAIL});
        customerDetailResource.convertLead(id)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.CONVERT_LEAD_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.CONVERT_LEAD_DETAIL_ERROR, payload: response});
            });
    };
}

export function getLeadDetailTasks(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_TASKS_TYPE, payload: listType});
        customerDetailResource.getLeadDetailTasks(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_ERROR, payload: response});
            });
    };
}

export function getLeadDetailMeetings(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_MEETINGS_TYPE, payload: listType});
        customerDetailResource.getLeadDetailMeetings(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_ERROR, payload: response});
            });
    };
}

export function getContactDetail(id) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL});
        customerDetailResource.getContactDetail(id)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function updateContact(id, data) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL});
        customerDetailResource.updateContact(id, data)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
                dispatch({type: modalsActionsConstants.HIDE_UPDATE_CONTACT_MODAL});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function getContactDetailTasks(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_TASKS_TYPE, payload: listType});
        customerDetailResource.getContactDetailTasks(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_ERROR, payload: response});
            });
    };
}

export function getContactDetailMeetings(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_MEETINGS_TYPE, payload: listType});
        customerDetailResource.getContactDetailMeetings(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_ERROR, payload: response});
            });
    };
}

export function getContactDetailDeals(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_DEALS_TYPE, payload: listType});
        customerDetailResource.getContactDetailDeals(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS_ERROR, payload: response});
            });
    };
}

export function refreshAccountDetail() {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'detail-account':
                dispatch(getAccountDetail(id));
                break;
            default:
                break;
        }
    };
}

export function getAccountDetail(id) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL});
        customerDetailResource.getAccountDetail(id)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function updateAccount(id, data) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL});
        customerDetailResource.updateAccount(id, data)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
                dispatch({type: modalsActionsConstants.HIDE_UPDATE_ACCOUNT_MODAL});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function getAccountDetailTasks(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_TASKS_TYPE, payload: listType});
        customerDetailResource.getAccountDetailTasks(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_ERROR, payload: response});
            });
    };
}

export function getAccountDetailMeetings(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_MEETINGS_TYPE, payload: listType});
        customerDetailResource.getAccountDetailMeetings(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_ERROR, payload: response});
            });
    };
}
export function getAccountDetailDeals(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_DEALS_TYPE, payload: listType});
        customerDetailResource.getAccountDetailDeals(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_DEALS_ERROR, payload: response});
            });
    };
}

export function getDealDetail(id) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL});
        customerDetailResource.getDealDetail(id)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function updateDeal(id, data) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL});
        customerDetailResource.updateDeal(id, data)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
                dispatch({type: modalsActionsConstants.HIDE_UPDATE_DEAL_MODAL});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.UPDATE_CUSTOMER_DETAIL_ERROR, payload: response});
            });
    };
}

export function getDealDetailTasks(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_TASKS_TYPE, payload: listType});
        customerDetailResource.getDealDetailTasks(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_TASKS_ERROR, payload: response});
            });
    };
}

export function getDealDetailMeetings(id, listType) {
    return (dispatch) => {
        dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS});
        dispatch({type: customerDetailActionsConstants.SET_CUSTOMER_DETAIL_MEETINGS_TYPE, payload: listType});
        customerDetailResource.getDealDetailMeetings(id, listType)
            .then((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_MEETINGS_ERROR, payload: response});
            });
    };
}

export function refreshDetailTaskList(listType) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'detail-lead':
                dispatch(getLeadDetailTasks(id, listType));
                break;
            case 'detail-account':
                dispatch(getAccountDetailTasks(id, listType));
                break;
            case 'detail-contact':
                dispatch(getContactDetailTasks(id, listType));
                break;
            case 'detail-deal':
                dispatch(getDealDetailTasks(id, listType));
                break;
            default:
                break;
        }
    };
}

export function refreshDetailMeetingList(listType) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'detail-lead':
                dispatch(getLeadDetailMeetings(id, listType));
                break;
            case 'detail-account':
                dispatch(getAccountDetailMeetings(id, listType));
                break;
            case 'detail-contact':
                dispatch(getContactDetailMeetings(id, listType));
                break;
            case 'detail-deal':
                dispatch(getDealDetailMeetings(id, listType));
                break;
            default:
                break;
        }
    };
}

export function refreshDetailDealList(listType) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'detail-account':
                dispatch(getAccountDetailDeals(id, listType));
                break;
            case 'detail-contact':
                dispatch(getContactDetailDeals(id, listType));
                break;
            default:
                break;
        }
    };
}
