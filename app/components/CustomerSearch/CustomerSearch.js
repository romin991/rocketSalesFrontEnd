import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

const CustomerSearch = ({algoliaSearchReducer, onLeadClick, onContactClick, onAccountClick}) => {
    return (
        <div>

            <div className="leads listPage">
                <div className="listTitle">
                    <h3>Lead</h3>
                </div>

                {(algoliaSearchReducer.algoliaLeadsListSuccess && algoliaSearchReducer.algoliaLeadsList.length > 0) &&
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
                        {algoliaSearchReducer.algoliaLeadsList.map((lead, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={lead.id} className={rowClasses} onClick={e => {
                                    onLeadClick(e, lead.id);
                                }}>
                                    <td>{lead.first_name} {lead.last_name}</td>
                                    <td>{lead.company_name}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.mobile_phone}</td>
                                    <td>{lead.email}</td>
                                    <td> {(() => {
                                        switch (lead.lead_source) {
                                            case 'OFA':
                                                return 'Offline Ads';
                                            case 'ONA':
                                                return 'Online Ads';
                                            case 'CC':
                                                return 'Cold Call';
                                            case 'IR':
                                                return 'Internal Referral';
                                            case 'ER':
                                                return 'External Referral';
                                            case 'P':
                                                return 'Partner';
                                            case 'S':
                                                return 'Sales';
                                            case 'TS':
                                                return 'Trade Show';
                                            case 'SR':
                                                return 'Seminar';
                                            default:
                                                return '';
                                        }
                                    })()}</td>
                                    <td>{lead.employee_first_name} {lead.employee_last_name}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                }
            </div>

            <div className="contacts listPage">
                <div className="listTitle">
                    <h3>Contact</h3>
                </div>

                {(algoliaSearchReducer.algoliaContactsListSuccess && algoliaSearchReducer.algoliaContactsList.length > 0) &&
                <div className="listTable">
                    <table>
                        <thead>
                            <tr>
                                <td>CONTACT</td>
                                <td>ACCOUNT</td>
                                <td>PHONE</td>
                                <td>MOBILE</td>
                                <td>EMAIL</td>
                                <td>CONTACT OWNER</td>
                            </tr>
                        </thead>
                        <tbody>
                            {algoliaSearchReducer.algoliaContactsList.map((contact, index) => {
                                const rowClasses = classNames({
                                    greyRow: Boolean((index + 1) % 2 === 0)
                                });

                                return (
                                    <tr key={contact.id} className={rowClasses} onClick={e => {
                                        onContactClick(e, contact.id);
                                    }}>
                                        <td>{contact.first_name} {contact.last_name}</td>
                                        <td>{contact.company_name}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.mobile_phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.employee_first_name} {contact.employee_last_name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                }
            </div>

            <div className="accounts listPage">
                <div className="listTitle">
                    <h3>Account</h3>
                </div>

                {(algoliaSearchReducer.algoliaAccountsListSuccess && algoliaSearchReducer.algoliaAccountsList.length > 0) &&
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
                            {algoliaSearchReducer.algoliaAccountsList.map((account, index) => {
                                const rowClasses = classNames({
                                    greyRow: Boolean((index + 1) % 2 === 0)
                                });

                                return (
                                    <tr key={account.id} className={rowClasses} onClick={e => {
                                        onAccountClick(e, account.id);
                                    }}>
                                        <td>{account.name}</td>
                                        <td>{account.phone}</td>
                                        <td>{account.email}</td>
                                        <td>{account.industry}</td>
                                        <td>{account.employee_first_name} {account.employee_last_name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                }
            </div>

        </div>
    );
};

CustomerSearch.propTypes = {
    algoliaSearchReducer: React.PropTypes.object,
    onLeadClick: React.PropTypes.func,
    onContactClick: React.PropTypes.func,
    onAccountClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        algoliaSearchReducer: state.algoliaSearchReducer
    };
};
const mapDispatchToProps = () => {
    return {
        onLeadClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-lead/${id}`);
        },
        onContactClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-contact/${id}`);
        },
        onAccountClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-account/${id}`);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);
