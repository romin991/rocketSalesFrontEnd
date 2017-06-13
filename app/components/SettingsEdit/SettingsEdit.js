import React from 'react';
import { connect } from 'react-redux';
import './SettingsEdit.scss';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SettingsHead from '../SettingsHead/SettingsHead';
import EmployeeEditForm from '../EmployeeEditForm/EmployeeEditForm';
import { getEmployeesList, employeeSelected, clearSelectedEmployee } from '../../actions/employeesActions';
import _ from 'lodash';

class SettingsEdit extends React.Component {
    componentDidMount() {
        this.props.loadEmployees();
    }

    render() {
        const { employeesReducer: { employeesList, selectedEmployee }, onEmployeeClick } = this.props;

        return (
            <div className="settingsPage edit">
                <SettingsHead/>
                <div className="overflowBlock">
                    <div className="mainContainer">
                        <div className="table-row">
                            <SettingsMenu activateClass="edit"/>
                            <div className="middleBlock">
                                <ul>
                                    {employeesList.map((employee) => {
                                        return (
                                            <li key={employee.user} className="active" onClick={() => onEmployeeClick(employee)}>
                                                <div className="liBlock">
                                                    <div className="photoBlock">
                                                        <i className="fa fa-user" aria-hidden="true"/>
                                                    </div>
                                                    <div className="textBlock">
                                                        <span className="name">{employee.first_name} {employee.last_name}</span>
                                                        <br/>
                                                        <span className="email">{employee.email}</span>
                                                    </div>
                                                </div>
                                                <div className="hLine"></div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="rightBlock">
                                {!_.isEmpty(selectedEmployee) && <EmployeeEditForm
                                    initialValues={selectedEmployee}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SettingsEdit.propTypes = {
    loadEmployees: React.PropTypes.func,
    onEmployeeClick: React.PropTypes.func,
    employeesReducer: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        employeesReducer: state.employeesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadEmployees: () => {
            dispatch(getEmployeesList());
        },
        onEmployeeClick: (employeeData) => {
            dispatch(clearSelectedEmployee({}));
            setTimeout(() => {
                dispatch(employeeSelected(employeeData));
            }, 0);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEdit);
