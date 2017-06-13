import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import modalsReducer from './modalsReducer';
import dashboardHeaderReducer from './dashboardHeaderReducer';
import dashboardSidebarReducer from './dashboardSidebarReducer';
import leadsReducer from './leadsReducer';
import accountsReducer from './accountsReducer';
import contactsReducer from './contactsReducer';
import tasksReducer from './tasksReducer';
import meetingsReducer from './meetingsReducer';
import employeesReducer from './employeesReducer';
import algoliaSearchReducer from './algoliaSearchReducer';
import searchReducer from './searchReducer';
import leadContactReducer from './leadContactReducer';
import clodinaryReducer from './clodinaryReducer';
import activityDetailReducer from './activityDetailReducer';
import customerDetailReducer from './customerDetailReducer';
import timeLineReducer from './timeLineReducer';
import notesReducer from './notesReducer';
import dealsReducer from './dealsReducer';
import contactFieldReducer from './contactFieldReducer';
import dealFieldReducer from './dealFieldReducer';
import entitiesReducer from './entitiesReducer';
import membershipsReducer from './membershipsReducer';
import subscriptionReducer from './subscriptionReducer';
import importReducer from './importReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
    authReducer,
    modalsReducer,
    dashboardHeaderReducer,
    dashboardSidebarReducer,
    leadsReducer,
    accountsReducer,
    contactsReducer,
    tasksReducer,
    meetingsReducer,
    employeesReducer,
    algoliaSearchReducer,
    searchReducer,
    leadContactReducer,
    clodinaryReducer,
    activityDetailReducer,
    customerDetailReducer,
    timeLineReducer,
    notesReducer,
    dealsReducer,
    contactFieldReducer,
    dealFieldReducer,
    entitiesReducer,
    membershipsReducer,
    subscriptionReducer,
    importReducer,
    filtersReducer,
    form: formReducer,
    routing
});

export default rootReducer;
