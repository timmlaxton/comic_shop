import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotions';
import CardBlock from '../utils/card_block'

import {connect} from 'react-redux';
import { getNewArrivals, getBackIssues, getTrades} from '../../actions/products_actions';



class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getNewArrivals());
        this.props.dispatch(getBackIssues());
        this.props.dispatch(getTrades());
    }

    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrivals"
                    history={this.props.history}
                />
                <HomePromotion/>
                <CardBlock
                    list={this.props.products.byBackIssue}
                    title="Back Issues"
                    history={this.props.history}
                />
                 <HomePromotion/>
                <CardBlock
                    list={this.props.products.byTrades}
                    title="Trades"
                    history={this.props.history}
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