import React from 'react';
import SaveModal from '../Modal/SaveModal';
import { hideCreateTaskModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { createNewTask } from '../../actions/tasksActions';
import { connect } from 'react-redux';
import { clearLeadContactSuggestion } from '../../actions/leadContactActions';
import { clearDealSuggestion } from '../../actions/dealFieldActions';
import { touch } from 'redux-form';
import TaskModalForm from '../TaskModalForm/TaskModalForm';
import moment from 'moment';
import IconTask from '../IconTask/IconTask';

const CreateTaskModal = ({modalsReducer, formData, leadContactReducer, dealFieldReducer, employeesReducer, tasksReducer, onShowModal, onHideModal, onSaveModal, customerDetailReducer}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateTaskModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, leadContactReducer, dealFieldReducer, employeesReducer, customerDetailReducer.currentCustomerDetailTasksType, tasksReducer.currentTasksListType, tasksReducer.tasksListPage, true);}}
            onSaveAndNew={() => {onSaveModal(formData, leadContactReducer, dealFieldReducer, employeesReducer, customerDetailReducer.currentCustomerDetailTasksType, tasksReducer.currentTasksListType, tasksReducer.tasksListPage, false);}}
            modalTitle="CREATE TASK"
            headerIcon={() => IconTask({
                width: '35px',
                height: '21px',
                view: '1 -4 24 24',
                color: '#ffffff'
            })}
            submitLoading={tasksReducer.createNewTaskLoading}
        >
            <div className="informationBlock">
                <TaskModalForm
                    leadContactReducer={leadContactReducer}
                    employeesReducer={employeesReducer}
                    initialValues={{
                        status: 'O',
                        priority: 'M'
                    }}
                />
            </div>
        </SaveModal>
    );
};

CreateTaskModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    leadContactReducer: React.PropTypes.object,
    dealFieldReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    tasksReducer: React.PropTypes.object,
    customerDetailReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func,
    onSaveAndNewModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        leadContactReducer: state.leadContactReducer,
        dealFieldReducer: state.dealFieldReducer,
        employeesReducer: state.employeesReducer,
        tasksReducer: state.tasksReducer,
        customerDetailReducer: state.customerDetailReducer,
        formData: state.form.taskModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(hideCreateTaskModal());
            dispatch(clearLeadContactSuggestion());
            dispatch(clearDealSuggestion());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (formData, leadContactReducer, dealFieldReducer, employeesReducer, listType, listListType, listListPage, close) => {
            if (formData.syncErrors) {
                dispatch(touch('taskModalForm', 'subject', 'leadContact', 'taskOwner'));
            } else {
                dispatch(createNewTask({
                    subject: formData.values.subject,
                    contact_ct: leadContactReducer.contactCt,
                    contact_id: leadContactReducer.contactId,
                    company: leadContactReducer.leadContactSuggestion.company,
                    employee: employeesReducer.employeeId,
                    deal: dealFieldReducer.dealId ? dealFieldReducer.dealId : null,
                    status: formData.values.status,
                    priority: formData.values.priority,
                    due_date: formData.values.dueDate ? moment(formData.values.dueDate, 'Do MMMM YYYY').format('YYYY-MM-DD') : null,
                    description: formData.values.description,
                }, listType, listListType, listListPage, close));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);
