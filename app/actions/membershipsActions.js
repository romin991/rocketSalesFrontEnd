import * as membershipsActionsConstants from './membershipsActionsConstants';
import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as membershipsResource from '../resources/membershipsResource';
import * as modalsActionsConstants from './modalsActionsConstants';
import {reset} from 'redux-form';

export function getMemberships() {
    return (dispatch) => {
        dispatch({type: membershipsActionsConstants.GET_MEMBERSHIPS});
        membershipsResource.getMemberships()
            .then((response) => {
                if (response.data.prof_pic && (response.data.prof_pic.length > 0)) {
                    dispatch({type: cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE_SUCCESS, payload: response.data.prof_pic});
                }
                dispatch({type: membershipsActionsConstants.GET_MEMBERSHIPS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: membershipsActionsConstants.GET_MEMBERSHIPS_ERROR, payload: response});
            });
    };
}

export function editMembership(data) {
    return (dispatch) => {
        dispatch({type: membershipsActionsConstants.EDIT_MEMBERSHIP});
        membershipsResource.editMembership(data)
            .then(() => {
                dispatch({type: membershipsActionsConstants.EDIT_MEMBERSHIP_SUCCESS});
            })
            .catch((response) => {
                dispatch({type: membershipsActionsConstants.EDIT_MEMBERSHIP_ERROR, payload: response});
            });
    };
}

export function deleteMembership(data) {
    return (dispatch) => {
        dispatch({type: membershipsActionsConstants.DELETE_MEMBERSHIP});
        membershipsResource.deleteMembership(data)
            .then(() => {
                dispatch(getMemberships());
                dispatch({type: membershipsActionsConstants.DELETE_MEMBERSHIP_SUCCESS});
            })
            .catch((response) => {
                dispatch({type: membershipsActionsConstants.DELETE_MEMBERSHIP_ERROR, payload: response});
            });
    };
}

export function createMembership(data, close) {
    return (dispatch) => {
        dispatch({type: membershipsActionsConstants.ADD_MEMBERSHIPS});
        membershipsResource.createMembership(data)
            .then(() => {
                dispatch(getMemberships());
                dispatch({type: membershipsActionsConstants.ADD_MEMBERSHIPS_SUCCESS});
                if (close) {
                    dispatch({type: modalsActionsConstants.HIDE_CREATE_USER_MODAL});
                } else {
                    dispatch(reset('userModalForm'));
                }
            })
            .catch((response) => {
                dispatch({type: membershipsActionsConstants.ADD_MEMBERSHIPS_ERROR, payload: response});
            });
    };
}
