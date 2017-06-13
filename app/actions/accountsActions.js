import * as accountsActionsConstants from './accountsActionsConstants';
import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as modalsActionsConstants from './modalsActionsConstants';
import * as employeesActionsConstants from './employeesActionsConstants';
import * as accountsResource from '../resources/accountsResource';
import {reset} from 'redux-form';

export function getAccountsList(listType, userId, page) {
    return (dispatch) => {
        dispatch({type: accountsActionsConstants.GET_ACCOUNTS_LIST});
        dispatch({type: accountsActionsConstants.SET_CURRENT_ACCOUNTS_LIST_TYPE, payload: listType});
        dispatch({type: accountsActionsConstants.SET_CURRENT_ACCOUNTS_PAGE, payload: page});
        accountsResource.getAccountsList(listType, userId, page)
            .then((response) => {
                dispatch({type: accountsActionsConstants.GET_ACCOUNTS_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: accountsActionsConstants.GET_ACCOUNTS_LIST_ERROR, payload: response});
            });
    };
}

export function refreshAccountList(listType, page) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'list-accounts':
                dispatch(getAccountsList(listType, id, page));
                break;
            default:
                break;
        }
    };
}

export function createNewAccount(data, listListType, listListPage, close) {
    return (dispatch) => {
        dispatch({type: accountsActionsConstants.CREATE_NEW_ACCOUNT});
        accountsResource.createNewAccount(data)
            .then((response) => {
                dispatch({type: accountsActionsConstants.CREATE_NEW_ACCOUNT_SUCCESS, payload: response.data});
                dispatch({type: cloudinaryActionsConstants.ACCOUNT_IMAGE_CLEAR});

                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_ACCOUNT_MODAL});
                    dispatch(refreshAccountList(listListType, listListPage));
                } else {
                    dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
                    dispatch(reset('accountModalForm'));
                }
            })
            .catch((response) => {
                dispatch({type: accountsActionsConstants.CREATE_NEW_ACCOUNT_ERROR, payload: response});
            });
    };
}

export function accountSuggestSelected(data) {
    return (dispatch) => {
        dispatch({type: accountsActionsConstants.ACCOUNT_SUGGESTION_SELECTED, payload: data});
    };
}

export function clearAccountSuggestion() {
    return (dispatch) => {
        dispatch({type: accountsActionsConstants.CLEAR_ACCOUNT_SUGGESTION});
    };
}
