import React from 'react';
import { connect } from 'react-redux';
import './ListDeals.scss';
import classNames from 'classnames';
import {getDealsList} from '../../actions/dealsActions';
import { showCreateDealModal, delInitialModalData } from '../../actions/modalsActions';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { formatIdr } from '../../utils/normalizeIdr';
import IconDeals from '../IconDeal/IconDeal';

class ListDeals extends React.Component {
    componentDidMount() {
        this.props.onFilterChange(this.props.dealsReducer.currentDealsListType, this.props.authReducer.user.employee_id);
    }

    render() {
        const dealsReducer = this.props.dealsReducer;
        const authReducer = this.props.authReducer;

        return (
            <div className="deals listPage">
                <div className="listTitle">
                    <div className="listTitleContainer">
                        <h3>
                            <IconDeals
                                width="32px"
                                height="24px"
                                view="0 0 32 14"
                                color="#dba1ff"
                            />
                            DEAL
                        </h3>
                        <div className="listTitleInputsBlock">
                            <div className="listTitleLeft">
                                <select value={dealsReducer.currentDealsListType} onChange={(e) => {this.props.onFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                    <option value="all">All deals</option>
                                    <option value="open">Open deals</option>
                                    <option value="progress">In Progress deals</option>
                                    <option value="won">Won deals</option>
                                    <option value="lost">Lost deals</option>
                                    <option value="my">My All deals</option>
                                    <option value="my-open">My Open deals</option>
                                    <option value="my-progress">My In Progress deals</option>
                                    <option value="my-won">My Won deals</option>
                                    <option value="my-closed">My Closed deals</option>
                                </select>
                            </div>
                            <div className="listTitleRight">
                                <button className="newLongButton" onClick={this.props.onCreateNewDeal}>
                                    <i className="fa fa-plus" aria-hidden="true"/>
                                    <span> New Deal</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="listTable">
                    <table>
                        <thead>
                        <tr>
                            <td>NAME</td>
                            <td>CONTACT</td>
                            <td>REVENUE</td>
                            <td>CLOSING DATE</td>
                            <td>STAGE</td>
                            <td>DEAL OWNER</td>
                        </tr>
                        </thead>
                        <tbody>
                        {(dealsReducer.dealsListSuccess && dealsReducer.dealsList.results.length > 0) && dealsReducer.dealsList.results.map((deal, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={deal.id} className={rowClasses} onClick={e => {this.props.onListClick(e, deal.id);}}>
                                    <td>{deal.name}</td>
                                    <td>{deal.customer_first_name} {deal.customer_last_name}</td>
                                    <td>{deal.expected_revenue ? formatIdr(deal.expected_revenue) : ''}</td>
                                    <td>{deal.expected_closing_date ? moment(deal.expected_closing_date).format('DD MMM YYYY') : ''}</td>
                                    <td>{(() => {
                                        switch (deal.status) {
                                            case 'O': return 'Open';
                                            case 'P': return 'Progress';
                                            case 'CW':  return 'Won';
                                            case 'CL':  return 'Lost';
                                            default:    return '';
                                        }
                                    })()}</td>
                                    <td>{deal.employee_first_name} {deal.employee_last_name}</td>
                                </tr>

                            );
                        }) ||
                        <tr>
                            <td colSpan="7" className="loadingEmptyCell">
                                {dealsReducer.dealsListLoading && <div>Loading</div> || <div>There is no deal found</div>}
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
                                       pageNum={Math.ceil(dealsReducer.dealsList.count / 20)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={Math.ceil(dealsReducer.dealsList.count / 20)}
                                       clickCallback={data => {this.props.onPaginationClick(dealsReducer.currentDealsListType, authReducer.user.employee_id, data);}}
                                       containerClassName={"pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}

ListDeals.propTypes = {
    onFilterChange: React.PropTypes.func,
    onCreateNewDeal: React.PropTypes.func,
    dealsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPaginationClick: React.PropTypes.func,
    onListClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        dealsReducer: state.dealsReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-deal/${id}`);
        },
        onPaginationClick: (listStyle, userId, data) => {
            dispatch(getDealsList(listStyle, userId, data.selected + 1));
        },
        onCreateNewDeal: () => {
            dispatch(delInitialModalData());
            dispatch(showCreateDealModal());
        },
        onFilterChange: (listStyle, userId) => {
            const firstPage = 1;
            dispatch(getDealsList(listStyle, userId, firstPage));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDeals);
