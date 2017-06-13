import React from 'react';
import SaveModal from '../Modal/SaveModal';
import { hideCreateUserModal } from '../../actions/modalsActions';
import { connect } from 'react-redux';
import CreateUserModalForm from '../CreateUserModalForm/CreateUserModalForm';
import { createMembership } from '../../actions/membershipsActions';
import { touch } from 'redux-form';

const CreateUserModal = ({modalsReducer, formData, membershipsReducer, onShowModal, onHideModal, onSaveModal}) => {
    return (
        <SaveModal
            showModal={modalsReducer.showCreateUserModal}
            onShow={onShowModal}
            onHide={onHideModal}
            onSave={() => {onSaveModal(formData, true);}}
            onSaveAndNew={() => {onSaveModal(formData, false);}}
            modalTitle="CREATE NEW USER"
            submitLoading={membershipsReducer.membershipAddLoading}
        >
            <div className="informationBlock">
                <CreateUserModalForm/>
            </div>
        </SaveModal>
    );
};

CreateUserModal.propTypes = {
    modalsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    membershipsReducer: React.PropTypes.object,
    onShowModal: React.PropTypes.func,
    onHideModal: React.PropTypes.func,
    onSaveModal: React.PropTypes.func,
    formData: React.PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer,
        authReducer: state.authReducer,
        membershipsReducer: state.membershipsReducer,
        formData: state.form.userModalForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {},
        onHideModal: () => {
            dispatch(hideCreateUserModal());
        },
        onSaveModal: (formData, close) => {
            if (formData.syncErrors) {
                dispatch(touch('userModalForm', 'email', 'firstName', 'lastName'));
            } else {
                dispatch(createMembership({
                    email: formData.values.email,
                    role: formData.values.role,
                    first_name: formData.values.firstName,
                    last_name: formData.values.lastName
                }, close));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);
