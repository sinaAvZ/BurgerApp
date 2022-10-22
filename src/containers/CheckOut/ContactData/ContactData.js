import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import * as actionFuncs from '../../../redux/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {validationHandler} from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                shouldValid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                shouldValid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                shouldValid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                shouldValid: false

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                shouldValid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {
                    required: true
                },
                valid: true,
                shouldValid: false
            }
        },
        formIsValid: false,

    }
  

  
    orderHandler = (event) => {
        event.preventDefault()
        let formData = {}
        for (let Data in this.state.orderForm) {
            formData[Data] = this.state.orderForm[Data].value
        }

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: formData,
            userId: this.props.userId
        };
        this.props.onSetLoadingIngredientsTrue()
        this.props.onSetProps(data,this.props.history)
    this.props.onSetPropsToDefault()
        // axios.post('/customer', data)
        //     .then(response => {
        //         this.props.history.push('/')
        //         this.setState({ loading: false })
        //         this.props.onPropsToDefault();
        //     })
        //     .catch(err => {

        //         this.setState({ loading: false })
        //         //     })
        //     })
    }
    changeHandler = (prop, id) => {
        const updateOrder = {
            ...this.state.orderForm
        }
        const updateOrderItem = {
            ...this.state.orderForm[id]
        }
        updateOrderItem.value = prop.target.value;
        updateOrderItem.valid = validationHandler(updateOrderItem.value, updateOrderItem.validation)
        updateOrderItem.shouldValid = true
        updateOrder[id] = updateOrderItem;
        let valid = true
        for (let inputIsValid in updateOrder) {
            valid = updateOrder[inputIsValid].valid && valid
        }
        this.setState({ orderForm: updateOrder, formIsValid: valid })
    }

    render() {

        let elementArray = [];
        for (let key in this.state.orderForm) {
            elementArray.push({
                config: this.state.orderForm[key],
                id: key
            });

        }
        let form = <form onSubmit={this.orderHandler} className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {elementArray.map(data => {
                return <Input
                    key={data.id}
                    elementType={data.config.elementType}
                    elementConfig={data.config.elementConfig}
                    value={data.config.value}
                    shouldValid={data.config.validation.required}
                    touched={data.config.shouldValid}
                    valid={!data.config.valid}
                    changed={(ig) => this.changeHandler(ig, data.id)}
                />
            })}
            <Button btnType={'Success'} disabled={!this.state.formIsValid}>Order</Button>
        </form>

        if (this.props.loading) {
            form = <Spinner />
        }


        return (
            <div>
                { form}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerprops.ingredients,
        totalPrice: state.burgerprops.totalPrice,
        loading: state.order.loading,
        userId:state.auth.userId
    }
}
const mapDispatchTpProps = Dispatch => {
    return {
        onSetProps: (data,push) => Dispatch(actionFuncs.saveIngredients(data,push)),
        onSetLoadingIngredientsTrue: () => Dispatch(actionFuncs.setLoadingIngredientsTrue()),
        onSetPropsToDefault:()=>Dispatch(actionFuncs.setPropsToDefault())
    }
}

export default connect(mapStateToProps, mapDispatchTpProps)(withErrorHandler(ContactData, axios))