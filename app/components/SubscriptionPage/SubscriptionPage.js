import React from 'react';
import { connect } from 'react-redux';
import './SubscriptionPage.scss';
import SubscriptionPlanForm from '../SubscriptionPlanForm/SubscriptionPlanForm';
import SubscriptionModal from '../SubscriptionCheckoutModal/SubscriptionCheckoutModal';
import { showSubscriptionCheckoutModal } from '../../actions/modalsActions';
import { cookieAuthToken } from '../../constants';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import IconDashboard from '../IconDashboard/IconDashboard';
import IconLeads from '../IconLeads/IconLeads';
import IconAccount from '../IconAccount/IconAccount';
import IconContact from '../IconContact/IconContact';
import IconDeal from '../IconDeal/IconDeal';
import IconTask from '../IconTask/IconTask';
import IconMeeting from '../IconMeeting/IconMeeting';

const SubscriptionPage = ({ onShowSubscriptionCheckoutModal }) => {
    return (
        <div className="subscriptionPage">
            <div className="titleBlock">
                <div className="titleBlockLeft">
                    <h2>
                        <i className="fa fa-envelope-o"/>
                        <span>SUBSCRIPTION</span>
                    </h2>
                </div>
            </div>
            <div className="mainContainer">
                <div className="subscriptionBlock">
                    <div className="subscriptionBlockTitle">
                        <div className="img"><img src={require('./timer-ico.png')} alt=""/></div>
                        <div className="titleText">
                            <h3>Zahaya Subscription</h3>
                            <h4>Paket anda akan berakhir pada</h4>
                        </div>
                        <button className="titleButton">{moment.unix(jwtDecode(cookieAuthToken()).exp).locale('en').format('DD MMMM YYYY')}</button>
                    </div>
                    <div className="subscriptionBlockMain">
                        <h4>Perbaharui akun anda untuk tetap dapat menggunakan Zahaya CRM, dengan berbagai fitur dibawah ini:</h4>
                        <div className="subscriptionMainContentBlock">
                            <div className="subscriptionMainContentLeft">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="faData">
                                            <IconDashboard
                                                width="24px"
                                                height="24px"
                                                view="0 0 24 24"
                                                color="#00e676"
                                            />
                                        </td>
                                        <td className="textData">
                                            Dashboard
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="faData">
                                            <IconLeads
                                                width="24px"
                                                height="24px"
                                                view="0 0 24 24"
                                                color="#f9a825"
                                            />
                                        </td>
                                        <td className="textData">
                                            Lead Management
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="faData">
                                            <IconAccount
                                                width="24px"
                                                height="24px"
                                                view="0 0 24 24"
                                                color="#ff7043"
                                            />
                                        </td>
                                        <td className="textData">
                                            Account Management
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="faData">
                                            <IconContact
                                                width="24px"
                                                height="24px"
                                                view="0 -4 20 24"
                                                color="#82b1ff"
                                            />
                                        </td>
                                        <td className="textData">
                                            Contact Management
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="faData">
                                            <IconDeal
                                                width="24px"
                                                height="24px"
                                                view="0 0 26 14"
                                                color="#dba1ff"
                                            />
                                        </td>
                                        <td className="textData">
                                            Deals Management
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="faData">
                                            <IconTask
                                                width="24px"
                                                height="24px"
                                                view="-2 0 24 18"
                                                color="#7986cb"
                                            />
                                        </td>
                                        <td className="textData">
                                            Task Management
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="faData">
                                            <IconMeeting
                                                width="24px"
                                                height="24px"
                                                view="0 -2 25 13"
                                                color="#00bfa5"
                                            />
                                        </td>
                                        <td className="textData">
                                            Meeting Management
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="subscriptionMainContentRight">
                                <h3>Pilih Paket</h3>
                                <SubscriptionPlanForm
                                    initialValues={{
                                        subscriptionPlan: '660000'
                                    }}
                                />
                                <button className="upgradeButton" onClick={onShowSubscriptionCheckoutModal}>UPGRADE SEKARANG</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SubscriptionModal/>
        </div>
    );
};

SubscriptionPage.propTypes = {
    onShowSubscriptionCheckoutModal: React.PropTypes.func
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowSubscriptionCheckoutModal: () => {
            dispatch(showSubscriptionCheckoutModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);
