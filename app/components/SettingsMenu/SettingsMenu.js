import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

const SettingsMenu = ({activateClass, authReducer}) => {
    const settingsPermissionsClasses = classNames({
        activate: activateClass === 'permission'
    });

    const settingsEditClasses = classNames({
        activate: activateClass === 'edit'
    });

    const settingsOrgProfileClasses = classNames({
        activate: activateClass === 'org'
    });

    return (
        <div className="leftBlock">
            <ul>
                <Link to="settings-org-profile">
                    <li className={settingsOrgProfileClasses}>
                        <div className="faBlock">
                            <i className="fa fa-building-o"/>
                        </div>
                        <span>Organization Profile</span>
                    </li>
                </Link>
                <Link to="settings-edit">
                    <li className={settingsEditClasses}>
                        <div className="faBlock">
                            <i className="fa fa-user"/>
                        </div>
                        <span>User</span>
                    </li>
                </Link>
                {authReducer.user.role === 'A' &&
                <Link to="settings-permission">
                    <li className={settingsPermissionsClasses}>
                        <div className="faBlock">
                            <i className="fa fa-lock"/>
                        </div>
                        <span>Permission & Roles</span>
                    </li>
                </Link>
                }
            </ul>
        </div>
    );
};

SettingsMenu.propTypes = {
    activateClass: React.PropTypes.string,
    authReducer: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);
