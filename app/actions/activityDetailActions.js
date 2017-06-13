import * as activityDetailActionsConstants from './activityDetailActionsConstants';
import * as activityDetailResource from '../resources/activityDetailResource';
import * as modalsActionsConstants from './modalsActionsConstants';

export function getEventDetail(id) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL});
        activityDetailResource.getEventDetail(id)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_ERROR, payload: response});
            });
    };
}

export function getEventDetailNotes(id) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES});
        activityDetailResource.getEventDetailNotes(id)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES_ERROR, payload: response});
            });
    };
}

export function updateEvent(id, data) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL});
        activityDetailResource.updateEvent(id, data)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL_SUCCESS, payload: response.data});
                dispatch({type: modalsActionsConstants.HIDE_UPDATE_MEETING_MODAL});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL_ERROR, payload: response});
            });
    };
}

export function getTaskDetail(id) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL});
        activityDetailResource.getTaskDetail(id)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_ERROR, payload: response});
            });
    };
}

export function getTaskDetailNotes(id) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES});
        activityDetailResource.getTaskDetailNotes(id)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.GET_ACTIVITY_DETAIL_NOTES_ERROR, payload: response});
            });
    };
}

export function updateTask(id, data) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL});
        activityDetailResource.updateTask(id, data)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL_SUCCESS, payload: response.data});
                dispatch({type: modalsActionsConstants.HIDE_UPDATE_TASK_MODAL});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.UPDATE_ACTIVITY_DETAIL_ERROR, payload: response});
            });
    };
}

export function createActivityNote(data) {
    return (dispatch) => {
        dispatch({type: activityDetailActionsConstants.CREATE_ACTIVITY_NOTE});
        activityDetailResource.createActivityNote(data)
            .then((response) => {
                dispatch({type: activityDetailActionsConstants.CREATE_ACTIVITY_NOTE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: activityDetailActionsConstants.CREATE_ACTIVITY_NOTE_ERROR, payload: response});
            });
    };
}
