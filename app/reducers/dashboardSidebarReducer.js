import * as dashboardSidebarActionsConstants from '../actions/dashboardSidebarActionsConstants';

const initialState = {
    showSidebarMenu: false
};

const dashboardHeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case dashboardSidebarActionsConstants.TOGGLE_SIDEBAR_MENU:
            return {
                ...state,
                showSidebarMenu: !state.showSidebarMenu
            };
        default:
            return state;
    }
};

export default dashboardHeaderReducer;
