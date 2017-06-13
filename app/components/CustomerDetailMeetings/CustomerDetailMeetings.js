import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {getLeadDetailMeetings, getAccountDetailMeetings, getContactDetailMeetings, getDealDetailMeetings} from '../../actions/customerDetailActions';
import './CustomerDetailMeetings.scss';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {LEAD, ACCOUNT, CONTACT, DEAL} from '../../constants';

class CustomerDetailMeetings extends React.Component {
    componentDidMount() {
        const listType = 'open';
        this.props.onFilterChange(this.props.id, listType, this.props.type);
    }

    render() {
        const localState = this.props.localState;

        return (
            <div className="detailTable">
                <h3>Meeting</h3>
                <div className="selectBlock">
                    <select value={localState.currentCustomerDetailMeetingsType} onChange={(e) => {this.props.onFilterChange(this.props.id, e.target.value, this.props.type);}}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
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
                    {localState.customerDetailMeetingsSuccess && localState.customerDetailMeetings.results.map((meeting, index) => {
                        const rowClasses = classNames({
                            greyRow: Boolean((index + 1) % 2 === 0)
                        });

                        return (
                            <tr key={meeting.id} className={rowClasses} onClick={e => {this.props.onMeetingClick(e, meeting.id);}}>
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
        );
    }
}

CustomerDetailMeetings.propTypes = {
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    localState: React.PropTypes.object,
    onFilterChange: React.PropTypes.func,
    onMeetingClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        localState: state.customerDetailReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterChange: (id, listType, type) => {
            switch (type) {
                case(LEAD):
                    dispatch(getLeadDetailMeetings(id, listType));
                    break;
                case(ACCOUNT):
                    dispatch(getAccountDetailMeetings(id, listType));
                    break;
                case(CONTACT):
                    dispatch(getContactDetailMeetings(id, listType));
                    break;
                case(DEAL):
                    dispatch(getDealDetailMeetings(id, listType));
                    break;
                default:
                    break;
            }
        },
        onMeetingClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-meeting/${id}`);
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailMeetings);
