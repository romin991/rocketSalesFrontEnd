import * as meetingsActionsConstants from './meetingsActionsConstants';
import * as employeesActionsConstants from './employeesActionsConstants';
import * as modalsActionsConstants from './modalsActionsConstants';
import * as leadContactActionsConstants from './leadContactActionsConstants';
import * as meetingsResource from '../resources/meetingsResource';
import * as dealFieldActionsConstants from './dealFieldActionsConstants';
import { refreshTimeline } from './timeLineActions';
import { refreshDetailMeetingList } from './customerDetailActions';
import {reset} from 'redux-form';

export function getMeetingsList(listType, userId, page) {
    return (dispatch) => {
        dispatch({type: meetingsActionsConstants.GET_MEETINGS_LIST});
        dispatch({type: meetingsActionsConstants.SET_CURRENT_MEETINGS_LIST_TYPE, payload: listType});
        dispatch({type: meetingsActionsConstants.SET_CURRENT_MEETINGS_PAGE, payload: page});
        meetingsResource.getMeetingsList(listType, userId, page)
            .then((response) => {
                dispatch({type: meetingsActionsConstants.GET_MEETINGS_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: meetingsActionsConstants.GET_MEETINGS_LIST_ERROR, payload: response});
            });
    };
}

export function refreshMeetingList(listType, page) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'list-meetings':
                dispatch(getMeetingsList(listType, id, page));
                break;
            default:
                break;
        }
    };
}

export function createNewMeeting(data, listType, listListType, listListPage, close) {
    return (dispatch) => {
        dispatch({type: meetingsActionsConstants.CREATE_NEW_MEETING});
        meetingsResource.createNewMeeting(data)
            .then((response) => {
                dispatch({type: meetingsActionsConstants.CREATE_NEW_MEETING_SUCCESS, payload: response.data});
                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_MEETING_MODAL});
                    dispatch(refreshDetailMeetingList(listType));
                    dispatch(refreshTimeline());
                    dispatch(refreshMeetingList(listListType, listListPage));
                } else {
                    dispatch(reset('meetingModalForm'));
                    dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
                    dispatch({type: leadContactActionsConstants.CLEAR_LEAD_CONTACT_SUGGESTION});
                    dispatch({type: dealFieldActionsConstants.CLEAR_DEAL_SUGGESTION});
                }
            })
            .catch((response) => {
                dispatch({type: meetingsActionsConstants.CREATE_NEW_MEETING_ERROR, payload: response});
            });
    };
}

export function clearForm() {
    return (dispatch) => {
        dispatch({type: meetingsActionsConstants.CLEAR_FORM});
    };
}

export function getMeetingContacts(meetingId) {
    return (dispatch) => {
        dispatch({type: meetingsActionsConstants.GET_MEETING_CONTACTS});
        meetingsResource.getMeetingContacts(meetingId)
            .then((response) => {
                dispatch({type: meetingsActionsConstants.GET_MEETING_CONTACTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: meetingsActionsConstants.GET_MEETING_CONTACTS_ERROR, payload: response});
            });
    };
}

export function getMeetingAccounts(meetingId) {
    return (dispatch) => {
        dispatch({type: meetingsActionsConstants.GET_MEETING_ACCOUNTS});
        meetingsResource.getMeetingAccounts(meetingId)
            .then((response) => {
                dispatch({type: meetingsActionsConstants.GET_MEETING_ACCOUNTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: meetingsActionsConstants.GET_MEETING_ACCOUNTS_ERROR, payload: response});
            });
    };
}
