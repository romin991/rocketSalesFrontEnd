import React from 'react';
import { connect } from 'react-redux';
import './SettingsPermission.scss';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SettingsHead from '../SettingsHead/SettingsHead';
import { getMemberships, editMembership, deleteMembership } from '../../actions/membershipsActions';
import { cookieAuthToken } from '../../constants';
import jwtDecode from 'jwt-decode';

class SettingsPermission extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const { membershipsReducer, onAdminChange, onDeactivateClick } = this.props;
        const decodedToken = jwtDecode(cookieAuthToken());

        return (
            <div className="settingsPage permission">
                <SettingsHead showAddUserButton/>
                <div className="mainContainer">
                    <SettingsMenu activateClass="permission"/>
                    <div className="rightBlock">
                        <ul>
                            {membershipsReducer.memberships.map((membership) => {
                                return (
                                    <li key={membership.id} className="clearfix">
                                        <div className="liLeft">
                                            <div className="photoBlock">
                                                <i className="fa fa-user" aria-hidden="true"/>
                                            </div>
                                            <div className="textBlock">
                                                <span className="name">{membership.first_name} {membership.last_name}</span>
                                                <br/>
                                                <span className="email">{membership.email}</span>
                                            </div>
                                        </div>
                                        <div className="liRight">
                                            {membership.email !== decodedToken.username &&
                                            <label className="checkbox clearfix">
                                                <input type="checkbox" id="checkbox" checked={membership.role === 'A'}  onChange={() => {onAdminChange(membership);}}/>
                                                <span/>
                                                <div className="admin">Admin</div>
                                            </label>
                                            }
                                            <button onClick={() => {onDeactivateClick(membership);}}>
                                                <i className="fa fa-times" aria-hidden="true"/>
                                                <span>Disable</span>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

SettingsPermission.propTypes = {
    onLoad: React.PropTypes.func,
    onAdminChange: React.PropTypes.func,
    onDeactivateClick: React.PropTypes.func,
    membershipsReducer: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        membershipsReducer: state.membershipsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(getMemberships());
        },
        onAdminChange: (membership) => {
            switch (membership.role) {
                case 'A':
                    membership.role = 'E';
                    break;
                case 'E':
                    membership.role = 'A';
                    break;
                default:
                    break;
            }
            dispatch(editMembership(membership));
        },
        onDeactivateClick: (membership) => {
            dispatch(deleteMembership(membership));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPermission);
