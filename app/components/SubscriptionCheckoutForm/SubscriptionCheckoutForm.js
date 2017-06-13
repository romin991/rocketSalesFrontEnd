import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import normalizeIdr from '../../utils/normalizeIdr';
import { connect } from 'react-redux';
import { showSecondCheckoutStep } from '../../actions/subscriptionActions';
import { hideSubscriptionCheckoutModal } from '../../actions/modalsActions';
import UsersQuantityInput from '../UsersQuantityInput/UserQuantityInput';
import './SubscriptionCheckoutForm.scss';

class SubscriptionCheckoutForm extends Component {
    render() {
        const { onShowSecondCheckoutStep, onHideSubscriptionCheckoutModal, form } = this.props;

        const subTotalValue = form.subscriptionCheckoutForm.values.subscriptionPlan * form.subscriptionCheckoutForm.values.usersQuantity;

        return (
            <div className="firstStep chekoutBlock">
                <form>
                    <table className="stepTable">
                        <tbody>
                        <tr>
                            <td className="stepData">
                                <div className="stepOutBlock">
                                    <div className="active stepBlock">1</div>
                                </div>
                            </td>
                            <td className="lineData">
                                <div className="hLine"></div>
                            </td>
                            <td className="stepData">
                                <div className="stepOutBlock">
                                    <div className="stepBlock">2</div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>Pesanan Anda</h3>
                    <table className="fieldTable">
                        <tbody>
                        <tr>
                            <td colSpan="2">
                                <h4>Paket</h4>
                                <Field name="subscriptionPlan" component="select" className="subsPlan">
                                    <option value="660000">Zahaya Iuran Tahunan(Promo) IDR 660.000 /Tahun/User</option>
                                    <option value="75000">Zahaya Iuran Bulanan(Promo) IDR 75.000 /Bulan/User</option>
                                </Field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Jumah Pengguna</h4>
                                <Field component={UsersQuantityInput} type="number" name="usersQuantity"/>
                            </td>
                            <td>
                                <h4>Sub-Total</h4>
                                <input disabled className="totalInput" value={normalizeIdr(subTotalValue.toString())} type="text"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <div className="buttonsBlock">
                    <button className="blueButton" onClick={() => {onShowSecondCheckoutStep(subTotalValue);}}>Lanjutkan</button>
                    <button className="whiteButton" onClick={onHideSubscriptionCheckoutModal}>Cancel</button>
                </div>
            </div>
        );
    }
}

SubscriptionCheckoutForm.propTypes = {
    onShowSecondCheckoutStep: React.PropTypes.func,
    onHideSubscriptionCheckoutModal: React.PropTypes.func,
    form: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        form: state.form
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowSecondCheckoutStep: (subTotal) => {
            dispatch(showSecondCheckoutStep(subTotal));
        },
        onHideSubscriptionCheckoutModal: () => {
            dispatch(hideSubscriptionCheckoutModal());
        }
    };
};

SubscriptionCheckoutForm = connect(mapStateToProps, mapDispatchToProps)(SubscriptionCheckoutForm);

SubscriptionCheckoutForm = reduxForm({
    form: 'subscriptionCheckoutForm'
})(SubscriptionCheckoutForm);

export default SubscriptionCheckoutForm;
