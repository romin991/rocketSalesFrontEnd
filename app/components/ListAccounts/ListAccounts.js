import React from 'react';
import { connect } from 'react-redux';
import './ListAccounts.scss';
import classNames from 'classnames';
import {getAccountsList} from '../../actions/accountsActions';
import { showCreateAccountModal, initInitialModalData, delInitialModalData } from '../../actions/modalsActions';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';
import IconAccount from '../IconAccount/IconAccount';

class ListAccounts extends React.Component {
    componentDidMount() {
        this.props.onFilterChange(this.props.accountsReducer.currentAccountsListType, this.props.authReducer.user.employee_id);
    }

    render() {
        const accountsReducer = this.props.accountsReducer;
        const authReducer = this.props.authReducer;

        return (
            <div className="accounts listPage">
                <div className="listTitle">
                    <div className="listTitleContainer">
                        <h3>
                            <IconAccount
                                width="30px"
                                height="24px"
                                view="4 0 24 24"
                                color="#ff7043"
                            />
                            ACCOUNT
                        </h3>
                        <div className="listTitleInputsBlock">
                            <div className="listTitleLeft">
                                <select value={accountsReducer.currentAccountsListType} onChange={(e) => {this.props.onFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                    <option value="all">All accounts</option>
                                    <option value="my">My accounts</option>
                                </select>
                            </div>
                            <div className="listTitleRight">
                                <button className="newButton" onClick={this.props.onCreateNewAccount}>
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
                            <td>ACCOUNT</td>
                            <td>PHONE</td>
                            <td>EMAIL</td>
                            <td>INDUSTRY</td>
                            <td>ACCOUNT OWNER</td>
                        </tr>
                        </thead>
                        <tbody>
                        {(accountsReducer.accountsListLoadingSuccess && accountsReducer.accountsList.results.length > 0) && accountsReducer.accountsList.results.map((account, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={account.id} className={rowClasses} onClick={e => {this.props.onListClick(e, account.id);}}>
                                    <td>{account.name}</td>
                                    <td>{account.phone}</td>
                                    <td>{account.email}</td>
                                    <td>{account.industry}</td>
                                    <td>{account.employee_first_name} {account.employee_last_name}</td>
                                </tr>
                            );
                        }) ||
                        <tr>
                            <td colSpan="5" className="loadingEmptyCell">
                                {accountsReducer.accountsListLoading && <div>Loading</div> || <div>There is no account found</div>}
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
                                       pageNum={Math.ceil(accountsReducer.accountsList.count / 20)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={Math.ceil(accountsReducer.accountsList.count / 20)}
                                       clickCallback={data => {this.props.onPaginationClick(accountsReducer.currentAccountsListType, authReducer.user.employee_id, data);}}
                                       containerClassName={"pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
                <div>

                </div>
            </div>
        );
    }
}

ListAccounts.propTypes = {
    onFilterChange: React.PropTypes.func,
    onCreateNewAccount: React.PropTypes.func,
    accountsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPaginationClick: React.PropTypes.func,
    onListClick: React.PropTypes.func,
    onImport: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        accountsReducer: state.accountsReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-account/${id}`);
        },
        onPaginationClick: (listStyle, userId, data) => {
            dispatch(getAccountsList(listStyle, userId, data.selected + 1));
        },
        onCreateNewAccount: () => {
            dispatch(delInitialModalData());
            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateAccountModal());
        },
        onImport: () => {
            browserHistory.push('/import/accounts');
        },
        onFilterChange: (listStyle, userId) => {
            const firstPage = 1;
            dispatch(getAccountsList(listStyle, userId, firstPage));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAccounts);
