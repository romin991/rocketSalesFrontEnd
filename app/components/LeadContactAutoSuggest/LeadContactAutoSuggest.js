import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import autocomplete from 'autocomplete.js';
import { leadContactSelected, contactCtChanged, contactIdChanged, clearLeadContactSuggestion } from '../../actions/leadContactActions';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {change as changeFieldValue} from 'redux-form';

class LeadContactAutoSuggest extends Component {
    componentDidMount() {
        const { authReducer, onContactCtChanged, onLeadContactSelected, onContactIdChanged } = this.props;
        const algoliaMeta = authReducer.user.algolia_meta;
        const agClient = algoliasearch(algoliaMeta.application_id, algoliaMeta.public_key);
        const contactsAlgolia  = agClient.initIndex(algoliaMeta.index_dict.customer);
        const leadsAlgolia  = agClient.initIndex(algoliaMeta.index_dict.lead);
        const suggestionView = (suggestion) => {
            return `<div class="suggestion-name">${suggestion._highlightResult.first_name.value} ${suggestion._highlightResult.last_name.value}</div>` +
                `<div class="suggestion-company">${suggestion._highlightResult.company_name && suggestion._highlightResult.company_name.value || ''}</div>`;
        };

        autocomplete('#leadContact', { hint: false, openOnFocus: true }, [
            {
                source: autocomplete.sources.hits(contactsAlgolia, { hitsPerPage: 5 }),
                name: 'contacts',
                displayKey: (suggestion) => {
                    return `${suggestion.first_name}${(suggestion.first_name && suggestion.last_name) && ' '}${suggestion.last_name}`;
                },
                templates: {
                    header: '<div class="category">Contact</div>',
                    suggestion: (suggestion) => {
                        return suggestionView(suggestion);
                    }
                }
            },
            {
                source: autocomplete.sources.hits(leadsAlgolia, { hitsPerPage: 5 }),
                name: 'leads',
                displayKey: (suggestion) => {
                    return `${suggestion.first_name}${(suggestion.first_name && suggestion.last_name) && ' '}${suggestion.last_name}`;
                },
                templates: {
                    header: '<div class="category">Lead</div>',
                    suggestion: (suggestion) => {
                        return suggestionView(suggestion);
                    }
                }
            }
        ]).on('autocomplete:selected', (event, suggestion, dataset) => {
            if (dataset === 'contacts') {
                onContactCtChanged(authReducer.user.model_meta.customer);
            } else if (dataset === 'leads') {
                onContactCtChanged(authReducer.user.model_meta.lead);
            }
            onLeadContactSelected(suggestion);
            onContactIdChanged(suggestion.id);
        });
    }

    render() {
        const {
            input: { value, onChange, type, onBlur },
            leadContactReducer,
            onClearLeadContactSuggestion,
            onInputBlur,
            meta: { touched, error },
            formName
        } = this.props;

        const leadsContactsInputClasses = classNames({
            'hidden': Boolean(leadContactReducer.leadContactSuggestion),
            'invalidValidation': touched && error
        });

        return(
            <div>
                {leadContactReducer.leadContactSuggestion &&
                <div className="chosenSuggest">
                    <div className="border-wrapper">
                        {`${leadContactReducer.leadContactSuggestion.first_name} ${leadContactReducer.leadContactSuggestion.last_name}` }
                        <span onClick={onClearLeadContactSuggestion}>x</span>
                    </div>
                </div>
                }
                <input
                    id="leadContact"
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={leadsContactsInputClasses}
                    onBlur={() => {onInputBlur(formName); onBlur();}}
                />
            </div>
        );
    }
}

LeadContactAutoSuggest.propTypes = {
    input: React.PropTypes.object,
    meta: React.PropTypes.object,
    leadContactReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onLeadContactSelected: React.PropTypes.func,
    onContactCtChanged: React.PropTypes.func,
    onContactIdChanged: React.PropTypes.func,
    onClearLeadContactSuggestion: React.PropTypes.func,
    onInputBlur: React.PropTypes.func,
    formName: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        leadContactReducer: state.leadContactReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLeadContactSelected: (value) => {
            dispatch(leadContactSelected(value));
        },
        onContactCtChanged: (value) => {
            dispatch(contactCtChanged(value));
        },
        onContactIdChanged: (value) => {
            dispatch(contactIdChanged(value));
        },
        onClearLeadContactSuggestion: () => {
            dispatch(clearLeadContactSuggestion());
        },
        onInputBlur: (formName) => {
            setTimeout(() => {
                dispatch(changeFieldValue(formName, 'leadContact', ''));
            }, 0);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadContactAutoSuggest);
