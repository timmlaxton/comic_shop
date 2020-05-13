import React from 'react';
import MyButton from '../utils/button';

const HomePromotion = (props) => {

    const order = {
        img: 'images/featured/pull.jpg',
        lineOne: 'Standing Order',
        lineTwo: 'Register an accoutn to start one today',
        linkTitle: 'Register Account',
        linkTo: '/register_login'
    }

    const standingOrder = () => (
        order ?
        <div className="home_promotion_img"
            style={{
                background:`url(${order.img})`
            }}
            >
             <div className="tag title">{order.lineOne} </div>
             <div className="tag low_title">{order.lineTwo} </div>
             <div>
                        <MyButton
                        type="default"
                        title={order.linkTitle}
                        linkTo={order.linkTo}
                        addStyle='10px 0 0 0'
                        />
                    </div>
        </div>

        :null
    )

    return (
        <div className="home_promotion">
            {standingOrder()}
            
        </div>
    );
};

export default HomePromotion;