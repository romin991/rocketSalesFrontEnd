import React from 'react';
import { connect } from 'react-redux';
import { showCreateMeetingModal } from '../../actions/modalsActions';
import { recordSearchKeyword, getAlgoliaLead, clearAlgoliaLead, getAlgoliaContact, clearAlgoliaContact, getAlgoliaAccount, clearAlgoliaAccount,
    getAlgoliaTask, clearAlgoliaTask, getAlgoliaEvent, clearAlgoliaEvent, getAlgoliaDeal, clearAlgoliaDeal} from '../../actions/algoliaSearchActions';
import './DashboardHeader.scss';
import { browserHistory } from 'react-router';
import CreationMenu from '../CreationMenu/CreationMenu';
import UserMenu from '../UserMenu/UserMenu';

const DashboardHeader = ({authReducer, searchReducer, onSearchKeyPress}) => {
    return (
        <div className="dashboard-header">
            <img
                className="dashboard-header__logo"
                src={require('./logo.png')}
                width="100"
            />

            <CreationMenu/>

            <div className="dashboard-header__search">
                <input type="search" className="dashboard-header__search-input" onChange={e => {onSearchKeyPress(authReducer.user.algolia_meta, e.target.value, searchReducer.index);}}/>
            </div>

            <UserMenu/>

        </div>
    );
};

DashboardHeader.propTypes = {
    authReducer: React.PropTypes.object,
    searchReducer: React.PropTypes.object,
    onSearchKeyPress: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        searchReducer: state.searchReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchKeyPress: (algoliaMeta, keyword, index) => {
            dispatch(recordSearchKeyword(keyword));
            const appId = algoliaMeta.application_id;
            const publicKey = algoliaMeta.public_key;
            if (index === 0) {
                if (keyword === '') {
                    dispatch(clearAlgoliaLead());
                    dispatch(clearAlgoliaContact());
                    dispatch(clearAlgoliaAccount());
                } else {
                    const leadIndex = algoliaMeta.index_dict.lead;
                    const customerIndex = algoliaMeta.index_dict.customer;
                    const companyIndex = algoliaMeta.index_dict.company;
                    dispatch(getAlgoliaLead(appId, publicKey, leadIndex, keyword));
                    dispatch(getAlgoliaContact(appId, publicKey, customerIndex, keyword));
                    dispatch(getAlgoliaAccount(appId, publicKey, companyIndex, keyword));
                }
            } else if (index === 1) {
                if (keyword === '') {
                    dispatch(clearAlgoliaTask());
                    dispatch(clearAlgoliaEvent());
                    dispatch(clearAlgoliaDeal());
                } else {
                    const taskIndex = algoliaMeta.index_dict.task;
                    const eventIndex = algoliaMeta.index_dict.event;
                    const dealIndex = algoliaMeta.index_dict.deal;
                    dispatch(getAlgoliaTask(appId, publicKey, taskIndex, keyword));
                    dispatch(getAlgoliaEvent(appId, publicKey, eventIndex, keyword));
                    dispatch(getAlgoliaDeal(appId, publicKey, dealIndex, keyword));
                }
            }

            browserHistory.push('/search');
        },
        onShowCreateMeetingModal: (e) => {
            e.preventDefault();
            dispatch(showCreateMeetingModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
