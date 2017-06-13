import * as subscriptionActionsConstants from './subscriptionActionsConstants';

export function showFirstCheckoutStep() {
    return (dispatch) => {
        dispatch({type: subscriptionActionsConstants.SHOW_FIRST_CHECKOUT_STEP});
    };
}

export function showSecondCheckoutStep(subTotal) {
    return (dispatch) => {
        dispatch({type: subscriptionActionsConstants.SHOW_SECOND_CHECKOUT_STEP, payload: subTotal});
    };
}
