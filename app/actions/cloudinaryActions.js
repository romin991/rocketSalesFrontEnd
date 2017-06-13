import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as cloudinaryResource from '../resources/cloudinaryResource';

export function postAccountImage(meta, file) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_ACCOUNT_IMAGE});
        cloudinaryResource.sendImage(meta, file)
            .then((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_ACCOUNT_IMAGE_SUCCESS, payload: response.data.url});
            })
            .catch((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_ACCOUNT_IMAGE_ERROR, payload: response});
            });
    };
}

export function clearAccountImage() {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.ACCOUNT_IMAGE_CLEAR});
    };
}

export function postLeadImage(meta, file) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_LEAD_IMAGE});
        cloudinaryResource.sendImage(meta, file)
            .then((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_LEAD_IMAGE_SUCCESS, payload: response.data.url});
            })
            .catch((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_LEAD_IMAGE_ERROR, payload: response});
            });
    };
}

export function clearLeadImage() {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.LEAD_IMAGE_CLEAR});
    };
}

export function postContactImage(meta, file) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_CONTACT_IMAGE});
        cloudinaryResource.sendImage(meta, file)
            .then((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_CONTACT_IMAGE_SUCCESS, payload: response.data.url});
            })
            .catch((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_CONTACT_IMAGE_ERROR, payload: response});
            });
    };
}

export function clearContactImage() {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.CONTACT_IMAGE_CLEAR});
    };
}

export function postUserImage(meta, file) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_USER_IMAGE});
        cloudinaryResource.sendImage(meta, file)
            .then((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_USER_IMAGE_SUCCESS, payload: response.data.url});
            })
            .catch((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_USER_IMAGE_ERROR, payload: response});
            });
    };
}

export function clearUserImage() {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.USER_IMAGE_CLEAR});
    };
}

export function postOrgProfileImage(meta, file) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE});
        cloudinaryResource.sendImage(meta, file)
            .then((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE_SUCCESS, payload: response.data.url});
            })
            .catch((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE_ERROR, payload: response});
            });
    };
}

export function clearOrgProfileImage() {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.ORG_PROFILE_IMAGE_CLEAR});
    };
}

export function postEmployeeProfileImage(meta, file) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE});
        cloudinaryResource.sendImage(meta, file)
            .then((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE_SUCCESS, payload: response.data.url});
            })
            .catch((response) => {
                dispatch({type: cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE_ERROR, payload: response});
            });
    };
}

export function clearEmployeeProfileImage() {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.EMPLOYEE_PROFILE_IMAGE_CLEAR});
    };
}

export function initLeadCloudinaryImage(data) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.INIT_LEAD_CLOUDINARY_IMAGE, payload: data.url});
    };
}

export function initAccountCloudinaryImage(data) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.INIT_ACCOUNT_CLOUDINARY_IMAGE, payload: data.url});
    };
}

export function initContactCloudinaryImage(data) {
    return (dispatch) => {
        dispatch({type: cloudinaryActionsConstants.INIT_CONTACT_CLOUDINARY_IMAGE, payload: data.url});
    };
}
