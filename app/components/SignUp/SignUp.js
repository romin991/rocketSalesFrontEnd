import React from 'react';
import { connect } from 'react-redux';
import { signUp, signUpEmptyFieldError, signUpPasswordMatchingError, resetSignUpPasswordMatchingError, signUpThermsToggle } from '../../actions/authActions';
import LoadingElement from '../LoadingElement/LoadingElement';
import './SignUp.scss';
import { Link } from 'react-router';

const signUpPage = ({authReducer, onSubmitButtonClick, onPasswordChange, onThermsChange}) => {
    const signUpInputs = {
        emailInput: null,
        passwordInput: null,
        confirmPasswordInput: null,
        firstNameInput: null,
        lastNameInput: null,
        companyInput: null
    };

    return (
        <div className="signUpPage">
            <div className="signUpContainer">
                <div className="signUpBlock clearfix">
                    <div className="leftPartSignUpBlock">
                        <img src={require('./signUpLogo.png')} alt=""/>
                        <p>Solusi Simple dan Modern Untuk Meningkatkan Sales Anda</p>
                        <div className="copyrightBlock">
                            ©2016, Zahaya. All rights reserved.
                        </div>
                    </div>
                    <div className="rightPartSignUpBlock">
                        <div className="signUpInsideBlock">
                            <h3>Register dengan Email</h3>
                            {authReducer.signUpPasswordMatchError && <div className="error">Password and Confirm Password did not match</div>}
                            {authReducer.signUpEmptyFieldsError && <div className="error">All fields are required</div>}
                            {authReducer.signUpError && <div className="error">{authReducer.signUpError.response.data.message}</div>}
                            <form onSubmit={e => {
                                onSubmitButtonClick(e, signUpInputs);
                            }} className="formBlock">
                                <input className="longInput" type="text" ref={node => {
                                    signUpInputs.firstNameInput = node;
                                }} placeholder="Nama Depan" required/>
                                <input className="longInput" type="text" ref={node => {
                                    signUpInputs.lastNameInput = node;
                                }} placeholder="Nama keluarga" required/>
                                <input className="longInput" type="text" ref={node => {
                                    signUpInputs.companyInput = node;
                                }} placeholder="Perusahaan" required/>
                                <input className="longInput" type="email" ref={node => {
                                    signUpInputs.emailInput = node;
                                }} placeholder="Alamat Email" required/>
                                <input className="longInput" type="password" ref={node => {
                                    signUpInputs.passwordInput = node;
                                }} placeholder="Kata Sandi" onChange={() => {onPasswordChange(authReducer.signUpPasswordMatchError);}} required/>
                                <input className="longInput" type="password" ref={node => {
                                    signUpInputs.confirmPasswordInput = node;
                                }} placeholder="Ulangi Kata Sandi" onChange={() => {onPasswordChange(authReducer.signUpPasswordMatchError);}} required/>
                                <label className="checkboxBlock">
                                    <input type="checkbox" onChange={onThermsChange}/>
                                    Saya menyetujui Syarat & Ketentuan ini
                                </label>
                                <button type="submit" className="longInput registerInput" disabled={!authReducer.signUpThermsChecked}>
                                    {authReducer.signUpLoading && <LoadingElement/>}
                                    REGISTER
                                </button>
                            </form>
                            <span className="clickForLogin">
                                <Link to="login">Klik disini</Link> untuk login
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

signUpPage.propTypes = {
    authReducer: React.PropTypes.object,
    onSubmitButtonClick: React.PropTypes.func,
    onPasswordChange: React.PropTypes.func,
    onThermsChange: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitButtonClick: (event, signUpInputs) => {
            event.preventDefault();

            const singUpData = {
                email: signUpInputs.emailInput.value,
                password: signUpInputs.passwordInput.value,
                firstName: signUpInputs.firstNameInput.value,
                lastName: signUpInputs.lastNameInput.value,
                company: signUpInputs.companyInput.value
            };

            if (singUpData.email.length === 0 ||
                singUpData.password.length === 0 ||
                singUpData.firstName.length === 0 ||
                singUpData.lastName.length === 0 ||
                singUpData.company.length === 0
            ) {
                dispatch(signUpEmptyFieldError());
            } else {
                if (singUpData.password !== signUpInputs.confirmPasswordInput.value) {
                    dispatch(signUpPasswordMatchingError());
                } else {
                    dispatch(signUp(singUpData));
                }
            }
        },
        onPasswordChange: (passwordError) => {
            if (passwordError) {
                dispatch(resetSignUpPasswordMatchingError());
            }
        },
        onThermsChange: () => {
            dispatch(signUpThermsToggle());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(signUpPage);
