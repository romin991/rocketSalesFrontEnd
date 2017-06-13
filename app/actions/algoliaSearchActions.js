import * as algoliaSearchResource from '../resources/algoliaSearchResource';
import * as algoliaSearchActionsConstants from './algoliaSearchActionsConstants';


export function recordSearchKeyword(keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.RECORD_SEARCH_KEYWORD, keyword: keyword});
    };
}


export function getAlgoliaLead(appId, publicKey, index, keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_LEAD});

        algoliaSearchResource.getAlgoliaResult(appId, publicKey, index, keyword)
            .then((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_LEAD_SUCCESS, payload: response.hits});
            })
            .catch((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_LEAD_ERROR, payload: response});
            });
    };
}

export function clearAlgoliaLead() {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.CLEAR_ALGOLIA_LEAD});
    };
}

export function getAlgoliaContact(appId, publicKey, index, keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_CONTACT});

        algoliaSearchResource.getAlgoliaResult(appId, publicKey, index, keyword)
            .then((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_CONTACT_SUCCESS, payload: response.hits});
            })
            .catch((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_CONTACT_ERROR, payload: response});
            });
    };
}

export function clearAlgoliaContact() {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.CLEAR_ALGOLIA_CONTACT});
    };
}

export function getAlgoliaAccount(appId, publicKey, index, keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_ACCOUNT});

        algoliaSearchResource.getAlgoliaResult(appId, publicKey, index, keyword)
            .then((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_ACCOUNT_SUCCESS, payload: response.hits});
            })
            .catch((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_ACCOUNT_ERROR, payload: response});
            });
    };
}

export function clearAlgoliaAccount() {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.CLEAR_ALGOLIA_ACCOUNT});
    };
}

export function getAlgoliaTask(appId, publicKey, index, keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_TASK});

        algoliaSearchResource.getAlgoliaResult(appId, publicKey, index, keyword)
            .then((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_TASK_SUCCESS, payload: response.hits});
            })
            .catch((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_TASK_ERROR, payload: response});
            });
    };
}

export function clearAlgoliaTask() {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.CLEAR_ALGOLIA_TASK});
    };
}

export function getAlgoliaEvent(appId, publicKey, index, keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_EVENT});

        algoliaSearchResource.getAlgoliaResult(appId, publicKey, index, keyword)
            .then((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_EVENT_SUCCESS, payload: response.hits});
            })
            .catch((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_EVENT_ERROR, payload: response});
            });
    };
}

export function clearAlgoliaEvent() {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.CLEAR_ALGOLIA_EVENT});
    };
}

export function getAlgoliaDeal(appId, publicKey, index, keyword) {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_DEAL});

        algoliaSearchResource.getAlgoliaResult(appId, publicKey, index, keyword)
            .then((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_DEAL_SUCCESS, payload: response.hits});
            })
            .catch((response) => {
                dispatch({type: algoliaSearchActionsConstants.GET_ALGOLIA_DEAL_ERROR, payload: response});
            });
    };
}

export function clearAlgoliaDeal() {
    return (dispatch) => {
        dispatch({type: algoliaSearchActionsConstants.CLEAR_ALGOLIA_DEAL});
    };
}
