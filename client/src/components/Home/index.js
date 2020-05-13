import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotions';
import CardBlock from '../utils/card_block'

import {connect} from 'react-redux';
import { getNewArrivals, getBackIssues} from '../../actions/products_actions';



class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getNewArrivals());
        this.props.dispatch(getBackIssues());
    }

    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrivals"
                
                />
                <HomePromotion/>
                <CardBlock
                    list={this.props.products.byBackIssue}
                    title="Back Issues"
                
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);