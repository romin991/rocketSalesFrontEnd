import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import classNames from 'classnames';

const DateTimePicker = ({ input: { onChange, value, id, name, onBlur }, meta: { touched, error } }) => {
    const fieldClasses = classNames({
        'invalidValidation': touched && error
    });

    return(
        <DatePicker
            dateFormat="Do MMMM YYYY"
            onChange={onChange}
            selected={value === '' ? null : moment(value, 'Do MMMM YYYY')}
            onBlur={onBlur}
            id={id}
            name={name}
            className={fieldClasses}
        />
    );
};

DateTimePicker.propTypes = {
    input: React.PropTypes.object,
    meta: React.PropTypes.object
};

export default DateTimePicker;
