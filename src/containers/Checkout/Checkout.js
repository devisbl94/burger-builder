import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { getIngredients } from '../../store/selectors/burgerBuilder';
import { purchased } from '../../store/selectors/order';


class Checkout extends Component{
    state = {
        onContactData: false
    }
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
        ings: getIngredients(state),
        purchased: purchased(state)
    }
}

export default connect(mapStateToProps)(Checkout);