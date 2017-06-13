import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { toggleSidebarMenu } from '../../actions/dashboardSidebarActions';
import IconDashboard from '../IconDashboard/IconDashboard';
import IconLeads from '../IconLeads/IconLeads';
import IconAccount from '../IconAccount/IconAccount';
import IconContact from '../IconContact/IconContact';
import IconDeal from '../IconDeal/IconDeal';
import IconTask from '../IconTask/IconTask';
import IconMeeting from '../IconMeeting/IconMeeting';

import './DashboardSidebar.scss';

const DashboardHeader = ({dashboardSidebarReducer, onToggleSidebarMenu, routing}) => {
    const toggleClass = classNames({
        'dashboard-sidebar': true,
        'expanded': dashboardSidebarReducer.showSidebarMenu
    });

    const mainLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/'
    });

    const leadsLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/list-leads'
    });

    const accountsLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/list-accounts'
    });

    const contactsLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/list-contacts'
    });

    const tasksLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/list-tasks'
    });

    const meetingsLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/list-meetings'
    });

    const dealsLinkClasses = classNames({
        'dashboard-sidebar__navigation-link': true,
        'dashboard-sidebar__navigation-link--current': routing.locationBeforeTransitions.pathname === '/list-deals'
    });


    return (
        <div className={toggleClass}>
            <div className="dashboard-sidebar__header">
                <a href="#" className="dashboard-sidebar__toggle-btn" onClick={onToggleSidebarMenu}>
                    <svg width="22px" height="16px" viewBox="0 0 22 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" fill="none" opacity="0.65">
                            <g id="ZD-import-sucess" transform="translate(-22.000000, -24.000000)" fill="#FFFFFF">
                                <g id="sidebar-collapse">
                                    <g id="hamburger-ico" transform="translate(13.000000, 10.000000)">
                                        <g id="Group-2" transform="translate(9.000000, 14.000000)">
                                            <path d="M0,16 L14,16 L14,14 L0,14 L0,16 Z M0,2 L18,2 L18,0 L0,0 L0,2 Z M0,9 L22,9 L22,7 L0,7 L0,9 Z" id="hamburber-Menu"/>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
            <ul className="dashboard-sidebar__navigation-menu">
                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/" className={mainLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--dashboard">
                            <IconDashboard
                                width="24px"
                                height="26px"
                                view="0 0 24 24"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Dashboard</span>
                    </Link>
                </li>

                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/list-leads" className={leadsLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--leads">
                            <IconLeads
                                width="24px"
                                height="26px"
                                view="1 0 24 24"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Leads</span>
                    </Link>
                </li>

                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/list-accounts" className={accountsLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--account">
                            <IconAccount
                                width="24px"
                                height="24px"
                                view="2 0 24 24"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Accounts</span>
                    </Link>
                </li>

                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/list-contacts" className={contactsLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--contact">
                            <IconContact
                                width="20px"
                                height="28px"
                                view="0 0 20 20"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Contacts</span>
                    </Link>
                </li>

                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/list-deals" className={dealsLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--deal">
                            <IconDeal
                                width="26px"
                                height="28px"
                                view="0 0 26 19"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Deals</span>
                    </Link>
                </li>

                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/list-tasks" className={tasksLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--task">
                            <IconTask
                                width="21px"
                                height="27px"
                                view="0 0 21 20"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Tasks</span>
                    </Link>
                </li>

                <li className="dashboard-sidebar__navigation-item">
                    <Link to="/list-meetings" className={meetingsLinkClasses}>
                        <div className="dashboard-sidebar__navigation-icon dashboard-sidebar__navigation-icon--meeting">
                            <IconMeeting
                                width="26px"
                                height="26px"
                                view="0 0 26 16"
                                color="#ffffff"
                            />
                        </div>
                        <span className="dashboard-sidebar__navigation-link-name">Meetings</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
};

DashboardHeader.propTypes = {
    dashboardSidebarReducer: React.PropTypes.object,
    onToggleSidebarMenu: React.PropTypes.func,
    routing: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        dashboardSidebarReducer: state.dashboardSidebarReducer,
        routing: state.routing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleSidebarMenu: () => {
            dispatch(toggleSidebarMenu());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
