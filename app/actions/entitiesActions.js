import * as entitiesActionsConstants from './entitiesActionsConstants';
import * as cloudinaryActionsConstants from './cloudinaryActionsConstants';
import * as entitiesResource from '../resources/entitiesResource';
import { change } from 'redux-form';

export function getEntity() {
    return (dispatch) => {
        dispatch({type: entitiesActionsConstants.GET_ENTITY});
        entitiesResource.getEntity()
            .then((response) => {
                if (response.data.prof_pic && (response.data.prof_pic.length > 0)) {
                    dispatch({type: cloudinaryActionsConstants.POST_ORG_PROFILE_IMAGE_SUCCESS, payload: response.data.prof_pic});
                }
                dispatch({type: entitiesActionsConstants.GET_ENTITY_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: entitiesActionsConstants.GET_ENTITY_ERROR, payload: response});
            });
    };
}

export function editEntity(data) {
    return (dispatch) => {
        dispatch({type: entitiesActionsConstants.EDIT_ENTITY});
        entitiesResource.editEntity(data)
            .then((response) => {
                dispatch(change('orgProfileForm', 'editing', false));
                dispatch({type: entitiesActionsConstants.EDIT_ENTITY_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: entitiesActionsConstants.EDIT_ENTITY_ERROR, payload: response});
            });
    };
}

export function getEntitiesSummary() {
    return (dispatch) => {
        dispatch({type: entitiesActionsConstants.GET_ENTITIES_SUMMARY});
        entitiesResource.getEntitiesSummary()
            .then((response) => {
                dispatch({type: entitiesActionsConstants.GET_ENTITIES_SUMMARY_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: entitiesActionsConstants.GET_ENTITIES_SUMMARY_ERROR, payload: response});
            });
    };
}
