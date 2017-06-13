import * as dashboardSidebarActionsConstants from '../actions/dashboardSidebarActionsConstants';

export function toggleSidebarMenu() {
    return (dispatch) => {
        dispatch({type: dashboardSidebarActionsConstants.TOGGLE_SIDEBAR_MENU});
    };
}
