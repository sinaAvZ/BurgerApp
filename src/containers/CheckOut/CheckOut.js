import React, { Component } from "react";
import { Redirect, Route } from 'react-router-dom'
import CheckOutSummary from '../../components/CheckOutSummary/CheckOutSummary'
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux'


class CheckOut extends Component {

    state = {

        loader: false
    }




    cancellHandler = () => {
        this.props.history.goBack('/')
    }
    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data')

    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            summary = (<div>
                 < CheckOutSummary
                    totalPrice={this.props.totalPrice}
                    ingredients={this.props.ings}
                    cancellHandler={this.cancellHandler}
                    continueHandler={this.continueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
           </div> )
        }
        return summary
  
                
       
     
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerprops.ingredients,
        totalPrice: state.burgerprops.totalPrice
    }
}
export default connect(mapStateToProps)(CheckOut)