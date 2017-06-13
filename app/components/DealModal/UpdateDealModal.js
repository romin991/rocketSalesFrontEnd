import React from 'react';
import UpdateModal from '../Modal/UpdateModal';
import DealModalForm from '../DealModalForm/DealModalForm';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { hideUpdateDealModal } from '../../actions/modalsActions';
import { updateDeal } from '../../actions/customerDetailActions';
import { touch } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { clearContactSuggestion } from '../../actions/contactFieldActions';

const UpdateDealModal = ({modalsReducer, customerDetailReducer, contactFieldReducer, employeesReducer, formData, onShowModal, onHideModal, onSaveModal}) => {
    return (
        <UpdateModal
            showModal={modalsReducer.showUpdateDealModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(customerDetailReducer.customerDetail.id, formData, contactFieldReducer, employeesReducer);}}
            modalTitle="UPDATE DEAL"
            iconClass="fa-thumbs-up"
            submitLoading={customerDetailReducer.updateCustomerLoading}
        >
            <div className="informationBlock">
                <DealModalForm
                    contactFieldReducer={contactFieldReducer}
                    employeesReducer={employeesReducer}
                />
            </div>
        </UpdateModal>
    );
};

UpdateDealModal.propTypes = {
    modalsReducer: React.PropTypes.object,
    customerDetailReducer: React.PropTypes.object,
    contactFieldReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        customerDetailReducer: state.customerDetailReducer,
        contactFieldReducer: state.contactFieldReducer,
        employeesReducer: state.employeesReducer,
        formData: state.form.dealModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(hideUpdateDealModal());
            dispatch(clearContactSuggestion());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (id, formData, contactFieldReducer, employeesReducer) => {
            if (formData.syncErrors) {
                dispatch(touch('dealModalForm', 'contact', 'name', 'dealOwner'));
            } else {
                const revenue = formData.values.revenue ? parseInt(formData.values.revenue.split(' ').slice(-1)[0].split('.').join(''), 10) : 0;
                dispatch(updateDeal(id, {
                    customer: contactFieldReducer.contactSuggestion.id,
                    company: contactFieldReducer.contactSuggestion.company,
                    name: formData.values.name,
                    employee: employeesReducer.employeeId,
                    expected_revenue: revenue,
                    expected_closing_date: formData.values.closingDate ? moment(formData.values.closingDate, 'Do MMMM YYYY').format('YYYY-MM-DD') : null,
                    status: formData.values.stage,
                    description: formData.values.description,
                }));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDealModal);
