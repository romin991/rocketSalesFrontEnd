import React from 'react';
import { Link } from 'react-router';
import './Account.scss';

const Account = ({account}) => {
    return (
        <div className="rightBlockAccount">
            <ul>
                <li>
                    <div className="photoBlock" style={{backgroundImage: `url(${account.prof_pic})`}}>
                        {!account.prof_pic && <i className="fa fa-user"/>}
                    </div>
                    <div className="textBlock">
                        <div className="nameBlock">
                            <Link to={'/detail-account/' + account.id}>
                                {account.name}
                            </Link>
                        </div>
                        <div className="line">{account.phone}</div>
                    </div>
                </li>
            </ul>
        </div>
    );
};


Account.propTypes = {
    account: React.PropTypes.object,
};

export default Account;
