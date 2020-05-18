import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div><p>Please Login or Register a new account to purchase any comics</p>
        <div className="page_wrapper"></div>
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                    <h1>New Customers</h1>
                    <p> Please click below to set up a new account</p>
                    <MyButton
                        type="default"
                        title="Create Account"
                        linkTo="/register"
                        addStyles={{
                            margin:'10px 0 0 0'
                        }}
                    />
                    </div>
                    <div className="right"> 
                    <h1>Registered Customers</h1>
                    <p>If you have an account please log in</p>
                    <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;