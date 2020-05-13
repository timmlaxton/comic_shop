import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import {update, generateData, isFormValid} from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import {loginUser} from '../../actions/user_actions';

/*
    init login is dispatched
    it sets a loginPending flag to true
    when login finishes, depending on the outcome
    if success
        then set user data, and loginPending to false
    if error
        then set errorFetching flag to true and loginPending to false
*/

class Login extends Component {

    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            email: {
                    element: "input",
                    value: "",
                    config: {
                        name: 'email_input',
                        type:'email',
                        placeholder: 'Enter your email'
                    },
                    validation: {
                        required: true,
                        email: true
                        
                    },
                    valid: false,
                    touched: false,
                    validationessage: ""
                },
                password: {
                    element: "input",
                    value: "",
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                    },
                    validation: {
                        required: 'true'
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                }
            }
        }

        updateForm = (element) => {
            const newFormdata = update(element, this.state.formdata, 'login');
            this.setState({
                formError: false,
                formdata: newFormdata
            })
        }

        componentDidUpdate(prevProps, prevState) {
            console.log('login component did update', this, prevProps)
            if (this.props.loginSuccess) {               
                this.props.history.push('/user/dashboard')
            }
        }

        submitForm = (event) => {
            console.log('submitting form')
            event.preventDefault();

            var dataToSubmit = generateData(this.state.formdata, 'login');
            var formIsValid = isFormValid(this.state.formdata, 'login');

            if(formIsValid){
                this.props.dispatch(loginUser(dataToSubmit))  
            } else {
                this.setState({
                    formError: true
                })
            }
        }
    
    
    render() {
        return (
            <div className="sigin_wrapper">
                <form onSubmit={this.submitForm}>

            <FormField
                id={'email'}
                formdata={this.state.formdata.email}
                change={this.updateForm}
            />

            <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={this.updateForm}

            />

            {this.state.formError ?
            <div className="error_label">
                Please fill in all your details
            </div>
            :null}


            <button onClick={this.submitForm}>
                Sign in
            </button>
              </form>  
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('in map state ot props login', state)
    return {
        loginSuccess: state.user.loginSuccess
    }
}

export default connect(mapStateToProps)(withRouter(Login));