import React from 'react';

const IconAccount = ({ width, height, view, color }) => {
    return (
        <svg width={width} height={height} viewBox={view} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" fill="none">
                <g id="ZD-import-sucess" transform="translate(-20.000000, -214.000000)">
                    <g id="sidebar-collapse">
                        <g id="account-ico" transform="translate(20.000000, 214.000000)">
                            <rect id="bound" x="0" y="0" width="24" height="24"/>
                            <path d="M7,12 L11,12 L11,10 L7,10 L7,12 Z M7,16 L11,16 L11,14 L7,14 L7,16 Z M17,12 L19,12 L19,10 L17,10 L17,12 Z M17,8 L19,8 L19,6 L17,6 L17,8 Z M17,16 L19,16 L19,14 L17,14 L17,16 Z M11,22 L11,18 L7,18 L7,22 L5,22 L5,9 L8,9 L10,9 L13,9 L13,22 L11,22 Z M19,22 L19,18 L17,18 L17,22 L15,22 L15,4 L21,4 L21,22 L19,22 Z M23,24 L23,2 L13,2 L13,7 L3,7 L3,22 L3,24 L5,24 L13,24 L15,24 L23,24 Z" id="buildingIco" fill={color}/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

IconAccount.propTypes = {
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    view: React.PropTypes.string,
    color: React.PropTypes.string
};

export default IconAccount;
