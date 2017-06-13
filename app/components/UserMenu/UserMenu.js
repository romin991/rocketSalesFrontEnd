import React from 'react';
import {connect} from 'react-redux';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

const UserMenu = ({authReducer, onLogoutClick}) => {
    return (
        <div className="userblock">
            <Dropdown className="userblock__dropdown">
                <DropdownTrigger>
                    <span className="userblock__greeting">Hi, {authReducer.user.first_name}</span>
                    <i className="userblock__dropdown-btn fa fa-angle-down"/>
                </DropdownTrigger>

                <DropdownContent className="dropdown-content dropdown-content--userblock-menu">
                    <ul className="dropdown-content__dropdown-menu dropdown-content__dropdown-menu">
                        <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--settings">
                            <Link to="/settings-org-profile" className="dropdown-content__dropdown-link">
                                <i className="fa fa-sliders"/>
                                <span className="dropdown-content__dropdown-item-name">Settings</span>
                            </Link>
                        </li>

                        <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--subscription">
                            <Link to="/subscription" className="dropdown-content__dropdown-link">
                                <i className="fa fa-envelope-o"/>
                                <span className="dropdown-content__dropdown-item-name">Subscription</span>
                            </Link>
                        </li>

                        <li className="dropdown-content__dropdown-menu-item dropdown-content__dropdown-menu-item--sign-out">
                            <a href="#" className="dropdown-content__dropdown-link" onClick={onLogoutClick}>
                                <i className="fa fa-sign-out"/>
                                <span className="dropdown-content__dropdown-item-name">Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
            <div className="userblock__img">
                {authReducer.user.prof_pic &&
                <div style={{backgroundImage: `url(${authReducer.user.prof_pic})`}}>

                </div> || <i className="fa fa-user"/>}
            </div>
        </div>
    );
};

UserMenu.propTypes = {
    authReducer: React.PropTypes.object,
    onLogoutClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: (e) => {
            e.preventDefault();
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
