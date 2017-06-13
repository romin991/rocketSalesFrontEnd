import React from 'react';
import SaveModal from '../Modal/SaveModal';
import DealModalForm from '../DealModalForm/DealModalForm';
import { getEmployeesList, employeeFieldClear } from '../../actions/employeesActions';
import { hideCreateDealModal } from '../../actions/modalsActions';
import { createNewDeal } from '../../actions/dealsActions';
import { touch } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { clearContactSuggestion } from '../../actions/contactFieldActions';
import IconDeal from '../IconDeal/IconDeal';

const CreateDealModal = ({modalsReducer, dealsReducer, contactFieldReducer, employeesReducer, formData, onShowModal, onHideModal, onSaveModal, customerDetailReducer}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateDealModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, contactFieldReducer, employeesReducer, customerDetailReducer.currentCustomerDetailDealsType, dealsReducer.currentDealsListType, dealsReducer.dealsListPage, true);}}
            onSaveAndNew={() => {onSaveModal(formData, contactFieldReducer, employeesReducer, customerDetailReducer.currentCustomerDetailDealsType, dealsReducer.currentDealsListType, dealsReducer.dealsListPage, false);}}
            modalTitle="CREATE DEAL"
            headerIcon={() => IconDeal({
                width: '35px',
                height: '21px',
                view: '1 -7 24 24',
                color: '#ffffff'
            })}
            submitLoading={dealsReducer.createNewDealLoading}
        >
            <div className="informationBlock">
                <DealModalForm
                    contactFieldReducer={contactFieldReducer}
                    employeesReducer={employeesReducer}
                />
            </div>
        </SaveModal>
    );
};

CreateDealModal.propTypes = {
    modalsReducer: React.PropTypes.object,
    dealsReducer: React.PropTypes.object,
    contactFieldReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    customerDetailReducer: React.PropTypes.object,
    formData: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        dealsReducer: state.dealsReducer,
        contactFieldReducer: state.contactFieldReducer,
        employeesReducer: state.employeesReducer,
        customerDetailReducer: state.customerDetailReducer,
        formData: state.form.dealModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {
            dispatch(getEmployeesList());
        },
        onHideModal: () => {
            dispatch(hideCreateDealModal());
            dispatch(clearContactSuggestion());
            dispatch(employeeFieldClear());
        },
        onSaveModal: (formData, contactFieldReducer, employeesReducer, listType, listListType, listListPage, close) => {
            if (formData.syncErrors) {
                dispatch(touch('dealModalForm', 'contact', 'name', 'dealOwner'));
            } else {
                const revenue = formData.values.revenue ? parseInt(formData.values.revenue.split(' ').slice(-1)[0].split('.').join(''), 10) : 0;
                dispatch(createNewDeal({
                    customer: contactFieldReducer.contactSuggestion.id,
                    company: contactFieldReducer.contactSuggestion.company,
                    name: formData.values.name,
                    employee: employeesReducer.employeeId,
                    expected_revenue: revenue,
                    expected_closing_date: formData.values.closingDate ? moment(formData.values.closingDate, 'Do MMMM YYYY').format('YYYY-MM-DD') : null,
                    status: formData.values.stage,
                    description: formData.values.description,
                }, listType, listListType, listListPage, close));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDealModal);
