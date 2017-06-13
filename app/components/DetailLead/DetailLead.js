import React from 'react';
import { connect } from 'react-redux';
import './DetailLead.scss';
import { getLeadDetail, updateLead, convertLead } from '../../actions/customerDetailActions';
import TimeLine from '../TimeLine/TimeLine';
import Notes from '../Notes/Notes';
import CustomerDetailTasks from '../CustomerDetailTasks/CustomerDetailTasks';
import CustomerDetailMeetings from '../CustomerDetailMeetings/CustomerDetailMeetings';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { browserHistory } from 'react-router';
import {LEAD} from '../../constants';
import { showCreateTaskModal, showCreateMeetingModal, delInitialModalData, showUpdateLeadModal, initInitialModalData } from '../../actions/modalsActions';
import { leadContactSelected, contactCtChanged, contactIdChanged } from '../../actions/leadContactActions';
import { Link } from 'react-router';
import { employeeSuggestionSelected } from '../../actions/employeesActions';
import { initLeadCloudinaryImage } from '../../actions/cloudinaryActions';

class DetailLead extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }

    render() {
        const { localState, auth, params, updateStatus, onConvertLead, onShowCreateTaskModal, onShowCreateMeetingModal, onShowUpdateLeadModal } = this.props;
        const detailId = params.id;

        return (
            <div className="detailPage lead">
                <div className="detailMainBlock">
                    <div className="detailTitle">
                        <div className="detailTitleContainer">
                            <div className="detailTitleInputsBlock">
                                <div className="detailTitleLeft">
                                    <button onClick={browserHistory.goBack}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"/>
                                    </button>
                                    <button onClick={(e) => {onShowUpdateLeadModal(e, localState.customerDetail);}}>
                                        <i className="fa fa-pencil" aria-hidden="true"/>
                                        <span>Edit</span>
                                    </button>
                                    {localState.customerDetail.status !== 'CV' &&
                                        <button onClick={() => onConvertLead(params.id)} disabled={localState.convertLeadLoading}>Convert</button>
                                    }
                                </div>
                                <div className="detailTitleRight">
                                    <button className="plusButton" onClick={(e) => {onShowCreateTaskModal(e, localState.customerDetail, auth.user.model_meta.lead);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={(e) => {onShowCreateTaskModal(e, localState.customerDetail, auth.user.model_meta.lead);}}>
                                        <span>Create Task</span>
                                    </button>
                                    <button className="plusButton" onClick={(e) => {onShowCreateMeetingModal(e, localState.customerDetail, auth.user.model_meta.lead);}}>
                                        <i className="fa fa-plus" aria-hidden="true"/>
                                    </button>
                                    <button className="button" onClick={(e) => {onShowCreateMeetingModal(e, localState.customerDetail, auth.user.model_meta.lead);}}>
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
                                            <td className="photo" style={{backgroundImage: `url(${localState.customerDetail.prof_pic})`}}/>
                                            <td>
                                                <div className="namesBlock">
                                                    <h3>{localState.customerDetail.title} {localState.customerDetail.first_name} {localState.customerDetail.last_name}</h3>
                                                    <h4>{localState.customerDetail.company_name}</h4>
                                                </div>
                                            </td>
                                            <td className="selectData">
                                                <select value={localState.customerDetail.status} onChange={(e) => {updateStatus(params.id, e.target.value);}}>
                                                    {localState.customerDetail.status !== 'CV' && <option value="O">Open</option>}
                                                    {localState.customerDetail.status !== 'CV' && <option value="C">Closed</option>}
                                                    {localState.customerDetail.status === 'CV' && <option value="CV">Converted</option> }
                                                </select>

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
                                            <h5>Lead Information</h5>
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
                                                    <td className="nameData">Lead Source</td>
                                                    <td className="valueData">
                                                        {(() => {
                                                            switch (localState.customerDetail.lead_source) {
                                                                case 'OFA': return 'Offline Ads';
                                                                case 'ONA': return 'Online Ads';
                                                                case 'CC':  return 'Cold Call';
                                                                case 'IR':  return 'Internal Referral';
                                                                case 'ER':  return 'External Referral';
                                                                case 'P':   return 'Partner';
                                                                case 'S':   return 'Sales';
                                                                case 'TS':  return 'Trade Show';
                                                                case 'SR':  return 'Seminar';
                                                                default:    return '';
                                                            }
                                                        })()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Converted to</td>
                                                    <td className="valueData">
                                                        <Link
                                                            to={'/detail-contact/' + localState.customerDetail.converted_customer}>{localState.customerDetail.converted_customer_first_name} {localState.customerDetail.converted_customer_last_name}</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Lead Owner</td>
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
                        <CustomerDetailTasks id={params.id} type={LEAD}/>
                        <CustomerDetailMeetings id={params.id} type={LEAD}/>

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
                                    listType="leads"
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <Notes
                                detailId={detailId}
                                listType="leads"
                                modelMetaKey="lead"
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

DetailLead.propTypes = {
    localState: React.PropTypes.object,
    auth: React.PropTypes.object,
    params: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    updateStatus: React.PropTypes.func,
    onConvertLead: React.PropTypes.func,
    onShowCreateTaskModal: React.PropTypes.func,
    onShowCreateMeetingModal: React.PropTypes.func,
    onShowUpdateLeadModal: React.PropTypes.func
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
            dispatch(getLeadDetail(id));
        },
        updateStatus: (id, status) => {
            const data = {};
            data.status = status;
            dispatch(updateLead(id, data));
        },
        onConvertLead: (id) => {
            dispatch(convertLead(id));
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
        onShowUpdateLeadModal: (e, customerDetail) => {
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
            dispatch(initLeadCloudinaryImage(cloudinaryData));

            const data = {
                hideAddress: true,
                firstName: customerDetail.first_name,
                lastName: customerDetail.last_name,
                company: customerDetail.company_name,
                phone: customerDetail.phone,
                mobile: customerDetail.mobile_phone,
                email: customerDetail.email,
                fax: customerDetail.fax,
                position: customerDetail.position,
                leadSource: customerDetail.lead_source,
                street: customerDetail.street,
                city: customerDetail.city,
                state: customerDetail.state,
                country: customerDetail.country,
                posCode: customerDetail.pos_code,
                description: customerDetail.description
            };
            dispatch(initInitialModalData(data));
            dispatch(showUpdateLeadModal());
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailLead);
