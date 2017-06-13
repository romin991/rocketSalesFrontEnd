import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from '../DatePicker/DatePicker';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import EmployeeAutoSuggest from '../EmployeeAutoSuggest/EmployeeAutoSuggest';
import LeadContactAutoSuggest from '../LeadContactAutoSuggest/LeadContactAutoSuggest';
import DealField from '../DealField/DealField';
import { connect } from 'react-redux';

const validate = (values, {leadContactReducer, employeesReducer}) => {
    const errors = {};
    if (!values.subject) {
        errors.subject = true;
    }

    if (!values.leadContact && !leadContactReducer.contactCt) {
        errors.leadContact = true;
    }

    if (!values.taskOwner && !employeesReducer.employeeId) {
        errors.taskOwner = true;
    }

    return errors;
};

let TaskModalForm = ({leadContactReducer}) => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>Task Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="subject">Subject</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="subject"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="leadContact">Lead/Contact</label>
                    </td>
                    <td className="inputData">
                        <Field
                            name="leadContact"
                            component={LeadContactAutoSuggest}
                            type="text"
                            formName="taskModalForm"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="account">Account</label>
                    </td>
                    <td  className="inputData">
                        <input
                            disabled
                            type="text"
                            id="account"
                            value={leadContactReducer.accountValue}
                        />
                    </td>
                    <td className="labelData required">
                        <label htmlFor="taskOwner">Task Owner</label>
                    </td>
                    <td className="inputData">
                        <Field name="taskOwner" component={EmployeeAutoSuggest} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="deal">Deal</label>
                    </td>
                    <td className="inputData">
                        <Field
                            name="deal"
                            component={DealField}
                            type="text"
                            formName="taskModalForm"
                        />
                    </td>
                    <td className="labelData">
                        <label htmlFor="status">Status</label>
                    </td>
                    <td className="inputData">
                        <Field component="select" name="status">
                            <option value="O">Open</option>
                            <option value="C">Closed</option>
                            <option value="P">Progress</option>
                        </Field>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="priority">Priority</label>
                    </td>
                    <td className="inputData">
                        <Field component="select" name="priority">
                            <option value="L">Low</option>
                            <option value="M">Medium</option>
                            <option value="H">High</option>
                        </Field>
                    </td>
                    <td className="labelData">
                        <label htmlFor="dueDate">Due Date</label>
                    </td>
                    <td  className="inputData">
                        <Field name="dueDate" id="dueDate" component={DatePicker}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <h4>Description Information</h4>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <Field component="textarea" name="description"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

TaskModalForm.propTypes = {
    leadContactReducer: React.PropTypes.object
};

TaskModalForm = reduxForm({
    form: 'taskModalForm', validate
})(TaskModalForm);

const mapStateToProps = (state) => {
    return {
        leadContactReducer: state.leadContactReducer,
        initialValues: state.modalsReducer.initialModalData
    };
};

const mapDispatchToProps = () => {
    return {};
};

TaskModalForm = connect(mapStateToProps, mapDispatchToProps)(TaskModalForm);

export default TaskModalForm;
