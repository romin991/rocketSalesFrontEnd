import React from 'react';

const IconTask = ({ width, height, view, color }) => {
    return (
        <svg width={width} height={height} viewBox={view} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" fill="none">
                <g id="ZD-settings-subscribeTrial" transform="translate(-22.000000, -403.000000)" fill={color}>
                    <g id="sidebar-collapse">
                        <g id="task-ico" transform="translate(21.000000, 395.000000)">
                            <path d="M19,25.0029699 C19,25.5536144 18.5553691,26 17.9991283,26 L4.00087166,26 C3.4481055,26 3,25.5553691 3,24.9991283 L3,11.0008717 C3,10.4481055 3.45303631,10 3.99703014,10 L11,10 L11,8 L2.99961498,8 C1.89525812,8 1,8.89821238 1,9.99079514 L1,26.0092049 C1,27.1086907 1.89821238,28 2.99079514,28 L19.0092049,28 C20.1086907,28 21,27.1125667 21,26.000385 L21,18 L19,18 L19,25.0029699 Z M6.5,15.5 L10.4300003,19.5 L20.5,8.5 L22,9.9158161 L11.7589107,21.4990777 C11.0260245,22.3280142 9.84025375,22.3307414 9.10310995,21.496903 L5,16.8555686 L6.5,15.5 Z" id="task"/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

IconTask.propTypes = {
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    view: React.PropTypes.string,
    color: React.PropTypes.string
};

export default IconTask;
