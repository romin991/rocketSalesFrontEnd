import * as cloudinaryActionsConstants from '../actions/cloudinaryActionsConstants';

const initialState = {
    accountCreateImage: '',
    accountCreateImageLoading: false,
    leadCreateImage: '',
    leadCreateImageLoading: false,
    contactCreateImage: '',
    contactCreateImageLoading: false,
    userCreateImage: '',
    userCreateImageLoading: false,
    orgProfileImage: '',
    orgProfileImageLoading: false,
    employeeProfileImage: '',
    employeeProfileImageLoading: false
};

const clodinaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case cloudinaryActionsConstants.POST_ACCOUNT_IMAGE:
            return {
                ...state,
                accountCreateImageLoading: true
            };
        case cloudinaryActionsConstants.POST_ACCOUNT_IMAGE_SUCCESS:
            return {
                ...state,
                accountCreateImageLoading: false,
                accountCreateImage: action.payload
            };
        case cloudinaryActionsConstants.POST_ACCOUNT_IMAGE_ERROR:
            return {
                ...state,
                accountCreateImageLoading: false,
            };
        case cloudinaryActionsConstants.ACCOUNT_IMAGE_CLEAR:
            return {
                ...state,
                accountCreateImage: ''
            };
        case cloudinaryActionsConstants.POST_LEAD_IMAGE:
            return {
                ...state,
                leadCreateImageLoading: true,
            };
        case cloudinaryActionsConstants.POST_LEAD_IMAGE_SUCCESS:
            return {
                ...state,
                leadCreateImageLoading: false,
                leadCreateImage: action.payload
            };
        case cloudinaryActionsConstants.POST_LEAD_IMAGE_ERROR:
            return {
                ...state,
                leadCreateImageLoading: false
            };
        case cloudinaryActionsConstants.LEAD_IMAGE_CLEAR:
            return {
                ...state,
                leadCreateImage: ''
            };
        case cloudinaryActionsConstants.POST_CONTACT_IMAGE:
            return {
                ...state,
                contactCreateImageLoading: true
            };
        case cloudinaryActionsConstants.POST_CONTACT_IMAGE_SUCCESS:
            return {
                ...state,
                contactCreateImageLoading: false,
                contactCreateImage: action.payload
            };
        case cloudinaryActionsConstants.POST_CONTACT_IMAGE_ERROR:
            return {
                ...state,
                leadCreateImageLoading: false
            };
        case cloudinaryActionsConstants.CONTACT_IMAGE_CLEAR:
            return {
                ...state,
                contactCreateImage: ''
            };
        case cloudinaryActionsConstants.POST_USER_IMAGE:
            return {
                ...state,
                userCreateImageLoading: true
            };
        case cloudinaryActionsConstants.POST_USER_IMAGE_SUCCESS:
            return {
                ...state,
                userCreateImageLoading: false,
                userCreateImage: action.payload
            };
        case cloudinaryActionsConstants.POST_USER_IMAGE_ERROR:
            return {
                ...state,
                userCreateImageLoading: false
            };
        case cloudinaryActionsConstants.USER_IMAGE_CLEAR:
            return {
                ...state,
                userCreateImage: ''
            };
        case cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE:
            return {
                ...state,
                orgProfileImageLoading: true
            };
        case cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                orgProfileImageLoading: false,
                orgProfileImage: action.payload
            };
        case cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE_ERROR:
            return {
                ...state,
                orgProfileImageLoading: false
            };
        case cloudinaryActionsConstants.ORG_PROFILE_IMAGE_CLEAR:
            return {
                ...state,
                orgProfileImage: ''
            };
        case cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE:
            return {
                ...state,
                employeeProfileImageLoading: true
            };
        case cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                employeeProfileImageLoading: false,
                employeeProfileImage: action.payload
            };
        case cloudinaryActionsConstants.POST_EMPLOYEE_PROFILE_IMAGE_ERROR:
            return {
                ...state,
                employeeProfileImageLoading: false
            };
        case cloudinaryActionsConstants.EMPLOYEE_PROFILE_IMAGE_CLEAR:
            return {
                ...state,
                employeeProfileImage: ''
            };
        case cloudinaryActionsConstants.INIT_LEAD_CLOUDINARY_IMAGE:
            return {
                ...state,
                leadCreateImageLoading: false,
                leadCreateImage: action.payload
            };
        case cloudinaryActionsConstants.INIT_ACCOUNT_CLOUDINARY_IMAGE:
            return {
                ...state,
                accountCreateImageLoading: false,
                accountCreateImage: action.payload
            };
        case cloudinaryActionsConstants.INIT_CONTACT_CLOUDINARY_IMAGE:
            return {
                ...state,
                contactCreateImageLoading: false,
                contactCreateImage: action.payload
            };
        default:
            return state;
    }
};

export default clodinaryReducer;
