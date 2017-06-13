import * as dashboardHeaderActionsConstants from '../actions/dashboardHeaderActionsConstants';

const initialState = {
    showCreationMenu: false,
    showUserMenu: false
};

const dashboardHeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case dashboardHeaderActionsConstants.TOGGLE_CREATION_MENU:
            return {
                ...state,
                showCreationMenu: !state.showCreationMenu
            };
        case dashboardHeaderActionsConstants.TOGGLE_USER_MENU:
            return {
                ...state,
                showUserMenu: !state.showUserMenu
            };
        default:
            return state;
    }
};

export default dashboardHeaderReducer;
