import * as contactsActionsConstants from './contactsActionsConstants';
import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as employeesActionsConstants from './employeesActionsConstants';
import * as accountsActionsConstants from './accountsActionsConstants';
import * as modalsActionsConstants from './modalsActionsConstants';
import * as contactsResource from '../resources/contactsResource';
import {refreshAccountDetail} from './customerDetailActions';
import {reset} from 'redux-form';

export function getContactsList(listType, userId, page) {
    return (dispatch) => {
        dispatch({type: contactsActionsConstants.GET_CONTACTS_LIST});
        dispatch({type: contactsActionsConstants.SET_CURRENT_CONTACTS_LIST_TYPE, payload: listType});
        dispatch({type: contactsActionsConstants.SET_CURRENT_CONTACTS_PAGE, payload: page});
        contactsResource.getContactsList(listType, userId, page)
            .then((response) => {
                dispatch({type: contactsActionsConstants.GET_CONTACTS_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: contactsActionsConstants.GET_CONTACTS_LIST_ERROR, payload: response});
            });
    };
}

export function refreshContactList(listType, page) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'list-contacts':
                dispatch(getContactsList(listType, id, page));
                break;
            default:
                break;
        }
    };
}

export function createNewContact(data, listListType, listListPage, close) {
    return (dispatch) => {
        dispatch({type: contactsActionsConstants.CREATE_NEW_CONTACT});
        contactsResource.createNewContact(data)
            .then((response) => {
                dispatch({type: contactsActionsConstants.CREATE_NEW_CONTACT_SUCCESS, payload: response.data});
                dispatch({type: cloudinaryActionsConstants.CONTACT_IMAGE_CLEAR});
                dispatch({type: accountsActionsConstants.CLEAR_ACCOUNT_SUGGESTION});

                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_CONTACT_MODAL});
                    dispatch(refreshContactList(listListType, listListPage));
                    dispatch(refreshAccountDetail());
                } else {
                    dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
                    dispatch(reset('contactModalForm'));
                }
            })
            .catch((response) => {
                dispatch({type: contactsActionsConstants.CREATE_NEW_CONTACT_ERROR, payload: response});
            });
    };
}
