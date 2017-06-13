import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import EmployeeAutoSuggest from '../EmployeeAutoSuggest/EmployeeAutoSuggest';
import DatePicker from '../DatePicker/DatePicker';
import ContactField from '../ContactField/ContactField';
import normalizeIdr from '../../utils/normalizeIdr';
import { connect } from 'react-redux';

const validate = (values, {contactFieldReducer, employeesReducer}) => {
    const errors = {};
    if (!values.name) {
        errors.name = true;
    }

    if (!values.contact && !contactFieldReducer.contactId) {
        errors.contact = true;
    }

    if (!values.dealOwner && !employeesReducer.employeeId) {
        errors.dealOwner = true;
    }

    return errors;
};

let DealModalForm = ({contactFieldReducer}) => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>Deal Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="name">Name</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="name"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="contact">Contact</label>
                    </td>
                    <td className="inputData">
                        <Field
                            name="contact"
                            component={ContactField}
                            type="text"
                            formName="dealModalForm"
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
                            value={contactFieldReducer.accountValue}
                        />
                    </td>
                    <td className="labelData required">
                        <label htmlFor="dealOwner">Deal Owner</label>
                    </td>
                    <td className="inputData">
                        <Field name="dealOwner" component={EmployeeAutoSuggest} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="revenue">Revenue</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="revenue" normalize={normalizeIdr}/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="closingDate">Closing Date</label>
                    </td>
                    <td className="inputData">
                        <Field name="closingDate" id="closingDate" component={DatePicker}/>
                    </td>
                </tr>

                <tr>
                    <td className="labelData">
                        <label htmlFor="stage">Stage</label>
                    </td>
                    <td className="inputData">
                        <Field component="select" name="stage">
                            <option value="O">Open</option>
                            <option value="P">In Progress</option>
                            <option value="CW">Won</option>
                            <option value="CL">Lost</option>
                        </Field>
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

DealModalForm.propTypes = {
    contactFieldReducer: React.PropTypes.object
};

DealModalForm = reduxForm({
    form: 'dealModalForm', validate
})(DealModalForm);

const mapStateToProps = (state) => {
    return {
        contactFieldReducer: state.contactFieldReducer,
        initialValues: state.modalsReducer.initialModalData
    };
};

const mapDispatchToProps = () => {
    return {};
};

DealModalForm = connect(mapStateToProps, mapDispatchToProps)(DealModalForm);

export default DealModalForm;
