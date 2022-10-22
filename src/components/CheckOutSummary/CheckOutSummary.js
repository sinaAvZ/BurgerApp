import React from 'react';
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import Css from './CheckOutSummary.module.css'
import { withRouter } from 'react-router-dom'


const CheckOutSummary = props => {




    return (
        <div className={Css.CheckoutSummary}>
            <h1>Price is {props.totalPrice}</h1>
            <div >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button style={{ marginTop: "3rem" }} clicked={props.cancellHandler} btnType='Danger'>CANCELL</Button>
            <Button style={{ marginTop: "3rem" }} clicked={props.continueHandler} btnType='Success'>CONTINUE</Button>

        </div>


    )

};
export default withRouter(CheckOutSummary);