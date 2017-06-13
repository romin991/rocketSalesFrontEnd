import React, { Component } from 'react';

class UserQuantityInput extends Component {
    render() {
        const { input: { value, onChange } } = this.props;

        return (
            <div className="userQInput">
                <button type="button" className="numButton" onClick={() => onChange(value - 1)}><i className="fa fa-minus"/></button>
                <input type="number"  className="numInput"value={value} onChange={onChange} min="0"/>
                <button type="button" className="numButton" onClick={() => onChange(value + 1)}><i className="fa fa-plus"/></button>
            </div>
        );
    }
}

UserQuantityInput.propTypes = {
    input: React.PropTypes.object
};

export default UserQuantityInput;
