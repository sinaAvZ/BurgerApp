import React, { Component } from 'react';
import Aux from '../../hoc/Auxularry';
import classes from './Layout.Module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false,
    }


    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
  
    render() {

        return (
            <Aux>
                <Toolbar
                
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuth} />
                <SideDrawer

                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.tokenId !== null
    }
}
export default connect(mapStateToProps)(Layout);