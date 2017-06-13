import * as notesActionsConstants from '../actions/notesActionsConstants';
import _ from 'lodash';

const initialState = {
    notes: [],

    notesLoading: false,
    notesLoadingSuccess: false,
    notesError: null,

    addNoteLoading: false,
    addNoteLoadingSuccess: false,
    addNoteLoadingError: null
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case notesActionsConstants.GET_NOTES:
            return {
                ...state,
                notesLoading: true,
                notesLoadingSuccess: false,
                notesError: null
            };
        case notesActionsConstants.GET_NOTES_SUCCESS:
            return {
                ...state,
                notesLoading: false,
                notesLoadingSuccess: true,
                notes: action.payload
            };
        case notesActionsConstants.GET_NOTES_ERROR:
            return {
                ...state,
                notesLoading: false,
                notesLoadingSuccess: false,
                notesError: action.payload
            };
        case notesActionsConstants.ADD_NOTE:
            return {
                ...state,
                addNoteLoading: true,
                addNoteLoadingSuccess: false,
                addNoteLoadingError: null
            };
        case notesActionsConstants.ADD_NOTE_SUCCESS:
            const notesList = state.notes.slice();
            notesList.push(action.payload);
            return {
                ...state,
                addNoteLoading: false,
                addNoteLoadingSuccess: true,
                notes: _.sortBy(notesList, [(o) => -o.id])
            };
        case notesActionsConstants.ADD_NOTE_ERROR:
            return {
                ...state,
                addNoteLoadingLoading: false,
                addNoteLoadingSuccess: false,
                addNoteLoadingError: action.payload
            };
        case notesActionsConstants.CLEAR_NOTES_LIST:
            return {
                ...state,
                notes: []
            };
        default:
            return state;
    }
};

export default notesReducer;
