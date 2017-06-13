import React from 'react';
import SaveModal from '../Modal/SaveModal';
import { hideCreateLeadModal } from '../../actions/modalsActions';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { createNewLead } from '../../actions/leadsActions';
import { clearLeadImage } from '../../actions/cloudinaryActions';
import { connect } from 'react-redux';
import { touch } from 'redux-form';
import LeadModalForm from '../LeadModalForm/LeadModalForm';
import IconLeads from '../IconLeads/IconLeads';

const CreateLeadModal = ({modalsReducer, employeesReducer, formData, clodinaryReducer, leadsReducer, onShowModal, onHideModal, onSaveModal}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateLeadModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, employeesReducer, clodinaryReducer.leadCreateImage, leadsReducer.currentLeadsListType, leadsReducer.leadsListPage, true);}}
            onSaveAndNew={() => {onSaveModal(formData, employeesReducer, clodinaryReducer.leadCreateImage, leadsReducer.currentLeadsListType, leadsReducer.leadsListPage, false);}}
            modalTitle="CREATE LEAD"
            headerIcon={() => IconLeads({
                width: '35px',
                height: '21px',
                view: '1 -2 24 24',
                color: '#ffffff'
            })}
            submitLoading={leadsReducer.createNewLeadLoading}
        >
            <div className="informationBlock">
                <LeadModalForm
                    employeesReducer={employeesReducer}
                />
            </div>
        </SaveModal>
    );
};

CreateLeadModal.propTypes = {
    dispatch: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    clodinaryReducer: React.PropTypes.object,
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
            dispatch(hideCreateLeadModal());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (formData, employeesReducer, image, listListType, listListPage, close) => {
            if (formData.syncErrors) {
                dispatch(touch('leadModalForm', 'firstName', 'company', 'leadOwner'));
            } else {
                dispatch(createNewLead({
                    prof_pic: image,
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
                }, listListType, listListPage, close));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeadModal);
