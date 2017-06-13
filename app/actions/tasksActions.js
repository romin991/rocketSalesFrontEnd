import * as tasksActionsConstants from './tasksActionsConstants';
import * as leadContactActionsConstants from './leadContactActionsConstants';
import * as modalsActionsConstants from './modalsActionsConstants';
import * as employeesActionsConstants from './employeesActionsConstants';
import * as tasksResource from '../resources/tasksResource';
import * as dealFieldActionsConstants from './dealFieldActionsConstants';
import { refreshTimeline } from './timeLineActions';
import { refreshDetailTaskList } from './customerDetailActions';
import {reset} from 'redux-form';

export function getTasksList(listType, userId, page) {
    return (dispatch) => {
        dispatch({type: tasksActionsConstants.GET_TASKS_LIST});
        dispatch({type: tasksActionsConstants.SET_CURRENT_TASKS_LIST_TYPE, payload: listType});
        dispatch({type: tasksActionsConstants.SET_CURRENT_TASKS_PAGE, payload: page});
        tasksResource.getTasksList(listType, userId, page)
            .then((response) => {
                dispatch({type: tasksActionsConstants.GET_TASKS_LIST_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: tasksActionsConstants.GET_TASKS_LIST_ERROR, payload: response});
            });
    };
}

export function refreshTaskList(listType, page) {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        switch(path) {
            case 'list-tasks':
                dispatch(getTasksList(listType, id, page));
                break;
            default:
                break;
        }
    };
}

export function createNewTask(data, listType, listListType, listListPage, close) {
    return (dispatch) => {
        dispatch({type: tasksActionsConstants.CREATE_NEW_TASK});
        tasksResource.createNewTask(data)
            .then((response) => {
                dispatch({type: tasksActionsConstants.CREATE_NEW_TASK_SUCCESS, payload: response.data});
                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_TASK_MODAL});
                    dispatch(refreshDetailTaskList(listType));
                    dispatch(refreshTimeline());
                    dispatch(refreshTaskList(listListType, listListPage));
                } else {
                    dispatch(reset('taskModalForm'));
                    dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
                    dispatch({type: leadContactActionsConstants.CLEAR_LEAD_CONTACT_SUGGESTION});
                    dispatch({type: dealFieldActionsConstants.CLEAR_DEAL_SUGGESTION});
                }
            })
            .catch((response) => {
                dispatch({type: tasksActionsConstants.CREATE_NEW_TASK_ERROR, payload: response});
            });
    };
}

export function getTaskContacts(taskId) {
    return (dispatch) => {
        dispatch({type: tasksActionsConstants.GET_TASK_CONTACTS});
        tasksResource.getTaskContacts(taskId)
            .then((response) => {
                dispatch({type: tasksActionsConstants.GET_TASK_CONTACTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: tasksActionsConstants.GET_TASK_CONTACTS_ERROR, payload: response});
            });
    };
}

export function getTaskAccounts(taskId) {
    return (dispatch) => {
        dispatch({type: tasksActionsConstants.GET_TASK_ACCOUNTS});
        tasksResource.getTaskAccounts(taskId)
            .then((response) => {
                dispatch({type: tasksActionsConstants.GET_TASK_ACCOUNTS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: tasksActionsConstants.GET_TASK_ACCOUNTS_ERROR, payload: response});
            });
    };
}
