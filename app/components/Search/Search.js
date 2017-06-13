import React from 'react';
import './Search.scss';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CustomerSearch from '../CustomerSearch/CustomerSearch';
import ActivitySearch from '../ActivitySearch/ActivitySearch';
import {toogleSearchTab} from '../../actions/searchActions';
import { getAlgoliaLead, clearAlgoliaLead, getAlgoliaContact, clearAlgoliaContact, getAlgoliaAccount, clearAlgoliaAccount,
    getAlgoliaTask, clearAlgoliaTask, getAlgoliaEvent, clearAlgoliaEvent, getAlgoliaDeal, clearAlgoliaDeal} from '../../actions/algoliaSearchActions';

const Search = ({searchReducer, algoliaSearchReducer, authReducer, onTabToogle}) => {
    return (
        <Tabs onSelect={index => {onTabToogle(index, authReducer.user.algolia_meta, algoliaSearchReducer.keyword);}}
        selectedIndex={searchReducer.index}
        >
            <TabList>
                <Tab>Customer</Tab>
                <Tab>Activity</Tab>
            </TabList>
            <TabPanel>
                <CustomerSearch/>
            </TabPanel>
            <TabPanel>
                <ActivitySearch/>
            </TabPanel>
        </Tabs>
    );
};

Search.propTypes = {
    searchReducer: React.PropTypes.object,
    algoliaSearchReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onTabToogle: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        searchReducer: state.searchReducer,
        algoliaSearchReducer: state.algoliaSearchReducer,
        authReducer: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTabToogle: (index, algoliaMeta, keyword) => {
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
            } else if(index === 1) {
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

            dispatch(toogleSearchTab(index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
