import React from 'react';
import { connect } from 'react-redux';
import './DetailAccount.scss';
import { getAccountDetail } from '../../actions/customerDetailActions';
import { Link } from 'react-router';
import CustomerDetailTasks from '../CustomerDetailTasks/CustomerDetailTasks';
import CustomerDetailMeetings from '../CustomerDetailMeetings/CustomerDetailMeetings';
import CustomerDetailDeals from '../CustomerDetailDeals/CustomerDetailDeals';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TimeLine from '../TimeLine/TimeLine';
import Notes from '../Notes/Notes';
import { browserHistory } from 'react-router';
import {ACCOUNT} from '../../constants';
import { showCreateTaskModal, showCreateMeetingModal, showCreateContactModal, showUpdateAccountModal, initInitialModalData, delInitialModalData } from '../../actions/modalsActions';
import { employeeSuggestionSelected } from '../../actions/employeesActions';
import { initAccountCloudinaryImage } from '../../actions/cloudinaryActions';
import { accountSuggestSelected } from '../../actions/accountsActions';

class DetailAccount extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }

    render() {
        const { localState, params, onShowCreateContactModal, onShowCreateTaskModal, onShowCreateMeetingModal, onShowUpdateAccountModal } = this.props;
        const detailId = params.id;

        return (
            <div className="detailPage account">
                <div className="detailMainBlock">
                    <div className="detailTitle">
                        <div className="detailTitleContainer">
                            <div className="detailTitleInputsBlock">
                                <div className="detailTitleLeft">
                                    <button onClick={browserHistory.goBack}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"/>
                                    </button>
                                    <button onClick={(e) => {onShowUpdateAccountModal(e, localState.customerDetail);}}>
                                        <i className="fa fa-pencil" aria-hidden="true"/>
                                        <span>Edit</span>
                                    </button>
                                </div>
                                <div className="detailTitleRight">
                                    <button className="plusButton" onClick={e => {onShowCreateContactModal(e, localState.customerDetail);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={e => {onShowCreateContactModal(e, localState.customerDetail);}}>
                                        <span>Create Contact</span>
                                    </button>
                                    <button className="plusButton" onClick={e => {onShowCreateTaskModal(e);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={e => {onShowCreateTaskModal(e);}}>
                                        <span>Create Task</span>
                                    </button>
                                    <button className="plusButton" onClick={e => {onShowCreateMeetingModal(e);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={e => {onShowCreateMeetingModal(e);}}>
                                        <span>Create Meeting</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflowBlock">
                        <div className="detailLeadBlock">
                            <div className="borderBlock">
                                <div className="topBlock">
                                    <table className="mainInfo">
                                        <tbody>
                                        <tr>
                                            <td className="photo" style={{backgroundImage: `url(${localState.customerDetail.prof_pic})`}}>
                                                {!localState.customerDetail.prof_pic && <i className="fa fa-user"/>}
                                            </td>
                                            <td>
                                                <div className="namesBlock">
                                                    <h3>{localState.customerDetail.name}</h3>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="hLine">
                                </div>
                                <table className="informationTable">
                                    <tbody>
                                    <tr className="vLine">
                                        <td>
                                            <h5>Account Information</h5>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className="nameData">Phone</td>
                                                        <td className="valueData">{localState.customerDetail.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="nameData">Email</td>
                                                        <td className="valueData">{localState.customerDetail.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="nameData">Fax</td>
                                                        <td className="valueData">{localState.customerDetail.fax}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="nameData">Industry</td>
                                                        <td className="valueData">{localState.customerDetail.industry}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="nameData">Website</td>
                                                        <td className="valueData">{localState.customerDetail.company_website}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="nameData">Account Owner</td>
                                                        <td className="valueData">{localState.customerDetail.employee_first_name} {localState.customerDetail.employee_last_name}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <h5>Contact</h5>
                                            {localState.customerDetail.active_customers && localState.customerDetail.active_customers.map((contact) => {
                                                return (

                                                    <div key={contact.id}>
                                                        <table>
                                                            <tr>
                                                                <td className="photoData">
                                                                    <div className="smallPhoto" style={{backgroundImage: `url(${contact.prof_pic})`}}></div>
                                                                </td>
                                                                <td className="tableData">
                                                                    <table>
                                                                        <thead>
                                                                        <tr>
                                                                            <td colSpan="2">
                                                                                <Link to={'/detail-contact/' + contact.id}>
                                                                                    {contact.first_name} {contact.last_name}
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                        </thead>
                                                                        <tr>
                                                                            <td className="iconData">
                                                                                <i className="fa fa-envelope-o"
                                                                                   aria-hidden="true"/>
                                                                            </td>
                                                                            <td className="spanData">
                                                                                <span>{contact.email}</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="iconData">
                                                                                <i className="fa fa-phone" aria-hidden="true"/>
                                                                            </td>
                                                                            <td className="spanData">
                                                                                <span>{contact.phone}</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="iconData">
                                                                                <i className="fa fa-phone" aria-hidden="true"/>
                                                                            </td>
                                                                            <td className="spanData">
                                                                                <span>{contact.mobile_phone}</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        <td className="vLine">
                                            <h5>Shipping Address</h5>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className="nameData">Street</td>
                                                    <td className="valueData">{localState.customerDetail.street}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">City</td>
                                                    <td className="valueData">{localState.customerDetail.city}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">State</td>
                                                    <td className="valueData">{localState.customerDetail.state}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Country</td>
                                                    <td className="valueData">{localState.customerDetail.country}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Postal Code</td>
                                                    <td className="valueData">{localState.customerDetail.pos_code}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <h5>Billing Address</h5>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className="nameData">Street</td>
                                                    <td className="valueData">{localState.customerDetail.shipping_street}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">City</td>
                                                    <td className="valueData">{localState.customerDetail.shipping_city}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">State</td>
                                                    <td className="valueData">{localState.customerDetail.shipping_state}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Country</td>
                                                    <td className="valueData">{localState.customerDetail.shipping_country}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Postal Code</td>
                                                    <td className="valueData">{localState.customerDetail.shipping_pos_code}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="hLine2">
                                </div>
                                <div className="descriptionInfo">
                                    <h5>Description Information</h5>
                                    <p>{localState.customerDetail.description}</p>
                                </div>
                            </div>
                        </div>
                        <CustomerDetailTasks id={params.id} type={ACCOUNT}/>
                        <CustomerDetailMeetings id={params.id} type={ACCOUNT}/>
                        <CustomerDetailDeals id={params.id} type={ACCOUNT}/>
                    </div>
                </div>
                <div className="rightBlock">
                    <Tabs>
                        <TabList className="rightBlockTitle">
                            <Tab>Timeline</Tab>
                            <Tab>Notes</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="rightBlockContent">
                                <TimeLine
                                    detailId={detailId}
                                    listType="companies"
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <Notes
                                detailId={detailId}
                                listType="companies"
                                modelMetaKey="company"
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

DetailAccount.propTypes = {
    localState: React.PropTypes.object,
    params: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    onShowCreateContactModal: React.PropTypes.func,
    onShowCreateTaskModal: React.PropTypes.func,
    onShowCreateMeetingModal: React.PropTypes.func,
    onShowUpdateAccountModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        localState: state.customerDetailReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => {
            dispatch(getAccountDetail(id));
        },
        onShowCreateContactModal: (e, accountData) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            dispatch(accountSuggestSelected(accountData));

            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateContactModal());
        },
        onShowCreateTaskModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            dispatch(showCreateTaskModal());
        },
        onShowCreateMeetingModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            const data = {duration: 60};
            dispatch(initInitialModalData(data));
            dispatch(showCreateMeetingModal());
        },
        onShowUpdateAccountModal: (e, customerDetail) => {
            e.preventDefault();
            dispatch(delInitialModalData());

            const employeeData = {
                first_name: customerDetail.employee_first_name,
                last_name: customerDetail.employee_last_name,
                user: customerDetail.employee
            };
            dispatch(employeeSuggestionSelected(employeeData));

            const cloudinaryData = {
                url: customerDetail.prof_pic
            };
            dispatch(initAccountCloudinaryImage(cloudinaryData));

            const data = {
                hideAddress: true,
                name: customerDetail.name,
                phone: customerDetail.phone,
                email: customerDetail.email,
                fax: customerDetail.fax,
                industry: customerDetail.industry,
                website: customerDetail.company_website,
                billingStreet: customerDetail.street,
                billingCity: customerDetail.city,
                billingState: customerDetail.state,
                billingCountry: customerDetail.country,
                billingPos: customerDetail.pos_code,
                shippingStreet: customerDetail.shipping_street,
                shippingCity: customerDetail.shipping_city,
                shippingState: customerDetail.shipping_state,
                shippingCountry: customerDetail.shipping_country,
                shippingPos: customerDetail.shipping_pos_code,
                description: customerDetail.description

            };

            dispatch(initInitialModalData(data));
            dispatch(showUpdateAccountModal());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailAccount);
