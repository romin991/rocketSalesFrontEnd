import React from 'react';
import { connect } from 'react-redux';
import './DetailDeal.scss';
import { getDealDetail } from '../../actions/customerDetailActions';
import CustomerDetailTasks from '../CustomerDetailTasks/CustomerDetailTasks';
import CustomerDetailMeetings from '../CustomerDetailMeetings/CustomerDetailMeetings';
import CloseDealModal from '../CloseDealModal/CloseDealModal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TimeLine from '../TimeLine/TimeLine';
import Notes from '../Notes/Notes';
import { browserHistory } from 'react-router';
import { DEAL } from '../../constants';
import { showCreateTaskModal, showCreateMeetingModal, showUpdateDealModal, initInitialModalData, delInitialModalData } from '../../actions/modalsActions';
import { dealSelected } from '../../actions/dealFieldActions';
import { leadContactSelected, contactCtChanged, contactIdChanged } from '../../actions/leadContactActions';
import classNames from 'classnames';
import { Link } from 'react-router';
import moment from 'moment';
import { formatIdr } from '../../utils/normalizeIdr';
import { employeeSuggestionSelected } from '../../actions/employeesActions';
import { contactSelected } from '../../actions/contactFieldActions';
import { updateDeal } from '../../actions/dealsActions';
import { showCloseDealModal } from '../../actions/modalsActions';

