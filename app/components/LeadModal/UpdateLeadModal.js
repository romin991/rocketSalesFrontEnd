import React from 'react';
import UpdateModal from '../Modal/UpdateModal';
import { hideUpdateLeadModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { clearLeadImage } from '../../actions/cloudinaryActions';
import { updateLead } from '../../actions/customerDetailActions';
import { connect } from 'react-redux';
import LeadModalForm from '../LeadModalForm/LeadModalForm';
import { touch } from 'redux-form';

const UpdateLeadModal = ({modalsReducer, customerDetailReducer, employeesReducer, formData, clodinaryReducer, onShowModal, onHideModal, onSaveModal}) => {
    return (
        <UpdateModal
            showModal={modalsReducer.showUpdateLeadModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(customerDetailReducer.customerDetail.id, formData, employeesReducer, clodinaryReducer.leadCreateImage);}}
            modalTitle="UPDATE LEAD"
            iconClass="fa-star"
            submitLoading={customerDetailReducer.updateCustomerLoading}
        >
            <div className="informationBlock">
                <LeadModalForm
                    employeesReducer={employeesReducer}
                />
            </div>
        </UpdateModal>
    );
};

UpdateLeadModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
    customerDetailReducer: React.PropTypes.object,
    leadsReducer: React.PropTypes.object,
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
        leadsReducer: state.leadsReducer,
        formData: state.form.leadModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(clearLeadImage());
            dispatch(hideUpdateLeadModal());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (id, formData, employeesReducer, image) => {
            if (formData.syncErrors) {
                dispatch(touch('leadModalForm', 'firstName', 'company', 'leadOwner'));
            } else {
                dispatch(updateLead(id, {
                    prof_pic: image,
                    title: formData.values.title,
                    first_name: formData.values.firstName,
                    last_name: formData.values.lastName,
                    company_name: formData.values.company,
                    employee: employeesReducer.employeeId,
                    phone: formData.values.phone,
                    mobile_phone: formData.values.mobile,
                    email: formData.values.email,
                    fax: formData.values.fax,
                    position: formData.values.position,
                    lead_source: formData.values.leadSource,
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadModal);
