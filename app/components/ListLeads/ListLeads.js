import React from 'react';
import { connect } from 'react-redux';
import './ListLeads.scss';
import classNames from 'classnames';
import { getLeadsList } from '../../actions/leadsActions';
import { showCreateLeadModal, initInitialModalData, delInitialModalData } from '../../actions/modalsActions';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';
import  IconLeads from '../IconLeads/IconLeads';
import  Filters from '../Filters/Filters';
import { getEmployeesList } from '../../actions/employeesActions';

const filters = [
    {
        name: 'status',
        title: 'Status',
        options: [
            {
                label: 'Open',
                value: 'O'
            },
            {
                label: 'Converted',
                value: 'CV'
            },
            {
                label: 'Closed',
                value: 'C'
            }
        ]
    },
    {
        name: 'lead_source',
        title: 'Lead Source',
        options: [
            {
                label: 'Offline Ads',
                value: 'OFA'
            },
            {
                label: 'Online Ads',
                value: 'ONA'
            },
            {
                label: 'Cold call',
                value: 'CC'
            },
            {
                label: 'Internal referral',
                value: 'IR'
            },
            {
                label: 'External referral',
                value: 'ER'
            },
            {
                label: 'Partner',
                value: 'P'
            },
            {
                label: 'Sales',
                value: 'S'
            },
            {
                label: 'Trade show',
                value: 'TS'
            },
            {
                label: 'Seminar',
                value: 'SR'
            }
        ]
    }
];

class ListLeads extends React.Component {
    componentDidMount() {
        this.props.onFilterChanged(this.props.filtersReducer.filterValues);
        this.props.onGetEmployeesList();
    }

    componentWillReceiveProps(newProps) {
        if ((this.props !== newProps) && (this.props.employeesReducer.employeesList !== newProps.employeesReducer.employeesList)) {
            const options = [];
            newProps.employeesReducer.employeesList.forEach((employee) => {
                options.push({label: `${employee.first_name} ${employee.last_name}`, value: employee.user});
            });
            filters.push({name: 'employee', title: 'Lead Owner', options: options});
        }
    }

    render() {
        const { leadsReducer, authReducer, filtersReducer, onFilterChanged, employeesReducer } = this.props;

        return (
            <div className="leads listPage">
                <div className="listTitle">
                    <div className="listTitleContainer">
                        <h3 >
                            <IconLeads
                                width="30px"
                                height="24px"
                                viewBox="4 0 24 24"
                                color="#ffb74d"
                            />
                            LEAD
                        </h3>
                        <div className="listTitleInputsBlock">
                            <div className="listTitleLeft">
                                {employeesReducer.employeesList.length > 0 && <Filters callBack={onFilterChanged} filters={filters}/>}
                            </div>
                            <div className="listTitleRight">
                                <button className="newButton" onClick={this.props.onCreateNewLead}>
                                    <i className="fa fa-plus" aria-hidden="true"/>
                                    <span> New</span>
                                </button>
                                <button className="importButton" onClick={this.props.onImport}>
                                    <i className="fa fa-download" aria-hidden="true"/>
                                    <span> Import</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="listTable">
                    <table>
                        <thead>
                        <tr>
                            <td>LEAD</td>
                            <td>COMPANY</td>
                            <td>PHONE</td>
                            <td>MOBILE</td>
                            <td>EMAIL</td>
                            <td>LEAD SOURCE</td>
                            <td>LEAD OWNER</td>
                        </tr>
                        </thead>
                        <tbody>
                        {(leadsReducer.leadsListLoadingSuccess && leadsReducer.leadsList.results.length > 0) && leadsReducer.leadsList.results.map((lead, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={lead.id} className={rowClasses} onClick={e => {this.props.onListClick(e, lead.id);}}>
                                    <td>{lead.first_name} {lead.last_name}</td>
                                    <td>{lead.company_name}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.mobile_phone}</td>
                                    <td>{lead.email}</td>
                                    <td> {(() => {
                                        switch (lead.lead_source) {
                                            case 'OFA': return 'Offline Ads';
                                            case 'ONA': return 'Online Ads';
                                            case 'CC':  return 'Cold Call';
                                            case 'IR':  return 'Internal Referral';
                                            case 'ER':  return 'External Referral';
                                            case 'P':   return 'Partner';
                                            case 'S':   return 'Sales';
                                            case 'TS':  return 'Trade Show';
                                            case 'SR':  return 'Seminar';
                                            default:    return '';
                                        }
                                    })()}</td>
                                    <td>{lead.employee_first_name} {lead.employee_last_name}</td>
                                </tr>

                            );
                        }) ||
                        <tr>
                            <td colSpan="7" className="loadingEmptyCell">
                                {leadsReducer.leadsListLoading && <div>Loading</div> || <div>There is no lead found</div>}
                            </td>
                        </tr>
                        }
                        </tbody>
                    </table>
                    <div className="center-pagination">
                        <ReactPaginate previousLabel={"prev"}
                                       nextLabel={"next"}
                                       breakLabel={<a href="">...</a>}
                                       breakClassName={"break-me"}
                                       pageNum={Math.ceil(leadsReducer.leadsList.count / 20)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={Math.ceil(leadsReducer.leadsList.count / 20)}
                                       clickCallback={pagination => {this.props.onPaginationClick(filtersReducer.filterValues, authReducer.user.employee_id, pagination);}}
                                       containerClassName={"pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}

ListLeads.propTypes = {
    onCreateNewLead: React.PropTypes.func,
    onFilterChanged: React.PropTypes.func,
    leadsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    filtersReducer: React.PropTypes.object,
    employeesReducer: React.PropTypes.object,
    onPaginationClick: React.PropTypes.func,
    onListClick: React.PropTypes.func,
    onGetEmployeesList: React.PropTypes.func,
    onImport: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        leadsReducer: state.leadsReducer,
        authReducer: state.authReducer,
        filtersReducer: state.filtersReducer,
        employeesReducer: state.employeesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-lead/${id}`);
        },
        onPaginationClick: (data) => {
            dispatch(getLeadsList(data.selected + 1));
        },
        onCreateNewLead: () => {
            dispatch(delInitialModalData());
            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateLeadModal());
        },
        onImport: () => {
            browserHistory.push('/import/leads');
        },
        onFilterChanged: (data) => {
            const firstPage = 1;
            dispatch(getLeadsList(data, firstPage));
        },
        onGetEmployeesList: () => {
            dispatch(getEmployeesList());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListLeads);
