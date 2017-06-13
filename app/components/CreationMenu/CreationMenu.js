import React from 'react';
import {connect} from 'react-redux';
import {
    showCreateMeetingModal,
    showCreateLeadModal,
    showCreateTaskModal,
    showCreateAccountModal,
    showCreateContactModal,
    showCreateDealModal,
    delInitialModalData
} from '../../actions/modalsActions';
import CreateMeetingModal from '../MeetingModal/CreateMeetingModal';
import CreateTaskModal from '../TaskModal/CreateTaskModal';
import CreateLeadModal from '../LeadModal/CreateLeadModal';
import CreateAccountModal from '../AccountModal/CreateAccountModal';
import CreateContactModal from '../ContactModal/CreateContactModal';
import CreateDealModal from '../DealModal/CreateDealModal';
import UpdateLeadModal from '../LeadModal/UpdateLeadModal';
import UpdateAccountModal from '../AccountModal/UpdateAccountModal';
import UpdateContactModal from '../ContactModal/UpdateContactModal';
import UpdateTaskModal from '../TaskModal/UpdateTaskModal';
import UpdateMeetingModal from '../MeetingModal/UpdateMeetingModal';
import UpdateDealModal from '../DealModal/UpdateDealModal';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { initInitialModalData } from '../../actions/modalsActions';
import IconLeads from '../IconLeads/IconLeads';
import IconAccount from '../IconAccount/IconAccount';
import IconContact from '../IconContact/IconContact';
import IconDeal from '../IconDeal/IconDeal';
import IconTask from '../IconTask/IconTask';
import IconMeeting from '../IconMeeting/IconMeeting';

const CreationMenu = ({onShowCreateMeetingModal, onShowCreateTaskModal, onShowCreateAccountModal, onShowCreateContactModal, onShowCreateLeadModal, onShowCreateDealModal}) => {
    return (
        <Dropdown className="dashboard-header__create">
            <DropdownTrigger className="dashboard-header__create-btn">+</DropdownTrigger>

            <DropdownContent className="dropdown-content dropdown-content--create-menu">
                <ul className="dropdown-content__dropdown-menu">
                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--title">
                        <span className="dropdown-content__dropdown-item-name">Create</span>
                    </li>

                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--leads">
                        <a href="#" className="dropdown-content__dropdown-link" onClick={e => {onShowCreateLeadModal(e);}}>
                            <IconLeads
                                width="34px"
                                height="24px"
                                view="6 0 24 24"
                                color="#f9a825"
                            />
                            <span className="dropdown-content__dropdown-item-name">Leads</span>
                        </a>
                    </li>

                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--account">
                        <a href="#" className="dropdown-content__dropdown-link" onClick={e => {onShowCreateAccountModal(e);}}>
                            <IconAccount
                                width="34px"
                                height="24px"
                                view="7 0 24 24"
                                color="#ff7043"
                            />
                            <span className="dropdown-content__dropdown-item-name">Account</span>
                        </a>
                    </li>

                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--contact">
                        <a href="#" className="dropdown-content__dropdown-link" onClick={e => {onShowCreateContactModal(e);}}>
                            <IconContact
                                width="34px"
                                height="24px"
                                view="6 -4 20 24"
                                color="#82b1ff"
                            />
                            <span className="dropdown-content__dropdown-item-name">Contact</span>
                        </a>
                    </li>

                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--deal">
                        <a href="#" className="dropdown-content__dropdown-link" onClick={e => {onShowCreateDealModal(e);}}>
                            <IconDeal
                                width="34px"
                                height="24px"
                                view="0 0 34 16"
                                color="#dba1ff"
                            />
                            <span className="dropdown-content__dropdown-item-name">Deal</span>
                        </a>
                    </li>

                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--task">
                        <a href="#" className="dropdown-content__dropdown-link" onClick={e => {onShowCreateTaskModal(e);}}>
                            <IconTask
                                width="34px"
                                height="24px"
                                view="0 0 32 18"
                                color="#7986cb"
                            />
                            <span className="dropdown-content__dropdown-item-name">Task</span>
                        </a>
                    </li>

                    <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--meeting">
                        <a href="#" className="dropdown-content__dropdown-link" onClick={e => {onShowCreateMeetingModal(e);}}>
                            <IconMeeting
                                width="34px"
                                height="24px"
                                view="1 0 34 13"
                                color="#00bfa5"
                            />
                            <span className="dropdown-content__dropdown-item-name">Meeting</span>
                        </a>
                    </li>

                </ul>
            </DropdownContent>
            <CreateMeetingModal/>
            <CreateTaskModal/>
            <CreateContactModal/>
            <CreateAccountModal/>
            <CreateLeadModal/>
            <CreateDealModal/>
            <UpdateLeadModal/>
            <UpdateAccountModal/>
            <UpdateContactModal/>
            <UpdateTaskModal/>
            <UpdateMeetingModal/>
            <UpdateDealModal/>
        </Dropdown>
    );
};

CreationMenu.propTypes = {
    dashboardHeaderReducer: React.PropTypes.object,
    onShowCreateMeetingModal: React.PropTypes.func,
    onShowCreateTaskModal: React.PropTypes.func,
    onShowCreateAccountModal: React.PropTypes.func,
    onShowCreateContactModal: React.PropTypes.func,
    onShowCreateLeadModal: React.PropTypes.func,
    onShowCreateDealModal: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        dashboardHeaderReducer: state.dashboardHeaderReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onShowCreateMeetingModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            const data = {duration: 60};
            dispatch(initInitialModalData(data));
            dispatch(showCreateMeetingModal());
        },
        onShowCreateTaskModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            dispatch(showCreateTaskModal());
        },
        onShowCreateAccountModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateAccountModal());
        },
        onShowCreateContactModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateContactModal());
        },
        onShowCreateLeadModal: (e) => {
            e.preventDefault();
            dispatch(delInitialModalData());
            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateLeadModal());
        },
        onShowCreateDealModal: (e) => {
            e.preventDefault(showCreateDealModal());
            dispatch(delInitialModalData());
            dispatch(showCreateDealModal());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreationMenu);
