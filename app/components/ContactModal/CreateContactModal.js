import React from 'react';
import SaveModal from '../Modal/SaveModal';
import { hideCreateContactModal } from '../../actions/modalsActions';
import { createNewContact } from '../../actions/contactsActions';
import { clearAccountSuggestion } from '../../actions/accountsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { clearContactImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import { touch } from 'redux-form';
import ContactModalForm from '../ContactModalForm/ContactModalForm';
import IconContact from '../IconContact/IconContact';


const CreateContactModal = ({modalsReducer, clodinaryReducer, accountsReducer, contactsReducer, employeesReducer, onShowModal, onHideModal, onSaveModal, formData}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateContactModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, employeesReducer, clodinaryReducer.contactCreateImage, accountsReducer, contactsReducer.currentContactsListType, contactsReducer.contactsListPage, true);}}
            onSaveAndNew={() => {onSaveModal(formData, employeesReducer, clodinaryReducer.contactCreateImage, accountsReducer, contactsReducer.currentContactsListType, contactsReducer.contactsListPage, false);}}
            modalTitle="CREATE CONTACT"
            headerIcon={() => IconContact({
                width: '35px',
                height: '21px',
                view: '1 -4 24 24',
                color: '#ffffff'
            })}
            submitLoading={contactsReducer.createNewContactLoading}
        >
            <div className="informationBlock">
                <ContactModalForm
                    employeesReducer={employeesReducer}
                    accountsReducer={accountsReducer}
                />
            </div>
        </SaveModal>
    );
};

CreateContactModal.propTypes = {
    modalsReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
    accountsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    contactsReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        clodinaryReducer: state.clodinaryReducer,
        accountsReducer: state.accountsReducer,
        employeesReducer: state.employeesReducer,
        formData: state.form.contactModalForm,
        authReducer: state.authReducer,
        contactsReducer: state.contactsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(clearContactImage());
            dispatch(hideCreateContactModal());
            dispatch(employeeFieldClear());
            dispatch(clearAccountSuggestion());
        },
        onSaveModal: (formData, employeesReducer, image, accountsReducer, listListType, listListPage, close) => {
            if (formData.syncErrors) {
                dispatch(touch('contactModalForm', 'firstName', 'accountAutoSuggest', 'contactOwner'));
            } else {
                dispatch(createNewContact({
                    prof_pic: image,
                    first_name: formData.values.firstName,
                    last_name: formData.values.lastName,
                    company: accountsReducer.accountSuggestion.id,
                    employee: employeesReducer.employeeId,
                    phone: formData.values.phone,
                    mobile_phone: formData.values.mobile,
                    secondary_mobile_phone: formData.values.secMobilePhone,
                    email: formData.values.email,
                    fax: formData.values.fax,
                    position: formData.values.position,
                    street: formData.values.street,
                    city: formData.values.city,
                    state: formData.values.state,
                    country: formData.values.country,
                    pos_code: formData.values.posCode,
                    description: formData.values.description,
                }, listListType, listListPage, close));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateContactModal);
