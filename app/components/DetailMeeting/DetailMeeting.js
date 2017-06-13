import React from 'react';
import { connect } from 'react-redux';
import './DetailMeeting.scss';
import {getEventDetail, getEventDetailNotes, createActivityNote} from '../../actions/activityDetailActions';
import { getMeetingContacts, getMeetingAccounts } from '../../actions/meetingsActions';
import { initInitialModalData, showUpdateMeetingModal, delInitialModalData } from '../../actions/modalsActions';
import ActivityNoteForm from '../ActivityNoteForm/ActivityNoteForm';
import Contact from '../Contact/Contact';
import Account from '../Account/Account';
import {reset} from 'redux-form';
import moment from 'moment';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { leadContactSelected, contactCtChanged, contactIdChanged } from '../../actions/leadContactActions';
import { dealSelected } from '../../actions/dealFieldActions';
import { employeeSuggestionSelected } from '../../actions/employeesActions';

class DetailMeeting extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }
    render() {
        const { meetingsReducer: {meetingContacts, meetingAccounts}, localState, auth, params, onShowUpdateMeetingModal } = this.props;

        return (
            <div className="detailPage meeting">
                <div className="detailMainBlock">
                    <div className="detailTitle">
                        <div className="detailTitleContainer">
                            <div className="detailTitleInputsBlock">
                                <div className="detailTitleLeft">
                                    <button onClick={browserHistory.goBack}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"/>
                                    </button>
                                    <button onClick={(e) => {onShowUpdateMeetingModal(e, localState.activityDetail);}}>
                                        <i className="fa fa-pencil" aria-hidden="true"/>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflowBlock">
                        <div className="detailMeetingBlock">
                            <div className="borderBlock">
                                <div className="topBlock">
                                    <table className="mainInfo">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className="namesBlock">
                                                    <h3>{localState.activityDetail.subject}</h3>
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
                                            <h5>Meeting Information</h5>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td className="nameData">Customer</td>
                                                    <td className="valueData">
                                                        {auth.user.model_meta && (localState.activityDetail.contact_ct === auth.user.model_meta.lead ?
                                                            <Link to={'/detail-lead/' + localState.activityDetail.contact_id}>{localState.activityDetail.contact_first_name} {localState.activityDetail.contact_last_name}</Link> :
                                                            <Link to={'/detail-contact/' + localState.activityDetail.contact_id}>{localState.activityDetail.contact_first_name} {localState.activityDetail.contact_last_name}</Link>)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Start Time</td>
                                                    <td className="valueData">{ (localState.activityDetailSuccess && localState.activityDetail ) && moment(localState.activityDetail.start_time).format('DD MMM YYYY hh:mmA')}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">End Time</td>
                                                    <td className="valueData">{ (localState.activityDetailSuccess && localState.activityDetail && localState.activityDetail.duration) && moment(localState.activityDetail.start_time).minutes(localState.activityDetail.duration).format('DD MMM YYYY hh:mmA')}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Deal</td>
                                                    <td className="valueData">
                                                        <Link to={'/detail-deal/' + localState.activityDetail.deal}>{localState.activityDetail.deal_name}</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Meeting Owner</td>
                                                    <td className="valueData">{localState.activityDetail.employee_first_name} {localState.activityDetail.employee_last_name}</td>
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
                                                    <td className="valueData">{localState.activityDetail.street}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">City</td>
                                                    <td className="valueData">{localState.activityDetail.city}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">State</td>
                                                    <td className="valueData">{localState.activityDetail.state}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Country</td>
                                                    <td className="valueData">{localState.activityDetail.country}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Postal Code</td>
                                                    <td className="valueData">{localState.activityDetail.pos_code}</td>
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
                                    <p>{localState.activityDetail.street}</p>
                                </div>
                            </div>
                            <div className="meetingResultBlock">
                                <h5>Meeting Result</h5>
                                <ActivityNoteForm onSubmit={(values) => {this.props.createActivityNote(auth.user.model_meta.event, params.id, values.note);}}/>
                            </div>

                            {localState.activityDetailNotesSuccess && localState.activityDetailNotes.map((note) => {
                                return (
                                    <div key={note.id} className="commentsBlock">
                                        <div className="commentAvatar" style={{backgroundImage: `url(${note.employee_prof_pic})`}}></div>
                                        <div className="textBlock">
                                            <div className="commentation">{note.note}</div>
                                            <div className="commentDesc">by <span>{note.employee_first_name} {note.employee_last_name}</span> on {moment(note.created_at).format('DD MMM YYYY hh:mmA')}</div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
                <div className="rightBlock">
                    <Tabs>
                        <TabList className="rightBlockTitle">
                            <Tab>Contact</Tab>
                            <Tab>Account</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="rightBlockContent">
                                <Contact
                                    contact={meetingContacts}
                                    authReducer={auth}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="rightBlockContent">
                                <Account
                                    account={meetingAccounts}
                                />
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

DetailMeeting.propTypes = {
    localState: React.PropTypes.object,
    meetingsReducer: React.PropTypes.object,
    auth: React.PropTypes.object,
    params: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    createActivityNote: React.PropTypes.func,
    onShowUpdateMeetingModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        localState: state.activityDetailReducer,
        auth: state.authReducer,
        meetingsReducer: state.meetingsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => {
            dispatch(getEventDetail(id));
            dispatch(getMeetingContacts(id));
            dispatch(getMeetingAccounts(id));
            dispatch(getEventDetailNotes(id));
        },
        createActivityNote: (contentType, objectId, note) => {
            const data = {content_type: contentType, object_id: objectId, note: note};
            dispatch(createActivityNote(data));
            dispatch(reset('ActivityNoteForm'));
        },
        onShowUpdateMeetingModal: (e, activityDetail) => {
            e.preventDefault();
            dispatch(delInitialModalData());

            const customerData = {
                first_name: activityDetail.contact_first_name,
                last_name: activityDetail.contact_last_name,
                company: activityDetail.company,
                company_name: activityDetail.company_name
            };
            dispatch(leadContactSelected(customerData));
            dispatch(contactIdChanged(activityDetail.contact_id));
            dispatch(contactCtChanged(activityDetail.contact_ct));

            if (activityDetail.deal) {
                const dealData = {
                    name: activityDetail.deal_name,
                    id: activityDetail.deal
                };
                dispatch(dealSelected(dealData));
            }

            const employeeData = {
                first_name: activityDetail.employee_first_name,
                last_name: activityDetail.employee_last_name,
                user: activityDetail.employee
            };
            dispatch(employeeSuggestionSelected(employeeData));

            const data = {
                subject: activityDetail.subject,
                startTime: activityDetail.start_time ? moment(activityDetail.start_time) : null,
                duration: activityDetail.duration,
                description: activityDetail.description,
                street: activityDetail.street,
                city: activityDetail.city,
                state: activityDetail.state,
                country: activityDetail.country,
                posCode: activityDetail.pos_code,
            };

            dispatch(initInitialModalData(data));
            dispatch(showUpdateMeetingModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMeeting);
