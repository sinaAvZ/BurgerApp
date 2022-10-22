import React, { Component } from "react";
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input'
import * as actionFunctions from '../../redux/actions/index'
import { connect } from 'react-redux'
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import {validationHandler} from '../../shared/utility'
class Athenticate extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                shouldValid: false
            },


        },
        formIsValid: false,
        isSignIn: false,
    }

    componentWillUnmount = () => {
      
        if (this.props.authPath !== "/") {
    
            this.props.onSetAuthPathToDefault()
        }
    }
   
    changeHandler = (event, id) => {
        const updateControls = {
            ...this.state.controls,
            [id]: {
                ...this.state.controls[id],
                value: event.target.value,
                valid: validationHandler(event.target.value, this.state.controls[id].validation),
                shouldValid: true
            }
        };
        let check = true
        for (let valid in this.state.controls) {

            check = this.state.controls[valid].valid && check
        }
        this.setState({ controls: updateControls, formIsValid: check })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn)

    }

    switchHandler = () => {
        this.setState((state) => ({
            isSignIn: !state.isSignIn
        }));

    }
    render() {

        let elementArray = [];
        for (let key in this.state.controls) {
            elementArray.push({
                config: this.state.controls[key],
                id: key
            });

        }
        let form = <form onSubmit={this.submitHandler} >
            <h4>Enter your Email,Password Data</h4>
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

            <Button btnType={'Success'} disabled={!this.state.formIsValid}>Submit</Button>

        </form>


        if (this.props.loading) {
            form = <Spinner />
        }
        if (this.props.error) {
            form = <form onSubmit={this.submitHandler} >
                <h4>Enter your Email,Password Data</h4>
                {elementArray.map(data => {
                    return <Input
                        style={{ borderColor: "#ff6e4a" }}
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
                <p>Imormation is Not Currect</p>
                <Button btnType={'Success'} disabled={!this.state.formIsValid}>Submit</Button>

            </form>
        }
        let authDirect = null
        
        if (this.props.isAuth) {
            console.log(this.props.authPath);
            authDirect = <Redirect to={this.props.authPath} />
        }


        return (
            <div className={classes.ContactData} >

                {authDirect}
                { form}
                < br />
                <Button btnType={'Success'} clicked={this.switchHandler}>{this.state.isSignIn ? "SignIn" : "SignUp"}</Button>

            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.tokenId !== null,
        building: state.burgerprops.building,
        authPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignIn) => dispatch(actionFunctions.authenticate(email, password, isSignIn)),
        onSetAuthPathToDefault: () => dispatch(actionFunctions.setAuthPath('/'))
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Athenticate)