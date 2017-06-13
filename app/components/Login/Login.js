import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signIn, sigInEmptyFieldError } from '../../actions/authActions';
import LoadingElement from '../LoadingElement/LoadingElement';
import './Login.scss';

const Login = ({authReducer, onLoginButtonClick}) => {
    let emailInput;
    let passwordInput;

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <div className="loginBlock clearfix">
                    <div className="leftPartLoginBlock">
                        <div className="loginInsideBlock">
                            <div className="imgBlock">
                                <img src={require('./loginLogo.png')} alt=""/>
                            </div>
                            {(authReducer.signInError) &&
                            (authReducer.signInError.response.status === 400
                            && <div className="error">The combination of username and password does not exist</div>
                            || <div className="error">{authReducer.signInError.response.data.message}</div>)}
                            {authReducer.signInEmptyFieldsError && <div className="error">All fields are required</div>}
                            <form onSubmit={e => {
                                onLoginButtonClick(e, emailInput, passwordInput);
                            }} className="formBlock">
                                <input type="email" ref={node => {
                                    emailInput = node;
                                }} placeholder="Alamat Email" />
                                <input type="password" ref={node => {
                                    passwordInput = node;
                                }} placeholder="Kata Sandi" />
                                <button type="submit" className="loginButton">
                                    {authReducer.signInLoading && <LoadingElement/>}
                                    MASUK
                                </button>
                            </form>
                            <p className="forgotPassword">
                                <Link to="/forgot-password">Lupa kata sandi?</Link>
                            </p>
                            <div className="line"></div>
                            <div className="underlineBlock">
                                <div className="notCustomerBlock">
                                    Belum memiliki akun?
                                </div>
                                <Link to="sign-up" className="tryForFreeButton">Coba Gratis</Link>
                            </div>
                            <div className="copyrightBlock">
                                ©2016, Zahaya. All rights reserved.
                            </div>
                        </div>
                    </div>
                    <div className="rightPartLoginBlock">
                        <p>Solusi Simple dan Modern Untuk Meningkatkan Sales Anda</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    authReducer: React.PropTypes.object,
    onLoginButtonClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginButtonClick: (event, emailInput, passwordInput) => {
            event.preventDefault();

            const loginData = {
                username: emailInput.value,
                password: passwordInput.value
            };

            if (loginData.username.length === 0 ||
                loginData.password.length === 0
            ) {
                dispatch(sigInEmptyFieldError());
            } else {
                dispatch(signIn(loginData, false));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
