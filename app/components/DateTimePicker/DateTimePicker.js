import React from 'react';
import Datetime from 'react-datetime';
import classNames from 'classnames';

const DateTimePicker = ({ input: { onChange, value, id, name, onBlur }, meta: { touched, error } }) => {
    const fieldClasses = classNames({
        'invalidValidation': touched && error
    });

    return(
        <Datetime
            dateFormat="Do MMMM YYYY"
            timeFormat="h:mm A"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            inputProps={{
                id: id,
                name: name,
                className: fieldClasses
            }}
        />
    );
};

DateTimePicker.propTypes = {
    input: React.PropTypes.object,
    meta: React.PropTypes.object
};

export default DateTimePicker;
