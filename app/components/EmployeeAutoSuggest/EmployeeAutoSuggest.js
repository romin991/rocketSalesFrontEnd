import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { employeesInputValueChanged, employeeSuggestionSelected, employeeFieldClear } from '../../actions/employeesActions';

const EmployeeAutoSuggest = ({ input: { id, name, onBlur, onChange }, meta: { touched, error }, employeesReducer, getSuggestionValue, renderSuggestion, onEmployeesInputValueChanged, onEmployeeFieldClear }) => {
    const autoSuggestClasses = classNames({
        'hidden': Boolean(employeesReducer.employeeId),
        'invalidValidation': touched && error
    });

    const autoSuggestInputProps = {
        name: name,
        id: id,
        value: employeesReducer.employeesInputValue,
        onChange: (e, { newValue }) => {onEmployeesInputValueChanged(newValue); onChange(newValue);},
        onBlur: () => {onEmployeesInputValueChanged(''); onChange(''); onBlur();},
        className: autoSuggestClasses
    };

    return(
        <div>
            {employeesReducer.employeeId &&
            <div className="chosenSuggest">
                <div className="border-wrapper">
                    {employeesReducer.employeeSuggestion}
                    <span onClick={onEmployeeFieldClear}>x</span>
                </div>
            </div>
            }
            <Autosuggest
                suggestions={employeesReducer.employeesSuggestionsList}
                onSuggestionsFetchRequested={() => {}}
                onSuggestionsClearRequested={() => {}}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={autoSuggestInputProps}
                shouldRenderSuggestions={() => true}
            />
        </div>
    );
};

EmployeeAutoSuggest.propTypes = {
    employeesReducer: React.PropTypes.object,
    input: React.PropTypes.object,
    meta: React.PropTypes.object,
    getSuggestionValue: React.PropTypes.func,
    renderSuggestion: React.PropTypes.func,
    onEmployeesInputValueChanged: React.PropTypes.func,
    onEmployeeFieldClear: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        employeesReducer: state.employeesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderSuggestion: (suggestion) => {
            return `${suggestion.first_name}${(suggestion.first_name && suggestion.last_name) && ' '}${suggestion.last_name}`;
        },
        getSuggestionValue: (suggestion) => {
            dispatch(employeeSuggestionSelected(suggestion));
            return `${suggestion.first_name}${(suggestion.first_name && suggestion.last_name) && ' '}${suggestion.last_name}`;
        },
        onEmployeesInputValueChanged: (inputValue) => {
            dispatch(employeesInputValueChanged(inputValue));
        },
        onEmployeeFieldClear: () => {
            dispatch(employeeFieldClear());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAutoSuggest);
