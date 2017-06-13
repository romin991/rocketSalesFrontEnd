import * as activityDetailActionsConstants from '../actions/activityDetailActionsConstants';

const initialState = {
    activityDetail: {},
    activityDetailNotes: [],

    activityDetailLoading: false,
    activityDetailSuccess: false,
    activityDetailError: false,

    updateActivityLoading: false,
    updateActivitySuccess: false,
    updateActivityError: false,

    activityDetailNotesLoading: false,
    activityDetailNotesSuccess: false,
    activityDetailNotesError: false,

    createActivityDetailNote: false,
    createActivityDetailNoteSuccess: false,
    createActivityDetailNoteError: false
};

const activityDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case activityDetailActionsConstants.GET_ACTIVITY_DETAIL:
            return {
                ...state,
                activityDetailLoading: true,
                activityDetailSuccess: false,
                activityDetailError: false,
            };
        case activityDetailActionsConstants.GET_ACTIVITY_DETAIL_SUCCESS:
            return {
                ...state,
                activityDetailLoading: false,
                activityDetailSuccess: true,
                activityDetailError: false,
                activityDetail: action.payload
            };
        case activityDetailActionsConstants.GET_ACTIVITY_DETAIL_ERROR:
            return {
                ...state,
                activityDetailLoading: false,
                activityDetailSuccess: false,
                activityDetailError: true,
                activityDetail: action.payload
            };

        case activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL:
            return {
                ...state,
                updateActivityLoading: true,
                updateActivitySuccess: false,
                updateActivityError: false,
            };
        case activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL_SUCCESS:
            return {
                ...state,
                updateActivityLoading: false,
                updateActivitySuccess: true,
                updateActivityError: false,
                activityDetail: action.payload
            };
        case activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL_ERROR:
            return {
                ...state,
                updateActivityLoading: false,
                updateActivitySuccess: false,
                updateActivityError: true,
                activityDetail: action.payload
            };

        case activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES:
            return {
                ...state,
                activityDetailNotesLoading: true,
                activityDetailNotesSuccess: false,
                activityDetailNotesError: false,
            };
        case activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES_SUCCESS:
            return {
                ...state,
                activityDetailNotesLoading: false,
                activityDetailNotesSuccess: true,
                activityDetailNotesError: false,
                activityDetailNotes: action.payload
            };
        case activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES_ERROR:
            return {
                ...state,
                activityDetailNotesLoading: false,
                activityDetailNotesSuccess: false,
                activityDetailNotesError: true,
                activityDetailNotes: action.payload
            };

        case activityDetailActionsConstants.CREATE_ACTIVITY_NOTE:
            return {
                ...state,
                createActivityDetailNote: true,
                createActivityDetailNoteSuccess: false,
                createActivityDetailNoteError: false
            };
        case activityDetailActionsConstants.CREATE_ACTIVITY_NOTE_SUCCESS:
            const activityDetailNotes = state.activityDetailNotes.slice();
            activityDetailNotes.unshift(action.payload);
            return {
                ...state,
                createActivityDetailNote: false,
                createActivityDetailNoteSuccess: true,
                createActivityDetailNoteError: false,
                activityDetailNotes: activityDetailNotes
            };
        case activityDetailActionsConstants.CREATE_ACTIVITY_NOTE_ERROR:
            return {
                ...state,
                createActivityDetailNote: false,
                createActivityDetailNoteSuccess: false,
                createActivityDetailNoteError: true,
                activityDetailNotes: action.payload
            };

        default:
            return state;
    }
};

export default activityDetailReducer;
