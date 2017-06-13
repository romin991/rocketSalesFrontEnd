import React from 'react';
import UpdateModal from '../Modal/UpdateModal';
import { hideUpdateMeetingModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { connect } from 'react-redux';
import MeetingModalForm from '../MeetingModalForm/MeetingModalForm';
import { updateEvent } from '../../actions/activityDetailActions';
import { clearLeadContactSuggestion } from '../../actions/leadContactActions';
import { clearDealSuggestion } from '../../actions/dealFieldActions';
import { touch } from 'redux-form';

const UpdateMeetingModal = ({
    modalsReducer,
    activityDetailReducer,
    employeesReducer,
    leadContactReducer,
    dealFieldReducer,
    onShowModal,
    onHideModal,
    onSaveModal,
    formData
}) => {
    return (
        <UpdateModal
            showModal={modalsReducer.showUpdateMeetingModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(activityDetailReducer.activityDetail.id, formData, leadContactReducer, dealFieldReducer, employeesReducer);}}
            modalTitle="UPDATE MEETING"
            iconClass="fa-comments"
            submitLoading={activityDetailReducer.updateActivityLoading}
        >
            <div className="informationBlock">
                <MeetingModalForm
                    leadContactReducer={leadContactReducer}
                    employeesReducer={employeesReducer}
                />
            </div>
        </UpdateModal>
    );
};

UpdateMeetingModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    leadContactReducer: React.PropTypes.object,
    dealFieldReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    activityDetailReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        leadContactReducer: state.leadContactReducer,
        dealFieldReducer: state.dealFieldReducer,
        employeesReducer: state.employeesReducer,
        activityDetailReducer: state.activityDetailReducer,
        formData: state.form.meetingModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(hideUpdateMeetingModal());
            dispatch(clearLeadContactSuggestion());
            dispatch(clearDealSuggestion());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (id, formData, leadContactReducer, dealFieldReducer, employeesReducer) => {
            if (formData.syncErrors) {
                dispatch(touch('meetingModalForm', 'subject', 'startTime', 'duration', 'leadContact', 'meetingOwner'));
            } else {
                dispatch(updateEvent(id, {
                    subject: formData.values.subject,
                    contact_ct: leadContactReducer.contactCt,
                    contact_id: leadContactReducer.contactId,
                    company: leadContactReducer.leadContactSuggestion.company,
                    employee: employeesReducer.employeeId,
                    start_time: formData.values.startTime ? formData.values.startTime.utc().format('YYYY-MM-DDTHH:mm:ss') + '.0Z' : null,
                    duration: formData.values.duration,
                    deal: dealFieldReducer.dealId ? dealFieldReducer.dealId : null,
                    street: formData.values.street,
                    city: formData.values.city,
                    state: formData.values.state,
                    country: formData.values.country,
                    pos_code: formData.values.posCode,
                    description: formData.values ? formData.values.description : ''
                }));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeetingModal);
