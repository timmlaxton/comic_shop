import React from 'react';
import MyButton from '../utils/button';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTruck} from '@fortawesome/fontawesome-free-solid/faTruck';
import {faCheck} from '@fortawesome/fontawesome-free-solid/faCheck';
import {faTimes} from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            { detail.shipping ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        {/* <div>Free shipping</div> */}
                        {/* <div>And return</div> */}
                    </div>
                </div>
            :null
            }
            { detail.available ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div className="tag_text">
                        {/* <div>Available</div> */}
                        {/* <div>in store</div> */}
                    </div>
                </div>
            :
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTimes}/></div>
                    <div className="tag_text">
                        {/* <div>Not Available</div>
                        <div>Preorder only</div> */}
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price">£ { detail.price }</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={()=>{
                       props.addToCart(detail._id)
                    }}
                />
            </div>
        </div>
    )

   
    const detail = props.detail
    return (
        <div>
            <h1>{detail.character.name} </h1>
            <h1>{detail.name}</h1>
            Stock Level  <h1> {detail.amount}</h1>
            <p>
                {detail.description} 
            </p>
            {showProdTags(detail)}
            {showProdActions(detail)}
           
        </div>
    );
};

export default ProdNfo;