import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import InputFieldWithValidation from '../InputFieldWithValidation/InputFieldWithValidation';
import LoadingElement from '../LoadingElement/LoadingElement';
import { postLeadImage, clearLeadImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import normalizePhone from '../../utils/normalizePhone';
import EmployeeAutoSuggest from '../EmployeeAutoSuggest/EmployeeAutoSuggest';

const validate = (values, {employeesReducer}) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = true;
        errors.title = true;
    }
    if (!values.company) {
        errors.company = true;
    }
    if (!values.leadOwner && !employeesReducer.employeeId) {
        errors.leadOwner = true;
    }
    return errors;
};

let LeadModalForm = ({authReducer, clodinaryReducer, onPostImage, hideAddressValue}) => {
    return (
        <div>
            <div className="photoBlock">
                {clodinaryReducer.leadCreateImage &&
                <img className="photo" src={clodinaryReducer.leadCreateImage}/>
                ||
                <div className="photo">
                    {clodinaryReducer.leadCreateImageLoading && <LoadingElement className="photoLoading"/> || <i className="fa fa-user"/>}
                </div>
                }
                <div className="uploadPhotoBlock">
                    <label htmlFor="image" className="uploadPhotoButton">
                        <i className="fa fa-camera"/>
                        <span>Upload Photo</span>
                    </label>
                    <input type="file" id="image" className="hiddenInput" accept="image/jpeg,image/png,image/gif" onChange={(e) => {onPostImage(authReducer.user.cloudinary_meta, e.target.files[0]);}}/>
                    <p>Place your logo or photo JPG/PNG <br/>
                        not more than 10 MB</p>
                </div>
            </div>
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <h4>Lead Information</h4>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="firstName">First Name</label>
                    </td>
                    <td className="inputData">
                        <Field name="firstName" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="lastName">Last Name</label>
                    </td>
                    <td className="inputData">
                        <Field name="lastName" component={InputFieldWithValidation} type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData required">
                        <label htmlFor="company">Company</label>
                    </td>
                    <td className="inputData">
                        <Field name="company" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData required">
                        <label htmlFor="leadOwner">Lead Owner</label>
                    </td>
                    <td className="inputData">
                        <Field name="leadOwner" component={EmployeeAutoSuggest} type="text" className="required"/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="phone">Phone</label>
                    </td>
                    <td className="inputData">
                        <Field name="phone" component={InputFieldWithValidation} type="text"  normalize={normalizePhone}/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="mobile">Mobile</label>
                    </td>
                    <td className="inputData">
                        <Field name="mobile" component={InputFieldWithValidation} type="tel" normalize={normalizePhone}/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="email">Email</label>
                    </td>
                    <td className="inputData">
                        <Field name="email" component={InputFieldWithValidation} type="email"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="fax">Fax</label>
                    </td>
                    <td className="inputData">
                        <Field name="fax" component={InputFieldWithValidation} type="text" normalize={normalizePhone}/>
                    </td>
                </tr>
                <tr>
                    <td className="labelData">
                        <label htmlFor="position">Position</label>
                    </td>
                    <td className="inputData">
                        <Field name="position" component={InputFieldWithValidation} type="text"/>
                    </td>
                    <td className="labelData">
                        <label htmlFor="leadSource">Lead Source</label>
                    </td>
                    <td className="inputData">
                        <Field name="leadSource" component="select">
                            <option value=""/>
                            <option value="OFA">Offline Ads</option>
                            <option value="ONA">Online Ads</option>
                            <option value="CC">Cold Call</option>
                            <option value="IR">Internal Referral</option>
                            <option value="ER">External Referral</option>
                            <option value="P">Partner</option>
                            <option value="S">Sales</option>
                            <option value="TS">Trade Show</option>
                            <option value="SR">Seminar</option>
                        </Field>
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
                        <Field name="street" component={InputFieldWithValidation} type="text"
                               inputClassName="streetInput"/>
                    </td>
                </tr>
                }
                {!(hideAddressValue) &&
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
                }
                {!(hideAddressValue) &&
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

LeadModalForm.propTypes = {
    clodinaryReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPostImage: React.PropTypes.func,
    hideAddressValue: React.PropTypes.bool
};

LeadModalForm = reduxForm({
    form: 'leadModalForm', validate
})(LeadModalForm);

const formSelector = formValueSelector('leadModalForm');

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
            dispatch(clearLeadImage());
            dispatch(postLeadImage(meta, file));
        }
    };
};

LeadModalForm = connect(mapStateToProps, mapDispatchToProps)(LeadModalForm);

export default LeadModalForm;
