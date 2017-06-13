import * as importActionsConstants from './importActionsConstants';
import * as importResource from '../resources/importResource';
import * as importActions from './importActions';
import { reset } from 'redux-form';

export function importFile(file, pageLabel) {
    return (dispatch) => {
        dispatch({type: importActionsConstants.IMPORT_FILE});
        importResource.importFile(file, pageLabel)
            .then((response) => {
                dispatch(importActions.clearInputFile());
                dispatch(reset('importForm'));
                dispatch({type: importActionsConstants.IMPORT_FILE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: importActionsConstants.IMPORT_FILE_ERROR, payload: response});
            });
    };
}

export function clearInputFile() {
    return (dispatch) => {
        dispatch({type: importActionsConstants.CLEAR_INPUT_FILE});
    };
}

export function resetState() {
    return (dispatch) => {
        dispatch({type: importActionsConstants.RESET_STATE});
    };
}
