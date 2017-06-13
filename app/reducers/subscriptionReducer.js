import * as subscriptionActionsConstants from '../actions/subscriptionActionsConstants';

const initialState = {
    showSecondCheckoutStep: false,
    subTotal: 0
};

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case subscriptionActionsConstants.SHOW_FIRST_CHECKOUT_STEP:
            return {
                ...state,
                showSecondCheckoutStep: false,
                subTotal: 0
            };
        case subscriptionActionsConstants.SHOW_SECOND_CHECKOUT_STEP:
            return {
                ...state,
                showSecondCheckoutStep: true,
                subTotal: action.payload
            };
        default:
            return state;
    }
};

export default subscriptionReducer;
