import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import LoadingElement from '../LoadingElement/LoadingElement';
import { postOrgProfileImage } from '../../actions/cloudinaryActions';
import { editEntity } from '../../actions/entitiesActions';

const validate = () => {
    const errors = {};

    return errors;
};

let OrgProfileForm = ({authReducer, clodinaryReducer, onPostImage, form, onEditClick, onCancelClick, onFormSubmit, entitiesReducer}) => {
    const editing = Boolean(form.orgProfileForm && form.orgProfileForm.values && form.orgProfileForm.values.editing);

    return (
        <form className="rightBlock" onSubmit={(e) => {onFormSubmit(e, form.orgProfileForm.values, clodinaryReducer.orgProfileImage);}}>
            <div className="photoBlock">
                {clodinaryReducer.orgProfileImage &&
                <img className="photo" src={clodinaryReducer.orgProfileImage}/>
                ||
                <div className="photo">
                    {clodinaryReducer.orgProfileImageLoading && <LoadingElement className="orgPhotoLoading"/> || <i className="fa fa-user"/>}
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
                <Field type="checkbox" component="input" name="editing" className="hiddenInput"/>
                <table>
                    <thead>
                    <tr>
                        <td colSpan="2">
                            <h3>
                                Organization Information
                                <div className="buttonData">
                                <button onClick={onEditClick}>
                                    <i className="fa fa-pencil"/>
                                    <span>Edit</span>
                                </button>
                            </div>
                            </h3>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="companyName">Company Name</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="companyName"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="phone">Industry</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="industry"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="fax">Company website</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="companyWebsite"/>
                        </td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <td colSpan="2">
                            <h3>Address Information</h3>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="street">Street</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="street"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="city">City</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="city"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="state">State</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="state"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="country">Country</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="country"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelData">
                            <label htmlFor="zipCode">Zip Code</label>
                        </td>
                        <td>
                            <Field type="text" component="input" disabled={!editing} name="zipCode"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <div className="buttons">
                                <button className="cancel" onClick={onCancelClick}>Cancel</button>
                                <button type="submit" className="save">
                                    {entitiesReducer.entityEditLoading && <LoadingElement/>}
                                    Save
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
};

OrgProfileForm.propTypes = {
    clodinaryReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    entitiesReducer: React.PropTypes.object,
    form: React.PropTypes.object,
    onPostImage: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onCancelClick: React.PropTypes.func,
    onFormSubmit: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        clodinaryReducer: state.clodinaryReducer,
        entitiesReducer: state.entitiesReducer,
        form: state.form
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostImage: (meta, file) => {
            dispatch(postOrgProfileImage(meta, file));
        },
        onEditClick: (e) => {
            e.preventDefault();
            dispatch(change('orgProfileForm', 'editing', true));
        },
        onCancelClick: (e) => {
            e.preventDefault();
            dispatch(change('orgProfileForm', 'editing', false));
        },
        onFormSubmit: (e, formData, image) => {
            e.preventDefault();
            const collectedData = {
                name: formData.companyName,
                industry: formData.industry,
                company_website: formData.companyWebsite,
                street: formData.street,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pos_code: formData.zipCode,
                prof_pic: image
            };
            dispatch(editEntity(collectedData));
        }
    };
};

OrgProfileForm = connect(mapStateToProps, mapDispatchToProps)(OrgProfileForm);

OrgProfileForm = reduxForm({
    form: 'orgProfileForm', validate
})(OrgProfileForm);

export default OrgProfileForm;
