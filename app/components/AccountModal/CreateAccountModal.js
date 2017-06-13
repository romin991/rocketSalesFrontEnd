import React from 'react';
import SaveModal from '../Modal/SaveModal';
import { hideCreateAccountModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { createNewAccount } from '../../actions/accountsActions';
import { clearAccountImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import { touch } from 'redux-form';
import AccountModalForm from '../AccountModalForm/AccountModalForm';
import IconAccount from '../IconAccount/IconAccount';

const CreateAccountModal = ({modalsReducer, employeesReducer, clodinaryReducer, accountsReducer, onShowModal, onHideModal, onSaveModal, formData}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateAccountModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, employeesReducer, clodinaryReducer.accountCreateImage, accountsReducer.currentAccountsListType, accountsReducer.accountsListPage, true);}}
            onSaveAndNew={() => {onSaveModal(formData, employeesReducer, clodinaryReducer.accountCreateImage, accountsReducer.currentAccountsListType, accountsReducer.accountsListPage, false);}}
            modalTitle="CREATE ACCOUNT"
            headerIcon={() => IconAccount({
                width: '35px',
                height: '21px',
                view: '1 -1 24 24',
                color: '#ffffff'
            })}
            submitLoading={accountsReducer.createNewAccountLoading}
        >
            <div className="informationBlock">
                <AccountModalForm
                    employeesReducer={employeesReducer}
                />
            </div>
        </SaveModal>
    );
};

CreateAccountModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    accountsReducer: React.PropTypes.object,
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
        formData: state.form.accountModalForm,
        authReducer: state.authReducer,
        accountsReducer: state.accountsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(clearAccountImage());
            dispatch(hideCreateAccountModal());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (formData, employeesReducer, image, listListType, listListPage, close) => {
            if (formData.syncErrors) {
                dispatch(touch('accountModalForm', 'name', 'accountOwner'));
            } else {
                dispatch(createNewAccount({
                    name: formData.values.name,
                    employee: employeesReducer.employeeId,
                    phone: formData.values.phone,
                    email: formData.values.email,
                    fax: formData.values.fax,
                    industry: formData.values.industry,
                    company_website: formData.values.website,
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
                    prof_pic: image
                }, listListType, listListPage, close));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountModal);
