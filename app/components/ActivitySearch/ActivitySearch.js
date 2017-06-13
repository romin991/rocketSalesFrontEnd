import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import moment from 'moment';
import {browserHistory} from 'react-router';
import { formatIdr } from '../../utils/normalizeIdr';

const ActivitySearch = ({algoliaSearchReducer, onTaskClick, onMeetingClick, onDealClick}) => {
    return (
        <div>

            <div className="tasks listPage">
                <div className="listTitle">
                    <h3>Task</h3>
                </div>

                {(algoliaSearchReducer.algoliaTasksListSuccess && algoliaSearchReducer.algoliaTasksList.length > 0) &&
                <div className="listTable">
                    <table>
                        <thead>
                            <tr>
                                <td>SUBJECT</td>
                                <td>CUSTOMER</td>
                                <td>STATUS</td>
                                <td>PRIORITY</td>
                                <td>DUE DATE</td>
                                <td>TASK OWNER</td>
                            </tr>
                        </thead>
                        <tbody>
                            {algoliaSearchReducer.algoliaTasksList.map((task, index) => {
                                const rowClasses = classNames({
                                    greyRow: Boolean((index + 1) % 2 === 0)
                                });

                                return (
                                    <tr key={task.id} className={rowClasses} onClick={e => {
                                        onTaskClick(e, task.id);
                                    }}>
                                        <td>{task.subject}</td>
                                        <td>{task.contact_first_name} {task.contact_last_name}</td>
                                        <td> {(() => {
                                            switch (task.status) {
                                                case 'C':
                                                    return 'Closed';
                                                case 'P':
                                                    return 'Progress';
                                                case 'O':
                                                    return 'Open';
                                                default:
                                                    return '';
                                            }
                                        })()}</td>
                                        <td> {(() => {
                                            switch (task.priority) {
                                                case 'L':
                                                    return 'Low';
                                                case 'M':
                                                    return 'Medium';
                                                case 'H':
                                                    return 'High';
                                                default:
                                                    return '';
                                            }
                                        })()}</td>
                                        <td>{task.due_date ? moment(task.due_date).format('DD MMM YYYY') : ''}</td>
                                        <td>{task.employee_first_name} {task.employee_last_name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                }
            </div>

            <div className="meetings listPage">
                <div className="listTitle">
                    <h3>Meeting</h3>
                </div>

                {(algoliaSearchReducer.algoliaEventsListSuccess && algoliaSearchReducer.algoliaEventsList.length > 0) &&
                <div className="listTable">
                    <table>
                        <thead>
                            <tr>
                                <td>SUBJECT</td>
                                <td>CUSTOMER</td>
                                <td>START TIME</td>
                                <td>END TIME</td>
                                <td>MEETING OWNER</td>
                            </tr>
                        </thead>
                        <tbody>
                            {algoliaSearchReducer.algoliaEventsList.map((meeting, index) => {
                                const rowClasses = classNames({
                                    greyRow: Boolean((index + 1) % 2 === 0)
                                });

                                return (
                                    <tr key={meeting.id} className={rowClasses} onClick={e => {
                                        onMeetingClick(e, meeting.id);
                                    }}>
                                        <td>{meeting.subject}</td>
                                        <td>{meeting.contact_first_name} {meeting.contact_last_name}</td>
                                        <td>{moment(meeting.start_time).format('DD MMM YYYY hh:mmA')}</td>
                                        <td>{moment(meeting.start_time).minutes(meeting.duration).format('DD MMM YYYY hh:mmA')}</td>
                                        <td>{meeting.employee_first_name} {meeting.employee_last_name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                }
            </div>

            <div className="deals listPage">
                <div className="listTitle">
                    <h3>Deal</h3>
                </div>

                {(algoliaSearchReducer.algoliaDealsListSuccess && algoliaSearchReducer.algoliaDealsList.length > 0) &&
                <div className="listTable">
                    <table>
                        <thead>
                        <tr>
                            <td>NAME</td>
                            <td>CONTACT</td>
                            <td>REVENUE</td>
                            <td>CLOSING DATE</td>
                            <td>STAGE</td>
                            <td>DEAL OWNER</td>
                        </tr>
                        </thead>
                        <tbody>
                        {algoliaSearchReducer.algoliaDealsList.map((deal, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={deal.id} className={rowClasses} onClick={e => {onDealClick(e, deal.id);}}>
                                    <td>{deal.name}</td>
                                    <td>{deal.customer_first_name} {deal.customer_last_name}</td>
                                    <td>{deal.expected_revenue ? formatIdr(deal.expected_revenue) : ''}</td>
                                    <td>{deal.expected_closing_date ? moment(deal.expected_closing_date).format('DD MMM YYYY') : ''}</td>
                                    <td>{(() => {
                                        switch (deal.status) {
                                            case 'O': return 'Open';
                                            case 'P': return 'Progress';
                                            case 'CW':  return 'Won';
                                            case 'CL':  return 'Lost';
                                            default:    return '';
                                        }
                                    })()}</td>
                                    <td>{deal.employee_first_name} {deal.employee_last_name}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                }
            </div>

        </div>

    );
};

ActivitySearch.propTypes = {
    algoliaSearchReducer: React.PropTypes.object,
    onTaskClick: React.PropTypes.func,
    onMeetingClick: React.PropTypes.func,
    onDealClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        algoliaSearchReducer: state.algoliaSearchReducer
    };
};

const mapDispatchToProps = () => {
    return {
        onTaskClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-task/${id}`);
        },
        onMeetingClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-meeting/${id}`);
        },
        onDealClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-deal/${id}`);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySearch);
