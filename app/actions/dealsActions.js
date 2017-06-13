import * as dealsActionsConstants from './dealsActionsConstants';
import * as dealsResource from '../resources/dealsResource';
import * as modalsActionsConstants from './modalsActionsConstants';
import * as employeesActionsConstants from './employeesActionsConstants';
import * as contactFieldActionsConstants from './contactFieldActionsConstants';
import * as customerDetailActionsConstants from './customerDetailActionsConstants';
import { reset } from 'redux-form';
import { hideCloseDealModal } from './modalsActions';
import { refreshTimeline } from './timeLineActions';
import { refreshDetailDealList } from './customerDetailActions';

export function getDealsList(listType, userId, page) {
    return (dispatch) => {
        dispatch({type: dealsActionsConstants.GET_DEALS_LIST});
        dispatch({type: dealsActionsConstants.SET_CURRENT_DEALS_LIST_TYPE, payload: listType});
        dispatch({type: dealsActionsConstants.SET_CURRENT_DEALS_PAGE, payload: page});
        dealsResource.getDealsList(listType, userId, page)
            .then((response) => {
                dispatch({type: dealsActionsConstants.GET_DEALS_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: dealsActionsConstants.GET_DEALS_LIST_ERROR, payload: response});
            });
    };
}

export function refreshDealList(listType, page) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'list-deals':
                dispatch(getDealsList(listType, id, page));
                break;
            default:
                break;
        }
    };
}

export function createNewDeal(data, listType, listListType, listListPage, close) {
    return (dispatch) => {
        dispatch({type: dealsActionsConstants.CREATE_NEW_DEAL});
        dealsResource.createNewDeal(data)
            .then((response) => {
                dispatch({type: dealsActionsConstants.CREATE_NEW_DEAL_SUCCESS, payload: response.data});
                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_DEAL_MODAL});
                    dispatch(refreshDetailDealList(listType));
                    dispatch(refreshTimeline());
                    dispatch(refreshDealList(listListType, listListPage));
                } else {
                    dispatch(reset('createDealModalForm'));
                    dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
                    dispatch({type: contactFieldActionsConstants.CLEAR_CONTACT_SUGGESTION});
                }
            })
            .catch((response) => {
                dispatch({type: dealsActionsConstants.CREATE_NEW_DEAL_ERROR, payload: response});
            });
    };
}

export function getDealsSummary() {
    return (dispatch) => {
        dispatch({type: dealsActionsConstants.GET_DEALS_SUMMARY});
        dealsResource.getDealsSummary()
            .then((response) => {
                dispatch({type: dealsActionsConstants.GET_DEALS_SUMMARY_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: dealsActionsConstants.GET_DEALS_SUMMARY_ERROR, payload: response});
            });
    };
}

export function updateDeal(id, data) {
    return (dispatch) => {
        dispatch({type: dealsActionsConstants.UPDATE_DEAL});
        dealsResource.updateDeal(id, data)
            .then((response) => {
                dispatch({type: dealsActionsConstants.UPDATE_DEAL_SUCCESS, payload: response.data});
                dispatch({type: customerDetailActionsConstants.GET_CUSTOMER_DETAIL_SUCCESS, payload: response.data});
                dispatch(hideCloseDealModal());
            })
            .catch((response) => {
                dispatch({type: dealsActionsConstants.UPDATE_DEAL_ERROR, payload: response});
            });
    };
}
