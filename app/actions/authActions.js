import * as authResouce from '../resources/authResource';
import * as authActionsConstants from './authActionsConstants';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { cookieAuthToken, removeCookieAuthToken } from '../constants';

// work with user data
export function saveUserData(userData) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SAVE_USER_DATA, payload: userData});
    };
}

export function clearUserData() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.CLEAR_USER_DATA});
    };
}

// Sync actions
export function sync(response, initialLoading) {
    return (dispatch) => {
        const authToken = response ? `JWT ${response.data.token}` : cookieAuthToken();
        authResouce.sync(authToken).then((userData) => {
            if (!cookieAuthToken()) {
                cookie.save('authToken', authToken);
            }
            dispatch(saveUserData(userData.data));
            if (!initialLoading) {
                browserHistory.push('/');
            }
        }, () => {
            browserHistory.push('/login');
        });
    };
}

// Sign in actions
export function signIn(data) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_IN});
        authResouce.signIn(data)
            .then((response) => {
                dispatch({type: authActionsConstants.SIGN_IN_SUCCESS, payload: response});
                dispatch(sync(response));
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.SIGN_IN_ERROR, payload: response});
            });
    };
}

export function sigInEmptyFieldError() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_IN_EMPTY_FIELDS_ERROR});
    };
}

// Sign up actions
export function signUp(data) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_UP});
        authResouce.signUp(data)
            .then((response) => {
                dispatch({type: authActionsConstants.SIGN_UP_SUCCESS, payload: response});
                dispatch(sync(response));
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.SIGN_UP_ERROR, payload: response});
            });
    };
}

export function signUpEmptyFieldError() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_UP_EMPTY_FIELDS_ERROR});
    };
}

export function signUpPasswordMatchingError() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_UP_PASSWORD_MATCHING_ERROR});
    };
}

export function resetSignUpPasswordMatchingError() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.RESET_SIGN_UP_PASSWORD_MATCHING_ERROR});
    };
}

export function signUpThermsToggle() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SIGN_UP_THERMS_TOGGLE});
    };
}

// Password reset actions
export function passwordReset(data) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.PASSWORD_RESET});
        authResouce.passwordReset(data)
            .then((response) => {
                dispatch({type: authActionsConstants.PASSWORD_RESET_SUCCESS, payload: response});
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.PASSWORD_RESET_ERROR, payload: response});
            });
    };
}

export function passwordResetEmptyFieldError() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.PASSWORD_RESET_EMPTY_FIELDS_ERROR});
    };
}

// logout
export function logout() {
    return (dispatch) => {
        removeCookieAuthToken();
        dispatch(clearUserData());
        browserHistory.push('/login');
    };
}

export function showSubscriprionNotification() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.SHOW_SUBSCRIPTION_NOTIFICATION});
    };
}

export function hideSubscriprionNotification() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.HIDE_SUBSCRIPTION_NOTIFICATION});
    };
}
