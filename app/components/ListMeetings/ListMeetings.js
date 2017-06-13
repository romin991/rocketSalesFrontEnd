import React from 'react';
import { connect } from 'react-redux';
import './ListMeetings.scss';
import classNames from 'classnames';
import {getMeetingsList} from '../../actions/meetingsActions';
import { showCreateMeetingModal, delInitialModalData, initInitialModalData } from '../../actions/modalsActions';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';
import IconMeeting from '../IconMeeting/IconMeeting';

class ListMeetings extends React.Component {
    componentDidMount() {
        this.props.onFilterChange(this.props.meetingsReducer.currentMeetingsListType, this.props.authReducer.user.employee_id);
    }

    render() {
        const meetingsReducer = this.props.meetingsReducer;
        const authReducer = this.props.authReducer;

        return (
            <div className="meetings listPage">
                <div className="listTitle">
                    <div className="listTitleContainer">
                        <h3>
                            <IconMeeting
                                width="30px"
                                height="24px"
                                view="1 -2 29 15"
                                color="#00bfa5"
                            />
                            MEETING</h3>
                        <div className="listTitleInputsBlock">
                            <div className="listTitleLeft">
                                <select value={meetingsReducer.currentMeetingsListType} onChange={(e) => {this.props.onFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                    <option value="open">Open meetings</option>
                                    <option value="closed">Closed meetings</option>
                                    <option value="all">All meetings</option>
                                    <option value="my-open">My open meetings</option>
                                    <option value="my-closed">My closed meetings</option>
                                </select>
                            </div>
                            <div className="listTitleRight">
                                <button className="newLongButton" onClick={this.props.onCreateNewMeeting}>
                                    <i className="fa fa-plus" aria-hidden="true"/>
                                    <span> New Meeting</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                        {(meetingsReducer.meetingsListLoadingSuccess && meetingsReducer.meetingsList.results.length > 0) && meetingsReducer.meetingsList.results.map((meeting, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={meeting.id} className={rowClasses} onClick={e => {this.props.onListClick(e, meeting.id);}}>
                                    <td>{meeting.subject}</td>
                                    <td>{meeting.contact_first_name} {meeting.contact_last_name}</td>
                                    <td>{moment(meeting.start_time).format('DD MMM YYYY hh:mmA')}</td>
                                    <td>{moment(meeting.start_time).minutes(meeting.duration).format('DD MMM YYYY hh:mmA')}</td>
                                    <td>{meeting.employee_first_name} {meeting.employee_last_name}</td>
                                </tr>
                            );
                        }) ||
                        <tr>
                            <td colSpan="5" className="loadingEmptyCell">
                                {meetingsReducer.meetingsListLoading && <div>Loading</div> || <div>There is no meeting found</div>}
                            </td>
                        </tr>
                        }
                        </tbody>
                    </table>
                    <div className="center-pagination">
                        <ReactPaginate previousLabel={"prev"}
                                       nextLabel={"next"}
                                       breakLabel={<a href="">...</a>}
                                       breakClassName={"break-me"}
                                       pageNum={Math.ceil(meetingsReducer.meetingsList.count / 20)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={Math.ceil(meetingsReducer.meetingsList.count / 20)}
                                       clickCallback={data => {this.props.onPaginationClick(meetingsReducer.currentMeetingsListType, authReducer.user.employee_id, data);}}
                                       containerClassName={"pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}
ListMeetings.propTypes = {
    onFilterChange: React.PropTypes.func,
    onCreateNewMeeting: React.PropTypes.func,
    meetingsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPaginationClick: React.PropTypes.func,
    onListClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        meetingsReducer: state.meetingsReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-meeting/${id}`);
        },
        onPaginationClick: (listStyle, userId, data) => {
            dispatch(getMeetingsList(listStyle, userId, data.selected + 1));
        },
        onCreateNewMeeting: () => {
            dispatch(delInitialModalData());
            const data = {duration: 60};
            dispatch(initInitialModalData(data));
            dispatch(showCreateMeetingModal());
        },
        onFilterChange: (listType, userId) => {
            const firstPage = 1;
            dispatch(getMeetingsList(listType, userId, firstPage));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMeetings);
