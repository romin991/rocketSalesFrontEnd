import React from 'react';
import UpdateModal from '../Modal/UpdateModal';
import { hideUpdateTaskModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { connect } from 'react-redux';
import { clearLeadContactSuggestion } from '../../actions/leadContactActions';
import { clearDealSuggestion } from '../../actions/dealFieldActions';
import TaskModalForm from '../TaskModalForm/TaskModalForm';
import { updateTask } from '../../actions/activityDetailActions';
import { touch } from 'redux-form';
import moment from 'moment';

const UpdateTaskModal = ({modalsReducer, activityDetailReducer, leadContactReducer, dealFieldReducer, formData, employeesReducer, onShowModal, onHideModal, onSaveModal}) => {
    return (
        <UpdateModal
            showModal={modalsReducer.showUpdateTaskModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(activityDetailReducer.activityDetail.id,  formData, leadContactReducer, dealFieldReducer, employeesReducer);}}
            modalTitle="UPDATE TASK"
            iconClass="fa-check-square-o"
            submitLoading={activityDetailReducer.updateActivityLoading}
        >
            <div className="informationBlock">
                <TaskModalForm
                    leadContactReducer={leadContactReducer}
                    employeesReducer={employeesReducer}
                />
            </div>
        </UpdateModal>
    );
};

UpdateTaskModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    leadContactReducer: React.PropTypes.object,
    dealFieldReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    activityDetailReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        leadContactReducer: state.leadContactReducer,
        dealFieldReducer: state.dealFieldReducer,
        employeesReducer: state.employeesReducer,
        activityDetailReducer: state.activityDetailReducer,
        formData: state.form.taskModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(hideUpdateTaskModal());
            dispatch(clearLeadContactSuggestion());
            dispatch(clearDealSuggestion());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (id, formData, leadContactReducer, dealFieldReducer, employeesReducer) => {
            if (formData.syncErrors) {
                dispatch(touch('taskModalForm', 'subject', 'leadContact', 'taskOwner'));
            } else {
                dispatch(updateTask(id, {
                    subject: formData.values.subject,
                    contact_ct: leadContactReducer.contactCt,
                    contact_id: leadContactReducer.contactId,
                    company: leadContactReducer.leadContactSuggestion.company,
                    employee: employeesReducer.employeeId,
                    deal: dealFieldReducer.dealId ? dealFieldReducer.dealId : null,
                    status: formData.values.status,
                    priority: formData.values.priority,
                    due_date: formData.values.dueDate ? moment(formData.values.dueDate, 'Do MMMM YYYY').format('YYYY-MM-DD') : null,
                    description: formData.values.description
                }));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskModal);
