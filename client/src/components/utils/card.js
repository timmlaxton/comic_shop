import React, { Component } from 'react';
import MyButton from './button';

import {connect} from 'react-redux';
import {addToCart}from '../../actions/cart_actions';

class Card extends Component {

    renderCardImage(images){
        if(images.length > 0){
            return images[0].url

        }else {
            return '/images/noimage.png'

        }
    }


    render() {
        const props = this.props
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div 
                className="image"
                style={{
                    background:`url(${this.renderCardImage(props.images)}) no-repeat`
                }}
                
                > </div>
                <div className="action_container">
                <div className="tags">
                    { props.character ? 
                    <div className="character">{props.character.name}</div> : null}
                    <div className="publisher">{props.publisher.name}</div>
                    <div className="issue">Issue{props.issue}</div>
                    <div className="price">£{props.price}</div>
                    </div>
                    
                { props.grid ?
                    <div className="description"> 
                            <p>
                                {props.description}
                            </p>
                    </div>
                :null
                } 
                
                <div className="actions">
                 <div className="button_wrapp">
                    <MyButton
                        type="default"
                        altClass="card_link"
                        title="View product"
                        linkTo={`/product_detail/${props._id}`}
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}
                    />

                    </div>
                    <div className="button_wrapp">
                        <MyButton
                            type="bag_link"
                            runAction={()=>{
                            props.user.userData.isAuth ?
                            this.props.dispatch(addToCart(props._id))
                            :
                                console.log('you need to log in');
                                                        
                            }}
                        
                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);