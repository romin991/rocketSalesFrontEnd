import React from 'react';
import SaveModal from '../Modal/SaveModal';
import { hideCreateMeetingModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { connect } from 'react-redux';
import MeetingModalForm from '../MeetingModalForm/MeetingModalForm';
import { createNewMeeting } from '../../actions/meetingsActions';
import { clearLeadContactSuggestion } from '../../actions/leadContactActions';
import { clearDealSuggestion } from '../../actions/dealFieldActions';
import { touch } from 'redux-form';
import IconMeeting from '../IconMeeting/IconMeeting';

const CreateMeetingModal = ({
    modalsReducer,
    employeesReducer,
    leadContactReducer,
    dealFieldReducer,
    meetingsReducer,
    onShowModal,
    onHideModal,
    onSaveModal,
    formData,
    customerDetailReducer
}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateMeetingModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, leadContactReducer, dealFieldReducer, employeesReducer, customerDetailReducer.currentCustomerDetailMeetingsType, meetingsReducer.currentMeetingsListType, meetingsReducer.meetingsListPage, true);}}
            onSaveAndNew={() => {onSaveModal(formData, leadContactReducer, dealFieldReducer, employeesReducer, customerDetailReducer.currentCustomerDetailMeetingsType, meetingsReducer.currentMeetingsListType, meetingsReducer.meetingsListPage, false);}}
            modalTitle="CREATE MEETING"
            headerIcon={() => IconMeeting({
                width: '35px',
                height: '21px',
                view: '1 -7 24 24',
                color: '#ffffff'
            })}
            submitLoading={meetingsReducer.createNewMeetingLoading}
        >
            <div className="informationBlock">
                <MeetingModalForm
                    leadContactReducer={leadContactReducer}
                    employeesReducer={employeesReducer}
                />
            </div>
        </SaveModal>
    );
};

CreateMeetingModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    leadContactReducer: React.PropTypes.object,
    dealFieldReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    meetingsReducer: React.PropTypes.object,
    customerDetailReducer: React.PropTypes.object,
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
        meetingsReducer: state.meetingsReducer,
        customerDetailReducer: state.customerDetailReducer,
        formData: state.form.meetingModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(hideCreateMeetingModal());
            dispatch(clearLeadContactSuggestion());
            dispatch(clearDealSuggestion());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (formData, leadContactReducer, dealFieldReducer, employeesReducer, listType, listListType, listListPage, close) => {
            if (formData.syncErrors) {
                dispatch(touch('meetingModalForm', 'subject', 'startTime', 'duration', 'leadContact', 'meetingOwner'));
            } else {
                const creationData = {
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
                };
                dispatch(createNewMeeting(creationData, listType, listListType, listListPage, close));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeetingModal);
