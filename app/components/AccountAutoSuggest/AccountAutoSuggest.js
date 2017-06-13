import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import autocomplete from 'autocomplete.js';
import { clearAccountSuggestion, accountSuggestSelected } from '../../actions/accountsActions';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {change as changeFieldValue} from 'redux-form';

class AccountAutoSuggest extends Component {
    componentDidMount() {
        const { authReducer, onAccountSuggestSelected } = this.props;
        const algoliaMeta = authReducer.user.algolia_meta;
        const agClient = algoliasearch(algoliaMeta.application_id, algoliaMeta.public_key);
        const accountssAlgolia  = agClient.initIndex(algoliaMeta.index_dict.company);
        const suggestionView = (suggestion) => {
            return `<div class="suggestion-name">${suggestion._highlightResult.name.value}</div>`;
        };

        autocomplete('#accountAutoSuggest', { hint: false, openOnFocus: true }, [
            {
                source: autocomplete.sources.hits(accountssAlgolia, { hitsPerPage: 5 }),
                displayKey: (suggestion) => {
                    return `${suggestion.name}`;
                },
                templates: {
                    header: '<div class="category">Account</div>',
                    suggestion: (suggestion) => {
                        return suggestionView(suggestion);
                    }
                }
            }
        ]).on('autocomplete:selected', (event, suggestion) => {
            onAccountSuggestSelected(suggestion);
        });
    }

    render() {
        const {
            input: { value, onChange, type, onBlur },
            accountsReducer,
            onClearAccountSuggestion,
            onInputBlur,
            meta: { touched, error },
            formName
        } = this.props;

        const accountInputClasses = classNames({
            'hidden': Boolean(accountsReducer.accountSuggestion.name),
            'invalidValidation': touched && error
        });

        return(
            <div>
                {accountsReducer.accountSuggestion.name &&
                <div className="chosenSuggest">
                    <div className="border-wrapper">
                        {`${accountsReducer.accountSuggestion.name}` }
                        <span onClick={onClearAccountSuggestion}>x</span>
                    </div>
                </div>
                }
                <input
                    id="accountAutoSuggest"
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={accountInputClasses}
                    onBlur={() => {onInputBlur(formName); onBlur();}}
                />
            </div>
        );
    }
}

AccountAutoSuggest.propTypes = {
    input: React.PropTypes.object,
    meta: React.PropTypes.object,
    accountsReducer: React.PropTypes.object,
    authReducer: React.PropTypes.object,
    onClearAccountSuggestion: React.PropTypes.func,
    onAccountSuggestSelected: React.PropTypes.func,
    onInputBlur: React.PropTypes.func,
    formName: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        accountsReducer: state.accountsReducer,
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAccountSuggestSelected: (data) => {
            dispatch(accountSuggestSelected(data));
        },
        onClearAccountSuggestion: () => {
            dispatch(clearAccountSuggestion());
        },
        onInputBlur: (formName) => {
            setTimeout(() => {
                dispatch(changeFieldValue(formName, 'accountAutoSuggest', ''));
            }, 0);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAutoSuggest);
