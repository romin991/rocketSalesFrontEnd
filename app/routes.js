import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Login from './components/Login/Login';
import signUpPage from './components/SignUp/SignUp';
import PasswordReset from './components/PasswordReset/PasswordReset';
import DashboardBase from './components/DashboardBase/DashboardBase';
import ListLeads from './components/ListLeads/ListLeads';
import ListAccounts from './components/ListAccounts/ListAccounts';
import ListContacts from './components/ListContacts/ListContacts';
import ListTasks from './components/ListTasks/ListTasks';
import ListMeetings from './components/ListMeetings/ListMeetings';
import ListDeals from './components/ListDeals/ListDeals';
import DetailAccount from './components/DetailAccount/DetailAccount';
import DetailContact from './components/DetailContact/DetailContact';
import DetailLead from './components/DetailLead/DetailLead';
import DetailTask from './components/DetailTask/DetailTask';
import DetailMeeting from './components/DetailMeeting/DetailMeeting';
import DetailDeal from './components/DetailDeal/DetailDeal';
import Dashboard from './components/Dashboard/Dashboard';
import SettingsPermission from './components/SettingsPermission/SettingsPermission';
import SettingsEdit from './components/SettingsEdit/SettingsEdit';
import SettingsOrgProfile from './components/SettingsOrgProfile/SettingsOrgProfile';
import ImportPage from './components/ImportPage/ImportPage';
import SubscriptionPage from './components/SubscriptionPage/SubscriptionPage';
import Search from './components/Search/Search';
import { cookieAuthToken } from './constants';

const isUserAuthenticated = () => {
    return Boolean(cookieAuthToken());
};

const authRequired = (nextState, replace) => {
    if (!isUserAuthenticated()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
};

const nonAuthRequired = (nextState, replace) => {
    if (isUserAuthenticated()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
};

export default (
    <Route component={App}>
        <Route path="/" component={DashboardBase} onEnter={authRequired}>
            <IndexRoute component={Dashboard}/>
            <Route path="/list-leads" component={ListLeads}/>
            <Route path="/list-accounts" component={ListAccounts}/>
            <Route path="/list-contacts" component={ListContacts}/>
            <Route path="/list-meetings" component={ListMeetings}/>
            <Route path="/list-tasks" component={ListTasks}/>
            <Route path="/list-deals" component={ListDeals}/>
            <Route path="/detail-account/:id" component={DetailAccount}/>
            <Route path="/detail-contact/:id" component={DetailContact}/>
            <Route path="/detail-lead/:id" component={DetailLead}/>
            <Route path="/detail-task/:id" component={DetailTask}/>
            <Route path="/detail-meeting/:id" component={DetailMeeting}/>
            <Route path="/detail-deal/:id" component={DetailDeal}/>
            <Route path="/settings-permission" component={SettingsPermission}/>
            <Route path="/settings-edit" component={SettingsEdit}/>
            <Route path="/settings-org-profile" component={SettingsOrgProfile}/>
            <Route path="/import/leads" component={() => <ImportPage pageLabel="leads" title="lead"/>}/>
            <Route path="/import/accounts" component={() => <ImportPage pageLabel="companies" title="account"/>}/>
            <Route path="/import/contacts" component={() => <ImportPage pageLabel="customers" title="contact"/>}/>
            <Route path="/subscription" component={SubscriptionPage}/>
            <Route path="/search" component={Search}/>
        </Route>
        <Route path="/login" component={Login} onEnter={nonAuthRequired}/>
        <Route path="/sign-up" component={signUpPage} onEnter={nonAuthRequired}/>
        <Route path="/forgot-password" component={PasswordReset} onEnter={nonAuthRequired}/>
    </Route>
);
