import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './CloseDealForm.scss';
import { hideCloseDealModal } from '../../actions/modalsActions';
import normalizeIdr from '../../utils/normalizeIdr';
import LoadingElement from '../LoadingElement/LoadingElement';
import { updateDeal } from '../../actions/dealsActions';

class CloseDealForm extends Component {
    render() {
        const { onHideCloseDealModal, form, onSave, dealId, dealsReducer } = this.props;
        return (
            <div className="closeDealForm informationBlock">
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <td className="labelData">
                                <label htmlFor="status">
                                    Status
                                </label>
                            </td>
                            <td className="inputData">
                                <Field name="status" id="status" component="select">
                                    <option value="CW">Closed Won</option>
                                    <option value="CL">Closed Lost</option>
                                </Field>
                            </td>
                        </tr>
                        {form.closeDealForm.values.status === 'CW' &&
                        <tr>
                            <td className="labelData">
                                <label htmlFor="expected_revenue">
                                    Revenue
                                </label>
                            </td>
                            <td className="inputData">
                                <Field name="expected_revenue" id="expected_revenue" component="input" type="text" normalize={normalizeIdr}/>
                            </td>
                        </tr>
                        }
                        {form.closeDealForm.values.status === 'CL' &&
                        <tr>
                            <td className="labelData">
                                <label htmlFor="lost_note">
                                    Reason
                                </label>
                            </td>
                            <td className="inputData">
                                <Field name="lost_note" id="lost_note" component="input" type="text"/>
                            </td>
                        </tr>
                        }
                        </tbody>
                    </table>
                </form>
                <div className="buttonsBlock">
                    <div className="buttons">
                        <button className="cancelButton" onClick={onHideCloseDealModal}>Cancel</button>
                        <button className="saveButton" onClick={() => {onSave(dealId, form.closeDealForm.values);}}>
                            {dealsReducer.updateDealLoading && <LoadingElement/>}
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

CloseDealForm.propTypes = {
    onHideCloseDealModal: React.PropTypes.func,
    onSave: React.PropTypes.func,
    form: React.PropTypes.object,
    dealsReducer: React.PropTypes.object,
    dealId: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        form: state.form,
        dealsReducer: state.dealsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHideCloseDealModal: () => {
            dispatch(hideCloseDealModal());
        },
        onSave: (id, formData) => {
            formData.expected_revenue = formData.expected_revenue ? parseInt(formData.expected_revenue.split(' ').slice(-1)[0].split('.').join(''), 10) : 0;
            dispatch(updateDeal(id, formData));
        }
    };
};

CloseDealForm = connect(mapStateToProps, mapDispatchToProps)(CloseDealForm);

CloseDealForm = reduxForm({
    form: 'closeDealForm'
})(CloseDealForm);

export default CloseDealForm;
