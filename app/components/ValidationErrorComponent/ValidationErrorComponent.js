import React from 'react';
const ValidationErrorComponent = () => {
    return (
        <div className="validationOutBlock">
            <div className="validationBlock">
                This field is required
            </div>
            <div className="triangleDown"></div>
        </div>
    );
};

export default ValidationErrorComponent;
