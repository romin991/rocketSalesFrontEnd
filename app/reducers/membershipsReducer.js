import * as membershipsActionsConstants from '../actions/membershipsActionsConstants';

const initialState = {
    memberships: [],
    membershipsLoading: false,
    membershipsLoadingSuccess: false,
    membershipsLoadingError: false,

    membershipEditLoading: false,
    membershipEditLoadingSuccess: false,
    membershipEditLoadingError: false,

    membershipAddLoading: false,
    membershipAddLoadingSuccess: false,
    membershipAddLoadingError: false
};

const membershipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case membershipsActionsConstants.GET_MEMBERSHIPS:
            return {
                ...state,
                membershipsLoading: true,
                membershipsLoadingSuccess: false,
                membershipsLoadingError: null
            };
        case membershipsActionsConstants.GET_MEMBERSHIPS_SUCCESS:
            return {
                ...state,
                membershipsLoading: false,
                membershipsLoadingSuccess: true,
                memberships: action.payload
            };
        case membershipsActionsConstants.GET_MEMBERSHIPS_ERROR:
            return {
                ...state,
                membershipsLoading: false,
                membershipsLoadingSuccess: false,
                membershipsLoadingError: action.payload
            };

        case membershipsActionsConstants.EDIT_MEMBERSHIP:
            return {
                ...state,
                membershipEditLoading: true,
                membershipEditLoadingSuccess: false,
                membershipEditLoadingError: false
            };
        case membershipsActionsConstants.EDIT_MEMBERSHIP_SUCCESS:
            return {
                ...state,
                membershipEditLoading: false,
                membershipEditLoadingSuccess: true,
                membershipEditLoadingError: false
            };
        case membershipsActionsConstants.EDIT_MEMBERSHIP_ERROR:
            return {
                ...state,
                membershipEditLoading: false,
                membershipEditLoadingSuccess: false,
                membershipEditLoadingError: action.payload
            };

        case membershipsActionsConstants.ADD_MEMBERSHIPS:
            return {
                ...state,
                membershipAddLoading: true,
                membershipAddLoadingSuccess: false,
                membershipAddLoadingError: false
            };
        case membershipsActionsConstants.ADD_MEMBERSHIPS_SUCCESS:
            return {
                ...state,
                membershipAddLoading: false,
                membershipAddLoadingSuccess: true,
                membershipAddLoadingError: false
            };
        case membershipsActionsConstants.ADD_MEMBERSHIPS_ERROR:
            return {
                ...state,
                membershipAddLoading: false,
                membershipAddLoadingSuccess: false,
                membershipAddLoadingError: true
            };
        default:
            return state;
    }
};

export default membershipsReducer;
