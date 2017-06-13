import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import autocomplete from 'autocomplete.js';
import { contactSelected, clearContactSuggestion } from '../../actions/contactFieldActions';
import { connect } from 'react-redux';
import {change as changeFieldValue} from 'redux-form';
import classNames from 'classnames';

class ContactField extends Component {
    componentDidMount() {
        const { authReducer, onContactSelected } = this.props;
        const algoliaMeta = authReducer.user.algolia_meta;
        const agClient = algoliasearch(algoliaMeta.application_id, algoliaMeta.public_key);
        const contactsAlgolia  = agClient.initIndex(algoliaMeta.index_dict.customer);
        const suggestionView = (suggestion) => {
            return `<div class="suggestion-name">${suggestion._highlightResult.first_name.value} ${suggestion._highlightResult.last_name.value}</div>` +
                `<div class="suggestion-company">${suggestion._highlightResult.company_name && suggestion._highlightResult.company_name.value || ''}</div>`;
        };

        autocomplete('#contact', { hint: false, openOnFocus: true }, [
            {
                source: autocomplete.sources.hits(contactsAlgolia, { hitsPerPage: 5 }),
                name: 'contacts',
                displayKey: (suggestion) => {
                    return `${suggestion.first_name}${(suggestion.first_name && suggestion.last_name) && ' '}${suggestion.last_name}`;
                },
                templates: {
                    suggestion: (suggestion) => {
                        return suggestionView(suggestion);
                    }
                }
            }
        ]).on('autocomplete:selected', (event, suggestion) => {
            onContactSelected(suggestion);
        });
    }

    render() {
        const{
            input: { value, onChange, type, onBlur },
            meta: { touched, error },
            contactFieldReducer, onClearContactSuggestion, onInputBlur, formName } = this.props;

        const contactsInputClasses = classNames({
            'hidden': Boolean(contactFieldReducer.contactSuggestion),
            'invalidValidation': touched && error
        });

        return (
            <div>
                {contactFieldReducer.contactSuggestion &&
                <div className="chosenSuggest">
                    <div className="border-wrapper">
                        {`${contactFieldReducer.contactSuggestion.first_name} ${contactFieldReducer.contactSuggestion.last_name}` }
                        <span onClick={onClearContactSuggestion}>x</span>
                    </div>
                </div>
                }
                <input
                    id="contact"
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={contactsInputClasses}
                    onBlur={() => {onInputBlur(formName); onBlur();}}
                />
            </div>
        );
    }
}

ContactField.propTypes = {
    authReducer: React.PropTypes.object,
    contactFieldReducer: React.PropTypes.object,
    input: React.PropTypes.object,
    meta: React.PropTypes.object,
    onContactSelected: React.PropTypes.func,
    onClearContactSuggestion: React.PropTypes.func,
    onInputBlur: React.PropTypes.func,
    formName: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        contactFieldReducer: state.contactFieldReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onContactSelected: (value) => {
            dispatch(contactSelected(value));
        },
        onClearContactSuggestion: () => {
            dispatch(clearContactSuggestion());
        },
        onInputBlur: (formName) => {
            setTimeout(() => {
                dispatch(changeFieldValue(formName, 'contact', ''));
            }, 0);
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactField);
