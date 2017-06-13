import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import { sync } from '../../actions/authActions';
import classNames from 'classnames';

import './DashboardBase.scss';

class DashboardBase extends React.Component {
    componentDidMount() {
        if (_.isEmpty(this.props.authReducer.user)) {
            this.props.makeSync();
        }
    }

    render() {
        const { dashboardSidebarReducer } = this.props;

        const toggleSidebarClasses = classNames({
            'dashboard-base__col dashboard-base__col--main-wrapper': true,
            'shrunken': dashboardSidebarReducer.showSidebarMenu
        });

        return (
            <div className="dashboard-base">
                <div className="dashboard-base__col dashboard-base__col--sidebar-wrapper">
                    <DashboardSidebar/>
                </div>

                <div className={toggleSidebarClasses}>
                    <DashboardHeader/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

DashboardBase.propTypes = {
    dashboardSidebarReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    children: React.PropTypes.object,
    makeSync: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        dashboardSidebarReducer: state.dashboardSidebarReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeSync: () => {
            dispatch(sync(null, true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBase);
