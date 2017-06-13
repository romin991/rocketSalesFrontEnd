import React from 'react';
import UpdateModal from '../Modal/UpdateModal';
import { updateContact } from '../../actions/customerDetailActions';
import { hideUpdateContactModal } from '../../actions/modalsActions';
import { clearAccountSuggestion } from '../../actions/accountsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { clearContactImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import { touch } from 'redux-form';
import ContactModalForm from '../ContactModalForm/ContactModalForm';


const UpdateContactModal = ({modalsReducer, customerDetailReducer, accountsReducer, employeesReducer, clodinaryReducer, onShowModal, onHideModal, onSaveModal, formData}) => {
    return (
        <UpdateModal
            showModal={modalsReducer.showUpdateContactModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(customerDetailReducer.customerDetail.id, formData, employeesReducer, clodinaryReducer.contactCreateImage, accountsReducer);}}
            modalTitle="UPDATE CONTACT"
            iconClass="fa-file-text-o"
            submitLoading={customerDetailReducer.updateCustomerLoading}
        >
            <div className="informationBlock">
                <ContactModalForm
                    employeesReducer={employeesReducer}
                    accountsReducer={accountsReducer}
                />
            </div>
        </UpdateModal>
    );
};

UpdateContactModal.propTypes = {
    modalsReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
    accountsReducer: React.PropTypes.object,
    customerDetailReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        employeesReducer: state.employeesReducer,
        clodinaryReducer: state.clodinaryReducer,
        accountsReducer: state.accountsReducer,
        customerDetailReducer: state.customerDetailReducer,
        formData: state.form.contactModalForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(clearContactImage());
            dispatch(hideUpdateContactModal());
            dispatch(employeeFieldClear());
            dispatch(clearAccountSuggestion());
        },
        onSaveModal: (id, formData, employeesReducer, image, accountsReducer) => {
            if (formData.syncErrors) {
                dispatch(touch('contactModalForm', 'firstName', 'accountAutoSuggest', 'contactOwner'));
            } else {
                dispatch(updateContact(id, {
                    prof_pic: image,
                    title: formData.values.title,
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
                }));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactModal);
