import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './Dashboard.scss';
import { getEntitiesSummary } from '../../actions/entitiesActions';
import { getLeadsSummary } from '../../actions/leadsActions';
import { showSubscriprionNotification, hideSubscriprionNotification } from '../../actions/authActions';
import { getDealsSummary } from '../../actions/dealsActions';
import { getMeetingsList } from '../../actions/meetingsActions';
import { getTasksList } from '../../actions/tasksActions';
import { cookieAuthToken } from '../../constants';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { VictoryPie } from 'victory';
import IconLeads from '../IconLeads/IconLeads';
import IconTask from '../IconTask/IconTask';
import IconMeeting from '../IconMeeting/IconMeeting';
import IconDeal from '../IconDeal/IconDeal';
import moment from 'moment';

class Dashboard extends React.Component {
    componentDidMount() {
        const decodedToken = jwtDecode(cookieAuthToken());

        this.props.onLoad();
        this.props.onMeetingFilterChange(this.props.meetingsReducer.currentMeetingsListType, decodedToken.entity_id);
        this.props.onTaskFilterChange(this.props.tasksReducer.currentTasksListType, decodedToken.entity_id);
    }

    render() {
        const {
            authReducer,
            entitiesReducer: { entitySummary },
            meetingsReducer,
            meetingsReducer: { meetingsList },
            tasksReducer,
            tasksReducer: { tasksList },
            leadsReducer,
            onHideSubscriptionNotification,
            dealsReducer: { dealsSummary }
        } = this.props;

        const decodedToken = jwtDecode(cookieAuthToken());

        const subscriptionDaysLeft = moment.unix(decodedToken.exp).diff(moment(), 'days');

        return (
            <div className="dashboardPage">
                {(subscriptionDaysLeft < 7 && authReducer.showSubscriptionNotification) &&
                <div className="notificationWrapper">
                    <div className="notificationMain">
                        Paket anda akan berakhir pada Tanggal <span>{moment.unix(jwtDecode(cookieAuthToken()).exp).locale('en').format('DD MMMM YYYY')}</span>
                        <Link to="/subscription">UPGRADE</Link>
                        <i className="fa fa-times" onClick={onHideSubscriptionNotification}/>
                    </div>
                </div>
                }
                <div className="dashboard">
                    <table className="mainTable">
                        <thead>
                        <tr>
                            <td>
                                <div className="welcomeBlock">
                                    <h3>Welcome back, <span>{authReducer.user.first_name}</span></h3>
                                </div>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <table className="notificationsBlock">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="openTask notificationBlock">
                                                <div className="iconBlock">
                                                    <IconTask
                                                        width="21px"
                                                        height="26px"
                                                        view="0 0 21 16"
                                                        color="#ffffff"
                                                    />
                                                </div>
                                                <div className="notification">
                                                    <div className="number">{entitySummary.open_task}</div>
                                                    <div className="nameNotification">Open Tasks</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="upcomingMeetings notificationBlock">
                                                <div className="iconBlock">
                                                    <IconMeeting
                                                        width="26px"
                                                        height="26px"
                                                        view="0 0 26 12"
                                                        color="#ffffff"
                                                    />

                                                </div>
                                                <div className="notification">
                                                    <div className="number">{entitySummary.open_event}</div>
                                                    <div className="nameNotification">Upcoming Meetings</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="newLeads notificationBlock">
                                                <div className="iconBlock">
                                                    <IconLeads
                                                        width="24px"
                                                        height="24px"
                                                        view="0 0 24 24"
                                                        color="#ffffff"
                                                    />
                                                </div>
                                                <div className="notification">
                                                    <div className="number">{entitySummary.open_lead}</div>
                                                    <div className="nameNotification">New Leads</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="openDeals notificationBlock">
                                                <div className="iconBlock">
                                                    <IconDeal
                                                        width="28px"
                                                        height="28px"
                                                        view="0 0 24 12"
                                                        color="#ffffff"
                                                    />
                                                </div>
                                                <div className="notification">
                                                    <div className="number">{entitySummary.open_deal}</div>
                                                    <div className="nameNotification">Open Deals</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <Tabs className="circlesBlock">
                                    <TabList>
                                        <Tab className="titleBlock">
                                            <span>Lead Status</span>
                                        </Tab>
                                        <Tab className="titleBlock">
                                            <span>Deal status</span>
                                        </Tab>
                                    </TabList>
                                    <TabPanel className="mainPartCirclesBlock">
                                        {leadsReducer.leadsSummary.length > 0 && <div className="mainCircleBlock">
                                            <VictoryPie
                                                data={leadsReducer.leadsSummary}
                                                style={{
                                                    labels: {
                                                        display: 'none'
                                                    }
                                                }}
                                                innerRadius={150}
                                                padding={0}
                                                colorScale={['#80d0f3', '#a8cf80', '#eb8282']}
                                            />
                                            <div className="spanBlock">
                                                <table>
                                                    <tbody>
                                                    {leadsReducer.leadsSummary.map((obj) => {
                                                        switch (obj.x) {
                                                            case 'open_lead':
                                                                return (
                                                                    <tr key={obj.x}>
                                                                        <td className="circleBlock" ><div className="blue circle"></div></td>
                                                                        <td className="textBlock">Open</td>
                                                                        <td className="numberBlock">{obj.y}</td>
                                                                    </tr>);
                                                            case 'converted_lead':
                                                                return (
                                                                    <tr key={obj.x}>
                                                                        <td className="circleBlock"><div className="green circle"></div></td>
                                                                        <td className="textBlock">Converted</td>
                                                                        <td className="numberBlock">{obj.y}</td>
                                                                    </tr>);
                                                            case 'closed_lead':
                                                                return (
                                                                    <tr key={obj.x}>
                                                                        <td className="circleBlock"><div className="red circle"></div></td>
                                                                        <td className="textBlock">Closed</td>
                                                                        <td className="numberBlock">{obj.y}</td>
                                                                    </tr>);
                                                            default:
                                                                return (<tr/>);
                                                        }
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> || <div></div>}
                                    </TabPanel>
                                    <TabPanel className="mainPartCirclesBlock">
                                        <div className="dealsInfoBlock">
                                            <div className="colorLineBlock">
                                                <div className="open colorBlock">
                                                    {dealsSummary.open_deal}
                                                </div>
                                                <div className="afterOpenBlock">
                                                    <div className="triangle-right"></div>
                                                    <div className="triangle-topright"></div>
                                                    <div className="triangle-bottomright"></div>
                                                </div>
                                                <div className="inProgress colorBlock">
                                                    {dealsSummary.progress_deal}
                                                </div>
                                                <div className="afterInProgressBlock">
                                                    <div className="triangle-right"></div>
                                                    <div className="triangle-topright"></div>
                                                    <div className="triangle-bottomright"></div>
                                                </div>
                                                <div className="closedWon colorBlock">
                                                    {dealsSummary.won_deal}
                                                </div>
                                                <div className="afterClosedWonBlock">
                                                    <div className="triangle-right"></div>
                                                    <div className="triangle-topright"></div>
                                                    <div className="triangle-bottomright"></div>
                                                </div>
                                                <div className="closedLost colorBlock">
                                                    {dealsSummary.lost_deal}
                                                </div>
                                            </div>
                                            <div className="infoBlock">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td className="circleData">
                                                            <div className="circle open"></div>
                                                        </td>
                                                        <td>
                                                            Open
                                                        </td>
                                                        <td className="numberData">{dealsSummary.open_deal}</td>
                                                        <td className="circleData">
                                                            <div className="circle won"></div>
                                                        </td>
                                                        <td>
                                                            Closed Won
                                                        </td>
                                                        <td className="numberData">{dealsSummary.won_deal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="circleData">
                                                            <div className="circle inProgress"></div>
                                                        </td>
                                                        <td>
                                                            In Progress
                                                        </td>
                                                        <td className="numberData">{dealsSummary.progress_deal}</td>
                                                        <td className="circleData">
                                                            <div className="circle lost"></div>
                                                        </td>
                                                        <td>
                                                            Closed Lost
                                                        </td>
                                                        <td className="numberData">{dealsSummary.lost_deal}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="task downBlock">
                                    <div className="titleBlock">
                                        <IconTask
                                            width="30px"
                                            height="20px"
                                            view="0 0 33 18"
                                            color="#7986cb"
                                        />
                                        <span>Task</span>
                                    </div>
                                    <div className="selectBlock">
                                        <select value={tasksReducer.currentTasksListType} onChange={(e) => {this.props.onTaskFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                            <option value="open">Open tasks</option>
                                            <option value="closed">Closed tasks</option>
                                            <option value="all">All tasks</option>
                                            <option value="my">My tasks</option>
                                            <option value="my-open">My open tasks</option>
                                            <option value="my-closed">My closed tasks</option>
                                        </select>
                                    </div>
                                    <div className="hLine"></div>
                                    <div className="tasksList">
                                        <ul>
                                            {(!_.isEmpty(tasksList) && tasksList.results.length > 0) && tasksList.results.map((task) => {
                                                const dateBlockClasses = classNames({
                                                    dateBlock: true,
                                                    red: task.priority === 'H',
                                                    yellow: task.priority === 'M',
                                                    green: task.priority === 'L'
                                                });
                                                return (
                                                    <li key={task.id}>
                                                        <div className={dateBlockClasses}>
                                                            {moment(task.start_time).format('MMM')} {moment(task.start_time).format('DD')}
                                                        </div>
                                                        <div className="desc">
                                                            <Link to={`/detail-task/${task.id}`}>
                                                                {task.subject}
                                                            </Link>
                                                        </div>
                                                        <div className="author">
                                                            <div className="secDescBlock">
                                                                {task.contact_first_name} {task.contact_last_name}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            }) || <li>There is no task found</li> }
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="meeting downBlock">
                                    <div className="titleBlock">
                                        <IconMeeting
                                            width="30px"
                                            height="20px"
                                            view="0 0 33 13"
                                            color="#00bfa5"
                                        />
                                        <span>Meeting</span>
                                    </div>
                                    <div className="selectBlock">
                                        <select value={meetingsReducer.currentMeetingsListType} onChange={(e) => {this.props.onMeetingFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                            <option value="open">Open meetings</option>
                                            <option value="closed">Closed meetings</option>
                                            <option value="all">All meetings</option>
                                            <option value="my-open">My open meetings</option>
                                            <option value="my-closed">My closed meetings</option>
                                        </select>
                                    </div>
                                    <div className="hLine"></div>
                                    <div className="meetingsList">
                                        <ul>
                                            {(!_.isEmpty(meetingsList) && meetingsList.results.length > 0) && meetingsList.results.map((meeting) => {
                                                const dateBlockClasses = classNames({
                                                    dateBlock: true,
                                                    red: moment(meeting.start_time).diff(moment(), 'days') < 1,
                                                    yellow: (moment(meeting.start_time).diff(moment(), 'days') >= 1) && (moment(meeting.start_time).diff(moment(), 'days') <= 3),
                                                    green: moment(meeting.start_time).diff(moment(), 'days') > 3
                                                });
                                                return (
                                                    <li key={meeting.id}>
                                                        <div className={dateBlockClasses}>
                                                            <div className="monthBlock">
                                                                {moment(meeting.start_time).format('MMM')}
                                                            </div>
                                                            <div className="hLine"></div>
                                                            <div className="dayBlock">
                                                                {moment(meeting.start_time).format('DD')}
                                                            </div>
                                                        </div>
                                                        <div className="desc">
                                                            <div className="mainDescBlock">
                                                                <Link to={`/detail-meeting/${meeting.id}`}>
                                                                    {meeting.subject}
                                                                </Link>
                                                            </div>
                                                            <div className="secDescBlock">
                                                                {meeting.contact_first_name} {meeting.contact_last_name}
                                                            </div>
                                                        </div>
                                                        <div className="meetingTime">
                                                            {moment(meeting.start_time).format('hh:mmA')} - {moment(meeting.start_time).add(meeting.duration, 'minute').format('hh:mmA')}
                                                        </div>
                                                    </li>
                                                );
                                            }) || <li>There is no meeting found</li>}
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    authReducer: React.PropTypes.object,
    entitiesReducer: React.PropTypes.object,
    meetingsReducer: React.PropTypes.object,
    tasksReducer: React.PropTypes.object,
    leadsReducer: React.PropTypes.object,
    dealsReducer: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    onMeetingFilterChange: React.PropTypes.func,
    onTaskFilterChange: React.PropTypes.func,
    onHideSubscriptionNotification: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        entitiesReducer: state.entitiesReducer,
        tasksReducer: state.tasksReducer,
        meetingsReducer: state.meetingsReducer,
        leadsReducer: state.leadsReducer,
        dealsReducer: state.dealsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(getEntitiesSummary());
            dispatch(getLeadsSummary());
            dispatch(getDealsSummary());
            dispatch(showSubscriprionNotification());
        },
        onMeetingFilterChange: (listType, userId) => {
            const firstPage = 1;
            dispatch(getMeetingsList(listType, userId, firstPage));
        },
        onTaskFilterChange: (listType, userId) => {
            const firstPage = 1;
            dispatch(getTasksList(listType, userId, firstPage));
        },
        onHideSubscriptionNotification: () => {
            dispatch(hideSubscriprionNotification());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
