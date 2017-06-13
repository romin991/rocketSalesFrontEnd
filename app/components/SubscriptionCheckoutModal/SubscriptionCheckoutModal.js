import React from 'react';
import SimpleModal from '../Modal/SimpleModal';
import SubscriptionCheckoutForm from '../SubscriptionCheckoutForm/SubscriptionCheckoutForm';
import { connect } from 'react-redux';
import { showFirstCheckoutStep } from '../../actions/subscriptionActions';
import { hideSubscriptionCheckoutModal } from '../../actions/modalsActions';

class SubscriptionModal extends React.Component {
    render() {
        const { onHideModal, modalsReducer, preSelectedPlan, subscriptionReducer, onShowFirstCheckoutStep } = this.props;

        const customModalStyle = {
            transform: 'none',
            margin: '30px auto',
            top: '0',
            width: '1200px',
            maxWidth: '100%',
            left: '0',
            position: 'relative'
        };

        const tax = 1;

        const total = subscriptionReducer.subTotal * tax;
        return (
            <SimpleModal
                showModal={modalsReducer.showSubscriptionCheckoutModal}
                onHide={onHideModal}
                customModalStyle={customModalStyle}
                modalTitle="CHECKOUT"
            >
                <div>
                    {!subscriptionReducer.showSecondCheckoutStep && <SubscriptionCheckoutForm
                        initialValues={{
                            subscriptionPlan: preSelectedPlan,
                            usersQuantity: 1
                        }}
                    /> || <div className="second chekoutBlock">
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
                                            <div className=" active stepBlock">2</div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        <h3>Jumlah Pembayaran</h3>
                        <div className="secondStepContainer">
                                    <table className="secondStepTable">
                                <tbody>
                                <tr>
                                    <td className="textData">Sub-Total</td>
                                    <td className="rp textData">Rp.</td>
                                    <td className="sumData">{subscriptionReducer.subTotal}</td>
                                </tr>
                                <tr>
                                    <td className="textData">Tax</td>
                                    <td className="rp textData"></td>
                                    <td className="sumData">{(tax - 1) * 100}%</td>
                                </tr>
                                <tr>
                                    <td className="totalData">Total</td>
                                    <td className="rp textData">Rp.</td>
                                    <td className="total sumData">{total}</td>
                                </tr>
                                </tbody>
                            </table>
                                    <div className="secondStepContainerRight">
                                <div>
                                    Silahkan melakukan pembayaran dengan cara transfer melaui ATM atau e-banking anda ke nomer rekening dibawah ini:
                                </div>
                                <div className="middleP">
                                    BCA Account No. <span>3723 909 909</span> <br/> Albert Reynaldo Soelistio / Angky William
                                </div>
                                <div>
                                    Segera lakukan konfirmasi melalui email berikut:
                                </div>
                                <a href="">payment@zahaya.com</a>
                            </div>
                        </div>
                        <div className="buttonsBlock">
                            <button className="blueButton" onClick={onHideModal}>Selesai</button>
                            <button className="whiteButton" onClick={onShowFirstCheckoutStep}>Kembali</button>
                        </div>
                    </div>}
                </div>
            </SimpleModal>
        );
    }
}

SubscriptionModal.propTypes = {
    onHideModal: React.PropTypes.func,
    onShowFirstCheckoutStep: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    subscriptionReducer: React.PropTypes.object,
    preSelectedPlan: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        preSelectedPlan: state.form.subscriptionPlanForm.values.subscriptionPlan,
        subscriptionReducer: state.subscriptionReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHideModal: () => {
            dispatch(hideSubscriptionCheckoutModal());
            dispatch(showFirstCheckoutStep());
        },
        onShowFirstCheckoutStep: () => {
            dispatch(showFirstCheckoutStep());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionModal);

