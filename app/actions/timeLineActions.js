import * as timeLineActionsConstants from './timeLineActionsConstants';
import * as timeLineResource from '../resources/timeLineResource';

export function getTimeLine(id, listType) {
    return (dispatch) => {
        dispatch({type: timeLineActionsConstants.GET_TIME_LINE});
        timeLineResource.getTimeLine(id, listType)
            .then((response) => {
                dispatch({type: timeLineActionsConstants.GET_TIME_LINE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: timeLineActionsConstants.GET_TIME_LINE_ERROR, payload: response});
            });
    };
}

export function refreshTimeline() {
    return (dispatch) => {
        const pathname = window.location.pathname;
        const path = pathname.split('/')[1];
        const id = pathname.split('/')[2];

        let listType = '';
        switch(path) {
            case 'detail-lead':
                listType = 'leads';
                break;
            case 'detail-account':
                listType = 'companies';
                break;
            case 'detail-contact':
                listType = 'customers';
                break;
            case 'detail-deal':
                listType = 'deals';
                break;
            default:
                break;
        }
        if (listType === '') {
            return;
        }

        dispatch({type: timeLineActionsConstants.GET_TIME_LINE});
        timeLineResource.getTimeLine(id, listType)
            .then((response) => {
                dispatch({type: timeLineActionsConstants.GET_TIME_LINE_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: timeLineActionsConstants.GET_TIME_LINE_ERROR, payload: response});
            });
    };
}

export function clearTimeLineList() {
    return (dispatch) => {
        dispatch({type: timeLineActionsConstants.CLEAR_TIME_LINE_LIST});
    };
}
