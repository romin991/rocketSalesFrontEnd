import React from 'react';
import { connect } from 'react-redux';
import './DetailContact.scss';
import { getContactDetail } from '../../actions/customerDetailActions';
import CustomerDetailTasks from '../CustomerDetailTasks/CustomerDetailTasks';
import CustomerDetailMeetings from '../CustomerDetailMeetings/CustomerDetailMeetings';
import CustomerDetailDeals from '../CustomerDetailDeals/CustomerDetailDeals';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TimeLine from '../TimeLine/TimeLine';
import Notes from '../Notes/Notes';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import {CONTACT} from '../../constants';
import { showCreateDealModal, showCreateTaskModal, showCreateMeetingModal, showUpdateContactModal, initInitialModalData, delInitialModalData } from '../../actions/modalsActions';
import { leadContactSelected, contactCtChanged, contactIdChanged } from '../../actions/leadContactActions';
import { contactSelected } from '../../actions/contactFieldActions';
import { employeeSuggestionSelected } from '../../actions/employeesActions';
import { initContactCloudinaryImage } from '../../actions/cloudinaryActions';
import { accountSuggestSelected } from '../../actions/accountsActions';

class DetailContact extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }

    render() {
        const { localState, auth, params, onShowCreateDealModal, onShowCreateTaskModal, onShowCreateMeetingModal, onShowUpdateContactModal } = this.props;
        const detailId = params.id;

        return (
            <div className="detailPage contact">
                <div className="detailMainBlock">
                    <div className="detailTitle">
                        <div className="detailTitleContainer">
                            <div className="detailTitleInputsBlock">
                                <div className="detailTitleLeft">
                                    <button onClick={browserHistory.goBack}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"/>
                                    </button>
                                    <button onClick={(e) => {onShowUpdateContactModal(e, localState.customerDetail);}}>
                                        <i className="fa fa-pencil" aria-hidden="true"/>
                                        <span>Edit</span>
                                    </button>
                                </div>
                                <div className="detailTitleRight">
                                    <button className="plusButton" onClick={(e) => {onShowCreateDealModal(e, localState.customerDetail);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={(e) => {onShowCreateDealModal(e, localState.customerDetail);}}>
                                        <span>Create Deal</span>
                                    </button>
                                    <button className="plusButton" onClick={(e) => {onShowCreateTaskModal(e, localState.customerDetail, auth.user.model_meta.customer);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={(e) => {onShowCreateTaskModal(e, localState.customerDetail, auth.user.model_meta.customer);}}>
                                        <span>Create Task</span>
                                    </button>
                                    <button className="plusButton" onClick={(e) => {onShowCreateMeetingModal(e, localState.customerDetail, auth.user.model_meta.customer);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={(e) => {onShowCreateMeetingModal(e, localState.customerDetail, auth.user.model_meta.customer);}}>
                                        <span>Create Meeting</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflowBlock">
                        <div className="detailContactBlock">
                            <div className="borderBlock">
                                <div className="topBlock">
                                    <table className="mainInfo">
                                        <tbody>
                                        <tr>
                                            <td className="photo" style={{backgroundImage: `url(${localState.customerDetail.prof_pic})`}}>
                                            </td>
                                            <td>
                                                <div className="namesBlock">
                                                    <h3>{localState.customerDetail.title} {localState.customerDetail.first_name} {localState.customerDetail.last_name}</h3>
                                                    <h4><Link to={'/detail-account/' + localState.customerDetail.company}>{localState.customerDetail.company_name}</Link></h4>
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
                                    <tr>
                                        <td>
                                            <h5>Contact Information</h5>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className="nameData">Phone</td>
                                                    <td className="valueData">{localState.customerDetail.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Mobile</td>
                                                    <td className="valueData">{localState.customerDetail.mobile_phone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Secondary Mobile</td>
                                                    <td className="valueData">{localState.customerDetail.secondary_mobile_phone}</td>
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
                                                    <td className="nameData">Position</td>
                                                    <td className="valueData">{localState.customerDetail.position}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Lead Origin</td>
                                                    <td className="valueData">
                                                        <Link
                                                            to={'/detail-lead/' + localState.customerDetail.lead_origin}>
                                                            {localState.customerDetail.lead_origin_first_name} {localState.customerDetail.lead_origin_last_name}
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Contact Owner</td>
                                                    <td className="valueData">{localState.customerDetail.employee_first_name} {localState.customerDetail.employee_last_name}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="vLine">
                                            <h5>Address Information</h5>
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
                        <CustomerDetailTasks id={params.id} type={CONTACT}/>
                        <CustomerDetailMeetings id={params.id} type={CONTACT}/>
                        <CustomerDetailDeals id={params.id} type={CONTACT}/>
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
                                    listType="customers"
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <Notes
                                detailId={detailId}
                                listType="customers"
                                modelMetaKey="customer"
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

DetailContact.propTypes = {
    localState: React.PropTypes.object,
    auth: React.PropTypes.object,
    params: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    onShowCreateDealModal: React.PropTypes.func,
    onShowCreateTaskModal: React.PropTypes.func,
    onShowCreateMeetingModal: React.PropTypes.func,
    onShowUpdateContactModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        localState: state.customerDetailReducer,
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => {
            dispatch(getContactDetail(id));
        },
        onShowCreateDealModal: (e, customerData) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            dispatch(contactSelected(customerData));
            dispatch(showCreateDealModal());
        },
        onShowCreateTaskModal: (e, customerData, customerType) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            dispatch(leadContactSelected(customerData));
            dispatch(contactIdChanged(customerData.id));
            dispatch(contactCtChanged(customerType));
            dispatch(showCreateTaskModal());
        },
        onShowCreateMeetingModal: (e, customerData, customerType) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            dispatch(leadContactSelected(customerData));
            dispatch(contactIdChanged(customerData.id));
            dispatch(contactCtChanged(customerType));
            const data = {duration: 60};
            dispatch(initInitialModalData(data));
            dispatch(showCreateMeetingModal());
        },
        onShowUpdateContactModal: (e, customerDetail) => {
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
            dispatch(initContactCloudinaryImage(cloudinaryData));

            const accountData = {
                name: customerDetail.company_name,
                id: customerDetail.company
            };
            dispatch(accountSuggestSelected(accountData));

            const data = {
                hideAddress: true,
                firstName: customerDetail.first_name,
                lastName: customerDetail.last_name,
                phone: customerDetail.phone,
                mobile: customerDetail.mobile_phone,
                secMobilePhone: customerDetail.secondary_mobile_phone,
                email: customerDetail.email,
                fax: customerDetail.fax,
                position: customerDetail.position,
                street: customerDetail.street,
                city: customerDetail.city,
                state: customerDetail.state,
                country: customerDetail.country,
                posCode: customerDetail.pos_code,
                description: customerDetail.description
            };

            dispatch(initInitialModalData(data));
            dispatch(showUpdateContactModal());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailContact);
