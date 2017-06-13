import * as dashboardHeaderActionsConstants from '../actions/dashboardHeaderActionsConstants';

export function toggleCreationMenu() {
    return (dispatch) => {
        dispatch({type: dashboardHeaderActionsConstants.TOGGLE_CREATION_MENU});
    };
}

export function toggleUserMenu() {
    return (dispatch) => {
        dispatch({type: dashboardHeaderActionsConstants.TOGGLE_USER_MENU});
    };
}
