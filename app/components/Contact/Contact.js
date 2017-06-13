import React from 'react';
import { Link } from 'react-router';
import  './Contact.scss';

const Contact = ({contact, authReducer}) => {
    const detailUrl = authReducer.user.model_meta && (contact.ct === authReducer.user.model_meta.lead) ? '/detail-lead/' : '/detail-contact/';

    return (
        <div className="rightBlockContact">
            <ul>
                <li>
                    <div className="photoBlock" style={{backgroundImage: `url(${contact.prof_pic})`}}>
                        {!contact.prof_pic && <i className="fa fa-user"/>}
                    </div>
                    <div className="textBlock">
                        <div className="nameBlock">
                            <Link to={detailUrl + contact.id}>{contact.first_name} {contact.last_name}</Link>
                        </div>
                        <div className="line">{contact.position}</div>
                        <div className="line">{contact.email}</div>
                        <div className="line">{contact.phone} {contact.mobile_phone}</div>
                    </div>
                </li>
            </ul>
        </div>
    );
};


Contact.propTypes = {
    contact: React.PropTypes.object,
    authReducer: React.PropTypes.object,
};

export default Contact;
