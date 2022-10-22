import React, { Component } from 'react';
import axios from '../../axios';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'
import * as actionFuncs from '../../redux/actions/index'


class Orders extends Component {
    componentWillMount = () => {
        this.props.onGetCustomerOrders(this.props.token,this.props.userId)
    }

    render() {
     

        let data = <Spinner />
        if (this.props.error) {
            data = <div>{this.props.error}</div>
        }
        if (this.props.data.length > 0) {
            data = this.props.data.map(data => (
            

                <Order key={data.id}
                    price={data.price}
                    ingredients={data.ingredients}
                />
            ))
        }
        return (
            <div>
                {data}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.order.data,
        error: state.order.errOrder,
        token:state.auth.tokenId,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetCustomerOrders: (token,userId) => dispatch(actionFuncs.getCustomerOrder(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));