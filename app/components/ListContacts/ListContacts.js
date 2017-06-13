import React from 'react';
import { connect } from 'react-redux';
import './ListContacts.scss';
import classNames from 'classnames';
import {getContactsList} from '../../actions/contactsActions';
import { showCreateContactModal, initInitialModalData, delInitialModalData } from '../../actions/modalsActions';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';
import IconContact from '../IconContact/IconContact';

class ListContacts extends React.Component {
    componentDidMount() {
        this.props.onFilterChange(this.props.contactsReducer.currentContactsListType, this.props.authReducer.user.employee_id);
    }

    render() {
        const contactsReducer = this.props.contactsReducer;
        const authReducer = this.props.authReducer;

        return (
            <div className="contacts listPage">
                <div className="listTitle">
                    <div className="listTitleContainer">
                        <h3>
                            <IconContact
                                width="30px"
                                height="24px"
                                view="0 -4 20 24"
                                color="#82b1ff"
                            />
                            CONTACT</h3>
                        <div className="listTitleInputsBlock">
                            <div className="listTitleLeft">
                                <select value={contactsReducer.currentContactsListType} onChange={(e) => {this.props.onFilterChange(e.target.value, authReducer.user.employee_id);}}>
                                    <option value="all">All contacts</option>
                                    <option value="my">My contacts</option>
                                </select>
                            </div>
                            <div className="listTitleRight">
                                <button className="newButton" onClick={this.props.onCreateNewContact}>
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
                            <td>CONTACT</td>
                            <td>ACCOUNT</td>
                            <td>PHONE</td>
                            <td>MOBILE</td>
                            <td>EMAIL</td>
                            <td>CONTACT OWNER</td>
                        </tr>
                        </thead>
                        <tbody>
                        {(contactsReducer.contactsListLoadingSuccess && contactsReducer.contactsList.results.length > 0) && contactsReducer.contactsList.results.map((contact, index) => {
                            const rowClasses = classNames({
                                greyRow: Boolean((index + 1) % 2 === 0)
                            });

                            return (
                                <tr key={contact.id} className={rowClasses} onClick={e => {this.props.onListClick(e, contact.id);}}>
                                    <td>{contact.first_name} {contact.last_name}</td>
                                    <td>{contact.company_name}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.mobile_phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.employee_first_name} {contact.employee_last_name}</td>
                                </tr>
                            );
                        }) ||
                        <tr>
                            <td colSpan="6" className="loadingEmptyCell">
                                {contactsReducer.contactsListLoading && <div>Loading</div> || <div>There is no contact found</div>}
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
                                       pageNum={Math.ceil(contactsReducer.contactsList.count / 20)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={Math.ceil(contactsReducer.contactsList.count / 20)}
                                       clickCallback={data => {this.props.onPaginationClick(contactsReducer.currentContactsListType, authReducer.user.employee_id, data);}}
                                       containerClassName={"pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }
}
ListContacts.propTypes = {
    onFilterChange: React.PropTypes.func,
    onCreateNewContact: React.PropTypes.func,
    contactsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onPaginationClick: React.PropTypes.func,
    onListClick: React.PropTypes.func,
    onImport: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        contactsReducer: state.contactsReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListClick: (e, id) => {
            e.preventDefault();
            browserHistory.push(`/detail-contact/${id}`);
        },
        onPaginationClick: (listStyle, userId, data) => {
            dispatch(getContactsList(listStyle, userId, data.selected + 1));
        },
        onCreateNewContact: () => {
            dispatch(delInitialModalData());
            const data = {hideAddress: true};
            dispatch(initInitialModalData(data));
            dispatch(showCreateContactModal());
        },
        onImport: () => {
            browserHistory.push('/import/contacts');
        },
        onFilterChange: (listStyle, userId) => {
            const firstPage = 1;
            dispatch(getContactsList(listStyle, userId, firstPage));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContacts);
