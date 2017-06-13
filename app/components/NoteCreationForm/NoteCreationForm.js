import React, { Component } from 'react';
import { Field, reduxForm, pristine } from 'redux-form';

class NoteCreationForm extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <form className="notesInputBlock" onSubmit={handleSubmit}>
                <Field className="notesTextArea" name="note" component="textarea"/>
                <div className="notesButtonsBlock">
                    <button className="save" type="submit" disabled={pristine}>Save</button>
                </div>
            </form>
        );
    }
}

NoteCreationForm.propTypes = {
    handleSubmit: React.PropTypes.func
};

NoteCreationForm = reduxForm({
    form: 'noteCreationForm'
})(NoteCreationForm);

export default NoteCreationForm;
