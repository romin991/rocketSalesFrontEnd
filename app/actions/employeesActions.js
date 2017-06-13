import * as employeesActionsConstants from './employeesActionsConstants';
import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as employeessResource from '../resources/employeesResource';
import { change } from 'redux-form';

export function getEmployeesList() {
    return (dispatch) => {
        dispatch({type: employeesActionsConstants.GET_EMPLOYEES_LIST});
        employeessResource.getEmployeesList()
            .then((response) => {
                dispatch({type: employeesActionsConstants.GET_EMPLOYEES_LIST_SUCCESS, payload: response.data});
                dispatch({type: employeesActionsConstants.EMPLOYEE_SELECTED, payload: response.data[0]});
            })
            .catch((response) => {
                dispatch({type: employeesActionsConstants.GET_EMPLOYEES_LIST_ERROR, payload: response});
            });
    };
}

export function employeesInputValueChanged(inputValue) {
    return (dispatch) => {
        dispatch({
            type: employeesActionsConstants.EMPLOYEES_INPUT_VALUE_CHANGED,
            payload: inputValue
        });
    };
}

export function employeeSuggestionSelected(data) {
    return (dispatch) => {
        dispatch({type: employeesActionsConstants.EMPLOYEE_SUGGESTION_SELECTED, payload: data});
    };
}

export function employeeFieldClear() {
    return (dispatch) => {
        dispatch({type: employeesActionsConstants.EMPLOYEE_FIELD_CLEAR});
    };
}

export function employeeSelected(employeeData) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE_SUCCESS, payload: employeeData.prof_pic});
        dispatch({type: employeesActionsConstants.EMPLOYEE_SELECTED, payload: employeeData});
    };
}
export function clearSelectedEmployee() {
    return (dispatch) => {
        dispatch({type: employeesActionsConstants.CLEAR_SELECTED_EMPLOYEE});
    };
}

export function saveEmployeeChanges(data, id) {
    return (dispatch) => {
        dispatch({type: employeesActionsConstants.SAVE_EMPLOYEE_CHANGES});
        employeessResource.saveEmployeeChanges(data, id)
            .then(() => {
                dispatch(change('employeeEditForm', 'editing', false));
                dispatch(getEmployeesList());
                dispatch({type: employeesActionsConstants.SAVE_EMPLOYEE_CHANGES_SUCCESS});
            })
            .catch((response) => {
                dispatch({type: employeesActionsConstants.SAVE_EMPLOYEE_CHANGES_ERROR, payload: response});
            });
    };
}
