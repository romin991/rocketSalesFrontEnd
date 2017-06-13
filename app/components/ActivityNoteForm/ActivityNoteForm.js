import React, { Component } from 'react';
import { Field, reduxForm, pristine } from 'redux-form';

class ActivityNoteForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Field name="note" component="textarea"/>
                <div className="button-container">
                    <button type="submit" disabled={pristine}>Submit</button>
                </div>
            </form>
        );
    }
}

ActivityNoteForm.propTypes = {
    handleSubmit: React.PropTypes.func
};

ActivityNoteForm = reduxForm({
    form: 'ActivityNoteForm'
})(ActivityNoteForm);

export default ActivityNoteForm;
