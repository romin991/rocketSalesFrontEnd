import * as employeesActionsConstants from '../actions/employeesActionsConstants';
import * as meetingsActionsConstants from '../actions/meetingsActionsConstants';

const initialState = {
    employeesList: [],
    employeesSuggestionsList: [],
    selectedEmployee: {},
    employeesListLoading: false,
    employeesListLoadingSuccess: false,
    employeesListError: null,
    employeesInputValue: '',
    employeeSuggestion: '',
    employeeId: '',
    employeeSaveLoading: false,
    employeeSaveSuccess: false,
    employeeSaveError: null
};

const getSuggestions = (value, employeesList) => {
    let suggestions = [];
    if (value === '') {
        suggestions = employeesList;
    } else {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        suggestions = inputLength === 0 ? [] : employeesList.filter(employee => {
            employee.full_name = employee.first_name + ' ' + employee.last_name;
            return Boolean(employee.full_name.toLowerCase().match(inputValue));
        });
    }

    return suggestions;
};

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case employeesActionsConstants.GET_EMPLOYEES_LIST:
            return {
                ...state,
                employeesListLoading: true,
                employeesListLoadingSuccess: false,
                employeesListError: null
            };
        case employeesActionsConstants.GET_EMPLOYEES_LIST_SUCCESS:
            return {
                ...state,
                employeesListLoading: false,
                employeesListLoadingSuccess: true,
                employeesList: action.payload,
                employeesSuggestionsList: action.payload
            };
        case employeesActionsConstants.GET_EMPLOYEES_LIST_ERROR:
            return {
                ...state,
                employeesListLoading: false,
                employeesListLoadingSuccess: false,
                employeesListError: action.payload
            };
        case employeesActionsConstants.EMPLOYEES_INPUT_VALUE_CHANGED:
            return {
                ...state,
                employeesSuggestionsList: getSuggestions(action.payload, state.employeesList),
                employeesInputValue: action.payload
            };
        case employeesActionsConstants.EMPLOYEE_SUGGESTION_SELECTED:
            const suggestion = action.payload;
            return {
                ...state,
                employeeId: suggestion.user,
                employeeSuggestion: `${suggestion.first_name}${(suggestion.first_name && suggestion.last_name) && ' '}${suggestion.last_name}`
            };
        case employeesActionsConstants.EMPLOYEE_FIELD_CLEAR:
            return {
                ...state,
                employeesInputValue: '',
                employeeSuggestion: '',
                employeeId: ''
            };
        case meetingsActionsConstants.CLEAR_FORM:
            return {
                ...state,
                employeesInputValue: '',
                employeeSuggestion: ''
            };
        case employeesActionsConstants.EMPLOYEE_SELECTED:
            return {
                ...state,
                selectedEmployee: action.payload
            };
        case employeesActionsConstants.CLEAR_SELECTED_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: {}
            };
        case employeesActionsConstants.SAVE_EMPLOYEE_CHANGES:
            return {
                ...state,
                employeeSaveLoading: true,
                employeeSaveSuccess: false,
                employeeSaveError: null
            };
        case employeesActionsConstants.SAVE_EMPLOYEE_CHANGES_SUCCESS:
            return {
                ...state,
                employeeSaveLoading: false,
                employeeSaveSuccess: true,
                employeeSaveError: null
            };
        case employeesActionsConstants.SAVE_EMPLOYEE_CHANGES_ERROR:
            return {
                ...state,
                employeeSaveLoading: false,
                employeeSaveSuccess: false,
                employeeSaveError: action.payload
            };
        default:
            return state;
    }
};

export default employeesReducer;
