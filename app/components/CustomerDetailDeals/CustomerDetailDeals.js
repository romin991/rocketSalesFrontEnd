import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {getAccountDetailDeals, getContactDetailDeals} from '../../actions/customerDetailActions';
import './CustomerDetailDeals.scss';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {ACCOUNT, CONTACT} from '../../constants';
import { formatIdr } from '../../utils/normalizeIdr';

class CustomerDetailDeals extends React.Component {
    componentDidMount() {
        const listType = 'open';
        this.props.onFilterChange(this.props.id, listType, this.props.type);
    }

    render() {
        const localState = this.props.localState;

        return (
            <div className="detailTable">
                <h3>Deals</h3>
                <div className="selectBlock">
                    <select value={localState.currentCustomerDetailDealsType} onChange={(e) => {this.props.onFilterChange(this.props.id, e.target.value, this.props.type);}}>
                        <option value="open">Open</option>
                        <option value="progress">In Progress</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>
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
                    {localState.customerDetailDealsSuccess && localState.customerDetailDeals.results.map((deal, index) => {
                        const rowClasses = classNames({
                            greyRow: Boolean((index + 1) % 2 === 0)
                        });

                        return (
                            <tr key={deal.id} className={rowClasses} onClick={e => {this.props.onDealClick(e, deal.id);}}>
                                <td>{deal.name}</td>
                                <td>{deal.customer_first_name} {deal.customer_last_name}</td>
                                <td>{deal.expected_revenue ? formatIdr(deal.expected_revenue) : ''}</td>
                                <td>{deal.expected_closing_date ? moment(deal.expected_closing_date).format('DD MMM YYYY') : ''}</td>
                                <td>{(() => {
                                    switch (localState.status) {
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
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

CustomerDetailDeals.propTypes = {
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    localState: React.PropTypes.object,
    onFilterChange: React.PropTypes.func,
    onDealClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        localState: state.customerDetailReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterChange: (id, listType, type) => {
            switch (type) {
                case(ACCOUNT):
                    dispatch(getAccountDetailDeals(id, listType));
                    break;
                case(CONTACT):
                    dispatch(getContactDetailDeals(id, listType));
                    break;
                default:
                    break;
            }
        },
        onDealClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-deal/${id}`);
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailDeals);
