import React from 'react';
import { connect } from 'react-redux';
import CreateUserModal from '../CreateUserModal/CreateUserModal';
import { showCreateUserModal } from '../../actions/modalsActions';

const SettingsHead = ({showAddUserButton, onShowCreateUserModal}) => {
    return (
        <div className="titleBlock">
            <div className="titleBlockLeft">
                <h2>
                    <i className="fa fa-sliders"/>
                    <span>SETTINGS</span>
                </h2>
            </div>
            { showAddUserButton &&
            <div className="titleBlockRight">
                <button onClick={onShowCreateUserModal}>
                    <i className="fa fa-plus"/>
                    <span>Add New User</span>
                </button>
                <CreateUserModal/>
            </div>
            }
        </div>
    );
};

SettingsHead.propTypes = {
    showAddUserButton: React.PropTypes.bool,
    onShowCreateUserModal: React.PropTypes.func
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowCreateUserModal: () => {
            dispatch(showCreateUserModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHead);
