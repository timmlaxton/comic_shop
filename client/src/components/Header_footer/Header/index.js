import React, { Component } from 'react';
import logo from '../../../images/logo.png';
import { Link, withRouter } from 'react-router-dom';


import { connect } from 'react-redux';
import {logoutUser} from '../../../actions/user_actions';

class Header extends Component {

state = {
    page: [
        {
            name: "Home",
            linkTo:'/',
            public: true
            
        },
        {
            name: "Comics",
            linkTo:'/comics',
            public: true
            
        },
        
        // {
        //     name: "Shirts",
        //     linkTo:'/shirts',
        //     public: true
            
        // },
    ],
    user:[
        {
            name: "My Cart",
            linkTo:'/user/cart',
            public: false
            
        },
        {
            name: "My Account",
            linkTo:'/user/dashboard',
            public: false
            
        },
        {
            name: "Log in",
            linkTo:'/register_login',
            public: true
            
        },
        {
            name: "Log out",
            linkTo:'/register_logout',
            public: false
        },
    ]
}

    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response =>{
            if(response.payload.success){
                this.props.history.push('/register_login')
            }
        })
    }



    cartLink = (item,i) => {
        const cartItems = this.props.cart.cartItems
        console.log('cart link', cartItems, this)
        return (
            <div className="cart_link" key={i}>
            <span>{cartItems ? cartItems.length:0}</span>
            <Link to={item.linkTo}>
                {item.name}
            </Link>
            </div>

        )
    }


    defaultLink = (item,i) => (
        item.name === 'Log out' ?
        <div className="log_out_link"
        key={i}
        onClick={this.logoutHandler}
        >
            {item.name}
        </div>

        :
        <Link to={item.linkTo} key={i}>
        {item.name}
        </Link>
    )



    showLinks = (type) => {
        var list = [];

            type.forEach((item)=> {
                    if(item.public === true){
                        list.push(item)
                    }else if(this.props.user.userData){
                        list.push(item)
                    }

            });
       // }

        return list.map((item,i)=>{
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            } else {
                return this.cartLink(item,i)
            }
            
        })

    }





    render() {
        console.log('in header', this.state, this.props)
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <img src={logo} alt="Logo" className="logo" linkto="/"/>
                        <div className="logo">
                        
                            </div>
                                </div>
                                    <div className="right">
                                        <div className="top">
                                        {this.showLinks(this.state.user)}    
                                    </div>
                                <div className="bottom">
                                        {this.showLinks(this.state.page)}
                            </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(withRouter(Header));