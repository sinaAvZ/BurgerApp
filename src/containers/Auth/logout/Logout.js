import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import { authLogout } from '../../../redux/actions/index'
class Logout extends Component {
    componentDidMount = () => {
        this.props.onLogout()
    }

    render() {
        return <Redirect tp="/"/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)