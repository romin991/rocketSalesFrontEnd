import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FileInput from '../FileInput/FileInput';

class ImportForm extends Component {
    render() {
        const { inputKeyValue } = this.props;
        return (
            <Field className="notesTextArea" type="file" name="file" accept=".csv" component={FileInput} inputKeyValue={inputKeyValue}/>
        );
    }
}

ImportForm.propTypes = {
    onFileSelect: React.PropTypes.func,
    inputKeyValue: React.PropTypes.string
};

ImportForm = reduxForm({
    form: 'importForm'
})(ImportForm);

export default ImportForm;
