import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import EmployeeAutoSuggest from '../EmployeeAutoSuggest/EmployeeAutoSuggest';
import LeadContactAutoSuggest from '../LeadContactAutoSuggest/LeadContactAutoSuggest';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import { connect } from 'react-redux';
import DealField from '../DealField/DealField';

const validate = (values, {leadContactReducer, employeesReducer}) => {
    const errors = {};
    if (!values.subject) {
        errors.subject = true;
    }
    if (!values.startTime) {
        errors.startTime = true;
    }
    if (!values.duration) {
        errors.duration = true;
    }
    if (!values.leadContact && !leadContactReducer.contactCt) {
        errors.leadContact = true;
    }
    if (!values.meetingOwner && !employeesReducer.employeeId) {
        errors.meetingOwner = true;
    }

    return errors;
};

let MeetingModalForm = ({leadContactReducer}) => {
    return (
        <form>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>Meeting Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="subject">Subject</label>
                    </td>
                    <td className="inputData">
                        <Field name="subject" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="leadContact">Lead/Contact</label>
                    </td>
                    <td className="inputData">
                        <Field
                            name="leadContact"
                            component={LeadContactAutoSuggest}
                            type="text"
                            formName="meetingModalForm"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="account">Account</label>
                    </td>
                    <td className="inputData">
                        <input
                            disabled
                            type="text"
                            id="account"
                            value={leadContactReducer.accountValue}
                        />
                    </td>
                    <td className="labelData required">
                        <label htmlFor="meetingOwner">Meeting Owner</label>
                    </td>
                    <td className="inputData">
                        <Field name="meetingOwner" component={EmployeeAutoSuggest} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="startTime">Start time</label>
                    </td>
                    <td className="inputData">
                        <Field name="startTime" id="startTime" component={DateTimePicker}/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="duration">Duration</label>
                    </td>
                    <td className="inputData duration">
                        <Field name="duration" component={InputFieldWithValidation} type="number"/>
                        <div className="suffix">mins</div>
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
                            formName="meetingModalForm"
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <h4>
                            Location Information
                        </h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="street">Street</label>
                    </td>
                    <td colSpan="3">
                        <Field name="street" component={InputFieldWithValidation} type="text"
                               inputClassName="streetInput"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="city">City</label>
                    </td>
                    <td className="inputData">
                        <Field name="city" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="state">State</label>
                    </td>
                    <td className="inputData">
                        <Field name="state" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="country">Country</label>
                    </td>
                    <td className="inputData">
                        <Field name="country" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="posCode">Pos Code</label>
                    </td>
                    <td className="inputData">
                        <Field name="posCode" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <h4>Description Information</h4>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <Field name="description" component="textarea" type="text"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    );
};

MeetingModalForm.propTypes = {
    leadContactReducer: React.PropTypes.object
};

MeetingModalForm = reduxForm({
    form: 'meetingModalForm', validate
})(MeetingModalForm);

const mapStateToProps = (state) => {
    return {
        leadContactReducer: state.leadContactReducer,
        initialValues: state.modalsReducer.initialModalData
    };
};

const mapDispatchToProps = () => {
    return {};
};

MeetingModalForm = connect(mapStateToProps, mapDispatchToProps)(MeetingModalForm);

export default MeetingModalForm;
