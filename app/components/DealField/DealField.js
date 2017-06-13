import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import autocomplete from 'autocomplete.js';
import { dealSelected, clearDealSuggestion } from '../../actions/dealFieldActions';
import { connect } from 'react-redux';
import {change as changeFieldValue} from 'redux-form';
import classNames from 'classnames';

class DealField extends Component {
    componentDidMount() {
        const { authReducer, onDealSelected } = this.props;
        const algoliaMeta = authReducer.user.algolia_meta;
        const agClient = algoliasearch(algoliaMeta.application_id, algoliaMeta.public_key);
        const dealsAlgolia  = agClient.initIndex(algoliaMeta.index_dict.deal);
        const suggestionView = (suggestion) => {
            return `<div class="suggestion-name">${suggestion._highlightResult.name.value}</div>`;
        };

        autocomplete('#deal', { hint: false, openOnFocus: true }, [
            {
                source: autocomplete.sources.hits(dealsAlgolia, { hitsPerPage: 5 }),
                name: 'deals',
                displayKey: (suggestion) => {
                    return `${suggestion.name}`;
                },
                templates: {
                    suggestion: (suggestion) => {
                        return suggestionView(suggestion);
                    }
                }
            }
        ]).on('autocomplete:selected', (event, suggestion) => {
            onDealSelected(suggestion);
        });
    }

    render() {
        const{
            input: { value, onChange, type, onBlur },
            meta: { touched, error },
            dealFieldReducer, onClearDealSuggestion, onInputBlur, formName } = this.props;

        const dealsInputClasses = classNames({
            'hidden': Boolean(dealFieldReducer.dealSuggestion),
            'invalidValidation': touched && error
        });

        return (
            <div>
                {dealFieldReducer.dealSuggestion &&
                <div className="chosenSuggest">
                    <div className="border-wrapper">
                        {`${dealFieldReducer.dealSuggestion.name}` }
                        <span onClick={onClearDealSuggestion}>x</span>
                    </div>
                </div>
                }
                <input
                    id="deal"
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={dealsInputClasses}
                    onBlur={() => {onInputBlur(formName); onBlur();}}
                />
            </div>
        );
    }
}

DealField.propTypes = {
    authReducer: React.PropTypes.object,
    dealFieldReducer: React.PropTypes.object,
    input: React.PropTypes.object,
    meta: React.PropTypes.object,
    onDealSelected: React.PropTypes.func,
    onClearDealSuggestion: React.PropTypes.func,
    onInputBlur: React.PropTypes.func,
    formName: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        dealFieldReducer: state.dealFieldReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDealSelected: (value) => {
            dispatch(dealSelected(value));
        },
        onClearDealSuggestion: () => {
            dispatch(clearDealSuggestion());
        },
        onInputBlur: (formName) => {
            setTimeout(() => {
                dispatch(changeFieldValue(formName, 'deal', ''));
            }, 0);
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DealField);
