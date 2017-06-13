import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {getLeadDetailTasks, getAccountDetailTasks, getContactDetailTasks, getDealDetailTasks} from '../../actions/customerDetailActions';
import './CustomerDetailTasks.scss';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {LEAD, ACCOUNT, CONTACT, DEAL} from '../../constants';

class CustomerDetailTasks extends React.Component {
    componentDidMount() {
        const listType = 'open';
        this.props.onFilterChange(this.props.id, listType, this.props.type);
    }

    render() {
        const localState = this.props.localState;

        return (
            <div className="detailTable">
                <h3>Task</h3>
                <div className="selectBlock">
                    <select value={localState.currentCustomerDetailTasksType} onChange={(e) => {this.props.onFilterChange(this.props.id, e.target.value, this.props.type);}}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
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
                    {localState.customerDetailTasksSuccess && localState.customerDetailTasks.results.map((task, index) => {
                        const rowClasses = classNames({
                            greyRow: Boolean((index + 1) % 2 === 0)
                        });

                        return (

                            <tr key={task.id} className={rowClasses} onClick={e => {this.props.onTaskClick(e, task.id);}}>
                                <td>{task.subject}</td>
                                <td>{task.contact_first_name} {task.contact_last_name}</td>
                                <td> {(() => {
                                    switch (task.status) {
                                        case 'C': return 'Closed';
                                        case 'P': return 'Progress';
                                        case 'O': return 'Open';
                                        default:  return '';
                                    }
                                })()}</td>
                                <td> {(() => {
                                    switch (task.priority) {
                                        case 'L': return 'Low';
                                        case 'M': return 'Medium';
                                        case 'H': return 'High';
                                        default:  return '';
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
        );
    }
}

CustomerDetailTasks.propTypes = {
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    localState: React.PropTypes.object,
    onFilterChange: React.PropTypes.func,
    onTaskClick: React.PropTypes.func
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
                    dispatch(getLeadDetailTasks(id, listType));
                    break;
                case(ACCOUNT):
                    dispatch(getAccountDetailTasks(id, listType));
                    break;
                case(CONTACT):
                    dispatch(getContactDetailTasks(id, listType));
                    break;
                case(DEAL):
                    dispatch(getDealDetailTasks(id, listType));
                    break;
                default:
                    break;
            }
        },
        onTaskClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-task/${id}`);
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailTasks);
