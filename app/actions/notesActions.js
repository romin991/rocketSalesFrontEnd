import * as notesActionsConstants from './notesActionsConstants';
import * as notesResource from '../resources/notesResource';
import {reset} from 'redux-form';

export function getNotes(id, listType) {
    return (dispatch) => {
        dispatch({type: notesActionsConstants.GET_NOTES});
        notesResource.getNotes(id, listType)
            .then((response) => {
                dispatch({type: notesActionsConstants.GET_NOTES_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: notesActionsConstants.GET_NOTES_ERROR, payload: response});
            });
    };
}

export function addNote(data) {
    return (dispatch) => {
        dispatch({type: notesActionsConstants.ADD_NOTE});
        notesResource.addNote(data)
            .then((responce) => {
                dispatch({type: notesActionsConstants.ADD_NOTE_SUCCESS, payload: responce.data});
                dispatch(reset('noteCreationForm'));
            })
            .catch((response) => {
                dispatch({type: notesActionsConstants.ADD_NOTE_ERROR, payload: response});
            });
    };
}

export function clearNotesList() {
    return (dispatch) => {
        dispatch({type: notesActionsConstants.CLEAR_NOTES_LIST});
    };
}
