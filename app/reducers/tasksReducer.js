import * as tasksActionsConstants from '../actions/tasksActionsConstants';

const initialState = {
    tasksList: [],
    taskContacts: {},
    taskAccounts: {},

    tasksListPage: 1,

    tasksListLoading: false,
    tasksListLoadingSuccess: false,
    tasksListError: null,
    createNewTaskLoading: false,
    createNewTaskSuccess: false,
    createNewTaskError: null,
    currentTasksListType: 'open',
    taskContactsLoading: false,
    taskContactsLoadingSuccess: false,
    taskContactsError: null,
    taskAccountsLoading: false,
    taskAccountsLoadingSuccess: false,
    taskAccountsError: null,
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case tasksActionsConstants.GET_TASKS_LIST:
            return {
                ...state,
                tasksListLoading: true,
                tasksListLoadingSuccess: false,
                tasksListError: null
            };
        case tasksActionsConstants.SET_CURRENT_TASKS_LIST_TYPE:
            return {
                ...state,
                currentTasksListType: action.payload
            };
        case tasksActionsConstants.SET_CURRENT_TASKS_PAGE:
            return {
                ...state,
                tasksListPage: action.payload
            };
        case tasksActionsConstants.GET_TASKS_LIST_SUCCESS:
            return {
                ...state,
                tasksListLoading: false,
                tasksListLoadingSuccess: true,
                tasksList: action.payload
            };
        case tasksActionsConstants.GET_TASKS_LIST_ERROR:
            return {
                ...state,
                tasksListLoading: false,
                tasksListLoadingSuccess: false,
                tasksListError: action.payload
            };
        case tasksActionsConstants.CREATE_NEW_TASK:
            return {
                ...state,
                createNewTaskLoading: true,
                createNewTaskSuccess: false,
                createNewTaskError: null
            };
        case tasksActionsConstants.CREATE_NEW_TASK_SUCCESS:
            return {
                ...state,
                createNewTaskLoading: false,
                createNewTaskSuccess: true
            };
        case tasksActionsConstants.CREATE_NEW_TASK_ERROR:
            return {
                ...state,
                createNewTaskLoading: false,
                createNewTaskSuccess: false,
                createNewTaskError: action.payload
            };
        case tasksActionsConstants.GET_TASK_CONTACTS:
            return {
                ...state,
                taskContactsLoading: true,
                taskContactsLoadingSuccess: false,
                taskContactsError: null
            };
        case tasksActionsConstants.GET_TASK_CONTACTS_SUCCESS:
            return {
                ...state,
                taskContactsLoading: false,
                taskContactsLoadingSuccess: true,
                taskContacts: action.payload
            };
        case tasksActionsConstants.GET_TASK_CONTACTS_ERROR:
            return {
                ...state,
                taskContactsLoading: false,
                taskContactsLoadingSuccess: false,
                taskContactsError: action.payload
            };
        case tasksActionsConstants.GET_TASK_ACCOUNTS:
            return {
                ...state,
                taskAccountsLoading: true,
                taskAccountsLoadingSuccess: false,
                taskAccountsError: null
            };
        case tasksActionsConstants.GET_TASK_ACCOUNTS_SUCCESS:
            return {
                ...state,
                taskAccountsLoading: false,
                taskAccountsLoadingSuccess: true,
                taskAccounts: action.payload
            };
        case tasksActionsConstants.GET_TASK_ACCOUNTS_ERROR:
            return {
                ...state,
                taskAccountsLoading: false,
                taskAccountsLoadingSuccess: false,
                taskAccountsError: action.payload
            };
        default:
            return state;
    }
};

export default tasksReducer;
