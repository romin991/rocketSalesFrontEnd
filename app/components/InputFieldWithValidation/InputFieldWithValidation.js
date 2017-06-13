import React from 'react';
import classNames from 'classnames';

const InputFieldWithValidation = ({ input, type, meta: { touched, error }, inputClassName }) => {
    const fieldClasses = classNames({
        [inputClassName]: true,
        'invalidValidation': touched && error
    });

    return (
        <input className={fieldClasses} {...input} type={type}/>
    );
};

InputFieldWithValidation.propTypes = {
    input: React.PropTypes.object,
    type: React.PropTypes.string,
    meta: React.PropTypes.object,
    inputClassName: React.PropTypes.string
};

export default InputFieldWithValidation;
