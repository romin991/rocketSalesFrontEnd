import React from 'react';
import { connect } from 'react-redux';
import './ListTasks.scss';
import classNames from 'classnames';
import { getTasksList } from '../../actions/tasksActions';
import { showCreateTaskModal, delInitialModalData } from '../../actions/modalsActions';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';
import moment from 'moment';
import IconTask from '../IconTask/IconTask';

class ListTasks extends React.Component {
    componentDidMount() {
        this.props.onFilterChange(this.props.tasksReducer.currentTasksListType, this.props.authReducer.user.employee_id);
    }

    render() {
        const tasksReducer = this.props.tasksReducer;
        const authReducer = this.props.authReducer;

        return (
            <div className="tasks listPage">
                <div className="listTitle">
                    <div className="listTitleContainer">
                        <h3>
                            <IconTask
                                width="32px"
                                height="24px"
                                view="-4 0 32 16"
                                color="#7986cb"
                            />
                            TASK</h3>
                        <div className="listTitleInputsBlock">
                            <div className="listTitleLeft">
                                <select value={tasksReducer.currentTasksListType} onChange={(e) => {this.props.onFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                    <option value="open">Open tasks</option>
                                    <option value="closed">Closed tasks</option>
                                    <option value="all">All tasks</option>
                                    <option value="my">My tasks</option>
                                    <option value="my-open">My open tasks</option>
                                    <option value="my-closed">My closed tasks</option>
                                </select>
                            </div>
                            <div className="listTitleRight">
                                <button className="newLongButton" onClick={this.props.onCreateNewTask}>
                                    <i className="fa fa-plus" aria-hidden="true"/>
                                    <span> New Task</span>
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
                            <td>STATUS</td>
                            <td>PRIORITY</td>
                            <td>DUE DATE</td>
                            <td>TASK OWNER</td>
                        </tr>
                        </thead>
                        <tbody>
                        {(tasksReducer.tasksListLoadingSuccess && tasksReducer.tasksList.results.length > 0) && tasksReducer.tasksList.results.map((task, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={task.id} className={rowClasses} onClick={e => {this.props.onListClick(e, task.id);}}>
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
                        }) ||
                        <tr>
                            <td colSpan="6" className="loadingEmptyCell">
                                {tasksReducer.tasksListLoading && <div>Loading</div> || <div>There is no task found</div>}
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
                                       pageNum={Math.ceil(tasksReducer.tasksList.count / 20)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={Math.ceil(tasksReducer.tasksList.count / 20)}
                                       clickCallback={data => {this.props.onPaginationClick(tasksReducer.currentTasksListType, authReducer.user.employee_id, data);}}
                                       containerClassName={"pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}
ListTasks.propTypes = {
    onFilterChange: React.PropTypes.func,
    onCreateNewTask: React.PropTypes.func,
    tasksReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPaginationClick: React.PropTypes.func,
    onListClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        tasksReducer: state.tasksReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-task/${id}`);
        },
        onPaginationClick: (listStyle, userId, data) => {
            dispatch(getTasksList(listStyle, userId, data.selected + 1));
        },
        onCreateNewTask: () => {
            dispatch(delInitialModalData());
            dispatch(showCreateTaskModal());
        },
        onFilterChange: (listStyle, userId) => {
            const firstPage = 1;
            dispatch(getTasksList(listStyle, userId, firstPage));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTasks);
