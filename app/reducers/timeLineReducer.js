import * as timeLineActionsConstants from '../actions/timeLineActionsConstants';

const initialState = {
    timeLine: [],

    timeLineLoading: false,
    timeLineLoadingSuccess: false,
    timeLineError: null
};

const timeLineReducer = (state = initialState, action) => {
    switch (action.type) {
        case timeLineActionsConstants.GET_TIME_LINE:
            return {
                ...state,
                timeLineLoading: true,
                timeLineLoadingSuccess: false,
                timeLineError: null
            };
        case timeLineActionsConstants.GET_TIME_LINE_SUCCESS:
            return {
                ...state,
                timeLineLoading: false,
                timeLineLoadingSuccess: true,
                timeLine: action.payload
            };
        case timeLineActionsConstants.GET_TIME_LINE_ERROR:
            return {
                ...state,
                timeLineLoading: false,
                timeLineLoadingSuccess: false,
                timeLineError: action.payload
            };
        case timeLineActionsConstants.CLEAR_TIME_LINE_LIST:
            return {
                ...state,
                timeLine: []
            };
        default:
            return state;
    }
};

export default timeLineReducer;
