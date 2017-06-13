import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import SelectFieldWithValidation from '../SelectFieldWithValidation/SelectFieldWithValidation';
import { connect } from 'react-redux';

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = true;
    }
    if (!values.firstName) {
        errors.firstName = true;
    }
    if (!values.lastName) {
        errors.lastName = true;
    }
    return errors;
};

let CreateUserModalForm = ({}) => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>User Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="email">Email</label>
                    </td>
                    <td>
                        <Field type="email" component={InputFieldWithValidation} name="email"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="role">Role</label>
                    </td>
                    <td className="inputData">
                        <Field component={SelectFieldWithValidation} name="role" hasParent>
                            <option value="E">Employee</option>
                            <option value="A">Admin</option>
                        </Field>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="firstName">First Name</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="firstName"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="lastName">Last Name</label>
                    </td>
                    <td>
                        <Field type="text" component={InputFieldWithValidation} name="lastName"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

CreateUserModalForm.propTypes = {
};

CreateUserModalForm = reduxForm({
    form: 'userModalForm', validate
})(CreateUserModalForm);

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

CreateUserModalForm = connect(mapStateToProps, mapDispatchToProps)(CreateUserModalForm);

export default CreateUserModalForm;