class DetailDeal extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }


    render() {
        const { localState, auth, params, onShowCreateTaskModal, onShowCreateMeetingModal, onShowUpdateDealModal, onChangeDealStatus, onShowCloseDealModal } = this.props;
        const detailId = params.id;

        const statusOpenedClasses = classNames({
            'openDeal': true,
            'active': localState.customerDetail.status === 'O',
        });

        const statusInProcessClasses = classNames({
            'inProgressDeal': true,
            'active': localState.customerDetail.status === 'P',
        });

        const statusClosedClasses = classNames({
            'closedDeal': true,
            'won': localState.customerDetail.status === 'CW',
            'lost': localState.customerDetail.status === 'CL'
        });

        return (
            <div className="detailPage deal">
                <div className="detailMainBlock">
                    <div className="detailTitle">
                        <div className="detailTitleContainer">
                            <div className="detailTitleInputsBlock">
                                <div className="detailTitleLeft">
                                    <button onClick={browserHistory.goBack}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"/>
                                    </button>
                                    <button onClick={(e) => {onShowUpdateDealModal(e, localState.customerDetail);}}>
                                        <i className="fa fa-pencil" aria-hidden="true"/>
                                        <span>Edit</span>
                                    </button>
                                </div>
                                <div className="detailTitleRight">
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
                        <div className="detailDealBlock">
                            <div className="borderBlock">
                                <div className="topBlock">
                                    <table className="mainInfo">
                                        <tbody>
                                        <tr>
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
                                <div className="dealStatus">
                                    <div className={statusOpenedClasses} onClick={() => {onChangeDealStatus(detailId, {status: 'O'});}}>
                                        Open
                                        <div className="triangle-right1"></div>
                                        <div className="triangle-right2"></div>
                                    </div>
                                    <div className={statusInProcessClasses} onClick={() => {onChangeDealStatus(detailId, {status: 'P'});}}>
                                        In Progress
                                        <div className="triangle-right1"></div>
                                        <div className="triangle-right2"></div>
                                    </div>
                                    <div className={statusClosedClasses} onClick={onShowCloseDealModal}>
                                        Closed
                                        {localState.customerDetail.status === 'CW' && <span> won</span>}
                                        {localState.customerDetail.status === 'CL' && <span> lost</span>}
                                    </div>
                                </div>
                                <table className="informationTable">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <h5>Deal Information</h5>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className="nameData">Contact</td>
                                                    <td className="valueData">
                                                        <Link to={'/detail-contact/' + localState.customerDetail.customer}>{localState.customerDetail.customer_first_name} {localState.customerDetail.customer_last_name}</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Revenue</td>
                                                    <td className="valueData">{localState.customerDetail.expected_revenue ? formatIdr(localState.customerDetail.expected_revenue) : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Closing Date</td>
                                                    <td className="valueData">{localState.customerDetail.expected_closing_date ? moment(localState.customerDetail.expected_closing_date).format('DD MMM YYYY') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Deal Owner</td>
                                                    <td className="valueData">{localState.customerDetail.employee_first_name} {localState.customerDetail.employee_last_name}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="vLine">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <br/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Account</td>
                                                    <td className="valueData">
                                                        <Link to={'/detail-account/' + localState.customerDetail.company}>{localState.customerDetail.company_name}</Link>
                                                    </td>
                                                </tr>
                                                {localState.customerDetail.status === 'CL' &&
                                                <tr>
                                                    <td className="nameData">Lost Reason</td>
                                                    <td className="valueData">{localState.customerDetail.lost_note}</td>
                                                </tr>
                                                }
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
                        <CustomerDetailTasks id={params.id} type={DEAL}/>
                        <CustomerDetailMeetings id={params.id} type={DEAL}/>
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
                                    listType="deals"
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <Notes
                                detailId={detailId}
                                listType="deals"
                                modelMetaKey="deal"
                            />
                        </TabPanel>
                    </Tabs>
                </div>
                <CloseDealModal
                    dealId={params.id}
                />
            </div>
        );
    }
}

DetailDeal.propTypes = {
    localState: React.PropTypes.object,
    auth: React.PropTypes.object,
    params: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    onShowCreateTaskModal: React.PropTypes.func,
    onShowCreateMeetingModal: React.PropTypes.func,
    onShowUpdateDealModal: React.PropTypes.func,
    onChangeDealStatus: React.PropTypes.func,
    onShowCloseDealModal: React.PropTypes.func
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
            dispatch(getDealDetail(id));
        },
        onShowCreateTaskModal: (e, dealDetailData, ct) => {
            e.preventDefault();

            const customerData = {
                first_name: dealDetailData.customer_first_name,
                last_name: dealDetailData.customer_last_name,
                company: dealDetailData.company,
                company_name: dealDetailData.company_name
            };
            dispatch(leadContactSelected(customerData));
            dispatch(contactIdChanged(dealDetailData.customer));
            dispatch(contactCtChanged(ct));

            const dealData = {
                id: dealDetailData.id,
                name: dealDetailData.name
            };
            dispatch(dealSelected(dealData));

            dispatch(delInitialModalData());
            dispatch(showCreateTaskModal());
        },
        onShowCreateMeetingModal: (e, dealDetailData, ct) => {
            e.preventDefault();

            const customerData = {
                first_name: dealDetailData.customer_first_name,
                last_name: dealDetailData.customer_last_name,
                company: dealDetailData.company,
                company_name: dealDetailData.company_name
            };
            dispatch(leadContactSelected(customerData));
            dispatch(contactIdChanged(dealDetailData.customer));
            dispatch(contactCtChanged(ct));

            const dealData = {
                id: dealDetailData.id,
                name: dealDetailData.name
            };
            dispatch(dealSelected(dealData));

            dispatch(delInitialModalData());
            const data = {duration: 60};
            dispatch(initInitialModalData(data));
            dispatch(showCreateMeetingModal());
        },
        onShowUpdateDealModal: (e, customerDetail) => {
            e.preventDefault();
            dispatch(delInitialModalData());

            const employeeData = {
                first_name: customerDetail.employee_first_name,
                last_name: customerDetail.employee_last_name,
                user: customerDetail.employee
            };
            dispatch(employeeSuggestionSelected(employeeData));

            const customerData = {
                id: customerDetail.customer,
                first_name: customerDetail.customer_first_name,
                last_name: customerDetail.customer_last_name,
                company: customerDetail.company,
                company_name: customerDetail.company_name
            };
            dispatch(contactSelected(customerData));

            const data = {
                name: customerDetail.name,
                revenue: formatIdr(customerDetail.expected_revenue),
                closingDate: customerDetail.expected_closing_date ? moment(customerDetail.expected_closing_date) : null,
                stage: customerDetail.status,
                description: customerDetail.description
            };

            dispatch(initInitialModalData(data));
            dispatch(showUpdateDealModal());
        },
        onChangeDealStatus: (id, data) => {
            dispatch(updateDeal(id, data));
        },
        onShowCloseDealModal: () => {
            dispatch(showCloseDealModal());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailDeal);
