import * as importActionsConstants from '../actions/importActionsConstants';

const initialState = {
    importFileLoading: false,
    importFileError: null,
    importFileSuccess: false,
    responseList: [],
    inputKeyValue: new Date().toString()
};

const importReducer = (state = initialState, action) => {
    switch (action.type) {
        case importActionsConstants.IMPORT_FILE:
            return {
                ...state,
                importFileLoading: true,
                importFileError: null,
                importFileSuccess: false
            };
        case importActionsConstants.IMPORT_FILE_SUCCESS:
            return {
                ...state,
                importFileLoading: false,
                importFileSuccess: true,
                responseList: action.payload
            };
        case importActionsConstants.IMPORT_FILE_ERROR:
            return {
                ...state,
                importFileLoading: false,
                importFileError: action.payload,
                importFileSuccess: false
            };
        case importActionsConstants.CLEAR_INPUT_FILE:
            return {
                ...state,
                inputKeyValue: new Date().toString()
            };
        case importActionsConstants.RESET_STATE:
            return {
                ...state,
                importFileLoading: false,
                importFileError: null,
                importFileSuccess: false,
                responseList: [],
                inputKeyValue: new Date().toString()
            };
        default:
            return state;
    }
};

export default importReducer;
