import * as authActionsConstants from '../actions/authActionsConstants';

const initialState = {
    user: {},
    signInLoading: false,
    signInEmptyFieldsError: false,
    signInError: null,
    signUpLoading: false,
    signUpError: null,
    signUpEmptyFieldsError: false,
    signUpPasswordMatchError: false,
    signUpThermsChecked: false,
    passwordResetLoading: false,
    passwordResetSuccess: false,
    passwordResetError: null,
    passwordResetEmptyFieldsError: false,
    showSubscriptionNotification: true
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sign in reducer part
        case authActionsConstants.SIGN_IN:
            return {
                ...state,
                signInLoading: true,
                signInEmptyFieldsError: false
            };
        case authActionsConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                signInLoading: false,
                signInError: null,
                signInEmptyFieldsError: false
            };
        case authActionsConstants.SIGN_IN_ERROR:
            return {
                ...state,
                signInLoading: false,
                signInEmptyFieldsError: false,
                signInError: action.payload
            };
        case authActionsConstants.SIGN_IN_EMPTY_FIELDS_ERROR:
            return {
                ...state,
                signInEmptyFieldsError: true
            };
        // Sign up reducer part
        case authActionsConstants.SIGN_UP:
            return {
                ...state,
                signUpLoading: true,
                signUpEmptyFieldsError: false
            };
        case authActionsConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpError: null,
                signUpEmptyFieldsError: false
            };
        case authActionsConstants.SIGN_UP_ERROR:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.payload
            };
        case authActionsConstants.SIGN_UP_EMPTY_FIELDS_ERROR:
            return {
                ...state,
                signUpEmptyFieldsError: true
            };
        case authActionsConstants.SIGN_UP_PASSWORD_MATCHING_ERROR:
            return {
                ...state,
                signUpPasswordMatchError: true
            };
        case authActionsConstants.RESET_SIGN_UP_PASSWORD_MATCHING_ERROR:
            return {
                ...state,
                signUpPasswordMatchError: false
            };
        case authActionsConstants.SIGN_UP_THERMS_TOGGLE:
            return {
                ...state,
                signUpThermsChecked: !state.signUpThermsChecked
            };
        // Password reset reducer part
        case authActionsConstants.PASSWORD_RESET:
            return {
                ...state,
                passwordResetLoading: true,
                passwordResetSuccess: false
            };
        case authActionsConstants.PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordResetLoading: false,
                passwordResetSuccess: true,
                passwordResetError: null
            };
        case authActionsConstants.PASSWORD_RESET_ERROR:
            return {...state,
                passwordResetLoading: false,
                passwordResetError: action.payload
            };
        case authActionsConstants.PASSWORD_RESET_EMPTY_FIELDS_ERROR:
            return {
                ...state,
                passwordResetEmptyFieldsError: true
            };
        // work with user data
        case authActionsConstants.SAVE_USER_DATA:
            return {
                ...state,
                user: action.payload
            };
        case authActionsConstants.CLEAR_USER_DATA:
            return {
                ...state,
                user: {}
            };
        case authActionsConstants.SHOW_SUBSCRIPTION_NOTIFICATION:
            return {
                ...state,
                showSubscriptionNotification: true
            };
        case authActionsConstants.HIDE_SUBSCRIPTION_NOTIFICATION:
            return {
                ...state,
                showSubscriptionNotification: false
            };
        default:
            return state;
    }
};

export default authReducer;
