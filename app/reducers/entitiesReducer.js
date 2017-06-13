import * as entitiesActionsConstants from '../actions/entitiesActionsConstants';

const initialState = {
    entity: [],
    entitySummary: {},
    entityLoading: false,
    entityLoadingSuccess: false,
    entityError: false,
    entityEditLoading: false,
    entityEditLoadingSuccess: false,
    entityEditError: false,
    entitySummaryLoading: false,
    entitySummaryLoadingSuccess: false,
    entitySummaryError: false
};

const entitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case entitiesActionsConstants.GET_ENTITY:
            return {
                ...state,
                entityLoading: true,
                entityLoadingSuccess: false,
                entityError: null
            };
        case entitiesActionsConstants.GET_ENTITY_SUCCESS:
            return {
                ...state,
                entityLoading: false,
                entityLoadingSuccess: true,
                entity: action.payload
            };
        case entitiesActionsConstants.GET_ENTITY_ERROR:
            return {
                ...state,
                entityLoading: false,
                entityLoadingSuccess: false,
                entityError: action.payload
            };
        case entitiesActionsConstants.EDIT_ENTITY:
            return {
                ...state,
                entityEditLoading: true,
                entityEditLoadingSuccess: false,
                entityEditError: null
            };
        case entitiesActionsConstants.EDIT_ENTITY_SUCCESS:
            return {
                ...state,
                entityEditLoading: false,
                entityEditLoadingSuccess: true,
                entity: action.payload
            };
        case entitiesActionsConstants.EDIT_ENTITY_ERROR:
            return {
                ...state,
                entityEditLoading: false,
                entityEditLoadingSuccess: false,
                entityEditError: action.payload
            };
        case entitiesActionsConstants.GET_ENTITIES_SUMMARY:
            return {
                ...state,
                entitySummaryLoading: true,
                entitySummaryLoadingSuccess: false,
                entitySummaryError: null
            };
        case entitiesActionsConstants.GET_ENTITIES_SUMMARY_SUCCESS:
            return {
                ...state,
                entitySummaryLoading: false,
                entitySummaryLoadingSuccess: true,
                entitySummary: action.payload
            };
        case entitiesActionsConstants.GET_ENTITIES_SUMMARY_ERROR:
            return {
                ...state,
                entitySummaryLoading: false,
                entitySummaryLoadingSuccess: false,
                entitySummaryError: action.payload
            };
        default:
            return state;
    }
};

export default entitiesReducer;
