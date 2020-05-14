import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import UserLayout from '../../hoc/user';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

 

import { connect } from 'react-redux';
import {orderUser} from '../../actions/user_actions'

class Standing_order extends Component {
    state = {
        formError: false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            surname: {
                element: 'input',
                value: '',
                config:{
                        name:'surname_input',
                        type:'text',
                        placeholder:'Enter your surname'
            },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            address: {
                element: 'input',
                value: '',
                config:{
                        name:'address_input',
                        type:'text',
                        placeholder:'Enter your address'
            },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            city: {
                element: 'input',
                value: '',
                config:{
                        name:'city_input',
                        type:'text',
                        placeholder:'Enter your city'
            },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            postcode: {
                element: 'input',
                value: '',
                config:{
                        name:'postcode_input',
                        type:'text',
                        placeholder:'Enter your postcode'
            },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }, 
        phone: {
            element: 'input',
            value: '',
            config:{
                
                name: 'phone_input',
                type: 'text',
                placeholder: 'Enter your phone number'
            },
            validation:{
                required: true
            },
            valid: false,
            touched: false,
            validationMessage:'',
            
            },
        description: {
            element: 'textarea',
            value: '',
            config:{
                
                name: 'description_input',
                type: 'text',
                placeholder: 'Enter your order'
            },
            validation:{
                required: true
            },
            valid: false,
            touched: false,
            validationMessage:'',
            
        },
    }  
}       

updateForm = (element) => {
    const newFormdata = update(element,this.state.formdata,'/standing_order');
    this.setState({
        formError: false,
        formdata: newFormdata
    })
}

submitForm = (event) =>{
    event.preventDefault();
    
    let dataToSubmit = generateData(this.state.formdata,'standing_order');
    let formIsValid = isFormValid(this.state.formdata,'standing_order')
    console.log('formIsValid', formIsValid)
    
    if(formIsValid){
        this.props.dispatch(orderUser(dataToSubmit))
        .then(response =>{ 
            console.log('response?', response)
            if(response.payload.success){
                this.setState({
                    formError: false,
                    formSuccess: true
                });
                setTimeout(()=>{
                    this.props.history.push('/');
                },3000)
               } else {
                    this.setState({formError: true})
                }
            }).catch(e => {
                this.setState({formError: true})
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }




render() {
    return (
        <UserLayout>
            <div>YOU HAVE 30 DAYS FROM CREATING YOUR STANDING ORDER TO PAY FOR IT</div>
            <div>ANY ORDERS UNPAID AFTER THIS PERIOD WILL BE CANCELLED</div>
        <div>
            <form onSubmit={(event)=>  this.submitForm(event)}>
                <h1>Standing Order</h1>
                <FormField
                    id={'name'}
                    formdata={this.state.formdata.name}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'surname'}
                    formdata={this.state.formdata.surname}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'address'}
                    formdata={this.state.formdata.address}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'city'}
                    formdata={this.state.formdata.city}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'postcode'}
                    formdata={this.state.formdata.postcode}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'phone'}
                    formdata={this.state.formdata.phone}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element) => this.updateForm(element)}
                />

                <FormField
                       id={'description'}
                       formdata={this.state.formdata.description}
                       change={(element)=> this.updateForm(element)}
                />

<div>
                            {
                            this.state.formError ?
                             <div className="error_label">
                            Please fill in all your details
                             </div>
                            :null
                            }      
                        {
                            this.state.formSuccess ? 
                            <div className="form_success">
                                Your order has been submitted
                            </div>
                            :null
                        }
                        
                        <button onClick={(event) => this.submitForm(event)}>
                           Submit Standing Order
                        </button>
                    </div>

                </form>
               
            </div>
            </UserLayout>
        );
    }
}


        


export default connect()(Standing_order);