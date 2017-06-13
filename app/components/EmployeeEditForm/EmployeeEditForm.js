import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import normalizePhone from '../../utils/normalizePhone';
import { connect } from 'react-redux';
import { saveEmployeeChanges } from '../../actions/employeesActions';
import LoadingElement from '../LoadingElement/LoadingElement';
import { postEmployeeProfileImage } from '../../actions/cloudinaryActions';

let EmployeeEditForm = ({ authReducer, form, onEditClick, onCancelClick, initialValues, onFormSubmit, employeesReducer, clodinaryReducer, onPostImage }) => {
    const editing = Boolean(form.employeeEditForm && form.employeeEditForm.values && form.employeeEditForm.values.editing);

    return (
        <form onSubmit={(e) => {onFormSubmit(e, form.employeeEditForm.values, clodinaryReducer.employeeProfileImage);}}>
            <Field type="checkbox" component="input" name="editing" className="hiddenInput"/>
            <div className="photoBlock">
                {clodinaryReducer.employeeProfileImage &&
                <img className="photo" src={clodinaryReducer.employeeProfileImage}/>
                ||
                <div className="photo">
                    {clodinaryReducer.employeeProfileImageLoading && <LoadingElement className="orgPhotoLoading"/> || <i className="fa fa-user"/>}
                </div>
                }
                {editing &&
                <label htmlFor="image" className="uploadPhotoButton">
                    <i className="fa fa-camera"/>
                    <span>Upload Photo</span>
                    <input type="file" id="image" className="hiddenInput" accept="image/jpeg,image/png,image/gif" onChange={(e) => {onPostImage(authReducer.user.cloudinary_meta, e.target.files[0]);}}/>
                </label>
                }
            </div>
            <div className="informationBlock">
                <table>
                    <thead>
                    <tr>
                        <td>
                            <h3>User Information</h3>
                        </td>
                        <td>
                            <div className="buttonData">
                                {(initialValues.user === authReducer.user.employee_id) && <button onClick={onEditClick}>
                                    <i className="fa fa-pencil"/>
                                    <span>Edit</span>
                                </button>}
                            </div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="firstName">First Name</label>
                        </td>
                        <td>
                            <Field component="input" type="text" disabled={!editing} name="first_name"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="lastName">Last Name</label>
                        </td>
                        <td>
                            <Field component="input" type="text" disabled={!editing} name="last_name"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="title">Email</label>
                        </td>
                        <td>
                            <Field component="input" type="email" disabled={!editing} name="email"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="phone">Phone</label>
                        </td>
                        <td>
                            <Field component="input" name="phone" type="text" disabled={!editing} normalize={normalizePhone}/>
                        </td>
                    </tr>
                    {(initialValues.user === authReducer.user.employee_id) && <tr>
                        <td/>
                        <td>
                            <div className="buttons">
                                <button className="cancel" onClick={onCancelClick}>Cancel</button>
                                <button className="save">
                                    {employeesReducer.employeeSaveLoading && <LoadingElement/>}
                                    Save
                                </button>
                            </div>
                        </td>
                    </tr>}
                    </tbody>
                </table>
            </div>
        </form>
    );
};

EmployeeEditForm.propTypes = {
    form: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    initialValues: React.PropTypes.object,
    onPostImage: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onCancelClick: React.PropTypes.func,
    onFormSubmit: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        clodinaryReducer: state.clodinaryReducer,
        employeesReducer: state.employeesReducer,
        form: state.form
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostImage: (meta, file) => {
            dispatch(postEmployeeProfileImage(meta, file));
        },
        onEditClick: (e) => {
            e.preventDefault();
            dispatch(change('employeeEditForm', 'editing', true));
        },
        onCancelClick: (e) => {
            e.preventDefault();
            dispatch(change('employeeEditForm', 'editing', false));
        },
        onFormSubmit: (e, formData, img) => {
            e.preventDefault();
            const collectedData = {
                user: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email
                },
                phone: formData.phone,
                prof_pic: img
            };
            dispatch(saveEmployeeChanges(collectedData, formData.user));
        }
    };
};

EmployeeEditForm = connect(mapStateToProps, mapDispatchToProps)(EmployeeEditForm);

EmployeeEditForm = reduxForm({
    form: 'employeeEditForm'
})(EmployeeEditForm);

export default EmployeeEditForm;
