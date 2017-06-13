import * as leadsActionsConstants from './leadsActionsConstants';
import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as modalsActionsConstants from './modalsActionsConstants';
import * as employeesActionsConstants from './employeesActionsConstants';
import * as leadsResource from '../resources/leadsResource';
import {reset} from 'redux-form';

export function getLeadsList(data, page) {
    return (dispatch) => {
        dispatch({type: leadsActionsConstants.GET_LEADS_LIST});
        dispatch({type: leadsActionsConstants.SET_CURRENT_LEADS_PAGE, payload: page});
        leadsResource.getLeadsList(data, page)
            .then((response) => {
                dispatch({type: leadsActionsConstants.GET_LEADS_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: leadsActionsConstants.GET_LEADS_LIST_ERROR, payload: response});
            });
    };
}

export function refreshLeadList(listType, page) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'list-leads':
                dispatch(getLeadsList(listType, id, page));
                break;
            default:
                break;
        }
    };
}

export function createNewLead(data, listListType, listListPage, close) {
    return (dispatch) => {
        dispatch({type: leadsActionsConstants.CREATE_NEW_LEAD});
        leadsResource.createNewLead(data)
            .then((response) => {
                dispatch({type: leadsActionsConstants.CREATE_NEW_LEAD_SUCCESS, payload: response.data});

                dispatch({type: cloudinaryActionsConstants.LEAD_IMAGE_CLEAR});

                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_LEAD_MODAL});
                    dispatch(refreshLeadList(listListType, listListPage));
                } else {
                    dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
                    dispatch(reset('leadModalForm'));
                }
            })
            .catch((response) => {
                dispatch({type: leadsActionsConstants.CREATE_NEW_LEAD_ERROR, payload: response});
            });
    };
}

export function getLeadsSummary() {
    return (dispatch) => {
        dispatch({type: leadsActionsConstants.GET_LEADS_SUMMARY});
        leadsResource.getLeadsSummary()
            .then((response) => {
                dispatch({type: leadsActionsConstants.GET_LEADS_SUMMARY_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: leadsActionsConstants.GET_LEADS_SUMMARY_ERROR, payload: response});
            });
    };
}
