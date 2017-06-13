import React from 'react';
import { connect } from 'react-redux';
import './DetailTask.scss';
import { getTaskDetail, getTaskDetailNotes, createActivityNote, updateTask } from '../../actions/activityDetailActions';
import { getTaskContacts, getTaskAccounts } from '../../actions/tasksActions';
import { initInitialModalData, showUpdateTaskModal, delInitialModalData } from '../../actions/modalsActions';
import ActivityNoteForm from '../ActivityNoteForm/ActivityNoteForm';
import Contact from '../Contact/Contact';
import Account from '../Account/Account';
import moment from 'moment';
import {reset} from 'redux-form';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { leadContactSelected, contactCtChanged, contactIdChanged } from '../../actions/leadContactActions';
import { dealSelected } from '../../actions/dealFieldActions';
import { employeeSuggestionSelected } from '../../actions/employeesActions';

class DetailTask extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props.params.id);
    }

    render() {
        const { tasksReducer: {taskContacts, taskAccounts}, localState, auth, params } = this.props;

        return (
            <div className="detailPage task">
                <div className="detailMainBlock">
                    <div className="detailTitle">
                        <div className="detailTitleContainer">
                            <div className="detailTitleInputsBlock">
                                <div className="detailTitleLeft">
                                    <button onClick={browserHistory.goBack}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"/>
                                    </button>
                                    <button onClick={(e) => {this.props.onShowUpdateTaskModal(e, localState.activityDetail);}}>
                                        <i className="fa fa-pencil" aria-hidden="true"/>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflowBlock">
                        <div className="detailTaskBlock">
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
                                            {(localState.activityDetail.status === 'O' || localState.activityDetail.status === 'P') &&
                                            <td className="closeTaskBlock">
                                                <button onClick={(e) => {this.props.updateStatus(e, params.id, 'C');}}>
                                                    Close Task
                                                </button>
                                            </td>
                                            }
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
                                            <h5>Task Information</h5>
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
                                                    <td className="nameData">Status</td>
                                                    <td className="valueData">
                                                        {(() => {
                                                            switch (localState.activityDetail.status) {
                                                                case 'C': return 'Closed';
                                                                case 'P': return 'Progress';
                                                                case 'O': return 'Open';
                                                                default:  return '';
                                                            }
                                                        })()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Priority</td>
                                                    <td className="valueData">
                                                        {(() => {
                                                            switch (localState.activityDetail.priority) {
                                                                case 'L': return 'Low';
                                                                case 'M': return 'Medium';
                                                                case 'H': return 'High';
                                                                default:  return '';
                                                            }
                                                        })()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Due Date</td>
                                                    <td className="valueData">{localState.activityDetail.due_date ? moment(localState.activityDetail.due_date).format('DD MMM YYYY') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Deal</td>
                                                    <td className="valueData">
                                                        <Link to={'/detail-deal/' + localState.activityDetail.deal}>{localState.activityDetail.deal_name}</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="nameData">Task Owner</td>
                                                    <td className="valueData">{localState.activityDetail.employee_first_name} {localState.activityDetail.employee_last_name}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="vLine">
                                            <h5>Description Information</h5>
                                            <p>{localState.activityDetail.description}</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="taskResultBlock">
                                <h5>Task Result</h5>
                                <ActivityNoteForm onSubmit={(values) => {this.props.createActivityNote(auth.user.model_meta.task, params.id, values.note);}}/>
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
                                    contact={taskContacts}
                                    authReducer={auth}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="rightBlockContent">
                                <Account
                                    account={taskAccounts}
                                />
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

DetailTask.propTypes = {
    localState: React.PropTypes.object,
    tasksReducer: React.PropTypes.object,
    auth: React.PropTypes.object,
    params: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    createActivityNote: React.PropTypes.func,
    updateStatus: React.PropTypes.func,
    onShowUpdateTaskModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        localState: state.activityDetailReducer,
        auth: state.authReducer,
        tasksReducer: state.tasksReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => {
            dispatch(getTaskDetail(id));
            dispatch(getTaskContacts(id));
            dispatch(getTaskAccounts(id));
            dispatch(getTaskDetailNotes(id));
        },
        createActivityNote: (contentType, objectId, note) => {
            const data = {content_type: contentType, object_id: objectId, note: note};
            dispatch(createActivityNote(data));
            dispatch(reset('ActivityNoteForm'));
        },
        updateStatus: (e, id, status) => {
            e.preventDefault();
            const data = {};
            data.status = status;
            dispatch(updateTask(id, data));
        },
        onShowUpdateTaskModal: (e, activityDetail) => {
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
                status: activityDetail.status,
                priority: activityDetail.priority,
                dueDate: activityDetail.due_date ? moment(activityDetail.due_date) : null,
                description: activityDetail.description,
            };
            dispatch(initInitialModalData(data));
            dispatch(showUpdateTaskModal());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTask);
