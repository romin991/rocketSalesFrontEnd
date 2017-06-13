import React from 'react';
import UpdateModal from '../Modal/UpdateModal';
import { hideUpdateAccountModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { updateAccount } from '../../actions/customerDetailActions';
import { clearAccountImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import { touch } from 'redux-form';
import AccountModalForm from '../AccountModalForm/AccountModalForm';

const UpdateAccountModal = ({modalsReducer, customerDetailReducer, employeesReducer, clodinaryReducer, onShowModal, onHideModal, onSaveModal, formData}) => {
    return (
        <UpdateModal
            showModal={modalsReducer.showUpdateAccountModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(customerDetailReducer.customerDetail.id, formData, employeesReducer, clodinaryReducer.accountCreateImage);}}
            modalTitle="UPDATE ACCOUNT"
            iconClass="fa-user"
            submitLoading={customerDetailReducer.updateCustomerLoading}
        >
            <div className="informationBlock">
                <AccountModalForm
                    employeesReducer={employeesReducer}
                />
            </div>
        </UpdateModal>
    );
};

UpdateAccountModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
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
        customerDetailReducer: state.customerDetailReducer,
        formData: state.form.accountModalForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(clearAccountImage());
            dispatch(hideUpdateAccountModal());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (id, formData, employeesReducer, image) => {
            if (formData.syncErrors) {
                dispatch(touch('accountModalForm', 'name', 'accountOwner'));
            } else {
                dispatch(updateAccount(id, {
                    name: formData.values.name,
                    employee: employeesReducer.employeeId,
                    phone: formData.values.phone,
                    email: formData.values.email,
                    fax: formData.values.fax,
                    industry: formData.values.industry,
                    street: formData.values.billingStreet,
                    city: formData.values.billingCity,
                    state: formData.values.billingState,
                    country: formData.values.billingCountry,
                    pos_code: formData.values.billingPos,
                    shipping_street: formData.values.shippingStreet,
                    shipping_city: formData.values.shippingCity,
                    shipping_state: formData.values.shippingState,
                    shipping_country: formData.values.shippingCountry,
                    shipping_pos_code: formData.values.shippingPos,
                    description: formData.values.description,
                    company_website: formData.values.website,
                    prof_pic: image
                }));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountModal);
