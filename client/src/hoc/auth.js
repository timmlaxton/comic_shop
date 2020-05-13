import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth} from '../actions/user_actions';
import {setCartItems} from '../actions/cart_actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import {USER_SERVER} from '../components/utils/misc'
export default function(ComposedClass,reload,adminRoute = null){

    class AuthenticationCheck extends Component {
        state = {
            loading: true
        }
        async componentDidMount(){
            try {
                console.log('in auth.js componentDidMount')
                const response = await axios.get(`${USER_SERVER}/auth`)
                console.log('auth response', response)
                const user = response.data
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login')
                    }
                }else{
                    this.props.dispatch(auth(user))
                    this.props.dispatch(setCartItems(user.cart))
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard')
                    }else{
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }
            } catch (error) {
                console.error(error)
                this.props.history.push('/register_login')
            }
            this.setState({loading:false})

            // /*
            // this.props.dispatch(auth()).then(response => {
            //     var user = this.props.user.userData;                
                
            //     if(!user.isAuth){
            //         if(reload){
            //             this.props.history.push('/register_login')
            //         }
            //     }else{
            //         if(adminRoute && !user.isAdmin){
            //             this.props.history.push('/user/dashboard')
            //         }else{
            //             if(reload === false){
            //                 this.props.history.push('/user/dashboard')

            //         }
            //     }
            // }*/        
        }


        render() {
            console.log('in auth render', this.state, this.props)
            if(this.state.loading){
                return (
                    <div className="main_loader">
                        <CircularProgress style={{color:'#2196f3'}} thickness={7}/>
                    </div>
                )
            }
            return this.props.user.userData ? (<ComposedClass {...this.props} user={this.props.user}/>) : null      
            
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)

}

