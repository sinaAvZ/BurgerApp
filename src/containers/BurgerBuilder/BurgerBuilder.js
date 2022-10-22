import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxularry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios'
import * as actionFuncs from '../../redux/actions/index'



 export class BurgerBuilder extends Component {


    state = {
        purchasing: false,
        loader: false,

    }





    updatePurchaseState = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum = sum + ingredients[key]


        }



        return sum > 0;
    }
    componentWillMount = () => {
        if (this.props.ings===null) {
            this.props.onIngredientsFetch()
        }

    }
    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthPath('/checkout')
            this.props.history.push("auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });

    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout')


    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.props.error ? <p>SomeThing Was Wrong</p> : <Spinner />
        let loading = this.props.ings ? <OrderSummary
            ingredients={this.props.ings}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} /> : null
        if (this.state.loader) {
            loading = <Spinner />
        }
        if (this.props.ings) {
            burger = (
                <Aux>


                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuth}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} /></Aux>)
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {loading}
                </Modal>
                {burger}

            </Aux>
        );

    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerprops.ingredients,
        totalPrice: state.burgerprops.totalPrice,
        error: state.burgerprops.error,
        isAuth: state.auth.tokenId !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (el) => dispatch(actionFuncs.addIngredients(el)),
        onIngredientsRemoved: (el) => dispatch(actionFuncs.removeIngredient(el)),
        onIngredientsFetch: () => dispatch(actionFuncs.fetchIngredients()),
        onSetAuthPath:(path)=>dispatch(actionFuncs.setAuthPath(path)),
        onSetPropsToDeafult:()=>dispatch()

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));