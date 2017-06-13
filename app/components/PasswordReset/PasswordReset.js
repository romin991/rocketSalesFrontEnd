import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { passwordReset, passwordResetEmptyFieldError } from '../../actions/authActions';
import './PasswordReset.scss';
import LoadingElement from '../LoadingElement/LoadingElement';

const PasswordReset = ({authReducer, onSubmitButtonClick}) => {
    let emailInput;

    return (
        <div className="passwordResetPage">
            <div className="passwordResetContainer">
                <div className="passwordResetBlock clearfix">
                    <div className="backButtonBlock">
                        <Link to="login" className="backButton">
                            <i className="fa fa-angle-left fa-2x" aria-hidden="true"/>
                        </Link>
                    </div>
                    <div className="passwordResetInsideBlock">
                        <div className="imgBlock">
                            <img src={require('./passwordResetLogo.png')} alt=""/>
                        </div>
                        <div className="instructionBlock">
                            Isi email anda dan kami akan mengirimkan instruksi reset password ke email anda
                        </div>
                        {authReducer.passwordResetSuccess && <div className="success">Success. Please check your email.</div>}
                        {authReducer.passwordResetError && <div className="error">{authReducer.passwordResetError.response.data.message}</div>}
                        {authReducer.passwordResetEmptyFieldsError && <div className="error">Please enter your email</div>}
                        <form onSubmit={e => {
                            onSubmitButtonClick(e, emailInput);
                        }} className="formBlock">
                            <input type="email" ref={node => {
                                emailInput = node;
                            }} placeholder="Alamat Email"/>
                            <button type="submit" className="submitButton">
                                {authReducer.passwordResetLoading && <LoadingElement/>}
                                RESET
                            </button>
                        </form>
                        <div className="copyrightBlock">
                            ©2016, Zahaya. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PasswordReset.propTypes = {
    authReducer: React.PropTypes.object,
    onSubmitButtonClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitButtonClick: (event, emailInput) => {
            event.preventDefault();

            if (emailInput.value.length === 0) {
                dispatch(passwordResetEmptyFieldError());
            } else {
                dispatch(passwordReset({email: emailInput.value}));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
