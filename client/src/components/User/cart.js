import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';
import axios from 'axios'
import {connect} from 'react-redux';
import { removeCartItem, onSuccessBuy, subQuantity, addQuantity, updateCartDetail } from '../../actions/cart_actions'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import { PRODUCT_SERVER}  from '../utils/misc'

import Paypal from '../utils/paypal'

class UserCart extends Component {
    state ={
        loading: true,
        total:0,
        shipping:4,
        showTotal: false,
        showSuccess: false,
        outOfStock: {}
    }

    componentDidMount(){
        const {cart} = this.props
        console.log('in card on mount', this)

        if (!cart.cartItems || !cart.cartItems.length) return
        this.fetchCartItems(cart.cartItems)
        
    }

    fetchCartItems = async (cartItems)  => {
        const itemsIds = cartItems.map(item => item.id)
        try {
            const response = await axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${itemsIds}&type=array`)
            console.log('response?', response)
            cartItems.forEach(item => {
                response.data.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data[i].quantity = item.quantity                    
                    }
                })
            })
            console.log('updated quantity', response.data)
            this.props.updateCartDetail(response.data)
            this.calculateTotal(this.props.cart.cartDetail)
            this.checkStock()

        } catch (error) {
            console.error(error)
        }
    }

    calculateTotal = (cartDetail) => {
        var total = 4;
      

        cartDetail.forEach(item=>{
            total = (total + parseFloat(item.price) * item.quantity)         
        });

        this.setState({
            total: total.toFixed(2),
            showTotal: true
        });

    }


    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
        if (this.props.cart.cartDetail.length <= 0){
            this.setState({
                showTotal: false
            })
            
        }else{
           this.calculateTotal(this.props.cart.cartDetail) 
            }
        })
    }

    showNoItemMessage = () =>(
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You have no items
            </div>
        </div>
    )

    transactionError = (data) => {
        console.log('paypal error')
        //login register code to be used here
    }

    transactionCancelled = (data) => {
        console.log('paypal error')
        //login register code to be used here

    }

    transactionSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.cart.cartDetail,
            paymentData: data
        })).then(()=>{
            if(this.props.cart.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }

    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }

    handleSubQuantity = (id)=>{
        this.props.subQuantity(id);
    }

    updateQuantity = async (value, product) => {
        try {
            const quantity = parseInt(value)
            console.log('update quantity', quantity, product)


            const payload = this.props.cart.cartDetail.map(item => {
                if (item._id === product._id) {
                    return {
                        ...product,
                        quantity
                    }
                }

                return item
            })
            console.log('updating payload', payload)
            this.props.dispatch(updateCartDetail(payload))

            const serverPayload = this.props.cart.cartItems.map(item => {
                if (item.id === product._id) {
                    return {
                        ...item,
                        quantity
                    }
                }

                return item
            })
            this.calculateTotal(payload)
            const response = await axios.post(`${PRODUCT_SERVER}/set_cart`, {
                cart: serverPayload,
            })
            console.log('response', response)
        } catch(error) {
            console.error(error)
        }
    }

    checkStock = async() => {
        console.log('checking stock')
        this.setState({
            outOfStock: {}
        })
        try {
            const response = await axios.post(`${PRODUCT_SERVER}/check_stock_available`, {
                data: this.props.cart.cartItems
            })
            console.log('response?', response)
            let obj = {}
            response.data.forEach(({isAvailable, id}) => {
                    if (!isAvailable) obj[id] = true
            }) 
            this.setState({
                outOfStock: obj
            })
        } catch (error) {
            console.error(error)
        }
    }
    
    render() {
        console.log('in cart js', this.props.cart, this.state)
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.cart}
                            type="cart"
                            removeItem={this.removeFromCart}     
                            updateQuantity={this.updateQuantity}     
                            outOfStock={this.state.outOfStock}                  
                        />
                        
                        { this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div> + Shipping: £4.00</div>
                                    <div>
                                        Total amount: £ {this.state.total}
                                    </div>
                                </div>
                            </div>
                            
                        :
                            this.state.showSuccess ?
                                <div className="cart_success">
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>
                                        THANK YOU
                                    </div>
                                    <div>
                                        YOUR ORDER IS NOW COMPLETE
                                    </div>
                                </div>
                            :
                            this.showNoItemMessage()
                        }

                        

                    </div>
                    {
                        this.state.showTotal ?
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.total}
                                transactionError={(data)=> this.transactionError(data)}
                                transactionCancel={(data)=> this.transactionCancel(data)}
                                onSuccess={(data)=> this.transactionSuccess(data)}   
                                checkStock={this.checkStock}                         
                            />
                        </div>
                        :null
                    }

                </div>
            </UserLayout>
           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,     
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQuantity: (id) => dispatch(addQuantity(id)),
        subQuantity: (id) => dispatch(subQuantity(id)),
        updateCartDetail: payload => dispatch(updateCartDetail(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart);



