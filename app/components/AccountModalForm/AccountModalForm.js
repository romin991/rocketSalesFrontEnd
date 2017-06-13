import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import EmployeeAutoSuggest from '../EmployeeAutoSuggest/EmployeeAutoSuggest';
import LoadingElement from '../LoadingElement/LoadingElement';
import { postAccountImage, clearAccountImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import normalizePhone from '../../utils/normalizePhone';

const validate = (values, {employeesReducer}) => {
    const errors = {};
    if (!values.name) {
        errors.name = true;
    }

    if (!values.accountOwner && !employeesReducer.employeeId) {
        errors.accountOwner = true;
    }

    return errors;
};

let AccountModalForm = ({clodinaryReducer, authReducer, onPostImage, hideAddressValue}) => {
    return (
        <div>
            <div className="photoBlock">
                {clodinaryReducer.accountCreateImage &&
                <img className="photo" src={clodinaryReducer.accountCreateImage}/>
                ||
                <div className="photo">
                    {clodinaryReducer.accountCreateImageLoading && <LoadingElement className="photoLoading"/> || <i className="fa fa-user"/>}
                </div>
                }
                <div className="uploadPhotoBlock">
                    <label htmlFor="image" className="uploadPhotoButton">
                        <i className="fa fa-camera"/>
                        <span>Upload Photo</span>
                    </label>
                    <input type="file" id="image" className="hiddenInput" accept="image/jpeg,image/png,image/gif" onChange={(e) => {onPostImage(authReducer.user.cloudinary_meta, e.target.files[0]);}}/>
                    <p>Place your logo or photo JPG/PNG  <br/>
                        not more than 10 MB</p>
                </div>
            </div>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>Account Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="name">Name</label>
                    </td>
                    <td className="inputData">
                        <Field name="name" component={InputFieldWithValidation} type="text" className="required"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="accountOwner">Account Owner</label>
                    </td>
                    <td className="inputData">
                        <Field name="accountOwner" component={EmployeeAutoSuggest} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="phone">Phone</label>
                    </td>
                    <td className="inputData">
                        <Field name="phone" component={InputFieldWithValidation} type="text" normalize={normalizePhone}/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="email">Email</label>
                    </td>
                    <td className="inputData">
                        <Field name="email" component={InputFieldWithValidation} type="email"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="fax">Fax</label>
                    </td>
                    <td className="inputData">
                        <Field name="fax" component={InputFieldWithValidation} type="text" normalize={normalizePhone}/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="industry">Industry</label>
                    </td>
                    <td className="inputData">
                        <Field name="industry" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="website">Website</label>
                    </td>
                    <td className="inputData">
                        <Field name="website" component={InputFieldWithValidation} type="url"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <h4>
                            <label>
                                {(hideAddressValue) && <i className="fa fa-caret-right"/> || <i className="fa fa-caret-down"/>}
                                Billing Address
                                <Field name="hideAddress" component="input" className="hiddenInput" id="hideAddress" type="checkbox"/>
                            </label>
                        </h4>
                    </td>
                </tr>
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="billingStreet">Billing Street</label>
                    </td>
                    <td className="inputData" colSpan="3">
                        <Field name="billingStreet" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="billingCity">Billing City</label>
                    </td>
                    <td className="inputData">
                        <Field name="billingCity" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="billingState">Billing State</label>
                    </td>
                    <td className="inputData">
                        <Field name="billingState" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="billingCountry">Billing Country</label>
                    </td>
                    <td className="inputData">
                        <Field name="billingCountry" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="billingPos">Billing Pos Code</label>
                    </td>
                    <td className="inputData">
                        <Field name="billingPos" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td colSpan="4">
                        <h4>Shipping Address</h4>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="shippingStreet">Shipping Street</label>
                    </td>
                    <td className="inputData" colSpan="3">
                        <Field name="shippingStreet" component={InputFieldWithValidation} type="text" className="streetInput"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="shippingCity">Shipping City</label>
                    </td>
                    <td className="inputData">
                        <Field name="shippingCity" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="shippingState">Shipping State</label>
                    </td>
                    <td className="inputData">
                        <Field name="shippingState" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
                <tr>
                    <td className="labelData">
                        <label htmlFor="shippingCountry">Shipping County</label>
                    </td>
                    <td className="inputData">
                        <Field name="shippingCountry" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="shippingZip">Shipping Pos Code</label>
                    </td>
                    <td className="inputData">
                        <Field name="shippingPos" component={InputFieldWithValidation} type="text"/>
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
                        <Field name="description" component="textarea" type="text"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

AccountModalForm.propTypes = {
    clodinaryReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    hideAddressValue: React.PropTypes.bool,
    onPostImage: React.PropTypes.func
};

AccountModalForm = reduxForm({
    form: 'accountModalForm', validate
})(AccountModalForm);

const formSelector = formValueSelector('accountModalForm');

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
            dispatch(clearAccountImage());
            dispatch(postAccountImage(meta, file));
        }
    };
};

AccountModalForm = connect(mapStateToProps, mapDispatchToProps)(AccountModalForm);

export default AccountModalForm;
