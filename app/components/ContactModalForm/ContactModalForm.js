import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import EmployeeAutoSuggest from '../EmployeeAutoSuggest/EmployeeAutoSuggest';
import AccountAutoSuggest from '../AccountAutoSuggest/AccountAutoSuggest';
import LoadingElement from '../LoadingElement/LoadingElement';
import { postContactImage, clearContactImage } from '../../actions/cloudinaryActions';
import { showCreateAccountModal } from '../../actions/modalsActions';
import normalizePhone from '../../utils/normalizePhone';
import { connect } from 'react-redux';

const validate = (values, {employeesReducer, accountsReducer}) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = true;
        errors.title = true;
    }
    if (!values.accountAutoSuggest && !accountsReducer.accountSuggestion.id) {
        errors.accountAutoSuggest = true;
    }
    if (!values.contactOwner && !employeesReducer.employeeId) {
        errors.contactOwner = true;
    }

    return errors;
};

let ContactModalForm = ({clodinaryReducer, authReducer, onPostImage, hideAddressValue, onNewAccountButtonClick}) => {
    return (
        <div>
            <div className="photoBlock">
                {clodinaryReducer.contactCreateImage &&
                <img className="photo" src={clodinaryReducer.contactCreateImage}/>
                ||
                <div className="photo">
                    {clodinaryReducer.contactCreateImageLoading && <LoadingElement className="photoLoading"/> || <i className="fa fa-user"/>}
                </div>
                }
                <div className="uploadPhotoBlock">
                    <label htmlFor="image" className="uploadPhotoButton">
                        <i className="fa fa-camera"/>
                        <span>Upload Photo</span>
                    </label>
                    <input type="file" id="image" className="hiddenInput" accept="image/jpeg,image/png,image/gif" onChange={(e) => {onPostImage(authReducer.user.cloudinary_meta, e.target.files[0]);}}/>
                    <p>Place your company logo or photo <br/>
                        JPG, GIF or PNG not more than 10 MB</p>
                </div>
            </div>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>Contact Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="firstName">First Name</label>
                    </td>
                    <td className="inputData">
                        <Field component={InputFieldWithValidation} type="text" name="firstName"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="lastName">Last Name</label>
                    </td>
                    <td>
                        <Field type="text" component={InputFieldWithValidation} name="lastName"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="accountAutoSuggest">Account</label>
                        <div onClick={onNewAccountButtonClick} className="newAccountButton">Don't have an account?</div>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={AccountAutoSuggest} formName="contactModalForm" name="accountAutoSuggest"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="contactOwner">Contact Owner</label>
                    </td>
                    <td>
                        <Field component={EmployeeAutoSuggest} type="text" name="contactOwner"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="phone">Phone</label>
                    </td>
                    <td className="inputData">
                        <Field type="tel" component={InputFieldWithValidation} name="phone"  normalize={normalizePhone}/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="mobile">Mobile</label>
                    </td>
                    <td className="inputData">
                        <Field type="tel" component={InputFieldWithValidation} name="mobile"  normalize={normalizePhone}/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="secMobilePhone">Secondary Mobile</label>
                    </td>
                    <td>
                        <Field type="text" component={InputFieldWithValidation} name="secMobilePhone" normalize={normalizePhone}/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="email">Email</label>
                    </td>
                    <td>
                        <Field type="email" component={InputFieldWithValidation} name="email"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="fax">Fax</label>
                    </td>
                    <td>
                        <Field type="fax" component={InputFieldWithValidation} name="fax"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="position">Position</label>
                    </td>
                    <td>
                        <Field type="text" component={InputFieldWithValidation} name="position"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <h4>
                            <label>
                                {(hideAddressValue) && <i className="fa fa-caret-right"/> || <i className="fa fa-caret-down"/>}
                                Address Information
                                <Field name="hideAddress" component="input" className="hiddenInput" id="hideAddress" type="checkbox"/>
                            </label>
                        </h4>
                    </td>
                </tr>
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="street">Street</label>
                    </td>
                    <td colSpan="3">
                        <Field className="streetInput" component={InputFieldWithValidation} type="text" name="street"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="city">City</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="city"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="state">State</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="state"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="country">Country</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="country"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="posCode">Pos Code</label>
                    </td>
                    <td className="inputData">
                        <Field type="text" component={InputFieldWithValidation} name="posCode"/>
                    </td>
                </tr>
                }
                <tr>
                    <td colSpan="4">
                        <h4>Description Information</h4>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <Field name="description" component="textarea"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

ContactModalForm.propTypes = {
    clodinaryReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPostImage: React.PropTypes.func,
    onNewAccountButtonClick: React.PropTypes.func,
    hideAddressValue: React.PropTypes.bool,
};

ContactModalForm = reduxForm({
    form: 'contactModalForm', validate
})(ContactModalForm);

const formSelector = formValueSelector('contactModalForm');

const mapStateToProps = (state) => {
    const hideAddressValue = formSelector(state, 'hideAddress');
    return {
        hideAddressValue,
        clodinaryReducer: state.clodinaryReducer,
        authReducer: state.authReducer,
        initialValues: state.modalsReducer.initialModalData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostImage: (meta, file) => {
            dispatch(clearContactImage());
            dispatch(postContactImage(meta, file));
        },
        onNewAccountButtonClick: () => {
            dispatch(showCreateAccountModal());
        }
    };
};

ContactModalForm = connect(mapStateToProps, mapDispatchToProps)(ContactModalForm);

export default ContactModalForm;
