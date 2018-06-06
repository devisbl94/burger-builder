import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        onContactData: false
    }
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }
    onCheckoutCancelledHandler = () => {
        this.props.history.replace('/');
    }
    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        this.setState({ onContactData: true });
    }
    render() {
        let summary = <Redirect to="/" />;
        let checkoutSummary = null;
        if (!this.state.onContactData) {
            checkoutSummary = (
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutContinued={this.onCheckoutContinuedHandler}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler} />
            )
        }
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    {checkoutSummary}
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        /*render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}*/
                        component={ContactData} />
                </div>
            )
        }
        return(
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);