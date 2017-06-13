import React from 'react';
import classNames from 'classnames';

const SelectFieldWithValidation = ({ input, type, meta: { touched, error }, inputClassName, children, parentTouched, hasParent }) => {
    const fieldClasses = classNames({
        [inputClassName]: true,
        'invalidValidation': error && (hasParent ? parentTouched : touched)
    });

    return (
        <select className={fieldClasses} {...input} type={type}>
            {children}
        </select>
    );
};

SelectFieldWithValidation.propTypes = {
    input: React.PropTypes.object,
    children: React.PropTypes.array,
    type: React.PropTypes.string,
    meta: React.PropTypes.object,
    inputClassName: React.PropTypes.string,
    parentTouched: React.PropTypes.bool,
    hasParent: React.PropTypes.bool
};

export default SelectFieldWithValidation;
